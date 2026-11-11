"use client";

import React from "react";
import SectionLabel from "./SectionLabel";
import PillButton from "./PillButton";
import {
  PrivacyDemo,
  WhiteLabelDemo,
  TalkToBuildDemo,
  RoutingDemo,
  SelfHealingDemo,
  VerificationDemo,
  MarketplaceDemo,
} from "./ChapterDemos";

interface Chapter {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  demo: React.ComponentType;
}

const CHAPTERS: Chapter[] = [
  {
    id: "privacy",
    number: "01",
    tag: "ZERO DATA LEAKS",
    title: "Zero-Trust Data Privacy",
    description:
      "Your clients' sensitive data stays locked and never trains external AI models. All API keys are encrypted before storage, and every workspace action is tracked in a cryptographically signed audit log.",
    demo: PrivacyDemo,
  },
  {
    id: "whitelabel",
    number: "02",
    tag: "WHITE-LABEL SAAS",
    title: "Instant White-Label SaaS",
    description:
      "Build an automation once and turn it into a branded client portal. Customize the product name, logo, and accent colors across the app, and share live branded dashboards directly with your clients.",
    demo: WhiteLabelDemo,
  },
  {
    id: "talktobuild",
    number: "03",
    tag: "VOICE ARCHITECT",
    title: "Live Agentic Talk-to-Build",
    description:
      "Dictate by voice or type your requirements to a Jarvis-style AI architect that builds and refines workflows on a visual canvas. It proactively suggests better logic and guides you in real time.",
    demo: TalkToBuildDemo,
  },
  {
    id: "routing",
    number: "04",
    tag: "MULTI-MODEL",
    title: "Unlimited Scale & Smart AI Routing",
    description:
      "Build unlimited workflows without burning your budget. Our engine automatically routes tasks between cheap and accurate tiers across 5 AI providers (OpenAI, Anthropic, Gemini, Groq, and OpenRouter) with instant failover.",
    demo: RoutingDemo,
  },
  {
    id: "selfhealing",
    number: "05",
    tag: "AUTONOMOUS HEALING",
    title: "1-Click Self-Healing Engine",
    description:
      "Get instant mobile alerts on Telegram the moment a workflow step breaks. Tap \"Auto-Handle\" and our AI drafts a fix, replays it against the real failed input to prove it works, and waits for your 1-click approval—or tells you the exact external setting to update.",
    demo: SelfHealingDemo,
  },
  {
    id: "verification",
    number: "06",
    tag: "SANDBOX PRE-FLIGHT",
    title: "Pre-Flight Sandbox Verification",
    description:
      "Never deploy a broken workflow again. Flomynt tests your automation against synthetic edge-case data and simulates risky steps to give you a confidence score before going live.",
    demo: VerificationDemo,
  },
  {
    id: "marketplace",
    number: "07",
    tag: "TEMPLATE ECOSYSTEM",
    title: "Agency Template Marketplace",
    description:
      "Publish and share ready-made workflows across workspaces with your private credentials automatically stripped out.",
    demo: MarketplaceDemo,
  },
];

export default function WhatIsFlomynt() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="what"
      className="relative w-full bg-[#050505] py-28 px-6 sm:px-10 border-t border-white/[0.14]"
    >
      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Summary Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionLabel text="WHAT IS FLOMYNT" />
            <h2 className="mt-4 font-light text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.03em] leading-tight">
              Autonomous Workflows That Build, Verify, and Heal Themselves.
            </h2>
            <p className="mt-6 text-[#8a8a8a] text-sm sm:text-base leading-relaxed">
              The AI-native automation platform built for modern agencies. Turn plain English into resilient workflows, white-label them into client apps, and let autonomous agents fix runtime errors before your clients even notice.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <PillButton
                href="#wishlist"
                onClick={() => scrollTo("wishlist")}
                arrow
              >
                JOIN THE WISHLIST
              </PillButton>
            </div>

            {/* Quick Chapter Navigation */}
            <div className="mt-12 hidden lg:block border-t border-white/[0.08] pt-6">
              <p className="mono-label text-[10px] text-white/40 mb-3">
                CHAPTER DIRECTORY
              </p>
              <div className="space-y-1.5">
                {CHAPTERS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      const el = document.getElementById(`chapter-${ch.id}`);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-left font-mono text-[11px] text-[#8a8a8a] hover:text-white transition-colors flex items-center gap-2 py-1"
                  >
                    <span className="text-white/30">{ch.number}</span>
                    <span className="truncate">{ch.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Chapters Timeline */}
          <div className="lg:col-span-7 space-y-16 relative">
            {/* Timeline Vertical Track */}
            <div className="absolute left-0 top-4 bottom-4 w-px bg-white/[0.08] hidden sm:block" />

            {CHAPTERS.map((ch) => {
              const DemoComponent = ch.demo;
              return (
                <div
                  key={ch.id}
                  id={`chapter-${ch.id}`}
                  className="relative sm:pl-8 group"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[4px] top-2 w-[9px] height-[9px] rounded-full bg-[#050505] border border-white/[0.3] group-hover:border-[#e9b45b] transition-colors hidden sm:block" />

                  {/* Header Row */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="mono-label text-[#e9b45b] text-[10px]">
                      {ch.number} // {ch.tag}
                    </span>
                  </div>

                  <h3 className="font-light text-2xl sm:text-3xl text-white tracking-[-0.02em] leading-snug">
                    {ch.title}
                  </h3>

                  <p className="mt-3 text-[#8a8a8a] text-sm leading-relaxed mb-6">
                    {ch.description}
                  </p>

                  {/* Interactive Visual Mini-Demo */}
                  <div className="mb-8">
                    <DemoComponent />
                  </div>

                  {/* Hairline chapter divider */}
                  <div className="w-full h-px bg-white/[0.08]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
