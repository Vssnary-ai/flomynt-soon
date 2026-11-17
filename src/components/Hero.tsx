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

/* ---------- Floating product cards that showcase real Flomynt capabilities ---------- */

function CardNodeGraph() {
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/60">
          AUTONOMOUS CANVAS
        </span>
        <span className="flex items-center gap-1 font-mono text-[9px] text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
        </span>
      </div>
      <svg viewBox="0 0 240 110" className="w-full h-auto">
        <defs>
          <linearGradient id="hero-wire" x1="0" x2="1">
            <stop offset="0" stopColor="#0b1b3a" />
            <stop offset="1" stopColor="#bff02e" />
          </linearGradient>
        </defs>
        <path d="M70 30 L115 30" stroke="url(#hero-wire)" strokeWidth="1.6" strokeDasharray="4 4" />
        <path d="M165 30 L205 55" stroke="url(#hero-wire)" strokeWidth="1.6" strokeDasharray="4 4" />
        <path d="M140 54 L140 82" stroke="url(#hero-wire)" strokeWidth="1.6" strokeDasharray="4 4" />
        {[
          { x: 10, y: 15, w: 60, l: "Stripe" },
          { x: 115, y: 15, w: 50, l: "Logic" },
          { x: 205, y: 42, w: 32, l: "TG" },
          { x: 110, y: 70, w: 60, l: "Heal" },
        ].map((n) => (
          <g key={n.l}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height="24"
              rx="7"
              fill="rgba(11,27,58,0.92)"
              stroke="rgba(11,27,58,0.6)"
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + 16}
              textAnchor="middle"
              fontSize="9.5"
              fill="#bff02e"
              fontFamily="Geist Mono, monospace"
            >
              {n.l}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-[#0b1b3a]/60">
        <span>Verified · 98/100</span>
        <span className="text-[#0b1b3a]">↗</span>
      </div>
    </div>
  );
}

function CardSelfHeal() {
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[240px]">
      <div className="flex items-center gap-2 mb-2">
        <span className="relative flex w-2.5 h-2.5">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
          <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/70">
          SELF-HEALING
        </span>
      </div>
      <p className="text-[12.5px] font-medium text-[#0b1b3a] leading-snug">
        Step failed — patch drafted &amp; verified against real input.
      </p>
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
    { c: "#10a37f", n: "OpenAI" },
    { c: "#d97757", n: "Anthropic" },
    { c: "#4285f4", n: "Gemini" },
    { c: "#f55036", n: "Groq" },
    { c: "#0b1b3a", n: "OpenRouter" },
  ];
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[220px]">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/70">
          SMART ROUTER
        </span>
        <span className="font-mono text-[9px] text-[#0b1b3a]/50">99.9%</span>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        {providers.map((p) => (
          <span
            key={p.n}
            className="w-6 h-6 rounded-full border border-white/70"
            style={{ background: p.c, boxShadow: `0 4px 10px -2px ${p.c}66` }}
          />
        ))}
      </div>
      <p className="text-[11.5px] text-[#0b1b3a]/80 leading-snug">
        Failed over to <span className="font-medium text-[#0b1b3a]">Anthropic</span> in 82ms.
      </p>
    </div>
  );
}

function CardTelegram() {
  return (
    <div className="glass-pane-strong rounded-full pl-2 pr-5 py-2 flex items-center gap-3 shadow-lg">
      <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4aa3ff] to-[#0b1b3a] flex items-center justify-center text-white text-sm font-medium">
        ✈
      </span>
      <div className="text-left">
        <p className="font-mono text-[9px] tracking-[0.12em] text-[#0b1b3a]/55">
          TELEGRAM
        </p>
        <p className="text-[12px] text-[#0b1b3a] font-medium leading-tight">
          Alert delivered · 840ms
        </p>
      </div>
    </div>
  );
}

function CardVault() {
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[220px]">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/70">
          ZERO-TRUST VAULT
        </span>
        <span className="font-mono text-[9px] text-emerald-700">SIGNED</span>
      </div>
      <div className="space-y-1.5 font-mono text-[10px] text-[#0b1b3a]/70">
        <div className="flex items-center justify-between bg-white/60 rounded px-2 py-1">
          <span>stripe_sk</span>
          <span className="text-[#0b1b3a]/40">••••••</span>
        </div>
        <div className="flex items-center justify-between bg-white/60 rounded px-2 py-1">
          <span>openai_key</span>
          <span className="text-[#0b1b3a]/40">••••••</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-[#0b1b3a]/10 flex items-center justify-between font-mono text-[9px]">
        <span className="text-[#0b1b3a]/50">AES-256</span>
        <span className="text-[#0b1b3a]">0 egress</span>
      </div>
    </div>
  );
}

