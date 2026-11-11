"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import PillButton from "./PillButton";
import {
  PrivacyWireframe,
  WhiteLabelWireframe,
  TalkToBuildWireframe,
  RoutingWireframe,
  SelfHealingWireframe,
  VerificationWireframe,
  MarketplaceWireframe,
} from "./FeatureWireframes";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<{ className?: string }>;
  tag: string;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    id: "privacy",
    title: "Zero-Trust Data Privacy",
    description:
      "Your clients' sensitive data stays locked and never trains external AI models. All API keys are encrypted before storage, and every workspace action is tracked in a cryptographically signed audit log.",
    component: PrivacyWireframe,
    tag: "SECURITY",
  },
  {
    id: "whitelabel",
    title: "Instant White-Label SaaS",
    description:
      "Build an automation once and turn it into a branded client portal. Customize the product name, logo, and accent colors across the app, and share live branded dashboards directly with your clients.",
    component: WhiteLabelWireframe,
    tag: "CLIENT APP",
  },
  {
    id: "talktobuild",
    title: "Live Agentic Talk-to-Build",
    description:
      "Dictate by voice or type your requirements to a Jarvis-style AI architect that builds and refines workflows on a visual canvas. It proactively suggests better logic and guides you in real time.",
    component: TalkToBuildWireframe,
    tag: "VOICE AI",
  },
  {
    id: "routing",
    title: "Unlimited Scale & Smart AI Routing",
    description:
      "Build unlimited workflows without burning your budget. Our engine automatically routes tasks between cheap and accurate tiers across 5 AI providers (OpenAI, Anthropic, Gemini, Groq, and OpenRouter) with instant failover.",
    component: RoutingWireframe,
    tag: "FAILOVER",
  },
  {
    id: "selfhealing",
    title: "1-Click Self-Healing Engine",
    description:
      "Get instant mobile alerts on Telegram the moment a workflow step breaks. Tap \"Auto-Handle\" and our AI drafts a fix, replays it against the real failed input to prove it works, and waits for your 1-click approval—or tells you the exact external setting to update.",
    component: SelfHealingWireframe,
    tag: "RESILIENCE",
  },
  {
    id: "verification",
    title: "Pre-Flight Sandbox Verification",
    description:
      "Never deploy a broken workflow again. Flomynt tests your automation against synthetic edge-case data and simulates risky steps to give you a confidence score before going live.",
    component: VerificationWireframe,
    tag: "SANDBOX",
  },
  {
    id: "marketplace",
    title: "Agency Template Marketplace",
    description:
      "Publish and share ready-made workflows across workspaces with your private credentials automatically stripped out.",
    component: MarketplaceWireframe,
    tag: "DISTRIBUTION",
  },
];

export default function FeaturesGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(`chapter-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      const whatEl = document.getElementById("what");
      if (whatEl) whatEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="features"
      className="relative w-full bg-[#050505] py-28 px-6 sm:px-10 border-t border-white/[0.14]"
    >
      <div className="max-w-[1340px] mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel text="FEATURES" />
          <h2 className="mt-4 font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em] leading-tight max-w-[850px]">
            Autonomous systems built for modern agencies.
          </h2>
          <p className="mt-4 text-[#8a8a8a] text-sm sm:text-base max-w-[620px] leading-relaxed">
            Every feature is engineered to replace fragile manual glue work with resilient, self-healing machine intelligence.
          </p>
        </div>

        {/* 3-Column Hairline Bordered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.14]">
          {FEATURES_DATA.map((feature, idx) => {
            const WireframeComponent = feature.component;
            const isHovered = hoveredCard === feature.id;

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative flex flex-col justify-between p-8 sm:p-10 border-r border-b border-white/[0.14] transition-colors duration-300 ${
                  isHovered ? "bg-[#0d0d0d]" : "bg-transparent"
                } ${idx === 6 ? "lg:col-span-1" : ""}`}
              >
                {/* Subtle corner markers on hover (Grok style bracket accents) */}
                {isHovered && (
                  <>
                    <span className="absolute top-1 left-1 font-mono text-[10px] text-white/40 pointer-events-none select-none">
                      ⌜
                    </span>
                    <span className="absolute top-1 right-1 font-mono text-[10px] text-white/40 pointer-events-none select-none">
                      ⌝
                    </span>
                    <span className="absolute bottom-1 left-1 font-mono text-[10px] text-white/40 pointer-events-none select-none">
                      ⌞
                    </span>
                    <span className="absolute bottom-1 right-1 font-mono text-[10px] text-white/40 pointer-events-none select-none">
                      ⌟
                    </span>
                  </>
                )}

                {/* Top: Tag & Title */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono-label text-[10px] text-[#e9b45b]">
                      [ {feature.tag} ]
                    </span>
                    <span className="font-mono text-[11px] text-white/20">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-normal text-xl sm:text-[22px] text-white tracking-[-0.02em] leading-snug">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-[#8a8a8a] text-[13.5px] leading-relaxed line-clamp-4 group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Center: Wireframe SVG graphic */}
                <div className="my-8 h-36 flex items-center justify-center overflow-hidden">
                  <WireframeComponent />
                </div>

                {/* Bottom: Pill Action Button */}
                <div className="pt-2 flex items-center justify-between">
                  <PillButton
                    onClick={() => scrollToChapter(feature.id)}
                    arrow
                    className="text-[10px] py-1.5 px-3.5 group-hover:border-white/50"
                  >
                    LEARN MORE
                  </PillButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
