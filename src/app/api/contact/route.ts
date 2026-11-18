import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { getAdminDb, isAdminConfigured } from "@/lib/firebaseAdmin";
import { demoLeads, type Lead } from "@/lib/adminAuth";
import { saveStoredLead } from "@/lib/localStore";

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

    const newLead: Lead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: cleanName,
      email: cleanEmail,
      agency: cleanAgency || undefined,
      message: cleanMessage,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    // 1. Persist to local persistent store (for local dev environments)
    try {
      await saveStoredLead(newLead);
    } catch (e) {
      console.warn("Could not write to localStore (read-only filesystem):", e);
    }
    demoLeads.unshift(newLead);

    let firestoreSaved = false;

    // 2. Try Firestore Admin if configured
    if (isAdminConfigured()) {
      const adminDb = getAdminDb();
      if (adminDb) {
        try {
          await adminDb.collection("leads").doc(newLead.id).set({
            name: cleanName,
            email: cleanEmail,
            agency: cleanAgency,
            message: cleanMessage,
            status: "new",
            createdAt: new Date(),
          });
          firestoreSaved = true;
        } catch (err) {
          console.error("Admin Firestore write failed:", err);
        }
      }
    }

    // 3. Try Client Firestore SDK if Admin wasn't used
    if (!firestoreSaved && isFirebaseConfigured()) {
      try {
        await setDoc(doc(db, "leads", newLead.id), {
          name: cleanName,
          email: cleanEmail,
          agency: cleanAgency,
          message: cleanMessage,
          status: "new",
          createdAt: serverTimestamp(),
        });
        firestoreSaved = true;
      } catch (err) {
        console.error("Client Firestore write failed, trying addDoc:", err);
        try {
          await addDoc(collection(db, "leads"), {
            name: cleanName,
            email: cleanEmail,
            agency: cleanAgency,
            message: cleanMessage,
            status: "new",
            createdAt: serverTimestamp(),
          });
          firestoreSaved = true;
        } catch (err2) {
          console.error("Client Firestore addDoc also failed:", err2);
        }
      }
    }

    return NextResponse.json({
      success: true,
      lead: newLead,
      firestoreSaved,
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
