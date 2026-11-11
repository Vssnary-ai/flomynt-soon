"use client";

import React from "react";
import SectionLabel from "./SectionLabel";
import PillButton from "./PillButton";

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
      className="relative w-full bg-[#050505] py-28 px-6 sm:px-10 border-t border-white/[0.14]"
    >
      <div className="max-w-[1340px] mx-auto">
        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel text="WHY FLOMYNT" />
          <h2 className="mt-4 font-light text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-tight max-w-[800px]">
            Designed for resilience, not constant babysitting.
          </h2>
          <p className="mt-4 text-[#8a8a8a] text-sm sm:text-base max-w-[600px] leading-relaxed">
            See how Flomynt fundamentally redesigns workflow architecture compared to legacy tools like Zapier, Make, and raw n8n.
          </p>
        </div>

        {/* Comparison Table / Grid with Hairline Borders */}
        <div className="border border-white/[0.14] divide-y divide-white/[0.14]">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#0a0a0a] text-xs font-mono">
            <div className="md:col-span-3 p-4 sm:p-6 text-white/40 uppercase tracking-widest border-b md:border-b-0 md:border-r border-white/[0.14]">
              CAPABILITY
            </div>
            <div className="md:col-span-4 p-4 sm:p-6 text-[#8a8a8a] uppercase tracking-widest border-b md:border-b-0 md:border-r border-white/[0.14]">
              LEGACY AUTOMATIONS (ZAPIER / MAKE)
            </div>
            <div className="md:col-span-5 p-4 sm:p-6 text-[#e9b45b] uppercase tracking-widest flex items-center justify-between">
              <span>FLOMYNT AUTONOMOUS ENGINE</span>
              <span className="text-[10px] text-white/30 hidden sm:inline">NEXT-GEN</span>
            </div>
          </div>

          {/* Data Rows */}
          {COMPARISONS.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 hover:bg-[#080808] transition-colors"
            >
              {/* Capability */}
              <div className="md:col-span-3 p-5 sm:p-6 font-mono text-[11px] text-[#e9b45b] border-b md:border-b-0 md:border-r border-white/[0.14] flex items-center">
                <span>[ {row.topic} ]</span>
              </div>

              {/* Legacy Tools */}
              <div className="md:col-span-4 p-5 sm:p-6 text-xs sm:text-[13px] text-[#8a8a8a] leading-relaxed border-b md:border-b-0 md:border-r border-white/[0.14] flex items-center">
                <p>{row.traditional}</p>
              </div>

              {/* Flomynt Engine */}
              <div className="md:col-span-5 p-5 sm:p-6 text-xs sm:text-[13px] text-white leading-relaxed bg-[#0d0d0d]/40 flex items-center">
                <p className="font-normal">{row.flomynt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 border border-white/[0.14] bg-[#0a0a0a]">
          <div>
            <h4 className="text-white text-lg font-light">
              Stop rebuilding broken automations at 2 AM.
            </h4>
            <p className="text-xs text-[#8a8a8a] mt-1 font-mono">
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
        </div>
      </div>
    </section>
  );
}
