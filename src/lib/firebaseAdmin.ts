import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Server-only Firebase Admin SDK.
 *
 * The public site writes leads/wishlist entries through the regular client
 * SDK (src/lib/firebase.ts), which Firestore security rules already allow
 * for create-only. Reading, updating or deleting those records — which the
 * admin dashboard needs — is deliberately denied to that client SDK so a
 * leaked API key can never be used to list emails. The Admin SDK below uses
 * a privileged service-account credential to bypass the rules for exactly
 * those admin-only operations.
 *
 * To enable it: Firebase Console → Project Settings → Service Accounts →
 * "Generate new private key". Paste the entire downloaded JSON file as the
 * single-line value of FIREBASE_SERVICE_ACCOUNT_KEY (both locally in
 * .env.local and in the Vercel project's Environment Variables). Until that
 * is set, every admin read falls back to in-memory demo data so the
 * dashboard still renders instead of erroring out.
 */

interface ParsedServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

let cachedApp: App | null = null;
let cachedDb: Firestore | null = null;
let attempted = false;

function parseServiceAccount(): ParsedServiceAccount | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
      console.error(
        "FIREBASE_SERVICE_ACCOUNT_KEY is set but missing project_id/client_email/private_key"
      );
      return null;
    }
    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      // Service-account JSON keeps literal \n escapes once stringified into
      // a single env var line — turn them back into real newlines.
      privateKey: String(parsed.private_key).replace(/\\n/g, "\n"),
    };
  } catch (err) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY as JSON:", err);
    return null;
  }
}

/** True once a syntactically valid service-account credential is present. */
export function isAdminConfigured(): boolean {
  return parseServiceAccount() !== null;
}

/** Returns a privileged Firestore instance, or null if not configured. */
export function getAdminDb(): Firestore | null {
  if (cachedDb) return cachedDb;
  if (attempted) return null; // avoid retrying a known-bad config every request
  attempted = true;

  const svc = parseServiceAccount();
  if (!svc) return null;

  try {
    cachedApp =
      getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            credential: cert({
              projectId: svc.projectId,
              clientEmail: svc.clientEmail,
              privateKey: svc.privateKey,
            }),
            projectId: svc.projectId,
          });
    cachedDb = getFirestore(cachedApp);
    return cachedDb;
  } catch (err) {
    console.error("Firebase Admin SDK initialization failed:", err);
    return null;
  }
}
