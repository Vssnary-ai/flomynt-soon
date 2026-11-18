import { getAdminDb, isAdminConfigured } from "@/lib/firebaseAdmin";
import { demoLeads, demoWishlist, type Lead, type WishlistEntry } from "@/lib/adminAuth";

export type DataSource = "firestore" | "demo";

function toIso(value: unknown): string {
  // Firestore Admin Timestamp has a toDate() method; plain Date/string pass through.
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

/** Reads leads newest-first. Falls back to the in-memory demo set if Admin isn't configured. */
export async function fetchLeads(): Promise<{ leads: Lead[]; source: DataSource }> {
  if (isAdminConfigured()) {
    const adminDb = getAdminDb();
    if (adminDb) {
      try {
        const snap = await adminDb
          .collection("leads")
          .orderBy("createdAt", "desc")
          .limit(500)
          .get();
        const leads: Lead[] = snap.docs.map((d) => {
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
        return { leads, source: "firestore" };
      } catch (err) {
        console.error("Failed to read leads from Firestore Admin:", err);
      }
    }
  }
  return { leads: demoLeads, source: "demo" };
}

export async function updateLead(
  id: string,
  status: Lead["status"]
): Promise<{ success: boolean; source: DataSource }> {
  if (isAdminConfigured()) {
    const adminDb = getAdminDb();
    if (adminDb) {
      try {
        await adminDb.collection("leads").doc(id).update({ status });
        return { success: true, source: "firestore" };
      } catch (err) {
        console.error("Failed to update lead in Firestore Admin:", err);
        return { success: false, source: "firestore" };
      }
    }
  }
  const lead = demoLeads.find((l) => l.id === id);
  if (lead) {
    lead.status = status;
    return { success: true, source: "demo" };
  }
  return { success: false, source: "demo" };
}

export async function deleteLead(id: string): Promise<{ success: boolean; source: DataSource }> {
  if (isAdminConfigured()) {
    const adminDb = getAdminDb();
    if (adminDb) {
      try {
        await adminDb.collection("leads").doc(id).delete();
        return { success: true, source: "firestore" };
      } catch (err) {
        console.error("Failed to delete lead in Firestore Admin:", err);
        return { success: false, source: "firestore" };
      }
    }
  }
  const index = demoLeads.findIndex((l) => l.id === id);
  if (index !== -1) {
    demoLeads.splice(index, 1);
    return { success: true, source: "demo" };
  }
  return { success: false, source: "demo" };
}

/** Reads wishlist entries oldest-first so priority position matches signup order. */
export async function fetchWishlist(): Promise<{ wishlist: WishlistEntry[]; source: DataSource }> {
  if (isAdminConfigured()) {
    const adminDb = getAdminDb();
    if (adminDb) {
      try {
        const snap = await adminDb
          .collection("waitlist")
          .orderBy("createdAt", "asc")
          .limit(1000)
          .get();
        const wishlist: WishlistEntry[] = snap.docs.map((d, idx) => {
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
        return { wishlist, source: "firestore" };
      } catch (err) {
        console.error("Failed to read waitlist from Firestore Admin:", err);
      }
    }
  }
  return { wishlist: demoWishlist, source: "demo" };
}
