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

/* ---------- Mouse-parallax layer ---------- */
function Layer({
  mx,
  my,
  depth,
  className,
  style,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ ...style, x, y }} className={className}>
      {children}
    </motion.div>
  );
}

/* =============================================================
   FLOATING PRODUCT CARDS — information-dense, not flat panels
   ============================================================= */

function CardNodeGraph() {
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[300px]">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/60">
          AUTONOMOUS CANVAS
        </span>
        <span className="flex items-center gap-1 font-mono text-[9px] text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
        </span>
      </div>
      <svg viewBox="0 0 260 120" className="w-full h-auto">
        <defs>
          <linearGradient id="hero-wire" x1="0" x2="1">
            <stop offset="0" stopColor="#0b1b3a" />
            <stop offset="1" stopColor="#bff02e" />
          </linearGradient>
        </defs>
        <path d="M74 32 L120 32" stroke="url(#hero-wire)" strokeWidth="1.6" strokeDasharray="4 4" />
        <path d="M170 32 L215 60" stroke="url(#hero-wire)" strokeWidth="1.6" strokeDasharray="4 4" />
        <path d="M145 56 L145 88" stroke="url(#hero-wire)" strokeWidth="1.6" strokeDasharray="4 4" />
        {[
          { x: 10, y: 18, w: 64, l: "Stripe", s: "TRIGGER" },
          { x: 120, y: 18, w: 52, l: "Logic", s: "IF >$100" },
          { x: 215, y: 46, w: 36, l: "TG", s: "SEND" },
          { x: 115, y: 76, w: 62, l: "Heal", s: "VERIFY" },
        ].map((n) => (
          <g key={n.l}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height="26"
              rx="7"
              fill="rgba(11,27,58,0.94)"
              stroke="rgba(11,27,58,0.6)"
            />
            <text x={n.x + n.w / 2} y={n.y + 11} textAnchor="middle" fontSize="6" fill="#bff02e" fontFamily="Geist Mono, monospace" letterSpacing="1">
              {n.s}
            </text>
            <text x={n.x + n.w / 2} y={n.y + 21} textAnchor="middle" fontSize="9.5" fill="#fff" fontFamily="Geist, sans-serif">
              {n.l}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-3 pt-2 border-t border-[#0b1b3a]/10 flex items-center justify-between font-mono text-[9px] text-[#0b1b3a]/60">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Verified · 98/100
        </span>
        <span className="text-[#0b1b3a]">248ms</span>
      </div>
    </div>
  );
}

function CardSelfHeal() {
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[260px]">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/70">
            SELF-HEALING
          </span>
        </div>
        <span className="font-mono text-[8.5px] text-[#0b1b3a]/50">#A42</span>
      </div>
      <p className="text-[12px] font-medium text-[#0b1b3a] leading-snug">
        Step <span className="font-mono text-[11px] bg-[#0b1b3a]/8 px-1 rounded">parse_json</span> failed.
      </p>
      <div className="mt-2 rounded-lg bg-[#0b1b3a] p-2 font-mono text-[9.5px] text-white/85 leading-snug">
        <span className="text-[#ff7a7a]">- </span>JSON.parse(payload)<br />
        <span className="text-[#bff02e]">+ </span>JSON.parse(payload.body)
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className="px-3 py-1.5 rounded-full bg-[#0b1b3a] text-[#bff02e] text-[9.5px] font-mono tracking-wider">
          APPROVE
        </span>
        <span className="px-3 py-1.5 rounded-full bg-white/80 text-[#0b1b3a] text-[9.5px] font-mono tracking-wider border border-[#0b1b3a]/10">
          REVIEW
        </span>
      </div>
    </div>
  );
}

function CardRouter() {
  const providers = [
    { c: "#10a37f", n: "OpenAI", ms: 112 },
    { c: "#d97757", n: "Anthropic", ms: 82, active: true },
    { c: "#4285f4", n: "Gemini", ms: 140 },
    { c: "#f55036", n: "Groq", ms: 58 },
    { c: "#0b1b3a", n: "OR", ms: 200 },
  ];
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[240px]">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/70">
          SMART ROUTER
        </span>
        <span className="font-mono text-[9px] text-emerald-700 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          99.9%
        </span>
      </div>

      {/* Provider rail with latency bars */}
      <div className="space-y-1 mb-2.5">
        {providers.map((p) => (
          <div key={p.n} className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${p.active ? "ring-2 ring-[#bff02e]" : ""}`}
              style={{ background: p.c }}
            />
            <span className="font-mono text-[9px] text-[#0b1b3a]/70 w-[52px] shrink-0">{p.n}</span>
            <span className="flex-1 h-1 rounded-full bg-[#0b1b3a]/10 overflow-hidden">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${Math.min(100, (p.ms / 220) * 100)}%`,
                  background: p.active ? "#bff02e" : p.c,
                }}
              />
            </span>
            <span className="font-mono text-[8.5px] text-[#0b1b3a]/60 w-[28px] text-right">{p.ms}ms</span>
          </div>
        ))}
      </div>

      <p className="pt-2 border-t border-[#0b1b3a]/10 text-[10.5px] text-[#0b1b3a]/80 leading-snug">
        Failed over to <span className="font-medium text-[#0b1b3a]">Anthropic</span> in 82ms.
      </p>
    </div>
  );
}

