import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { getAdminDb, isAdminConfigured } from "@/lib/firebaseAdmin";
import { demoLeads } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, agency, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanAgency = agency ? String(agency).trim() : "";
    const cleanMessage = String(message).trim();

    let persisted = false;

    // 1. Preferred path — privileged Admin SDK (works even though Firestore
    //    rules deny public reads on `leads`; writes still go through fine
    //    either way, but routing through Admin keeps one code path once a
    //    service account is configured).
    if (isAdminConfigured()) {
      const adminDb = getAdminDb();
      if (adminDb) {
        try {
          await adminDb.collection("leads").add({
            name: cleanName,
            email: cleanEmail,
            agency: cleanAgency,
            message: cleanMessage,
            status: "new",
            createdAt: new Date(),
          });
          persisted = true;
        } catch (err) {
          console.error("Admin Firestore write failed, falling back:", err);
        }
      }
    }

    // 2. Fallback — the public client SDK. Firestore rules explicitly allow
    //    `create` on the `leads` collection for anyone, so this already
    //    works in production without any extra credentials.
    if (!persisted && isFirebaseConfigured()) {
      try {
        await addDoc(collection(db, "leads"), {
          name: cleanName,
          email: cleanEmail,
          agency: cleanAgency,
          message: cleanMessage,
          status: "new",
          createdAt: serverTimestamp(),
        });
        persisted = true;
      } catch (err) {
        console.error("Client Firestore write failed, falling back:", err);
      }
    }

    // 3. Last resort — in-memory demo store, so local dev without any
    //    Firebase project configured still works end-to-end.
    const newLead = {
      id: `lead-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      agency: cleanAgency || undefined,
      message: cleanMessage,
      status: "new" as const,
      createdAt: new Date().toISOString(),
    };
    if (!persisted) {
      demoLeads.unshift(newLead);
    }

    return NextResponse.json({ success: true, lead: newLead, persisted });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
