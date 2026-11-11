"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  getCountFromServer,
} from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";

/* ---------- helpers ---------- */

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/* ---------- Toast ---------- */

function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -16, x: "-50%" }}
      className="fixed top-6 left-1/2 z-50 max-w-[90vw] rounded-xl border border-white/10 bg-[#141414]/95 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur-xl"
      role="alert"
    >
      {message}
    </motion.div>
  );
}

/* ---------- Google icon ---------- */

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.1H42V20H24v8h11.3C33.9 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C33.9 5.7 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.2-2.6-.4-3.9z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.3 16 18.8 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C33.9 6.7 29.2 5 24 5 16.3 5 9.7 9 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5 0 9.6-1.8 13.2-4.7l-6.1-5.2C29.2 35.4 26.7 36 24 36c-5.2 0-9.7-3-11.8-7.2l-6.5 5C9.5 39.2 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.1 5.2C36.8 39.2 44 34 44 24c0-1.3-.2-2.6-.4-3.9z"
      />
    </svg>
  );
}

/* ---------- Check animation ---------- */

function CheckAnimation() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="flex h-16 w-16 items-center justify-center rounded-full bg-[#19C3E6]/15 mx-auto"
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#19C3E6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.polyline
          points="20 6 9 17 4 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.svg>
    </motion.div>
  );
}

/* ---------- Spinner ---------- */

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/* ---------- Main form ---------- */

type FormState = "idle" | "loading" | "success" | "already";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [toast, setToast] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const lastSubmit = useRef(0);

  const saveToFirestore = useCallback(
    async (
      emailVal: string,
      uid?: string,
      name?: string,
      source: string = "email"
    ) => {
      const emailKey = emailVal.toLowerCase().trim();
      const isConfigured =
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
        !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("Dummy");

      if (!isConfigured) {
        // Fallback for local preview when Firebase credentials have not been supplied in .env.local
        console.info(
          `[Flomynt Demo] Registered ${emailKey}. Add real Firebase credentials to .env.local to persist in Cloud Firestore.`
        );
        setPosition(42);
        setFormState("success");
        return;
      }

      const docRef = doc(db, "waitlist", emailKey);

      // Check if already exists
      const existing = await getDoc(docRef);
      if (existing.exists()) {
        setFormState("already");
        return;
      }

      await setDoc(docRef, {
        email: emailKey,
        ...(uid && { uid }),
        ...(name && { name }),
        source,
        createdAt: serverTimestamp(),
      });

      // Get position
      try {
        const snap = await getCountFromServer(collection(db, "waitlist"));
        setPosition(snap.data().count);
      } catch {
        setPosition(null);
      }

      setFormState("success");
    },
    []
  );

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      // Honeypot check
      const form = e.target as HTMLFormElement;
      const honeypot = (
        form.elements.namedItem("website") as HTMLInputElement
      )?.value;
      if (honeypot) return;

      // Rate limiting (3 seconds)
      const now = Date.now();
      if (now - lastSubmit.current < 3000) {
        setError("Please wait a moment before trying again.");
        return;
      }
      lastSubmit.current = now;

      if (!email.trim()) {
        setError("Please enter your email address.");
        return;
      }
      if (!isValidEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      setFormState("loading");
      try {
        await saveToFirestore(email);
      } catch (err) {
        console.error(err);
        setToast("Something went wrong. Please try again.");
        setFormState("idle");
      }
    },
    [email, saveToFirestore]
  );

  const handleGoogleSignIn = useCallback(async () => {
    setError("");
    setFormState("loading");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user.email) {
        await saveToFirestore(
          user.email,
          user.uid,
          user.displayName || undefined,
          "google"
        );
      }
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError.code === "auth/popup-closed-by-user") {
        setFormState("idle");
        return;
      }
      if (
        firebaseError.code === "auth/invalid-api-key" ||
        firebaseError.code === "auth/api-key-not-valid" ||
        !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("Dummy")
      ) {
        setToast("Please configure real Firebase credentials in .env.local to enable Google sign-in.");
        setFormState("idle");
        return;
      }
      console.error(err);
      setToast("Google sign-in failed. Please try again.");
      setFormState("idle");
    }
  }, [saveToFirestore]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("");
      // brief visual feedback
      const btn = document.getElementById("share-btn");
      if (btn) {
        btn.textContent = "Link copied!";
        setTimeout(() => {
          btn.textContent = "Share with friends";
        }, 2000);
      }
    } catch {
      setToast("Could not copy link.");
    }
  }, []);

  /* ---- Success / Already state ---- */
  if (formState === "success" || formState === "already") {
    return (
      <div className="flex flex-col items-center text-center gap-4 w-full max-w-[420px]">
        <CheckAnimation />
        <h2 className="text-white text-2xl font-medium">
          {formState === "already"
            ? "You\u2019re already on the list!"
            : "You\u2019re on the list!"}
        </h2>
        {position && formState === "success" && (
          <p className="text-white/60 text-sm">
            You\u2019re #{position} on the waitlist.
          </p>
        )}
        <p className="text-white/50 text-sm">
          We\u2019ll notify you the moment Flomynt launches.
        </p>
        <button
          id="share-btn"
          onClick={handleShare}
          className="mt-2 h-[52px] w-full rounded-xl border border-white/[0.08] bg-white/[0.06] text-white text-sm font-medium hover:bg-white/[0.1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19C3E6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Share with friends
        </button>
        <AnimatePresence>
          {toast && <Toast message={toast} onClose={() => setToast("")} />}
        </AnimatePresence>
      </div>
    );
  }

  /* ---- Form state ---- */
  return (
    <div className="flex flex-col items-center text-center gap-6 w-full max-w-[420px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-white text-[32px] font-medium leading-tight tracking-[-0.02em]">
          Join the Waitlist
        </h2>
        <p className="text-white/60 text-sm">
          Be first in line. We&apos;ll notify you the moment Flomynt launches.
        </p>
      </div>

      {/* Google sign-in */}
      <button
        onClick={handleGoogleSignIn}
        disabled={formState === "loading"}
        className="flex items-center justify-center gap-3 h-[52px] w-full rounded-xl border border-white/[0.08] bg-transparent text-white text-sm font-medium hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19C3E6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full">
        <div className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-white/40 text-xs">or</span>
        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>

      {/* Email form */}
      <form onSubmit={handleEmailSubmit} className="w-full flex flex-col gap-3">
        {/* Honeypot */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="Your email address"
            autoComplete="email"
            aria-invalid={!!error}
            aria-describedby={error ? "email-error" : undefined}
            className={`h-[52px] w-full rounded-xl bg-[#141414] border px-4 text-sm text-white placeholder:text-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#19C3E6]/60 focus:border-transparent ${
              error
                ? "border-red-500/60"
                : "border-white/[0.08] hover:border-white/[0.14]"
            }`}
          />
          {error && (
            <p
              id="email-error"
              className="text-xs text-red-400 text-left pl-1"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={formState === "loading"}
          className="relative h-[52px] w-full rounded-xl bg-white text-black text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19C3E6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {formState === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner />
              <span>Reserving…</span>
            </span>
          ) : (
            "Reserve my spot"
          )}
        </button>
      </form>

      <p className="text-white/40 text-xs">No spam. Unsubscribe any time.</p>

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast("")} />}
      </AnimatePresence>
    </div>
  );
}

