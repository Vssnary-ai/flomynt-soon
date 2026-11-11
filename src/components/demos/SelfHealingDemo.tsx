"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SelfHealingDemo({ isPowered = true }: { isPowered?: boolean }) {
  const [status, setStatus] = useState<"healthy" | "broken" | "healing" | "resolved">("healthy");
  const [healTime, setHealTime] = useState(840);

  const simulateIncident = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === "healing") return;
    setStatus("broken");
    
    // Auto-heal sequence
    setTimeout(() => {
      setStatus("healing");
    }, 900);

    setTimeout(() => {
      setStatus("resolved");
    }, 2100);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-md overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              status === "healthy" || status === "resolved"
                ? "bg-emerald-400"
                : status === "broken"
                ? "bg-red-400 animate-ping"
                : "bg-[#e9b45b] animate-spin"
            }`}
          />
          <span className="font-mono text-[11px] text-white/80 uppercase tracking-wider font-medium">
            {status === "healthy" && "Autonomous Watchdog Active"}
            {status === "broken" && "Critical Failure Detected"}
            {status === "healing" && "Synthesizing Fix & Replay..."}
            {status === "resolved" && "Zero-Downtime Healed"}
          </span>
        </div>

        <button
          onClick={simulateIncident}
          aria-label="Simulate runtime failure"
          className="px-2.5 py-1 rounded-full font-mono text-[10px] text-[#e9b45b] border border-[#e9b45b]/40 bg-[#e9b45b]/10 hover:bg-[#e9b45b]/20 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
        >
          <span>Simulate Error</span>
          <span className="text-xs">⚡</span>
        </button>
      </div>

      {/* Simulated Incident Timeline Card */}
      <div className="my-3 space-y-2">
        {/* Telegram Push Notification style */}
        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08] relative">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-1.5">
            <span className="flex items-center gap-1.5 text-sky-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .34z" />
              </svg>
              Telegram Mobile Dispatch
            </span>
            <span>Live Sync</span>
          </div>

          <AnimatePresence mode="wait">
            {status === "broken" ? (
              <motion.div
                key="broken"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-300 font-mono space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px]">503 ERROR</span>
                  <span>OpenAI API RateLimitReached</span>
                </div>
                <div className="text-[11px] text-white/50">Auto-Handle engaged: evaluating fallback models...</div>
              </motion.div>
            ) : status === "healing" ? (
              <motion.div
                key="healing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-[#e9b45b] font-mono space-y-1"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-[#e9b45b] border-t-transparent rounded-full animate-spin" />
                  <span>Replaying payload with Claude 3.5 Sonnet</span>
                </div>
                <div className="text-[11px] text-white/50">Synthetic validation: 100% test passed</div>
              </motion.div>
            ) : (
              <motion.div
                key="healthy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-white/80 font-mono space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span>✓</span> Automated Failover Verified
                  </span>
                  <span className="text-[#e9b45b] text-[10px]">{healTime}ms resolve</span>
                </div>
                <div className="text-[11px] text-white/50 truncate">
                  Prompt payload re-routed with zero client impact.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Metric badges */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/40">
        <span>MTTR: &lt; 1.2s</span>
        <span className="text-emerald-400">99.99% Uptime Guarantee</span>
      </div>
    </div>
  );
}
