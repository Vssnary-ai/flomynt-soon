import { getAdminDb, isAdminConfigured } from "@/lib/firebaseAdmin";
import { demoLeads, demoWishlist, type Lead, type WishlistEntry } from "@/lib/adminAuth";
import {
  getStoredLeads,
  updateStoredLead,
  deleteStoredLead,
  getStoredWishlist,
  deleteStoredWishlist,
} from "@/lib/localStore";

export type DataSource = "firestore" | "live" | "demo";

function toIso(value: unknown): string {
  if (value && typeof value === "object" && "toDate" in value) {
    try {
      return (value as { toDate: () => Date }).toDate().toISOString();
    } catch {
      /* fall through */
    }
  }
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return new Date().toISOString();
}

/** Reads leads newest-first from local store + Firestore Admin */
export async function fetchLeads(): Promise<{ leads: Lead[]; source: DataSource }> {
  const localLeads = await getStoredLeads();
  let firestoreLeads: Lead[] = [];

  if (isAdminConfigured()) {
    const adminDb = getAdminDb();
    if (adminDb) {
      try {
        const snap = await adminDb
          .collection("leads")
          .orderBy("createdAt", "desc")
          .limit(500)
          .get();
        firestoreLeads = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: data.name || "Unknown",
            email: data.email || "",
            agency: data.agency || undefined,
            message: data.message || "",
            status: (data.status as Lead["status"]) || "new",
            createdAt: toIso(data.createdAt),
          };
        });
      } catch (err) {
        console.error("Failed to read leads from Firestore Admin:", err);
      }
    }
  }

  // Merge Firestore + local storage (deduplicate by id or email+createdAt)
  const combinedMap = new Map<string, Lead>();

  // Add local stored leads
  for (const l of localLeads) {
    combinedMap.set(l.id, l);
  }

  // Add Firestore leads
  for (const f of firestoreLeads) {
    combinedMap.set(f.id, f);
  }

  const allRealLeads = Array.from(combinedMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (allRealLeads.length > 0) {
    return {
      leads: allRealLeads,
      source: firestoreLeads.length > 0 ? "firestore" : "live",
    };
  }

  // If no submissions exist yet, return sample demo leads
  return { leads: demoLeads, source: "demo" };
}

export async function updateLead(
  id: string,
  status: Lead["status"]
): Promise<{ success: boolean; source: DataSource }> {
  // Update in local store
  const localUpdated = await updateStoredLead(id, status);

  // Update in Firestore Admin if configured
  if (isAdminConfigured()) {
    const adminDb = getAdminDb();
    if (adminDb) {
      try {
        await adminDb.collection("leads").doc(id).update({ status });
        return { success: true, source: "firestore" };
      } catch (err) {
        console.error("Failed to update lead in Firestore Admin:", err);
      }
    }
  }

  // Fallback to in-memory demo array
  const lead = demoLeads.find((l) => l.id === id);
  if (lead) {
    lead.status = status;
    return { success: true, source: "demo" };
  }

  return { success: localUpdated, source: "live" };
}

export async function deleteLead(id: string): Promise<{ success: boolean; source: DataSource }> {
  // Delete from local store
  const localDeleted = await deleteStoredLead(id);

  // Delete from Firestore Admin if configured
  if (isAdminConfigured()) {
    const adminDb = getAdminDb();
    if (adminDb) {
      try {
        await adminDb.collection("leads").doc(id).delete();
        return { success: true, source: "firestore" };
      } catch (err) {
        console.error("Failed to delete lead in Firestore Admin:", err);
      }
    }
  }

  // Fallback to in-memory demo array
  const index = demoLeads.findIndex((l) => l.id === id);
  if (index !== -1) {
    demoLeads.splice(index, 1);
    return { success: true, source: "demo" };
  }

  return { success: localDeleted, source: "live" };
}

/** Reads wishlist entries oldest-first so priority position matches signup order. */
export async function fetchWishlist(): Promise<{ wishlist: WishlistEntry[]; source: DataSource }> {
  const localWishlist = await getStoredWishlist();
  let firestoreWishlist: WishlistEntry[] = [];

  if (isAdminConfigured()) {
    const adminDb = getAdminDb();
    if (adminDb) {
      try {
        const snap = await adminDb
          .collection("waitlist")
          .orderBy("createdAt", "asc")
          .limit(1000)
          .get();
        firestoreWishlist = snap.docs.map((d, idx) => {
          const data = d.data();
          return {
            id: d.id,
            email: data.email || d.id,
            idea: data.idea || undefined,
            source: data.source || "email",
            priorityPosition: idx + 1,
            createdAt: toIso(data.createdAt),
          };
        });
      } catch (err) {
        console.error("Failed to read waitlist from Firestore Admin:", err);
      }
    }
  }

  // Merge Firestore + local wishlist (deduplicate by lowercase email)
  const wishlistMap = new Map<string, WishlistEntry>();

  for (const w of localWishlist) {
    wishlistMap.set(w.email.toLowerCase(), w);
  }

  for (const f of firestoreWishlist) {
    const key = f.email.toLowerCase();
    if (!wishlistMap.has(key)) {
      wishlistMap.set(key, f);
    }
  }

  const allRealWishlist = Array.from(wishlistMap.values()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  if (allRealWishlist.length > 0) {
    // Re-index priority positions
    allRealWishlist.forEach((entry, idx) => {
      entry.priorityPosition = idx + 1;
    });

    return {
      wishlist: allRealWishlist,
      source: firestoreWishlist.length > 0 ? "firestore" : "live",
    };
  }

  return { wishlist: demoWishlist, source: "demo" };
}

export async function deleteWishlistEntry(id: string): Promise<boolean> {
  const localDeleted = await deleteStoredWishlist(id);

  if (isAdminConfigured()) {
    const adminDb = getAdminDb();
    if (adminDb) {
      try {
        await adminDb.collection("waitlist").doc(id).delete();
      } catch (err) {
        console.error("Failed to delete waitlist doc in Firestore:", err);
      }
    }
  }

  const index = demoWishlist.findIndex((w) => w.id === id || w.email === id);
  if (index !== -1) {
    demoWishlist.splice(index, 1);
  }

  return localDeleted || index !== -1;
}
