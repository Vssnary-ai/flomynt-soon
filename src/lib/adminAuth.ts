import crypto from "crypto";
import bcrypt from "bcryptjs";

// Rate limiting in-memory store
interface RateLimitRecord {
  attempts: number;
  lockoutUntil: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(ip: string): { allowed: boolean; remainingWaitMs?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    return { allowed: true };
  }

  if (record.lockoutUntil > now) {
    return {
      allowed: false,
      remainingWaitMs: record.lockoutUntil - now,
    };
  }

  // If lockout expired, reset
  if (record.lockoutUntil > 0 && record.lockoutUntil <= now) {
    rateLimitMap.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function registerFailedAttempt(ip: string): { locked: boolean; remainingAttempts: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { attempts: 0, lockoutUntil: 0 };
  record.attempts += 1;

  if (record.attempts >= 5) {
    record.lockoutUntil = now + 15 * 60 * 1000; // 15 minutes lockout
    rateLimitMap.set(ip, record);
    return { locked: true, remainingAttempts: 0 };
  }

  rateLimitMap.set(ip, record);
  return { locked: false, remainingAttempts: 5 - record.attempts };
}

export function resetRateLimit(ip: string) {
  rateLimitMap.delete(ip);
}

// Session token generation & verification (HMAC SHA-256)
const SECRET = process.env.SESSION_SECRET || "flomynt-fallback-session-secret-key-64chars";

export function createSessionToken(): string {
  const payload = {
    role: "admin",
    createdAt: Date.now(),
    expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 hours
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(payloadStr)
    .digest("base64url");
  return `${payloadStr}.${signature}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadStr, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", SECRET)
    .update(payloadStr)
    .digest("base64url");

  // Timing safe equal
  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf8"));
    if (Date.now() > payload.expiresAt) {
      return false;
    }
    return payload.role === "admin";
  } catch {
    return false;
  }
}

// Password verification
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const envPasswordHash = process.env.ADMIN_PASSWORD;

  if (!envPasswordHash) {
    console.error("ADMIN_PASSWORD is not set in environment");
    return false;
  }

  try {
    // If it's a bcrypt hash ($2a$, $2b$, or $2y$)
    if (envPasswordHash.startsWith("$2")) {
      return await bcrypt.compare(password, envPasswordHash);
    }
    // Fallback timing-safe comparison if plain text
    return crypto.timingSafeEqual(
      Buffer.from(password),
      Buffer.from(envPasswordHash)
    );
  } catch (err) {
    console.error("Password verification error:", err);
    return false;
  }
}

// Shared Mock Store for Demo Mode when Firebase is not connected
export interface Lead {
  id: string;
  name: string;
  email: string;
  agency?: string;
  message: string;
  status: "new" | "contacted" | "converted" | "archived";
  createdAt: string;
}

export interface WishlistEntry {
  id: string;
  email: string;
  idea?: string;
  source: string;
  priorityPosition: number;
  createdAt: string;
}

// In-memory demo data store
export const demoLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Marcus Vance",
    email: "marcus@apexscale.ai",
    agency: "Apex Scale Automation Partners",
    message: "Looking to deploy white-labeled client portals for 24 agency clients currently on n8n. Need self-healing failover across Gemini and Claude.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "lead-2",
    name: "Elena Rostova",
    email: "elena@synapseflow.io",
    agency: "Synapse Workflows",
    message: "Inquiring about enterprise zero-trust private enclaves. Our clients in healthcare require strictly isolated HIPAA-compliant audit logs.",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: "lead-3",
    name: "David Chen",
    email: "david@hyperlogic.co",
    agency: "Hyperlogic Agency",
    message: "Interested in the Jarvis talk-to-build workflow engine. Would love an early engineering demo.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

export const demoWishlist: WishlistEntry[] = [
  {
    id: "wish-1",
    email: "sarah.k@vanguardflows.com",
    idea: "Send a Telegram alert when a payment fails & auto-heal Stripe webhook 429",
    source: "email",
    priorityPosition: 41,
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: "wish-2",
    email: "founder@clientportals.dev",
    idea: "Turn new leads into a branded client portal with instant custom domain",
    source: "google",
    priorityPosition: 42,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "wish-3",
    email: "nathan@autoflow.org",
    idea: "Fix broken workflow steps automatically with synthetic replay testing",
    source: "email",
    priorityPosition: 43,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

