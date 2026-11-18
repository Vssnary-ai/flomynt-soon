import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForLocalDevOnly12345678",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "flomynt-dev.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "flomynt-dev",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "flomynt-dev.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

let app: FirebaseApp;
try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
} catch (e) {
  console.warn("Firebase initialization warning (check .env.local):", e);
  app = getApps()[0] || initializeApp(firebaseConfig, "flomynt-fallback");
}

/** True once real (non-placeholder) Firebase project credentials are configured. */
export function isFirebaseConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  return !!key && !key.includes("Dummy");
}

export const db: Firestore = getFirestore(app);
