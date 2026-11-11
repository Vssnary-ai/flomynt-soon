"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function MarketplaceDemo({ isPowered = true }: { isPowered?: boolean }) {
  const [isPublished, setIsPublished] = useState(true);
  const [clones, setClones] = useState(128);

  const togglePublish = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPublished((prev) => !prev);
    if (!isPublished) {
      setClones((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-md overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
          Agency Template Sharing
        </span>
        <button
          onClick={togglePublish}
          aria-label="Toggle template publishing"
          className={`px-2.5 py-1 rounded-full font-mono text-[10px] transition-all cursor-pointer ${
            isPublished
              ? "bg-[#e9b45b] text-black font-semibold shadow-[0_0_12px_rgba(233,180,91,0.3)]"
              : "bg-white/[0.08] text-white/70 hover:text-white"
          }`}
        >
          {isPublished ? "Published ✓" : "Publish to Network"}
        </button>
      </div>

      {/* Template Card Showcase */}
      <div className="my-3 p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-white">Client Onboarding &amp; Stripe Billing</span>
          <span className="font-mono text-[10px] text-[#e9b45b] font-semibold">$35/mo</span>
        </div>

        {/* Security Auto-Redaction Feature */}
        <div className="p-2 rounded bg-black/50 border border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
          <span className="text-white/40">Private Stripe Secret:</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-[#e9b45b] border border-amber-500/20 flex items-center gap-1">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Auto-Redacted
          </span>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/40">
        <span>{clones} Agency Clones</span>
        <span className="text-[#e9b45b] font-medium">$4,480 Recurring Revenue</span>
      </div>
    </div>
  );
}
