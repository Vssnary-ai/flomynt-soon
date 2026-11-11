"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PillButton from "./PillButton";

const PLACEHOLDERS = [
  "What do you want to automate?",
  "Describe your workflow in plain English...",
  "Build a multi-agent lead research pipeline...",
  "Turn any idea into a self-healing automation...",
];

export default function Hero() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#050505] pt-20 pb-8 px-4 sm:px-10"
    >
      {/* Amber Light Beam from Right Edge (Matching Grok reference) */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-[55vw] max-w-[850px] z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Layer 1: Wide warm amber wash */}
        <div
          className="absolute -right-24 top-[10%] w-[120%] h-[80%] rounded-full opacity-60 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse at 85% 50%, rgba(233, 180, 91, 0.45) 0%, rgba(233, 180, 91, 0.15) 45%, rgba(5, 5, 5, 0) 80%)",
          }}
        />

        {/* Layer 2: White-hot intense core at edge */}
        <div
          className="absolute -right-16 top-[22%] w-[70%] h-[55%] rounded-full opacity-75 blur-[55px]"
          style={{
            background:
              "radial-gradient(ellipse at 95% 50%, rgba(255, 255, 255, 0.7) 0%, rgba(253, 224, 160, 0.4) 30%, rgba(233, 180, 91, 0.15) 60%, transparent 80%)",
          }}
        />

        {/* Layer 3: Sharp luminous ray slice */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full opacity-40 blur-[40px]"
          style={{
            background:
              "conic-gradient(from 240deg at 100% 45%, rgba(255, 255, 255, 0.6) 0deg, rgba(233, 180, 91, 0.3) 25deg, transparent 65deg)",
          }}
        />
      </div>

      {/* Floating Ambient Golden Dust Particles */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#e9b45b]"
            style={{
              width: (i % 3) + 1.5 + "px",
              height: (i % 3) + 1.5 + "px",
              left: `${55 + (i * 2.8)}%`,
              top: `${15 + (i * 4.5)}%`,
              opacity: 0.15 + (i % 5) * 0.08,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 5 + (i % 4) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Center Main Hero Content: Wordmark & Input Box */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-[1280px] mx-auto text-center my-auto">
        {/* Giant Ghosted Wordmark */}
        <div className="relative select-none w-full flex justify-center items-center py-4 sm:py-8">
          <h1
            className="font-light tracking-[-0.04em] leading-[0.85] text-transparent"
            style={{
              fontSize: "clamp(42px, 17vw, 320px)",
              backgroundImage:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.18) 40%, rgba(255, 255, 255, 0.6) 75%, rgba(255, 255, 255, 0.95) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)",
              filter: "drop-shadow(0 0 45px rgba(233, 180, 91, 0.12))",
            }}
          >
            Flomynt
          </h1>
        </div>

        {/* Hairline Rounded Input Box (Grok reference style) */}
        <div className="w-full max-w-[620px] mx-auto mt-6 sm:mt-10">
          <div
            className="relative flex items-center bg-[#0a0a0a] border border-white/[0.14] rounded-[16px] px-5 py-3.5 shadow-2xl transition-all focus-within:border-white/30 focus-within:bg-[#0c0c0c]"
            style={{
              boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(233, 180, 91, 0.04)",
            }}
          >
            {/* Input & Rotating Placeholder */}
            <div className="relative flex-1 text-left flex items-center min-h-[30px]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                aria-label="Workflow request"
                className="w-full bg-transparent text-white text-sm sm:text-base outline-none pr-3 placeholder-transparent z-10"
              />

              {!inputValue && (
                <div className="absolute inset-0 pointer-events-none flex items-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={placeholderIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#8a8a8a] text-sm sm:text-base truncate"
                    >
                      {PLACEHOLDERS[placeholderIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Circular Send Arrow Button */}
            <button
              type="button"
              onClick={() => scrollTo("wishlist")}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white hover:text-black text-white/80 transition-all flex items-center justify-center z-10"
              aria-label="Submit workflow request"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row (Grok reference layout) */}
      <div className="relative z-10 w-full max-w-[1340px] mx-auto pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
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
        <p className="mono-label text-center text-xs max-w-[560px] leading-relaxed text-[#8a8a8a]">
          Autonomous Workflows That Build, Verify, and Heal Themselves.
        </p>

        {/* Right: Pill Action Buttons */}
        <div className="flex items-center gap-3">
          <PillButton
            href="#wishlist"
            onClick={() => scrollTo("wishlist")}
          >
            BUILD WITH FLOMYNT
          </PillButton>
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
