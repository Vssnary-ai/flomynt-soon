"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Provider {
  name: string;
  metric: string;
  tier: "speed" | "accuracy" | "cost";
  active: boolean;
}

export default function SmartRoutingDemo({ isPowered = true }: { isPowered?: boolean }) {
  const [activeTier, setActiveTier] = useState<"speed" | "accuracy" | "cost">("speed");

  const providers: { [key in "speed" | "accuracy" | "cost"]: { name: string; stat: string; costSave: string; highlight: string } } = {
    speed: {
      name: "Groq LPU (Llama 3.3 70B)",
      stat: "240 tokens/sec • 110ms",
      costSave: "91% Latency Cut",
      highlight: "Instant voice & live agentic runs",
    },
    accuracy: {
      name: "Anthropic Claude 3.5 Sonnet",
      stat: "98.9% benchmark reasoning",
      costSave: "Zero Hallucination Mode",
      highlight: "Complex multi-step legal & code audit",
    },
    cost: {
      name: "Google Gemini 2.5 Flash",
      stat: "$0.075 / 1M tokens",
      costSave: "84% Budget Saved",
      highlight: "Bulk classification & high-volume ETL",
    },
  };

  const current = providers[activeTier];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-md overflow-hidden relative">
      {/* Top Selector: 3 Tiers */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
          Smart AI Router
        </span>
        <div className="flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-lg border border-white/[0.08]">
          {(["speed", "accuracy", "cost"] as const).map((tier) => (
            <button
              key={tier}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTier(tier);
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize transition-all cursor-pointer ${
                activeTier === tier
                  ? "bg-[#e9b45b] text-black font-semibold shadow-[0_0_10px_rgba(233,180,91,0.3)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Active Route Highlight Box */}
      <div className="my-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.08]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-xs text-[#e9b45b] font-medium truncate">
            {current.name}
          </span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {current.costSave}
          </span>
        </div>
        <div className="text-[11px] font-mono text-white/70">{current.stat}</div>
        <div className="mt-2 text-[10px] text-white/40 truncate">{current.highlight}</div>
      </div>

      {/* 5 Provider status indicators */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-white/40">
        <span className={activeTier === "speed" ? "text-[#e9b45b]" : ""}>Groq</span>
        <span>•</span>
        <span className={activeTier === "accuracy" ? "text-[#e9b45b]" : ""}>Anthropic</span>
        <span>•</span>
        <span className={activeTier === "cost" ? "text-[#e9b45b]" : ""}>Gemini</span>
        <span>•</span>
        <span>OpenAI</span>
        <span>•</span>
        <span>OpenRouter</span>
      </div>
    </div>
  );
}
