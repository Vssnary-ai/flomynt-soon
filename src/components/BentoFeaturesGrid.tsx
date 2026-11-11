"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SectionLabel from "./SectionLabel";
import TalkToBuildDemo from "./demos/TalkToBuildDemo";
import SelfHealingDemo from "./demos/SelfHealingDemo";
import SmartRoutingDemo from "./demos/SmartRoutingDemo";
import SandboxDemo from "./demos/SandboxDemo";
import ZeroTrustDemo from "./demos/ZeroTrustDemo";
import WhiteLabelDemo from "./demos/WhiteLabelDemo";
import MarketplaceDemo from "./demos/MarketplaceDemo";

interface BentoCardProps {
  id: string;
  tag: string;
  title: string;
  description: string;
  chapterId: string;
  colSpanDesktop: string;
  colSpanTablet?: string;
  demoComponent: React.ReactNode;
  stepNumber: string;
  isPowered?: boolean;
}

function BentoCard({
  id,
  tag,
  title,
  description,
  chapterId,
  colSpanDesktop,
  demoComponent,
  stepNumber,
  isPowered = true,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToChapter = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      const whatEl = document.getElementById("what");
      if (whatEl) whatEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={cardRef}
      id={`bento-${id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-8 ${colSpanDesktop} ${
        isHovered
          ? "border-[#e9b45b]/50 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(233,180,91,0.18)] -translate-y-1"
          : "border-white/[0.12] bg-[#0c0c0e]/80 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      }`}
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(233, 180, 91, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Top Specular Inner Hairline Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Card Content Top: Step Badge & Tag */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#e9b45b] font-medium">
              {stepNumber}
            </span>
            <span className="font-mono text-[11px] text-[#e9b45b] tracking-wider uppercase">
              [ {tag} ]
            </span>
          </div>
          {/* Wire connection node indicator */}
          <div className="w-2.5 h-2.5 rounded-full border border-[#e9b45b]/50 bg-[#e9b45b]/20 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#e9b45b] animate-ping" />
          </div>
        </div>

        <h3 className="font-normal text-xl sm:text-2xl text-white tracking-[-0.02em] leading-snug mb-2">
          {title}
        </h3>
        <p className="text-[#a8a8a8] text-sm sm:text-[15px] leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Card Interactive Live Mini-Demo */}
      <div className="relative z-10 my-4 flex-1 min-h-[170px] sm:min-h-[190px]">
        {demoComponent}
      </div>

      {/* Card Footer: 44px Min Height Action Pill Button */}
      <div className="relative z-10 pt-4 mt-2 border-t border-white/[0.06] flex items-center justify-between">
        <button
          onClick={() => scrollToChapter(chapterId)}
          aria-label={`Explore details for ${title}`}
          className="min-h-[44px] px-4 py-2 rounded-full border border-white/[0.14] hover:border-[#e9b45b] bg-white/[0.03] hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 group/btn cursor-pointer"
        >
          <span>SEE HOW IT WORKS</span>
          <span className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
            ↗
          </span>
        </button>

        <span className="font-mono text-[11px] text-white/30 hidden sm:inline-block">
          Autonomous Node
        </span>
      </div>
    </div>
  );
}

export default function BentoFeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePulseIndex, setActivePulseIndex] = useState(0);

  // Scroll driven animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Wire cycle pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePulseIndex((prev) => (prev + 1) % 7);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative w-full bg-[#050505] py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-white/[0.12] overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] rounded-full bg-[#e9b45b]/[0.03] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-[#e9b45b]/[0.02] blur-[140px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto relative">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel text="FEATURES" />
          <h2 className="mt-4 font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em] leading-[1.1] max-w-[920px]">
            Autonomous systems built for modern agencies.
          </h2>
          <p className="mt-4 text-[#a8a8a8] text-base sm:text-lg max-w-[680px] leading-relaxed">
            Turn plain English into resilient workflows, white-label them into client apps, and let autonomous agents fix runtime errors before your clients even notice.
          </p>

          {/* Lifecycle sequence ribbon */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-white/50">
            <span className="text-[#e9b45b] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#e9b45b] animate-pulse" />
              The Flomynt Wire:
            </span>
            <span className="text-white/80">Talk-to-Build</span>
            <span>→</span>
            <span className="text-white/80">Sandbox</span>
            <span>→</span>
            <span className="text-white/80">Routing</span>
            <span>→</span>
            <span className="text-white/80">Self-Healing</span>
            <span>→</span>
            <span className="text-white/80">White-Label</span>
            <span>→</span>
            <span className="text-white/80">Zero-Trust</span>
            <span>→</span>
            <span className="text-white/80">Marketplace</span>
          </div>
        </div>

        {/* Bento Grid Container */}
        <div className="relative">
          {/* Mobile Glowing Left Spine */}
          <div className="lg:hidden absolute left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#e9b45b] via-white/20 to-[#e9b45b]/40 pointer-events-none shadow-[0_0_8px_#e9b45b]" />

          {/* 12-Column Responsive Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 pl-5 lg:pl-0">
            {/* 1. Live Agentic Talk-to-Build (7 cols desktop) */}
            <BentoCard
              id="talktobuild"
              tag="VOICE AI"
              title="Live Agentic Talk-to-Build"
              description="Dictate by voice or type your requirements to a Jarvis-style AI architect that builds and refines workflows on a visual canvas. It proactively suggests better logic and guides you in real time."
              chapterId="chapter-talktobuild"
              colSpanDesktop="lg:col-span-7"
              stepNumber="01"
              isPowered={activePulseIndex === 0}
              demoComponent={<TalkToBuildDemo isPowered={activePulseIndex === 0} />}
            />

            {/* 2. 1-Click Self-Healing Engine (5 cols desktop, taller) */}
            <BentoCard
              id="selfhealing"
              tag="RESILIENCE"
              title="1-Click Self-Healing Engine"
              description="Get instant mobile alerts on Telegram the moment a workflow step breaks. Tap 'Auto-Handle' and our AI drafts a fix, replays it against the real failed input to prove it works, and waits for your 1-click approval—or tells you the exact external setting to update."
              chapterId="chapter-selfhealing"
              colSpanDesktop="lg:col-span-5"
              stepNumber="02"
              isPowered={activePulseIndex === 1}
              demoComponent={<SelfHealingDemo isPowered={activePulseIndex === 1} />}
            />

            {/* 3. Unlimited Scale & Smart AI Routing (4 cols desktop) */}
            <BentoCard
              id="routing"
              tag="FAILOVER"
              title="Unlimited Scale & Smart AI Routing"
              description="Build unlimited workflows without burning your budget. Our engine automatically routes tasks between cheap and accurate tiers across 5 AI providers (OpenAI, Anthropic, Gemini, Groq, and OpenRouter) with instant failover."
              chapterId="chapter-routing"
              colSpanDesktop="lg:col-span-4"
              stepNumber="03"
              isPowered={activePulseIndex === 2}
              demoComponent={<SmartRoutingDemo isPowered={activePulseIndex === 2} />}
            />

            {/* 4. Pre-Flight Sandbox Verification (4 cols desktop) */}
            <BentoCard
              id="verification"
              tag="SANDBOX"
              title="Pre-Flight Sandbox Verification"
              description="Never deploy a broken workflow again. Flomynt tests your automation against synthetic edge-case data and simulates risky steps to give you a confidence score before going live."
              chapterId="chapter-verification"
              colSpanDesktop="lg:col-span-4"
              stepNumber="04"
              isPowered={activePulseIndex === 3}
              demoComponent={<SandboxDemo isPowered={activePulseIndex === 3} />}
            />

            {/* 5. Zero-Trust Data Privacy (4 cols desktop) */}
            <BentoCard
              id="privacy"
              tag="SECURITY"
              title="Zero-Trust Data Privacy"
              description="Your clients' sensitive data stays locked and never trains external AI models. All API keys are encrypted before storage, and every workspace action is tracked in a cryptographically signed audit log."
              chapterId="chapter-privacy"
              colSpanDesktop="lg:col-span-4"
              stepNumber="05"
              isPowered={activePulseIndex === 4}
              demoComponent={<ZeroTrustDemo isPowered={activePulseIndex === 4} />}
            />

            {/* 6. Instant White-Label SaaS (6 cols desktop) */}
            <BentoCard
              id="whitelabel"
              tag="CLIENT APP"
              title="Instant White-Label SaaS"
              description="Build an automation once and turn it into a branded client portal. Customize the product name, logo, and accent colors across the app, and share live branded dashboards directly with your clients."
              chapterId="chapter-whitelabel"
              colSpanDesktop="lg:col-span-6"
              stepNumber="06"
              isPowered={activePulseIndex === 5}
              demoComponent={<WhiteLabelDemo isPowered={activePulseIndex === 5} />}
            />

            {/* 7. Agency Template Marketplace (6 cols desktop) */}
            <BentoCard
              id="marketplace"
              tag="DISTRIBUTION"
              title="Agency Template Marketplace"
              description="Publish and share ready-made workflows across workspaces with your private credentials automatically stripped out."
              chapterId="chapter-marketplace"
              colSpanDesktop="lg:col-span-6"
              stepNumber="07"
              isPowered={activePulseIndex === 6}
              demoComponent={<MarketplaceDemo isPowered={activePulseIndex === 6} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
