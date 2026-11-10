"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { slides, AUTOPLAY_MS } from "@/config/slides";
import Logo from "./Logo";
import SlideText from "./SlideText";

/**
 * CSS/SVG fallback gradient that matches the reference screenshot:
 * white streaks at top -> cyan/teal -> deep navy at bottom.
 */
function FallbackArt() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fallbackBg" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#e8f4f8" />
            <stop offset="25%" stopColor="#a8e0ec" />
            <stop offset="50%" stopColor="#19C3E6" />
            <stop offset="75%" stopColor="#0a5e80" />
            <stop offset="100%" stopColor="#020814" />
          </linearGradient>
          {/* Vertical streaks */}
          <filter id="streaks">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.15 0.001"
              numOctaves="5"
              seed="3"
            />
            <feColorMatrix
              type="saturate"
              values="0"
            />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.7" intercept="0" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="soft-light" />
          </filter>
        </defs>
        <rect width="400" height="500" fill="url(#fallbackBg)" />
        <rect
          width="400"
          height="500"
          fill="url(#fallbackBg)"
          filter="url(#streaks)"
        />
      </svg>
      {/* Extra overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 60%, rgba(2,8,20,0.6) 100%)",
        }}
      />
    </div>
  );
}

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check prefers-reduced-motion
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  // Autoplay + progress bar
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    const progressTick = 50; // update every 50ms
    progressRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + progressTick / AUTOPLAY_MS, 1));
    }, progressTick);

    intervalRef.current = setInterval(() => {
      next();
    }, AUTOPLAY_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, current, next]);

  // Pause on tab hidden
  useEffect(() => {
    const handler = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  }, []);

  const slide = slides[current];
  const showFallback = imageErrors[current];

  const imageVariants = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.4 } },
        exit: { opacity: 0, transition: { duration: 0.3 } },
      }
    : {
        initial: { opacity: 0, scale: 1.04 },
        animate: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.4, ease: [0.55, 0.06, 0.68, 0.19] },
        },
      };

  return (
    <div
      className="relative w-full rounded-[28px] overflow-hidden border border-white/[0.08]"
      style={{
        aspectRatio: "4 / 5",
        boxShadow: "0 0 80px 8px rgba(25, 195, 230, 0.06), 0 0 40px 4px rgba(255, 255, 255, 0.02)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Feature showcase"
    >
      {/* Background images / fallback */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ willChange: "transform, opacity" }}
        >
          {showFallback ? (
            <FallbackArt />
          ) : (
            <>
              <FallbackArt />
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}: ${slide.tag}`}
                fill
                className="object-cover"
                priority={current === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => handleImageError(current)}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Top-left logo */}
      <div className="absolute top-5 left-5 z-20">
        <Logo />
      </div>

      {/* Progress bars (Instagram-stories style) */}
      <div
        className="absolute top-4 left-4 right-4 z-20 flex gap-1.5"
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="relative h-[3px] flex-1 rounded-full overflow-hidden bg-white/[0.15] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19C3E6]/60"
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}: ${s.tag}`}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/80 transition-none"
              style={{
                width:
                  i < current
                    ? "100%"
                    : i === current
                    ? `${progress * 100}%`
                    : "0%",
                transition: i === current ? "none" : "width 0.3s ease",
              }}
            />
          </button>
        ))}
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, rgba(2,8,20,0.95) 0%, rgba(2,8,20,0.7) 50%, transparent 100%)",
        }}
      />

      {/* Text block */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pb-8 lg:p-8 lg:pb-10">
        <SlideText
          tag={slide.tag}
          headline={slide.headline}
          subtext={slide.subtext}
          slideKey={current}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Preload all images (hidden) */}
      {slides.map((s, i) =>
        i !== 0 && !imageErrors[i] ? (
          <Image
            key={`preload-${s.id}`}
            src={s.image}
            alt=""
            fill
            className="opacity-0 pointer-events-none absolute"
            aria-hidden="true"
            sizes="1px"
            onError={() => handleImageError(i)}
          />
        ) : null
      )}
    </div>
  );
}
