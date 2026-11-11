"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "./SectionLabel";
import PillButton from "./PillButton";
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

interface SlideData {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  accent: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    tag: "DATA PRIVACY",
    title: "Zero-Trust Private Vault",
    subtitle: "Your client data stays locked and never trains any external model.",
    metric: "0%",
    metricLabel: "DATA EXPOSURE",
    accent: "#e9b45b",
  },
  {
    id: 2,
    tag: "WHITE-LABEL",
    title: "Instant Branded Client Apps",
    subtitle: "Turn raw workflows into bespoke portals with custom domains and logos.",
    metric: "1-CLICK",
    metricLabel: "CLIENT DEPLOYMENT",
    accent: "#ffffff",
  },
  {
    id: 3,
    tag: "VOICE AI",
    title: "Jarvis Agentic Architect",
    subtitle: "Speak or type your workflow in plain English; watch the canvas build live.",
    metric: "10x",
    metricLabel: "BUILD SPEED",
    accent: "#e9b45b",
  },
  {
    id: 4,
    tag: "AI ROUTING",
    title: "Multi-Model Intelligent Routing",
    subtitle: "Automatic failover across OpenAI, Anthropic, Gemini, Groq, and OpenRouter.",
    metric: "99.9%",
    metricLabel: "UPTIME TARGET",
    accent: "#ffffff",
  },
  {
    id: 5,
    tag: "SELF-HEALING",
    title: "Autonomous Error Recovery",
    subtitle: "Instant mobile alerts with synthetic replayed patches for 1-click healing.",
    metric: "<1.2s",
    metricLabel: "RESOLVE TIME",
    accent: "#e9b45b",
  },
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

type FormState = "idle" | "loading" | "success" | "already";

export default function WishlistSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [toast, setToast] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const lastSubmit = useRef(0);

  // Autoplay carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

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
        // Fallback for local preview
        console.info(`[Flomynt Demo] Registered ${emailKey}`);
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
        setToast("Configured with demo fallback for local preview.");
        setPosition(42);
        setFormState("success");
        return;
      }
      setToast("Google sign-in failed. Please try email instead.");
      setFormState("idle");
    }
  }, [saveToFirestore]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("Link copied to clipboard!");
      setTimeout(() => setToast(""), 3000);
    } catch {
      setToast("Could not copy link.");
    }
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section
      id="wishlist"
      className="relative w-full bg-[#050505] py-28 px-6 sm:px-10 border-t border-white/[0.14]"
    >
      <div className="max-w-[1340px] mx-auto">
        {/* Header */}
        <div className="mb-14 sm:mb-20 text-center max-w-[700px] mx-auto">
          <SectionLabel text="WISHLIST" />
          <h2 className="mt-4 font-light text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-tight">
            Join the Flomynt Wishlist
          </h2>
          <p className="mt-4 text-[#8a8a8a] text-sm sm:text-base leading-relaxed">
            Be first in line for early developer beta access and private white-labeling agency slots.
          </p>
        </div>

        {/* 2-Column Showcase & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: 16:10 Aspect Ratio Showcase Carousel */}
          <div
            className="lg:col-span-7 flex flex-col justify-between bg-[#0a0a0a] border border-white/[0.14] rounded-2xl p-6 sm:p-10 relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between z-10">
              <span className="mono-label text-[10px] text-[#e9b45b]">
                [ {slide.tag} ]
              </span>
              <div className="flex items-center gap-1.5">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 rounded-full transition-all ${
                      currentSlide === idx
                        ? "w-6 bg-[#e9b45b]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Jump to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Slide Visual Content (16:10 Container) */}
            <div className="relative aspect-[16/10] my-8 flex items-center justify-center border border-white/[0.08] rounded-xl bg-black/60 overflow-hidden p-6 text-center">
              {/* Subtle background glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20 blur-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${slide.accent}, transparent 70%)`,
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex flex-col items-center justify-center max-w-[420px]"
                >
                  <p className="font-sans text-4xl sm:text-5xl font-light text-white tracking-tight mb-2">
                    {slide.metric}
                  </p>
                  <p className="mono-label text-[11px] text-[#e9b45b] mb-4">
                    {slide.metricLabel}
                  </p>
                  <h4 className="text-xl sm:text-2xl font-light text-white mb-2">
                    {slide.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8a8a8a] leading-relaxed">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Carousel Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] z-10">
              <span className="font-mono text-xs text-white/40">
                0{slide.id} / 0{SLIDES.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
                  }
                  className="w-8 h-8 rounded-full border border-white/[0.14] hover:border-white flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
                  }
                  className="w-8 h-8 rounded-full border border-white/[0.14] hover:border-white flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right: Wishlist Form Container */}
          <div className="lg:col-span-5 flex flex-col justify-center bg-[#0a0a0a] border border-white/[0.14] rounded-2xl p-6 sm:p-10">
            {formState === "success" || formState === "already" ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full border border-[#e9b45b] text-[#e9b45b] flex items-center justify-center mx-auto text-xl font-mono">
                  ✓
                </div>
                <h3 className="text-2xl font-light text-white">
                  {formState === "already"
                    ? "You're already on the list"
                    : "You're on the Wishlist!"}
                </h3>
                {position && formState === "success" && (
                  <p className="font-mono text-xs text-[#e9b45b]">
                    PRIORITY POSITION #{position}
                  </p>
                )}
                <p className="text-sm text-[#8a8a8a] max-w-[320px] mx-auto leading-relaxed">
                  We&apos;ll notify you immediately when early access invitations roll out.
                </p>
                <button
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
                    Join founders and automation engineers on the priority waitlist.
                  </p>
                </div>

                {/* Google Sign-in */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={formState === "loading"}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-white/[0.14] hover:border-white/40 bg-white/[0.02] rounded-xl text-xs font-mono text-white transition-all disabled:opacity-50"
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
                    <label htmlFor="wishlist-email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      id="wishlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter work email address..."
                      className="w-full bg-black/60 border border-white/[0.14] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                    />
                    {error && (
                      <p className="mt-1.5 text-xs text-red-400 font-mono">
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full py-3 bg-white hover:bg-[#e9b45b] text-black font-semibold rounded-xl text-xs font-mono tracking-wider uppercase transition-colors disabled:opacity-50"
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
