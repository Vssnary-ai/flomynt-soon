"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const SWATCHES = [
  { name: "Flomynt Amber", color: "#e9b45b", border: "rgba(233,180,91,0.5)" },
  { name: "Cobalt Blue", color: "#38bdf8", border: "rgba(56,189,248,0.5)" },
  { name: "Emerald Green", color: "#34d399", border: "rgba(52,211,153,0.5)" },
  { name: "Electric Violet", color: "#c084fc", border: "rgba(192,132,252,0.5)" },
];

export default function WhiteLabelDemo({ isPowered = true }: { isPowered?: boolean }) {
  const [agencyName, setAgencyName] = useState("Vanguard Agency");
  const [selectedSwatch, setSelectedSwatch] = useState(SWATCHES[0]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-md overflow-hidden relative">
      {/* Top Controls: Agency Name & Swatches */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 flex-1 min-w-[140px]">
          <span className="font-mono text-[10px] text-white/50 uppercase">Brand:</span>
          <input
            type="text"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            className="bg-white/[0.05] border border-white/[0.1] rounded px-2 py-0.5 font-mono text-xs text-white focus:outline-none focus:border-[#e9b45b] w-full max-w-[150px]"
          />
        </div>

        {/* 4 Swatches */}
        <div className="flex items-center gap-1.5">
          {SWATCHES.map((swatch) => (
            <button
              key={swatch.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSwatch(swatch);
              }}
              aria-label={`Select ${swatch.name}`}
              className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                selectedSwatch.color === swatch.color ? "scale-125 ring-2 ring-white/80" : "opacity-70 hover:opacity-100"
              }`}
              style={{ backgroundColor: swatch.color }}
            />
          ))}
        </div>
      </div>

      {/* Simulated Live Branded Client Dashboard */}
      <div className="my-3 p-3.5 rounded-lg bg-black/60 border border-white/[0.1] shadow-xl">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] font-bold text-black"
              style={{ backgroundColor: selectedSwatch.color }}
            >
              {agencyName.charAt(0) || "A"}
            </div>
            <span className="font-mono text-xs text-white font-medium truncate max-w-[140px]">
              {agencyName}
            </span>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded text-black font-semibold" style={{ backgroundColor: selectedSwatch.color }}>
            Client Portal Live
          </span>
        </div>

        {/* Metric bars inside portal */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
            <div className="text-white/40">Active Workflows</div>
            <div className="text-sm font-semibold text-white mt-0.5">24 Live</div>
          </div>
          <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
            <div className="text-white/40">Success Rate</div>
            <div className="text-sm font-semibold mt-0.5" style={{ color: selectedSwatch.color }}>
              99.8%
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-white/40">
        <span>Custom Domain &amp; SMTP Ready</span>
        <span style={{ color: selectedSwatch.color }}>Zero Flomynt Branding</span>
      </div>
    </div>
  );
}
