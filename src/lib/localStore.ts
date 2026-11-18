import fs from "fs/promises";
import path from "path";
import type { Lead, WishlistEntry } from "./adminAuth";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const WISHLIST_FILE = path.join(DATA_DIR, "wishlist.json");

// Ensure data directory exists
async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    /* directory exists */
  }
}

export async function getStoredLeads(): Promise<Lead[]> {
  try {
    await ensureDir();
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function saveStoredLead(lead: Lead): Promise<void> {
  try {
    await ensureDir();
    const existing = await getStoredLeads();
    // Prepend newest first, avoid duplicate by id
    const filtered = existing.filter((l) => l.id !== lead.id);
    filtered.unshift(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write lead to localStore:", err);
  }
}

export async function updateStoredLead(
  id: string,
  status: Lead["status"]
): Promise<boolean> {
  try {
    await ensureDir();
    const existing = await getStoredLeads();
    const index = existing.findIndex((l) => l.id === id);
    if (index === -1) return false;
    existing[index].status = status;
    await fs.writeFile(LEADS_FILE, JSON.stringify(existing, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to update lead in localStore:", err);
    return false;
  }
}

export async function deleteStoredLead(id: string): Promise<boolean> {
  try {
    await ensureDir();
    const existing = await getStoredLeads();
    const filtered = existing.filter((l) => l.id !== id);
    if (filtered.length === existing.length) return false;
    await fs.writeFile(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to delete lead in localStore:", err);
    return false;
  }
}

export async function getStoredWishlist(): Promise<WishlistEntry[]> {
  try {
    await ensureDir();
    const raw = await fs.readFile(WISHLIST_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function saveStoredWishlist(entry: WishlistEntry): Promise<void> {
  try {
    await ensureDir();
    const existing = await getStoredWishlist();
    // Check if email already exists
    const duplicate = existing.find(
      (w) => w.email.toLowerCase() === entry.email.toLowerCase()
    );
    if (duplicate) {
      // Update entry if new idea or timestamp is provided
      if (entry.idea) {
        duplicate.idea = entry.idea;
      }
      duplicate.createdAt = entry.createdAt || new Date().toISOString();
      await fs.writeFile(WISHLIST_FILE, JSON.stringify(existing, null, 2), "utf-8");
      return;
    }
    existing.push(entry);
    await fs.writeFile(WISHLIST_FILE, JSON.stringify(existing, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write wishlist to localStore:", err);
  }
}

export async function deleteStoredWishlist(id: string): Promise<boolean> {
  try {
    await ensureDir();
    const existing = await getStoredWishlist();
    const filtered = existing.filter((w) => w.id !== id && w.email !== id);
    if (filtered.length === existing.length) return false;
    await fs.writeFile(WISHLIST_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to delete wishlist in localStore:", err);
    return false;
  }
}
