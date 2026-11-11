"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "./SectionLabel";
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

interface WishlistFeature {
  id: string;
  tag: string;
  metric: string;
  metricLabel: string;
  title: string;
  description: string;
  iconPath: string;
}

const WISHLIST_PILLARS: WishlistFeature[] = [
  {
    id: "privacy",
    tag: "ZERO-TRUST VAULT",
    metric: "0%",
    metricLabel: "DATA EXPOSURE",
    title: "Client Data Privacy",
    description: "AES-256 encrypted keys and private enclaves. Your data never trains external AI models.",
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    id: "whitelabel",
    tag: "WHITE-LABEL",
    metric: "1-CLICK",
    metricLabel: "CLIENT DEPLOY",
    title: "Branded Client Portals",
    description: "Wrap any automated flow in custom domain, logo, and client dashboards in seconds.",
    iconPath: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  },
  {
    id: "voice",
    tag: "VOICE AI",
    metric: "10x",
    metricLabel: "BUILD SPEED",
    title: "Jarvis Agentic Architect",
    description: "Speak or type natural specifications; autonomous agents construct node graphs live.",
    iconPath: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8",
  },
  {
    id: "routing",
    tag: "SMART ROUTER",
    metric: "99.9%",
    metricLabel: "UPTIME TARGET",
    title: "Multi-Model Failover",
    description: "Dynamic routing across OpenAI, Anthropic, Gemini, Groq, and OpenRouter.",
    iconPath: "M16 3h5v5 M4 20L21 3 M21 16v5h-5 M15 15l6 6 M4 4l5 5",
  },
  {
    id: "selfhealing",
    tag: "SELF-HEALING",
    metric: "<1.2s",
    metricLabel: "RESOLVE TIME",
    title: "Autonomous Recovery",
    description: "Instant mobile alerts on Telegram with verified synthetic replayed patches.",
    iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

type FormState = "idle" | "loading" | "success" | "already";

export default function WishlistSection() {
  const [activePillar, setActivePillar] = useState<string>("selfhealing");

  // Form states
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [error, setError] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [toast, setToast] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const lastSubmit = useRef(0);

  // Listen to pre-filled idea from Hero glass command bar
  useEffect(() => {
    const handleSetIdea = (e: Event) => {
      const customEvent = e as CustomEvent<{ idea: string }>;
      if (customEvent.detail?.idea) {
        setIdea(customEvent.detail.idea);
      }
    };

    window.addEventListener("flomynt:set-wishlist-idea", handleSetIdea);
    return () => window.removeEventListener("flomynt:set-wishlist-idea", handleSetIdea);
  }, []);

  const saveToFirestore = useCallback(
    async (
      emailVal: string,
      ideaVal?: string,
      uid?: string,
      name?: string,
      source: string = "email"
    ) => {
      const emailKey = emailVal.toLowerCase().trim();
      const isConfigured =
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
        !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("Dummy");

      if (!isConfigured) {
        // Fallback demo mode for local preview
        console.info(`[Flomynt Demo] Registered ${emailKey} with idea: "${ideaVal || ""}"`);
        setPosition(42);
        setFormState("success");
        return;
      }

      const docRef = doc(db, "waitlist", emailKey);
      const existing = await getDoc(docRef);
      if (existing.exists()) {
        setFormState("already");
        return;
      }

      await setDoc(docRef, {
        email: emailKey,
        ...(ideaVal && { idea: ideaVal }),
        ...(uid && { uid }),
        ...(name && { name }),
        source,
        createdAt: serverTimestamp(),
      });

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

      const form = e.target as HTMLFormElement;
      const honeypot = (
        form.elements.namedItem("website") as HTMLInputElement
      )?.value;
      if (honeypot) return;

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
        await saveToFirestore(email, idea);
      } catch (err) {
        console.error(err);
        setToast("Something went wrong. Please try again.");
        setFormState("idle");
      }
    },
    [email, idea, saveToFirestore]
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
          idea,
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
        setToast("Configured with demo fallback for local preview.");
        setPosition(42);
        setFormState("success");
        return;
      }
      setToast("Google sign-in failed. Please try email instead.");
      setFormState("idle");
    }
  }, [idea, saveToFirestore]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("Link copied to clipboard!");
      setTimeout(() => setToast(""), 3000);
    } catch {
      setToast("Could not copy link.");
    }
  }, []);

  return (
    <section
      id="wishlist"
      className="relative w-full bg-[#050505] py-28 sm:py-32 px-6 sm:px-10 border-t border-white/[0.14]"
    >
      <div className="max-w-[1340px] mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-center max-w-[720px] mx-auto">
          <SectionLabel text="WISHLIST" />
          <h2 className="mt-4 font-light text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-tight">
            Join the Flomynt Wishlist
          </h2>
          <p className="mt-4 text-[#8a8a8a] text-sm sm:text-base leading-relaxed">
            Be first in line for early developer beta access, private white-labeling agency slots, and autonomous infrastructure updates.
          </p>
        </div>

        {/* 2-Column Showcase & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Redesigned Glass Showcase of Core Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="mono-label text-[11px] text-[#e9b45b]">
                [ ARCHITECTURE PILLARS ]
              </span>
              <span className="font-mono text-xs text-white/40">
                05 CORE INNOVATIONS
              </span>
            </div>

            {/* Pillar Grid with Glass Cards & Equal Heights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {WISHLIST_PILLARS.map((pillar, idx) => {
                const isSelected = activePillar === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillar(pillar.id)}
                    className={`glass-card text-left p-5 sm:p-6 rounded-2xl flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#e9b45b]/60 bg-white/[0.08] shadow-[0_0_30px_rgba(233,180,91,0.12)]"
                        : "border-white/[0.12] hover:border-white/30"
                    } ${idx === 4 ? "sm:col-span-2" : ""}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="mono-label text-[10px] text-[#e9b45b]">
                          {pillar.tag}
                        </span>
                        {/* 1px line wireframe SVG icon */}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={isSelected ? "text-[#e9b45b]" : "text-white/40"}
                        >
                          <path d={pillar.iconPath} />
                        </svg>
                      </div>

                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="font-sans text-2xl font-light text-white tracking-tight">
                          {pillar.metric}
                        </span>
                        <span className="mono-label text-[9.5px] text-white/50">
                          {pillar.metricLabel}
                        </span>
                      </div>

                      <h4 className="text-base font-normal text-white mb-1.5">
                        {pillar.title}
                      </h4>

                      <p className="text-xs text-[#8a8a8a] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                      <span className="text-white/40">STATUS</span>
                      <span className={isSelected ? "text-[#e9b45b]" : "text-white/60"}>
                        {isSelected ? "ACTIVE FOCUS" : "DEPLOYED"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Wishlist Request Form inside Glass Container */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-10 flex flex-col justify-center">
            {formState === "success" || formState === "already" ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full border border-[#e9b45b] text-[#e9b45b] flex items-center justify-center mx-auto text-2xl font-mono shadow-[0_0_20px_rgba(233,180,91,0.25)]">
                  ✓
                </div>
                <h3 className="text-2xl font-light text-white">
                  {formState === "already"
                    ? "You're already registered"
                    : "You're on the Wishlist!"}
                </h3>
                {position && formState === "success" && (
                  <p className="font-mono text-xs text-[#e9b45b]">
                    PRIORITY QUEUE POSITION #{position}
                  </p>
                )}
                {idea && (
                  <div className="bg-black/50 p-3 rounded-lg border border-white/[0.08] text-left">
                    <p className="mono-label text-[9px] text-[#e9b45b] mb-1">
                      LOGGED WORKFLOW SPEC:
                    </p>
                    <p className="text-xs text-white/80 italic">&ldquo;{idea}&rdquo;</p>
                  </div>
                )}
                <p className="text-xs text-[#8a8a8a] max-w-[320px] mx-auto leading-relaxed">
                  We&apos;ll notify you immediately when early access beta invites roll out.
                </p>
                <button
                  type="button"
                  onClick={handleShare}
                  className="pill-btn mt-4 w-full py-3"
                >
                  SHARE WITH TEAM
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-normal text-white">
                    Request Early Access
                  </h3>
                  <p className="text-xs text-[#8a8a8a] mt-1 font-mono">
                    Join agency founders and automation engineers on the priority waitlist.
                  </p>
                </div>

                {/* Google Sign-in */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={formState === "loading"}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-white/[0.14] hover:border-white/40 bg-white/[0.03] hover:bg-white/[0.07] rounded-xl text-xs font-mono text-white transition-all disabled:opacity-50 cursor-pointer min-h-[44px]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>CONTINUE WITH GOOGLE</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/[0.08]" />
                  <span className="mono-label text-[10px] text-white/30">OR</span>
                  <div className="h-px flex-1 bg-white/[0.08]" />
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label htmlFor="wishlist-email" className="block mono-label text-[10px] text-white/50 mb-1.5">
                      WORK EMAIL *
                    </label>
                    <input
                      id="wishlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="alex@agency.com"
                      className="w-full bg-black/60 border border-white/[0.14] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                    />
                    {error && (
                      <p className="mt-1.5 text-xs text-red-400 font-mono">
                        {error}
                      </p>
                    )}
                  </div>

                  {/* Optional Workflow Idea / Requirement Field */}
                  <div>
                    <label htmlFor="wishlist-idea" className="block mono-label text-[10px] text-white/50 mb-1.5">
                      WORKFLOW IDEA OR SPEC (OPTIONAL)
                    </label>
                    <input
                      id="wishlist-idea"
                      type="text"
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="e.g. Telegram alerts on Stripe invoice failure"
                      className="w-full bg-black/60 border border-white/[0.14] focus:border-white/50 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full py-3 bg-white hover:bg-[#e9b45b] text-black font-semibold rounded-xl text-xs font-mono tracking-wider uppercase transition-colors disabled:opacity-50 cursor-pointer min-h-[44px]"
                  >
                    {formState === "loading"
                      ? "RESERVING..."
                      : "RESERVE MY SPOT ↗"}
                  </button>
                </form>

                <p className="text-[11px] text-[#8a8a8a] text-center font-mono">
                  Zero spam. Unsubscribe with one click any time.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Toast Alert */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0d0d0d] border border-white/[0.14] text-white text-xs font-mono py-2.5 px-4 rounded-lg shadow-xl">
            {toast}
          </div>
        )}
      </div>
    </section>
  );
}
