"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
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
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={colSpanDesktop}
    >
    <div
      ref={cardRef}
      id={`bento-${id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group b-card relative h-full rounded-[28px] flex flex-col justify-between overflow-hidden p-5 sm:p-7"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[28px] opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 76, 255, 0.13), transparent 80%)`,
          }}
        />
      )}

      {/* Top Specular Inner Hairline Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

      {/* Card Content Top: Step Badge & Tag */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#6d4cff]/10 border border-[#6d4cff]/20 text-[#6d4cff] font-medium">
              {stepNumber}
            </span>
            <span className="font-mono text-[11px] text-[#14122b]/60 tracking-wider uppercase">
              [ {tag} ]
            </span>
          </div>
          {/* Wire connection node indicator */}
          <div className="w-2.5 h-2.5 rounded-full border border-[#6d4cff]/50 bg-[#6d4cff]/20 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#6d4cff] animate-ping" />
          </div>
        </div>

        <h3 className="font-normal text-xl sm:text-2xl text-[#14122b] tracking-[-0.02em] leading-snug mb-2">
          {title}
        </h3>
        <p className="text-[#4a4766] text-sm sm:text-[15px] leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Card Interactive Live Mini-Demo */}
      <div className="relative z-10 my-4 flex-1 min-h-[170px] sm:min-h-[190px] b-screen p-2 sm:p-2.5">
        <div className="relative h-full">{demoComponent}</div>
      </div>

      {/* Card Footer: 44px Min Height Action Pill Button */}
      <div className="relative z-10 pt-4 mt-2 border-t border-[#14122b]/[0.08] flex items-center justify-between">
        <button
          onClick={() => scrollToChapter(chapterId)}
          aria-label={`Explore details for ${title}`}
          className="min-h-[44px] px-4 py-2 rounded-full border border-[#14122b]/[0.14] hover:border-transparent bg-white/70 hover:bg-[#14122b] text-[#14122b] hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 group/btn cursor-pointer"
        >
          <span>SEE HOW IT WORKS</span>
          <span className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
            ↗
          </span>
        </button>

        <span className="font-mono text-[11px] text-[#14122b]/35 hidden sm:inline-block">
          Autonomous Node
        </span>
      </div>
    </div>
    </motion.div>
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
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-[22%] w-[2px] h-[70%] origin-top pointer-events-none hidden opacity-40"
        style={{ scaleY: smoothScroll, background: "linear-gradient(to bottom,#6d4cff,#2f8cff,#ff5fa8)", filter: "blur(1px)" }}
      />

      <div className="max-w-[1360px] mx-auto relative">
        {/* Section Header */}
        <Reveal className="mb-14 sm:mb-20">
          <SectionLabel text="FEATURES" />
          <h2 className="mt-4 font-light text-3xl sm:text-5xl lg:text-6xl text-[#14122b] tracking-[-0.035em] leading-[1.08] max-w-[920px]">
            Autonomous systems built for <span className="b-grad-text">modern agencies.</span>
          </h2>
          <p className="mt-4 text-[#4a4766] text-base sm:text-lg max-w-[680px] leading-relaxed">
            Turn plain English into resilient workflows, white-label them into client apps, and let autonomous agents fix runtime errors before your clients even notice.
          </p>

          {/* Lifecycle sequence ribbon */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-[#14122b]/45 px-4 py-2.5 rounded-full b-glass w-fit max-w-full">
            <span className="text-[#6d4cff] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6d4cff] animate-pulse" />
              The Flomynt Wire:
            </span>
            <span className="text-[#14122b]/80">Talk-to-Build</span>
            <span>→</span>
            <span className="text-[#14122b]/80">Sandbox</span>
            <span>→</span>
            <span className="text-[#14122b]/80">Routing</span>
            <span>→</span>
            <span className="text-[#14122b]/80">Self-Healing</span>
            <span>→</span>
            <span className="text-[#14122b]/80">White-Label</span>
            <span>→</span>
            <span className="text-[#14122b]/80">Zero-Trust</span>
            <span>→</span>
            <span className="text-[#14122b]/80">Marketplace</span>
          </div>
        </Reveal>

        {/* Bento Grid Container */}
        <div className="relative">
          {/* Mobile Glowing Left Spine */}
          <div className="lg:hidden absolute left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#6d4cff] via-[#2f8cff]/40 to-[#ff5fa8]/50 pointer-events-none shadow-[0_0_8px_#6d4cff]" />

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

