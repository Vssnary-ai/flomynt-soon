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

/* Line icons (24px grid, 1.6 stroke) */
const ICONS: Record<string, string> = {
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
  heal: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  route: "M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9",
  flask: "M10 2v7.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V2 M8.5 2h7 M7 16h10",
  lock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",
  window: "M3 4h18v16H3z M3 9h18 M9 9v11",
  store: "M3 9l1-5h16l1 5 M3 9v11h18V9 M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 M9 20v-6h6v6",
};

const FEATURE_CARDS = [
  { id: "talktobuild", icon: "mic", title: "Talk-to-Build", meta: "10x build speed" },
  { id: "selfhealing", icon: "heal", title: "Self-Healing", meta: "1-click approval" },
  { id: "routing", icon: "route", title: "Smart Routing", meta: "5 AI providers" },
  { id: "verification", icon: "flask", title: "Sandbox", meta: "Confidence score" },
  { id: "privacy", icon: "lock", title: "Zero-Trust", meta: "AES-256 vault" },
  { id: "whitelabel", icon: "window", title: "White-Label", meta: "Client portals" },
  { id: "marketplace", icon: "store", title: "Marketplace", meta: "Keys stripped" },
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

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

/** A puffy cloud made from overlapping soft ellipses. */
function Cloud({ className, scale = 1, opacity = 1 }: { className?: string; scale?: number; opacity?: number }) {
  const puffs = [
    [0, 30, 46, 70], [18, 6, 44, 80], [38, 0, 50, 90], [60, 10, 46, 80], [78, 28, 40, 66], [30, 34, 62, 62],
  ];
  return (
    <div className={className} style={{ opacity, transform: `scale(${scale})` }} aria-hidden="true">
      <div className="relative w-[34vw] min-w-[260px] max-w-[560px] aspect-[2.4/1]">
        {puffs.map(([l, t, w, h], i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${l}%`,
              top: `${t}%`,
              width: `${w}%`,
              height: `${h}%`,
              background: "radial-gradient(closest-side, rgba(255,255,255,0.98) 30%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0) 100%)",
              filter: "blur(5px)",
            }}
          />
        ))}
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

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);

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
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2 * 30);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2 * 20);
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

  const goToFeature = (id: string) => {
    const el = document.getElementById(`bento-${id}`) || document.getElementById("features");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const line1 = ["Autonomous", "Workflows", "That"];
  const line2 = ["Build,", "Verify,", "and", "Heal", "Themselves."];
  const mid = FEATURE_CARDS.length / 2 - 0.5;

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden min-h-[100svh] flex flex-col pt-28 sm:pt-32 pb-10 px-4 sm:px-8"
    >
      {/* ============ SKY ============ */}
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-10 -bottom-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0d5bd6 0%, #1f78ea 22%, #4a9df2 45%, #8cc4f8 68%, #cde5fb 86%, #f2f8ff 100%)",
          }}
        />
        <div className="absolute left-1/2 top-[-10%] -translate-x-1/2 w-[90vw] max-w-[1200px] aspect-[2/1] rounded-full bg-[#7fd0ff]/40 blur-[110px]" />

        <Layer mx={mx} my={my} depth={-0.6} className="absolute inset-0">
          <Cloud className="absolute top-[40%] -left-[6%]" opacity={0.85} />
          <Cloud className="absolute top-[34%] -right-[8%]" scale={1.15} opacity={0.9} />
        </Layer>
        <Layer mx={mx} my={my} depth={-1.4} className="absolute inset-0">
          <Cloud className="absolute top-[58%] left-[18%]" scale={1.3} />
          <Cloud className="absolute top-[62%] right-[14%]" scale={1.1} />
          <Cloud className="absolute top-[70%] -left-[10%]" scale={1.5} />
        </Layer>
        <Layer mx={mx} my={my} depth={-2.4} className="absolute inset-x-0 bottom-0">
          <div className="absolute -bottom-10 left-[-10%] right-[-10%] h-[34%]" style={{ background: "radial-gradient(ellipse at 50% 100%, #fff 35%, rgba(255,255,255,0) 72%)", filter: "blur(10px)" }} />
        </Layer>
      </motion.div>

      {/* ============ CENTER CONTENT ============ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/40 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f43a] shadow-[0_0_8px_#c8f43a]" />
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-white">PRIVATE BETA · WISHLIST OPEN</span>
        </motion.div>

        <h1
          className="font-light tracking-[-0.04em] leading-[1.06] text-white text-[clamp(30px,4.3vw,66px)] max-w-[1120px]"
          style={{ textShadow: "0 4px 40px rgba(8,50,140,0.35)" }}
        >
          {line1.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.2em]"
            >
              {w}
            </motion.span>
          ))}
          {line2.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-block mr-[0.2em] ${i === 2 ? "" : "text-[#d4f85a]"}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        {/* Centered glass wishlist box */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[700px] mx-auto mt-9"
        >
          <form
            onSubmit={handleJoinWishlist}
            className={`relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-[26px] sm:rounded-full p-2 sm:p-2.5 bg-white/25 backdrop-blur-2xl border border-white/60 shadow-[0_30px_70px_-20px_rgba(8,50,140,0.55),inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-300 focus-within:bg-white/45 focus-within:shadow-[0_0_0_4px_rgba(212,248,90,0.35),0_30px_70px_-20px_rgba(8,50,140,0.6)] ${
              isShimmering ? "shimmer-active" : ""
            }`}
          >
            <div className="flex items-center flex-1 w-full min-w-0 min-h-[48px]">
              <div className="flex items-center pl-3 pr-1 text-[#0b1b3a] flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="rgba(11,27,58,0.12)" />
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
                  className="w-full min-w-0 bg-transparent text-[#0b1b3a] text-sm sm:text-[15px] outline-none pr-1 text-left"
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
                        className="text-[#0b1b3a]/60 text-[12.5px] sm:text-[14.5px] truncate"
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
                    ? "bg-[#c8f43a] text-[#0b1b3a] ring-2 ring-white scale-105"
                    : "text-[#0b1b3a]/70 hover:text-[#0b1b3a] hover:bg-white/60"
                }`}
                title="Voice workflow dictation (Jarvis Architect)"
                aria-label="Voice input"
              >
                <span className={micActive ? "animate-pulse" : ""}>
                  <Icon name="mic" size={17} />
                </span>
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

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {SUGGESTION_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleChipClick(chip.text)}
                className="font-mono text-[10px] sm:text-[10.5px] tracking-wider text-[#0b1b3a] px-3 py-1.5 rounded-full bg-white/45 hover:bg-white/80 border border-white/70 backdrop-blur-md hover:-translate-y-0.5 transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ============ GLASS FEATURE FAN ============ */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[1240px] mx-auto mt-10"
      >
        <Layer mx={mx} my={my} depth={0.6}>
          <ul
            className="flex gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:justify-center py-6 px-1 -mx-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ perspective: 1400 }}
          >
            {FEATURE_CARDS.map((c, i) => {
              const off = i - mid;
              return (
                <li
                  key={c.id}
                  className="snap-center shrink-0 lg:shrink"
                  style={{ transform: `rotateY(${off * -5}deg) translateY(${Math.abs(off) * 10}px)` }}
                >
                  <button
                    onClick={() => goToFeature(c.id)}
                    className="group w-[148px] sm:w-[158px] lg:w-[148px] xl:w-[160px] text-left rounded-[22px] p-4 bg-white/30 hover:bg-white/55 backdrop-blur-2xl border border-white/70 shadow-[0_20px_40px_-18px_rgba(8,50,140,0.45),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:-translate-y-2"
                    aria-label={`View ${c.title}`}
                  >
                    <span className="flex items-center justify-between mb-5">
                      <span className="w-10 h-10 rounded-xl bg-[#0b1b3a] text-[#d4f85a] flex items-center justify-center shadow-[0_8px_18px_-6px_rgba(11,27,58,0.6)] group-hover:bg-[#c8f43a] group-hover:text-[#0b1b3a] transition-colors">
                        <Icon name={c.icon} size={19} />
                      </span>
                      <span className="font-mono text-[10px] text-[#0b1b3a]/50">0{i + 1}</span>
                    </span>
                    <span className="block text-[14px] font-medium text-[#0b1b3a] leading-tight">{c.title}</span>
                    <span className="block mt-1 font-mono text-[10px] text-[#0b1b3a]/60 tracking-wide">{c.meta}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Layer>
      </motion.div>

      <p className="sr-only">Autonomous Workflows That Build, Verify, and Heal Themselves.</p>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#f2f8ff] pointer-events-none z-[5]" />
    </section>
  );
}
