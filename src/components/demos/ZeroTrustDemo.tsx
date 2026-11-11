"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ZeroTrustDemo({ isPowered = true }: { isPowered?: boolean }) {
  const [logs, setLogs] = useState([
    { hash: "0x8f2a41...", action: "AES-256 encrypted payload", time: "just now" },
    { hash: "0x3b1c9e...", action: "Signed audit receipt generated", time: "1s ago" },
    { hash: "0x9e4d77...", action: "Zero-data retention verified", time: "3s ago" },
  ]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-md overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
          Cryptographic Vault
        </span>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[9px] text-emerald-300">SOC-2 Type II</span>
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="my-2.5 space-y-1.5">
        {logs.map((item, idx) => (
          <div
            key={idx}
            className="p-2 rounded bg-white/[0.02] border border-white/[0.05] flex items-center justify-between font-mono text-[10px]"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-[#e9b45b] shrink-0">{item.hash}</span>
              <span className="text-white/70 truncate">{item.action}</span>
            </div>
            <span className="text-[9px] text-white/30 shrink-0 ml-2">{item.time}</span>
          </div>
        ))}
      </div>

      {/* Key & Security Badges */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-white/40">
        <span className="flex items-center gap-1 text-[#e9b45b]">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Hardware KMS Rotation
        </span>
        <span className="text-white/50">Zero Training Retention</span>
      </div>
    </div>
  );
}