function CardPortal() {
  return (
    <div className="glass-pane-strong rounded-2xl p-4 w-[220px]">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#0b1b3a]/70">
          WHITE-LABEL
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[#bff02e] text-[#0b1b3a] font-mono text-[8.5px] font-semibold">
          LIVE
        </span>
      </div>
      <div className="rounded-xl bg-[#0b1b3a] p-3">
        <p className="font-mono text-[9px] text-[#bff02e] tracking-wider mb-1.5">
          CLIENT · APEXDASH
        </p>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#bff02e] to-white" />
        </div>
        <p className="mt-2 text-[10px] text-white/70 font-mono">82 flows · 12 clients</p>
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

  // Cursor-driven parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.7 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.7 });

  // Scroll-driven exit
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
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden min-h-[100svh] flex flex-col pt-28 sm:pt-32 pb-8 px-4 sm:px-8"
    >
      {/* ============================================================
          SKY BACKGROUND — the user-provided photograph
         ============================================================ */}
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

        {/* subtle depth wash at the top for nav legibility */}
        <div
          className="absolute inset-x-0 top-0 h-[40%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(5, 60, 140, 0.35) 0%, rgba(5, 60, 140, 0.12) 50%, rgba(5, 60, 140, 0) 100%)",
          }}
        />
        {/* soft white vignette at the bottom to meet the next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-[45%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(240, 248, 255, 0.55) 55%, #f2f8ff 100%)",
          }}
        />
        {/* faint grain for photographic feel */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* ============================================================
          CENTER COLUMN
         ============================================================ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto text-center pt-4"
      >
        {/* Status chip */}
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

        {/* ============ HEADLINE ============ */}
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

        {/* Supporting line */}
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

        {/* ============ CTAs ============ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <button
            onClick={() => scrollTo("features")}
            className="min-h-[48px] px-6 rounded-full bg-white/18 hover:bg-white/35 backdrop-blur-md text-white border border-white/55 font-mono text-[11px] tracking-[0.14em] uppercase transition-all"
          >
            View Demo
          </button>
          <button
            onClick={() => handleJoinWishlist()}
            disabled={isShimmering}
            className="group min-h-[48px] pl-6 pr-2 rounded-full bg-[#bff02e] hover:bg-[#d4f85a] text-[#0b1b3a] font-mono text-[11px] tracking-[0.14em] uppercase font-semibold flex items-center gap-3 transition-all shadow-[0_18px_40px_-12px_rgba(140,200,10,0.65),inset_0_1px_0_rgba(255,255,255,0.6)] disabled:opacity-80"
          >
            <span>{isShimmering ? "Building…" : "Get Started"}</span>
            <span className="w-9 h-9 rounded-full bg-[#0b1b3a] text-[#bff02e] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* Hidden command-bar surface so the wishlist pre-fill still works */}
        <form onSubmit={handleJoinWishlist} className="sr-only">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Workflow idea"
          />
          <button type="submit">submit</button>
        </form>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-1 text-[#bff02e]">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.95 6.78L22 10.27l-5 5.1 1.2 7.03L12 18.9l-6.2 3.5L7 15.37l-5-5.1 7.05-1.49L12 2z" />
              </svg>
            ))}
          </div>
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-white/92">
            Rated 4.9 / 5 · 4,900+ early-access agencies
          </p>
        </motion.div>

        {/* Rotating placeholder preview — small, below rating */}
        <motion.button
          onClick={handleMicClick}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/30 border border-white/40 backdrop-blur-md transition-all"
          aria-label="Voice-dictate a workflow idea"
        >
          <span className={`w-2 h-2 rounded-full ${micActive ? "bg-[#bff02e]" : "bg-white/90"}`} />
          <span className="font-mono text-[10px] tracking-[0.1em] text-white/85">TRY:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={placeholderIndex}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.3 }}
              className="text-[12px] text-white/95 max-w-[260px] truncate"
            >
              “{PLACEHOLDERS[placeholderIndex]}”
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* ============================================================
          FLOATING WORKFLOW CARDS (desktop — fan arrangement)
         ============================================================ */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none z-[2]"
        aria-hidden="true"
      >
        <Layer mx={mx} my={my} depth={1.4} className="absolute left-[4%] top-[32%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(-5deg)" }}
          >
            <CardNodeGraph />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={0.9} className="absolute right-[4%] top-[30%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 14, 0] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(6deg)" }}
          >
            <CardSelfHeal />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={1.9} className="absolute left-[9%] bottom-[24%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(-3deg)" }}
          >
            <CardRouter />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={1.1} className="absolute right-[7%] bottom-[22%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(4deg)" }}
          >
            <CardVault />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={2.2} className="absolute left-[18%] top-[18%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(-8deg)" }}
          >
            <CardTelegram />
          </motion.div>
        </Layer>

        <Layer mx={mx} my={my} depth={1.6} className="absolute right-[18%] top-[16%]">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "rotate(7deg)" }}
          >
            <CardPortal />
          </motion.div>
        </Layer>
      </div>

      {/* Mobile: compact row of three real cards below the CTAs */}
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
