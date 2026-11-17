"use client";

import React from "react";
import SectionLabel from "./SectionLabel";
import PillButton from "./PillButton";
import Reveal from "./Reveal";

const COMPARISONS = [
  {
    topic: "INCIDENT RECOVERY",
    traditional:
      "Workflows break silently in production. Debugging requires manual log tracing, recreating payloads, and redeploying nodes by hand.",
    flomynt:
      "1-Click Self-Healing: Mobile alerts with AI patches verified against synthetic replayed payloads before asking for 1-click approval.",
  },
  {
    topic: "DATA PRIVACY & COMPLIANCE",
    traditional:
      "Sensitive customer records pass unencrypted through shared orchestrators, frequently ingested into public model training datasets.",
    flomynt:
      "Zero-Trust Vault: All keys AES-256 encrypted, data locked in private enclaves, zero model training, and SHA-256 audit logs.",
  },
  {
    topic: "CLIENT PACKAGING & WHITE-LABEL",
    traditional:
      "Handing clients raw canvas dashboards or stitching together expensive third-party portal wrappers with generic branding.",
    flomynt:
      "Instant White-Label SaaS: 1-click turns automations into client apps with custom domains, custom logos, and branded reporting.",
  },
  {
    topic: "WORKFLOW CONSTRUCTION",
    traditional:
      "Hours spent dragging JSON mapping boxes, debugging webhook signatures, and configuring pagination loops.",
    flomynt:
      "Jarvis Voice Architect: Speak or type requirements. The AI constructs the canvas, optimizes branching, and handles edge cases.",
  },
  {
    topic: "AI VENDOR RELIABILITY",
    traditional:
      "Single API dependency. If your provider experiences rate limits or outages, all client workflows crash.",
    flomynt:
      "Multi-Provider Smart Router: Dynamically routes across OpenAI, Anthropic, Gemini, Groq & OpenRouter with instant sub-100ms failover.",
  },
];

export default function WhyFlomynt() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="why"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-10 overflow-hidden"
    >
      <div className="max-w-[1340px] mx-auto">
        {/* Header */}
        <Reveal className="mb-14 sm:mb-20">
          <SectionLabel text="WHY FLOMYNT" />
          <h2 className="mt-4 font-light text-3xl sm:text-5xl text-[#0b1b3a] tracking-[-0.035em] leading-[1.08] max-w-[800px]">
            Designed for resilience, <span className="b-grad-text">not constant babysitting.</span>
          </h2>
          <p className="mt-4 text-[#3d4f6b] text-sm sm:text-base max-w-[600px] leading-relaxed">
            See how Flomynt fundamentally redesigns workflow architecture compared to legacy tools like Zapier, Make, and raw n8n.
          </p>
        </Reveal>

        {/* Comparison Table / Grid */}
        <Reveal className="w-full b-glass rounded-[28px] overflow-hidden divide-y divide-[#0b1b3a]/10">
          {/* Desktop Header Row */}
          <div className="hidden md:grid md:grid-cols-12 bg-white/60 text-xs font-mono">
            <div className="md:col-span-3 p-4 sm:p-6 text-[#0b1b3a]/45 uppercase tracking-wider border-r border-[#0b1b3a]/10">
              CAPABILITY
            </div>
            <div className="md:col-span-4 p-4 sm:p-6 text-[#0b1b3a]/55 uppercase tracking-wider border-r border-[#0b1b3a]/10">
              LEGACY (ZAPIER / MAKE)
            </div>
            <div className="md:col-span-5 p-4 sm:p-6 text-[#1f6feb] uppercase tracking-wider flex items-center justify-between bg-[#1f6feb]/[0.06]">
              <span>FLOMYNT AUTONOMOUS ENGINE</span>
              <span className="text-[10px] text-[#1f6feb]/50 hidden sm:inline">NEXT-GEN</span>
            </div>
          </div>

          {/* Data Rows */}
          {COMPARISONS.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 hover:bg-white/60 transition-colors"
            >
              {/* Capability */}
              <div className="md:col-span-3 p-4 sm:p-6 font-mono text-[11px] text-[#1f6feb] border-b md:border-b-0 md:border-r border-[#0b1b3a]/10 flex items-center">
                <span>[ {row.topic} ]</span>
              </div>

              {/* Legacy Tools */}
              <div className="md:col-span-4 p-4 sm:p-6 text-xs sm:text-[13px] text-[#3d4f6b]/80 leading-relaxed border-b md:border-b-0 md:border-r border-[#0b1b3a]/10 flex flex-col justify-center">
                <span className="md:hidden font-mono text-[10px] text-[#0b1b3a]/40 uppercase mb-1">
                  LEGACY AUTOMATIONS:
                </span>
                <p>{row.traditional}</p>
              </div>

              {/* Flomynt Engine */}
              <div className="md:col-span-5 p-4 sm:p-6 text-xs sm:text-[13px] text-[#0b1b3a] leading-relaxed bg-[#1f6feb]/[0.05] flex flex-col justify-center">
                <span className="md:hidden font-mono text-[10px] text-[#1f6feb] uppercase mb-1">
                  FLOMYNT ENGINE:
                </span>
                <p className="font-normal">{row.flomynt}</p>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Bottom CTA */}
        <Reveal className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-[28px] b-glass">
          <div>
            <h4 className="text-[#0b1b3a] text-lg font-light">
              Stop rebuilding broken automations at 2 AM.
            </h4>
            <p className="text-xs text-[#3d4f6b] mt-1 font-mono">
              Join agency leaders migrating to Flomynt&apos;s self-healing infrastructure.
            </p>
          </div>
          <PillButton
            href="#wishlist"
            onClick={() => scrollTo("wishlist")}
            arrow
          >
            CLAIM YOUR SPOT
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}

