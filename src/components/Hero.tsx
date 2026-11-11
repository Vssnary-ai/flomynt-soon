"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PillButton from "./PillButton";

const PLACEHOLDERS = [
  "Send a Telegram alert when a payment fails",
  "Turn new leads into a branded client portal",
  "Fix broken workflow steps automatically",
  "Build a multi-agent lead research pipeline",
];

const SUGGESTION_CHIPS = [
  { label: "TELEGRAM ALERT", text: "Send a Telegram alert when a payment fails" },
  { label: "CLIENT PORTAL", text: "Turn new leads into a branded client portal" },
  { label: "SELF-HEALING ENGINE", text: "Fix broken workflow steps automatically" },
];

export default function Hero() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isShimmering, setIsShimmering] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);
    return () => motionQuery.removeEventListener("change", motionHandler);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    if (reducedMotion) return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  // Subtle mouse shift (10px) on desktop
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion || window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = ((clientX / innerWidth) - 0.5) * 20;
      const y = ((clientY / innerHeight) - 0.5) * 20;
      setMouseOffset({ x, y });
    },
    [reducedMotion]
  );

  // Rotating typing placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleJoinWishlist = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isShimmering) return;

    setIsShimmering(true);

    const ideaText = inputValue.trim() || PLACEHOLDERS[placeholderIndex];

    // Dispatch event to pre-fill the wishlist idea field
    window.dispatchEvent(
      new CustomEvent("flomynt:set-wishlist-idea", {
        detail: { idea: ideaText },
      })
    );

    // 1.2s shimmer animation, then smooth scroll to wishlist
    setTimeout(() => {
      setIsShimmering(false);
      scrollTo("wishlist");
    }, 1200);
  };

  const handleMicClick = () => {
    setMicActive(true);
    setTimeout(() => setMicActive(false), 1500);
  };

  const handleChipClick = (text: string) => {
    setInputValue(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Parallax transform calculations
  const parallaxY = reducedMotion ? 0 : Math.min(scrollY * 0.4, 300);
  const scrollFade = reducedMotion ? 0 : Math.min(scrollY / 700, 0.7);

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-8 px-4 sm:px-10"
    >
      {/* =========================================
          1. FULL-BLEED HERO BACKGROUND (IMAGE 1)
         ========================================= */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Background Image Container with Ken Burns, Scroll Parallax & Mouse Shift */}
        <div
          className="absolute inset-[-40px] transition-transform duration-300 ease-out"
          style={{
            transform: reducedMotion
              ? "none"
              : `translate3d(${mouseOffset.x}px, ${parallaxY + mouseOffset.y}px, 0)`,
            animation: reducedMotion ? "none" : "ken-burns 18s cubic-bezier(0.25, 1, 0.5, 1) forwards",
            willChange: "transform",
          }}
        >
          <picture>
            <source srcSet="/images/hero-bg-1920.webp" media="(min-width: 1280px)" type="image/webp" />
            <source srcSet="/images/hero-bg-1280.webp" media="(min-width: 768px)" type="image/webp" />
            <source srcSet="/images/hero-bg.webp" type="image/webp" />
            <img
              src="/images/hero-bg.jpg"
              alt="Flomynt Hero Architecture"
              className="w-full h-full object-cover object-center sm:object-center"
              style={{
                objectPosition: "center 35%",
              }}
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* Parallax Fade Overlay on Scroll */}
        <div
          className="absolute inset-0 bg-[#050505] transition-opacity duration-150"
          style={{ opacity: scrollFade }}
        />

        {/* Dark Gradient Overlay (subtle top so 3D letters shine -> darker bottom for contrast) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.4) 40%, rgba(5,5,5,0.88) 100%), radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(5,5,5,0.7) 95%)",
          }}
        />

        {/* Warm Amber Light Beam Layer (mix-blend-mode: screen) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[55vw] max-w-[850px] mix-blend-screen opacity-90 overflow-hidden"
          style={{ pointerEvents: "none" }}
        >
          {/* Intense hot core */}
          <div
            className="absolute -right-16 top-[18%] w-[80%] h-[60%] rounded-full opacity-80 blur-[60px]"
            style={{
              background:
                "radial-gradient(ellipse at 95% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(253, 224, 160, 0.45) 30%, rgba(233, 180, 91, 0.25) 60%, transparent 80%)",
            }}
          />
          {/* Ambient amber fan */}
          <div
            className="absolute -right-32 top-[5%] w-[130%] h-[90%] rounded-full opacity-60 blur-[110px]"
            style={{
              background:
                "radial-gradient(ellipse at 85% 50%, rgba(233, 180, 91, 0.5) 0%, rgba(233, 180, 91, 0.18) 45%, transparent 80%)",
            }}
          />
        </div>

        {/* Local Fine Film Grain Overlay (4% opacity) */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* =========================================
          2. CENTER MAIN HERO CONTENT
         ========================================= */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-[1280px] mx-auto text-center my-auto">
        {/* Semantic H1 for SEO & Accessibility */}
        <h1 className="sr-only">
          Flomynt — Autonomous Workflows That Build, Verify, and Heal Themselves
        </h1>

        {/* Space for the full-bleed Image 1 3D Frosted Wordmark */}
        <div className="w-full h-[24vh] min-h-[140px] max-h-[280px] pointer-events-none" />

        {/* =========================================
            3. GLASS COMMAND BAR WITH "JOIN WISHLIST"
           ========================================= */}
        <div className="w-full max-w-[720px] mx-auto mt-6 sm:mt-10 px-2">
          <form
            onSubmit={handleJoinWishlist}
            className={`relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-[18px] p-2 sm:p-2.5 transition-all duration-300 border border-white/[0.16] shadow-2xl ${
              isShimmering ? "shimmer-active" : ""
            }`}
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.72)",
              backdropFilter: "blur(20px) saturate(150%)",
              WebkitBackdropFilter: "blur(20px) saturate(150%)",
              boxShadow:
                "0 16px 50px -10px rgba(0, 0, 0, 0.85), 0 0 30px rgba(233, 180, 91, 0.08)",
            }}
          >
            {/* Inner highlight sheen */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[18px] opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 100%)",
              }}
            />

            {/* Top row on mobile / Left group on desktop: Sparkle + Input + Mic */}
            <div className="flex items-center flex-1 w-full min-w-0 min-h-[46px]">
              {/* Sparkle Icon */}
              <div className="flex items-center pl-2 sm:pl-3 pr-1 sm:pr-2 text-[#e9b45b] flex-shrink-0 z-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="rgba(233, 180, 91, 0.2)" />
                </svg>
              </div>

              {/* Text Input with Rotating Placeholder */}
              <div className="relative flex-1 min-w-0 flex items-center min-h-[46px] px-2 z-10 overflow-hidden">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  aria-label="Workflow request or idea"
                  placeholder=""
                  className="w-full min-w-0 bg-transparent text-white text-xs sm:text-[15px] outline-none pr-1 text-left"
                />

                {!inputValue && (
                  <div className="absolute inset-0 pointer-events-none flex items-center px-2 overflow-hidden text-left">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderIndex}
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -7 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#8a8a8a] text-[11px] sm:text-[14px] truncate"
                      >
                        {PLACEHOLDERS[placeholderIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Mic Icon Button (with pulse animation) */}
              <button
                type="button"
                onClick={handleMicClick}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white/70 hover:text-white transition-all mr-1 z-10 ${
                  micActive
                    ? "bg-[#e9b45b]/20 text-[#e9b45b] ring-2 ring-[#e9b45b] scale-105"
                    : "hover:bg-white/[0.08]"
                }`}
                title="Voice workflow dictation (Jarvis Architect)"
                aria-label="Voice input"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={micActive ? "animate-pulse" : ""}
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </button>
            </div>

            {/* Bottom on mobile / Right on desktop: Full-width pill button on mobile, inline on desktop */}
            <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:pl-2 z-10 box-border">
              <button
                type="submit"
                disabled={isShimmering}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#e9b45b] font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 disabled:opacity-80 min-h-[44px] cursor-pointer box-border"
              >
                <span>{isShimmering ? "BUILDING WORKFLOW..." : "JOIN WISHLIST"}</span>
                <span className="text-xs">↗</span>
              </button>
            </div>
          </form>

          {/* 3 Suggestion Chips Below Command Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 px-1 w-full max-w-[340px] sm:max-w-none mx-auto">
            <span className="font-mono text-[10px] text-white/35 mr-1 hidden sm:inline">
              SUGGESTED:
            </span>
            {SUGGESTION_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleChipClick(chip.text)}
                className="font-mono text-[9.5px] sm:text-[10.5px] tracking-wider text-[#8a8a8a] hover:text-[#e9b45b] px-2 sm:px-2.5 py-1 rounded-full border border-white/[0.1] hover:border-[#e9b45b]/40 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
              >
                [ {chip.label} ]
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================
          4. BOTTOM ROW (Grok Reference Layout)
         ========================================= */}
      <div className="relative z-10 w-full max-w-[1340px] mx-auto pt-8 border-t border-white/[0.12] flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Animated Scroll Cue */}
        <button
          onClick={() => scrollTo("features")}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
          aria-label="Scroll to features"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-7 h-7 rounded-full border border-white/[0.14] flex items-center justify-center group-hover:border-white/40"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
          <span className="mono-label text-[10px] hidden sm:inline">SCROLL</span>
        </button>

        {/* Center: Tagline */}
        <p className="mono-label text-center text-xs max-w-[560px] leading-relaxed text-[#8a8a8a] break-words px-2">
          Autonomous Workflows That Build, Verify, and Heal Themselves.
        </p>

        {/* Right: Only LEARN MORE button (as per revision spec) */}
        <div className="flex items-center">
          <PillButton
            href="#what"
            onClick={() => scrollTo("what")}
          >
            LEARN MORE
          </PillButton>
        </div>
      </div>
    </section>
  );
}
