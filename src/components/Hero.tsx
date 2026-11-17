"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from "framer-motion";

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

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** A layer that drifts with the cursor; `depth` controls how far. */
function Layer({
  mx,
  my,
  depth,
  className,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

const NODES = [
  { x: 20, y: 42, w: 110, t: "TRIGGER", l: "Stripe Refund", c: "#8b6bff" },
  { x: 230, y: 42, w: 100, t: "LOGIC", l: "Amount > $100", c: "#4aa3ff" },
  { x: 420, y: 92, w: 120, t: "ACTION", l: "Telegram Alert", c: "#ff7ab8" },
  { x: 225, y: 188, w: 110, t: "SELF-HEAL", l: "Patch verified", c: "#2fd4b0" },
];

function ProductWindow({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const rotateY = useTransform(mx, (v) => v * 0.06);
  const rotateX = useTransform(my, (v) => 14 - v * 0.05);
  const dash = { animation: "b-wire-dash 1.4s linear infinite" } as React.CSSProperties;

  return (
    <div style={{ perspective: 1600 }} className="w-full">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="b-screen mx-auto w-full max-w-[980px] rounded-[22px] sm:rounded-[28px] shadow-[0_60px_120px_-30px_rgba(60,30,200,0.55)]"
      >
        <div className="relative flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-white/[0.08]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto font-mono text-[10px] sm:text-[11px] text-white/45 tracking-wider truncate">
            flomynt.app / workflows / refund-guard
          </div>
          <span className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
          </span>
        </div>

        <div className="relative grid grid-cols-12 min-h-[200px] sm:min-h-[300px]">
          <div className="col-span-12 sm:col-span-8 relative p-4 sm:p-7">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <svg viewBox="0 0 560 250" className="relative w-full h-auto" fill="none">
              <defs>
                <linearGradient id="hero-wire" x1="0" x2="1">
                  <stop offset="0" stopColor="#8b6bff" />
                  <stop offset="0.5" stopColor="#4aa3ff" />
                  <stop offset="1" stopColor="#ff7ab8" />
                </linearGradient>
              </defs>
              <path d="M130 70 L 230 70" stroke="url(#hero-wire)" strokeWidth="2" strokeDasharray="6 6" style={dash} />
              <path d="M330 70 C 380 70, 380 120, 420 120" stroke="url(#hero-wire)" strokeWidth="2" strokeDasharray="6 6" style={dash} />
              <path d="M280 98 L 280 188" stroke="url(#hero-wire)" strokeWidth="2" strokeDasharray="6 6" style={dash} />
              {NODES.map((n) => (
                <g key={n.l}>
                  <rect x={n.x} y={n.y} width={n.w} height="56" rx="14" fill="rgba(255,255,255,0.07)" stroke={n.c} strokeOpacity="0.7" />
                  <text x={n.x + 12} y={n.y + 22} fontSize="8.5" fill={n.c} fontFamily="monospace" letterSpacing="1">
                    {n.t}
                  </text>
                  <text x={n.x + 12} y={n.y + 41} fontSize="11.5" fill="#fff" fontFamily="sans-serif">
                    {n.l}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="hidden sm:flex col-span-4 flex-col gap-3 p-5 border-l border-white/[0.08] bg-white/[0.02]">
            <p className="font-mono text-[10px] tracking-wider text-white/40">SANDBOX CONFIDENCE</p>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-light tracking-tight b-grad-text">98</span>
              <span className="text-white/50 text-sm mb-1.5">/ 100</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#8b6bff] via-[#4aa3ff] to-[#2fd4b0]"
                initial={{ width: 0 }}
                animate={{ width: "98%" }}
                transition={{ duration: 1.8, delay: 1, ease: "easeOut" }}
              />
            </div>
            <div className="mt-2 space-y-2 font-mono text-[10px] text-white/60">
              {["Schema validation passed", "Mock payload executed", "Zero side-effects"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isShimmering, setIsShimmering] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-driven parallax (springs)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 70, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 70, damping: 18, mass: 0.6 });

  // Scroll-driven exit
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 220]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handler);
    return () => motionQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion || window.innerWidth < 1024) return;
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2 * 40);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2 * 40);
    },
    [reducedMotion, rawX, rawY]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleJoinWishlist = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isShimmering) return;
    setIsShimmering(true);
    const ideaText = inputValue.trim() || PLACEHOLDERS[placeholderIndex];
    window.dispatchEvent(new CustomEvent("flomynt:set-wishlist-idea", { detail: { idea: ideaText } }));
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
    inputRef.current?.focus();
  };

  const line1 = ["Autonomous", "Workflows", "That"];
  const line2 = ["Build,", "Verify,", "and", "Heal", "Themselves."];

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden pt-32 sm:pt-36 px-4 sm:px-10 min-h-[100svh]"
    >
      {/* ============ SKY / ENVIRONMENT ============ */}
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-10 -bottom-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #7fb2ff 0%, #a9b9ff 22%, #d3c4ff 48%, #ffd4e6 72%, #fff0e0 90%, #f6f5ff 100%)",
          }}
        />
        <div
          className="absolute left-1/2 -top-[20%] w-[160vw] h-[120%] -translate-x-1/2 opacity-60 mix-blend-soft-light"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(255,255,255,.9) 12deg, transparent 24deg, rgba(255,255,255,.7) 40deg, transparent 56deg, rgba(255,255,255,.9) 72deg, transparent 90deg, rgba(255,255,255,.6) 112deg, transparent 130deg)",
            animation: reducedMotion ? "none" : "b-orbit 120s linear infinite",
            transformOrigin: "50% 0%",
          }}
        />
        <div className="absolute left-1/2 top-[8%] -translate-x-1/2 w-[70vw] max-w-[900px] aspect-square rounded-full bg-white/70 blur-[120px]" />
        <Layer mx={mx} my={my} depth={-0.5} className="absolute inset-0">
          <div className="absolute top-[14%] left-[4%] w-[34vw] h-[10vw] rounded-full bg-white/70 blur-[40px]" />
          <div className="absolute top-[30%] right-[2%] w-[38vw] h-[11vw] rounded-full bg-white/60 blur-[50px]" />
          <div className="absolute top-[62%] left-[10%] w-[40vw] h-[10vw] rounded-full bg-white/60 blur-[50px]" />
        </Layer>
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
          style={{ backgroundImage: GRAIN, backgroundSize: "128px 128px" }}
        />
      </motion.div>

      {/* ============ FLOATING 3D OBJECTS (desktop) ============ */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        <Layer mx={mx} my={my} depth={1.4} className="absolute left-[2.5%] top-[38%]">
          <div className="b-float-a relative w-28 h-28">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 28%, #fff 0%, rgba(255,255,255,.9) 8%, #c9b8ff 30%, #7f5cff 62%, #3a1fb8 100%)",
                boxShadow:
                  "0 40px 70px -20px rgba(80,40,220,.6), inset -14px -18px 36px rgba(30,10,120,.5), inset 10px 10px 30px rgba(255,255,255,.6)",
              }}
            />
            <div
              className="absolute -inset-5 rounded-full border border-white/70"
              style={{ animation: "b-orbit 14s linear infinite" }}
            >
              <span className="absolute top-1/2 -right-1.5 w-3 h-3 rounded-full bg-white shadow-[0_0_14px_6px_rgba(255,255,255,.9)]" />
            </div>
          </div>
        </Layer>

        <Layer mx={mx} my={my} depth={0.9} className="absolute right-[2.5%] top-[40%]">
          <div className="b-float-b b-glass rounded-2xl p-4 w-[230px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex w-2.5 h-2.5">
                <span
                  className="absolute inset-0 rounded-full bg-emerald-400"
                  style={{ animation: "b-pulse-ring 2s ease-out infinite" }}
                />
                <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[#14122b]/60">SELF-HEALING</span>
            </div>
            <p className="text-[13px] font-medium text-[#14122b] leading-snug">
              Step failed → patch drafted, replayed &amp; verified.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-[#14122b] text-white text-[10px] font-mono">APPROVE</span>
              <span className="px-3 py-1 rounded-full bg-white/80 text-[#14122b] text-[10px] font-mono border border-[#14122b]/10">
                REVIEW
              </span>
            </div>
          </div>
        </Layer>

        <Layer mx={mx} my={my} depth={1.8} className="absolute left-[4%] bottom-[22%]">
          <div className="b-float-c b-glass rounded-full pl-2 pr-4 py-2 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4aa3ff] to-[#6d4cff] flex items-center justify-center text-white text-sm">
              ✈
            </span>
            <span className="text-[12px] text-[#14122b] font-medium">Telegram alert sent</span>
          </div>
        </Layer>

        <Layer mx={mx} my={my} depth={1.1} className="absolute right-[4%] bottom-[20%]">
          <div className="b-float-a b-glass rounded-2xl px-4 py-3">
            <p className="font-mono text-[9px] tracking-wider text-[#14122b]/50 mb-1.5">SMART ROUTER</p>
            <div className="flex items-center gap-1.5">
              {["#10a37f", "#d97757", "#4285f4", "#f55036", "#6d4cff"].map((c) => (
                <span key={c} className="w-4 h-4 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}88` }} />
              ))}
            </div>
          </div>
        </Layer>

        <Layer mx={mx} my={my} depth={2.2} className="absolute left-[66%] top-[17%]">
          <div
            className="b-float-c w-10 h-10 rotate-45 rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,.95), rgba(255,160,210,.5))",
              boxShadow: "0 20px 30px -10px rgba(255,80,160,.5), inset 0 0 0 1px rgba(255,255,255,.9)",
            }}
          />
        </Layer>
      </div>

      {/* ============ CONTENT ============ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-[1100px] mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full b-glass mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6d4cff] animate-pulse" />
          <span className="font-mono text-[10.5px] tracking-[0.1em] text-[#14122b]/70">
            PRIVATE BETA · WISHLIST OPEN
          </span>
        </motion.div>

        <h1 className="font-light tracking-[-0.045em] leading-[1.04] text-[#14122b] text-[clamp(34px,5.5vw,86px)]">
          {line1.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.22em]"
            >
              {w}
            </motion.span>
          ))}
          <br className="hidden sm:block" />
          {line2.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.6 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-block mr-[0.12em] ${i === 2 ? "" : "b-grad-text"} ${i > 2 ? "italic font-normal pr-[0.12em]" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-6 mx-auto max-w-[620px] text-[15px] sm:text-lg text-[#2c2950]/75 leading-relaxed"
        >
          The AI-native automation platform built for modern agencies. Describe it in plain English — Flomynt builds it,
          proves it works, and fixes it before your clients notice.
        </motion.p>

        {/* Glass command bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[720px] mx-auto mt-9 px-1"
        >
          <form
            onSubmit={handleJoinWishlist}
            className={`relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-[26px] sm:rounded-full p-2 sm:p-2.5 b-glass transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(109,76,255,0.18),0_30px_70px_-20px_rgba(109,76,255,0.5)] ${
              isShimmering ? "shimmer-active" : ""
            }`}
          >
            <div className="flex items-center flex-1 w-full min-w-0 min-h-[48px]">
              <div className="flex items-center pl-3 pr-1 text-[#6d4cff] flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="rgba(109,76,255,0.2)" />
                </svg>
              </div>

              <div className="relative flex-1 min-w-0 flex items-center min-h-[48px] px-2 overflow-hidden">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  aria-label="Workflow request or idea"
                  placeholder=""
                  className="w-full min-w-0 bg-transparent text-[#14122b] text-sm sm:text-[15px] outline-none pr-1 text-left"
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
                        className="text-[#14122b]/45 text-[12.5px] sm:text-[14.5px] truncate"
                      >
                        {PLACEHOLDERS[placeholderIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleMicClick}
                className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-all mr-1 ${
                  micActive
                    ? "bg-[#6d4cff]/15 text-[#6d4cff] ring-2 ring-[#6d4cff] scale-105"
                    : "text-[#14122b]/60 hover:text-[#6d4cff] hover:bg-white/80"
                }`}
                title="Voice workflow dictation (Jarvis Architect)"
                aria-label="Voice input"
              >
                <svg
                  width="16"
                  height="16"
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

            <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:pl-1">
              <button
                type="submit"
                disabled={isShimmering}
                className="b-btn-primary w-full sm:w-auto min-h-[48px] font-mono text-[11px] sm:text-xs uppercase tracking-wider disabled:opacity-80"
              >
                <span>{isShimmering ? "BUILDING WORKFLOW..." : "JOIN WISHLIST"}</span>
                <span aria-hidden>↗</span>
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="font-mono text-[10px] text-[#14122b]/45 mr-1 hidden sm:inline">SUGGESTED:</span>
            {SUGGESTION_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleChipClick(chip.text)}
                className="font-mono text-[10px] sm:text-[10.5px] tracking-wider text-[#14122b]/70 hover:text-[#6d4cff] px-3 py-1.5 rounded-full bg-white/55 hover:bg-white border border-white/80 hover:-translate-y-0.5 transition-all shadow-sm"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <button onClick={() => scrollTo("what")} className="b-btn-ghost font-mono text-[11px] uppercase tracking-wider">
            LEARN MORE
          </button>
          <button
            onClick={() => scrollTo("features")}
            className="flex items-center gap-2 text-[#14122b]/60 hover:text-[#14122b] transition-colors"
            aria-label="Scroll to features"
          >
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-9 h-9 rounded-full b-glass flex items-center justify-center"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.span>
            <span className="mono-label text-[10px] hidden sm:inline">SCROLL</span>
          </button>
        </motion.div>
      </motion.div>

      {/* ============ PRODUCT WINDOW ============ */}
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-14 sm:mt-20 max-w-[1100px] mx-auto"
      >
        <ProductWindow mx={mx} my={my} />
      </motion.div>

      <p className="sr-only">Autonomous Workflows That Build, Verify, and Heal Themselves.</p>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f6f5ff] pointer-events-none z-[5]" />
    </section>
  );
}