function CardTelegram() {
  return (
    <div className="glass-pane-strong rounded-2xl pl-2 pr-4 py-2 flex items-center gap-3 shadow-lg w-[250px]">
      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4aa3ff] to-[#0b1b3a] flex items-center justify-center text-white text-base font-medium shrink-0">
        ✈
      </span>
      <div className="text-left flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] tracking-[0.12em] text-[#0b1b3a]/55">
            TELEGRAM · AGENCY_OPS
          </p>
          <p className="font-mono text-[8.5px] text-[#0b1b3a]/40">now</p>
        </div>
        <p className="text-[11.5px] text-[#0b1b3a] font-medium leading-tight truncate">
          Payment failed · retry queued
        </p>
        <p className="font-mono text-[9px] text-emerald-700 mt-0.5">✓ delivered 840ms</p>
      </div>
    </div>
  );
}

function CardVault() {
  const keys = [
    { k: "stripe_sk", t: "LIVE", c: "text-emerald-700" },
    { k: "openai_key", t: "LIVE", c: "text-emerald-700" },
    { k: "sendgrid", t: "ROT 14d", c: "text-amber-700" },
  ];
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[240px]">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/70">
          ZERO-TRUST VAULT
        </span>
        <span className="font-mono text-[8.5px] text-emerald-700 flex items-center gap-1">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.95 6.78L22 10.27l-5 5.1 1.2 7.03L12 18.9l-6.2 3.5L7 15.37l-5-5.1 7.05-1.49L12 2z" /></svg>
          SIGNED
        </span>
      </div>
      <div className="space-y-1.5 font-mono text-[9.5px]">
        {keys.map((k) => (
          <div key={k.k} className="flex items-center justify-between bg-white/60 rounded px-2 py-1.5 border border-white/70">
            <span className="text-[#0b1b3a]/80">{k.k}</span>
            <div className="flex items-center gap-2">
              <span className="text-[#0b1b3a]/35 tracking-widest">••••</span>
              <span className={`text-[8px] ${k.c} font-semibold`}>{k.t}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 pt-2 border-t border-[#0b1b3a]/10 flex items-center justify-between font-mono text-[9px]">
        <span className="text-[#0b1b3a]/50">AES-256 · SHA-256</span>
        <span className="text-[#0b1b3a] font-semibold">0 egress</span>
      </div>
    </div>
  );
}

function CardPortal() {
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[240px]">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/70">
          WHITE-LABEL
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[#bff02e] text-[#0b1b3a] font-mono text-[8.5px] font-semibold">
          LIVE
        </span>
      </div>
      <div className="rounded-xl bg-[#0b1b3a] p-3 relative overflow-hidden">
        <div className="absolute inset-x-0 -top-8 h-16 bg-[#bff02e]/15 blur-2xl" />
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[9px] text-[#bff02e] tracking-wider">
              CLIENT · APEXDASH
            </p>
            <p className="font-mono text-[8px] text-white/50">v2.1</p>
          </div>
          <div className="flex items-end gap-0.5 h-8 mb-2">
            {[40, 65, 50, 80, 70, 95, 60, 85, 72].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: i === 7 ? "#bff02e" : "rgba(191,240,46,0.35)",
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] text-white/70">
            <span>82 flows</span>
            <span>12 clients</span>
            <span className="text-[#bff02e]">+18%</span>
          </div>
        </div>
      </div>
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

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.7 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.7 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(q.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    q.addEventListener("change", h);
    return () => q.removeEventListener("change", h);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion || window.innerWidth < 1024) return;
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2 * 24);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2 * 16);
    },
    [reducedMotion, rawX, rawY]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((p) => (p + 1) % PLACEHOLDERS.length);
    }, 4200);
    return () => clearInterval(id);
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
    window.dispatchEvent(
      new CustomEvent("flomynt:set-wishlist-idea", { detail: { idea: ideaText } })
    );
    setTimeout(() => {
      setIsShimmering(false);
      scrollTo("wishlist");
    }, 1200);
  };

  const handleMicClick = () => {
    setMicActive(true);
    setTimeout(() => setMicActive(false), 1500);
    inputRef.current?.focus();
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden min-h-[100svh] flex flex-col pt-28 sm:pt-32 pb-8 px-4 sm:px-8"
    >
      {/* ============ SKY BACKGROUND ============ */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 will-change-transform"
        >
          <picture>
            <img
              src="/images/hero-sky.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              draggable={false}
              style={{ pointerEvents: "none" }}
            />
          </picture>
        </motion.div>

        <div
          className="absolute inset-x-0 top-0 h-[40%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(5, 60, 140, 0.35) 0%, rgba(5, 60, 140, 0.12) 50%, rgba(5, 60, 140, 0) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[45%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(240, 248, 255, 0.55) 55%, #f2f8ff 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* ============ CENTER CONTENT ============ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto text-center pt-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/22 border border-white/50 backdrop-blur-md mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#bff02e] shadow-[0_0_8px_#bff02e]" />
          <span className="font-mono text-[10px] tracking-[0.14em] text-white/95 font-medium">
            PRIVATE BETA · WISHLIST OPEN
          </span>
        </motion.div>

        {/* HEADLINE */}
        <h1
          className="font-light text-white max-w-[1000px]"
          style={{
            textShadow: "0 4px 40px rgba(6, 36, 100, 0.45)",
            lineHeight: 1.03,
            letterSpacing: "-0.035em",
            fontSize: "clamp(40px, 6.4vw, 92px)",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Build{" "}
            <span className="font-display text-[#d8ff6b]" style={{ fontStyle: "italic" }}>
              Without Limits
            </span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Keep Your{" "}
            <span className="font-display text-[#d8ff6b]" style={{ fontStyle: "italic" }}>
              Data Locked
            </span>
            .
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-7 max-w-[560px] text-[15px] sm:text-[16.5px] text-white/92 leading-relaxed"
          style={{ textShadow: "0 2px 18px rgba(6,36,100,0.35)" }}
        >
          Autonomous workflow infrastructure for modern agencies — resilient by design,
          private by default.
        </motion.p>

        {/* ============ CENTERED GLASS WISHLIST BAR ============ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[640px] mx-auto mt-9"
        >
          <form
            onSubmit={handleJoinWishlist}
            className={`relative flex items-center rounded-full p-2 bg-white/28 backdrop-blur-2xl border border-white/55 shadow-[0_30px_70px_-20px_rgba(6,36,100,0.6),inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-300 focus-within:bg-white/40 focus-within:shadow-[0_0_0_4px_rgba(212,248,90,0.35),0_30px_70px_-20px_rgba(6,36,100,0.65)] ${
              isShimmering ? "shimmer-active" : ""
            }`}
          >
            {/* Glass mic circle on the left */}
            <button
              type="button"
              onClick={handleMicClick}
              aria-label="Voice input"
              title="Dictate a workflow"
              className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                micActive
                  ? "bg-[#bff02e] border-[#bff02e] text-[#0b1b3a] scale-105 ring-2 ring-white"
                  : "bg-white/35 border-white/60 text-[#0b1b3a] hover:bg-white/55"
              }`}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={micActive ? "animate-pulse" : ""}>
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </button>

            {/* Input with rotating placeholder */}
            <div className="relative flex-1 min-w-0 flex items-center min-h-[44px] px-3 overflow-hidden">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                aria-label="Workflow request or idea"
                placeholder=""
                className="w-full min-w-0 bg-transparent text-[#0b1b3a] text-[14.5px] outline-none pr-1 text-left font-medium placeholder:text-[#0b1b3a]/50"
              />
              {!inputValue && (
                <div className="absolute inset-0 pointer-events-none flex items-center px-3 overflow-hidden text-left">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={placeholderIndex}
                      initial={{ opacity: 0, y: 7 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -7 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#0b1b3a]/60 text-[14.5px] truncate"
                    >
                      {PLACEHOLDERS[placeholderIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Join Wishlist button on the right */}
            <button
              type="submit"
              disabled={isShimmering}
              className="group shrink-0 h-11 pl-5 pr-2 rounded-full bg-[#bff02e] hover:bg-[#d4f85a] text-[#0b1b3a] font-mono text-[11px] tracking-[0.12em] uppercase font-semibold flex items-center gap-2.5 transition-all shadow-[0_12px_28px_-8px_rgba(140,200,10,0.65),inset_0_1px_0_rgba(255,255,255,0.6)] disabled:opacity-80"
            >
              <span>{isShimmering ? "Building…" : "Join Wishlist"}</span>
              <span className="w-8 h-8 rounded-full bg-[#0b1b3a] text-[#bff02e] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
          </form>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-7 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-1 text-[#bff02e]">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.95 6.78L22 10.27l-5 5.1 1.2 7.03L12 18.9l-6.2 3.5L7 15.37l-5-5.1 7.05-1.49L12 2z" />
              </svg>
            ))}
          </div>
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-white">
            Rated 4.9 / 5 · 4,900+ early-access agencies
          </p>
        </motion.div>
      </motion.div>

      {/* ============ FLOATING WORKFLOW CARDS (desktop) ============ */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
        <Layer mx={mx} my={my} depth={1.4} className="absolute left-[3%] top-[32%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(-5deg)" }}
          >
            <CardNodeGraph />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={0.9} className="absolute right-[3%] top-[30%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 14, 0] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(6deg)" }}
          >
            <CardSelfHeal />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={1.9} className="absolute left-[7%] bottom-[20%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(-3deg)" }}
          >
            <CardRouter />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={1.1} className="absolute right-[6%] bottom-[20%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(4deg)" }}
          >
            <CardVault />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={2.2} className="absolute left-[18%] top-[16%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(-8deg)" }}
          >
            <CardTelegram />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={1.6} className="absolute right-[17%] top-[15%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(7deg)" }}
          >
            <CardPortal />
          </motion.div>
        </Layer>
      </div>

      {/* Mobile: compact horizontal row of real cards */}
      <div className="lg:hidden relative z-10 mt-10 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="snap-center shrink-0"><CardNodeGraph /></div>
        <div className="snap-center shrink-0"><CardSelfHeal /></div>
        <div className="snap-center shrink-0"><CardRouter /></div>
        <div className="snap-center shrink-0"><CardVault /></div>
        <div className="snap-center shrink-0"><CardPortal /></div>
      </div>

      <p className="sr-only">Build Without Limits. Keep Your Data Locked.</p>
    </section>
  );
}
