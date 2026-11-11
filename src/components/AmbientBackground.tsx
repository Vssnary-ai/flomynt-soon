"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [activeTheme, setActiveTheme] = useState<"amber" | "indigo-amber" | "teal" | "indigo">("amber");
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isTabVisible = useRef(true);

  // Detect mobile & prefers-reduced-motion
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    const handleVisibility = () => {
      isTabVisible.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", motionHandler);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Track mouse spotlight on desktop
  useEffect(() => {
    if (isMobile || reducedMotion) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, reducedMotion]);

  // Section observer for scroll-linked color shifts
  useEffect(() => {
    const sectionThemes: Record<string, "amber" | "indigo-amber" | "teal" | "indigo"> = {
      home: "amber",
      features: "indigo-amber",
      what: "teal",
      why: "teal",
      wishlist: "amber",
      contact: "indigo",
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            const theme = sectionThemes[entry.target.id];
            if (theme) {
              setActiveTheme(theme);
            }
          }
        });
      },
      { threshold: [0.25, 0.5] }
    );

    const ids = ["home", "features", "what", "why", "wishlist", "contact"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Stable dust particles list
  const particleCount = isMobile ? 12 : 30;
  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      list.push({
        id: i,
        x: Math.floor((i * 3.37 + 7) % 100),
        y: Math.floor((i * 4.91 + 13) % 100),
        size: (i % 3) + 1.2,
        duration: 4 + (i % 5) * 1.5,
        delay: (i % 7) * 0.4,
        opacity: 0.15 + (i % 4) * 0.1,
      });
    }
    return list;
  }, [particleCount]);

  // Dynamic colors based on active theme
  const blobColors = useMemo(() => {
    switch (activeTheme) {
      case "indigo-amber":
        return {
          primary: "rgba(59, 47, 181, 0.22)",
          secondary: "rgba(233, 180, 91, 0.20)",
          tertiary: "rgba(15, 124, 115, 0.15)",
        };
      case "teal":
        return {
          primary: "rgba(15, 124, 115, 0.25)",
          secondary: "rgba(59, 47, 181, 0.18)",
          tertiary: "rgba(233, 180, 91, 0.14)",
        };
      case "indigo":
        return {
          primary: "rgba(59, 47, 181, 0.28)",
          secondary: "rgba(15, 124, 115, 0.18)",
          tertiary: "rgba(233, 180, 91, 0.16)",
        };
      case "amber":
      default:
        return {
          primary: "rgba(233, 180, 91, 0.24)",
          secondary: "rgba(59, 47, 181, 0.18)",
          tertiary: "rgba(15, 124, 115, 0.14)",
        };
    }
  }, [activeTheme]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Dot Grid Pattern (1px, 6% opacity) masked with radial gradient */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",
        }}
      />

      {/* 2. Three Aurora Glowing Blobs with Slow Drift */}
      {!reducedMotion && (
        <>
          {/* Blob 1: Top-Right (Amber / Main) */}
          <div
            className="absolute -top-[10%] right-[5%] w-[60vw] max-w-[850px] h-[55vw] max-h-[750px] rounded-full blur-[120px] transition-colors duration-1000"
            style={{
              backgroundColor: blobColors.primary,
              animation: "aurora-drift-1 32s ease-in-out infinite",
              willChange: "transform",
            }}
          />

          {/* Blob 2: Mid-Left (Indigo) */}
          <div
            className="absolute top-[35%] -left-[10%] w-[50vw] max-w-[700px] h-[45vw] max-h-[600px] rounded-full blur-[130px] transition-colors duration-1000"
            style={{
              backgroundColor: blobColors.secondary,
              animation: "aurora-drift-2 38s ease-in-out infinite",
              willChange: "transform",
            }}
          />

          {/* Blob 3: Bottom-Center (Teal / Accent) */}
          <div
            className="absolute -bottom-[15%] left-[25%] w-[55vw] max-w-[750px] h-[50vw] max-h-[650px] rounded-full blur-[140px] transition-colors duration-1000"
            style={{
              backgroundColor: blobColors.tertiary,
              animation: "aurora-drift-3 42s ease-in-out infinite",
              willChange: "transform",
            }}
          />
        </>
      )}

      {/* 3. Mouse Spotlight (Desktop only, 500px amber radial glow) */}
      {!isMobile && !reducedMotion && mousePos.x >= 0 && (
        <div
          className="absolute rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            width: "500px",
            height: "500px",
            left: `${mousePos.x - 250}px`,
            top: `${mousePos.y - 250}px`,
            background: "radial-gradient(circle, rgba(233, 180, 91, 0.08) 0%, rgba(233, 180, 91, 0.02) 45%, transparent 70%)",
            willChange: "left, top",
          }}
        />
      )}

      {/* 4. Twinkling Dust Particles */}
      {!reducedMotion && (
        <div className="absolute inset-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-[#e9b45b]"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.x}%`,
                top: `${p.y}%`,
                opacity: p.opacity,
                animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Fine Film Grain Overlay (SVG noise at 3-4% opacity) */}
      <div className="film-grain" />
    </div>
  );
}

