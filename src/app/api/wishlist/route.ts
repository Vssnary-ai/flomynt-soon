import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { getAdminDb, isAdminConfigured } from "@/lib/firebaseAdmin";
import { demoWishlist, type WishlistEntry } from "@/lib/adminAuth";
import { saveStoredWishlist, getStoredWishlist } from "@/lib/localStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, idea, source } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanIdea = idea ? String(idea).trim() : undefined;
    const cleanSource = source === "google" ? "google" : "email";

    const currentWishlist = await getStoredWishlist();
    const existing = currentWishlist.find(
      (w) => w.email.toLowerCase() === cleanEmail
    );

    const position = existing ? existing.priorityPosition : currentWishlist.length + 1;

    const newEntry: WishlistEntry = {
      id: `wish-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      email: cleanEmail,
      idea: cleanIdea || existing?.idea,
      source: cleanSource,
      priorityPosition: position,
      createdAt: existing?.createdAt || new Date().toISOString(),
    };

    // 1. Persist to local storage for Admin Panel
    try {
      await saveStoredWishlist(newEntry);
    } catch (e) {
      console.warn("Could not write wishlist to localStore (read-only filesystem):", e);
    }

    // Also update in-memory array if not duplicate
    if (!demoWishlist.some((w) => w.email.toLowerCase() === cleanEmail)) {
      demoWishlist.push(newEntry);
    }

    let firestoreSaved = false;

    // 2. Try Admin Firestore SDK
    if (isAdminConfigured()) {
      const adminDb = getAdminDb();
      if (adminDb) {
        try {
          await adminDb.collection("waitlist").doc(cleanEmail).set(
            {
              email: cleanEmail,
              ...(cleanIdea && { idea: cleanIdea }),
              source: cleanSource,
              createdAt: new Date(),
            },
            { merge: true }
          );
          firestoreSaved = true;
        } catch (err) {
          console.error("Admin Firestore waitlist write failed:", err);
        }
      }
    }

    // 3. Try Client Firestore SDK
    if (!firestoreSaved && isFirebaseConfigured()) {
      try {
        await setDoc(
          doc(db, "waitlist", cleanEmail),
          {
            email: cleanEmail,
            ...(cleanIdea && { idea: cleanIdea }),
            source: cleanSource,
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
        firestoreSaved = true;
      } catch (err) {
        console.error("Client Firestore waitlist write failed:", err);
      }
    }

    return NextResponse.json({
      success: true,
      entry: newEntry,
      position,
      alreadyExists: !!existing,
      firestoreSaved,
    });
  } catch (err) {
    console.error("Wishlist API error:", err);
    return NextResponse.json({ error: "Failed to join wishlist" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list = await getStoredWishlist();
    return NextResponse.json({ count: list.length });
  } catch {
    return NextResponse.json({ count: 42 });
  }
}
