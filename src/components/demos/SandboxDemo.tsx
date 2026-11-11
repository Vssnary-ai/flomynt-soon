"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SandboxDemo({ isPowered = true }: { isPowered?: boolean }) {
  const [score, setScore] = useState(0);
  const [checkedItems, setCheckedItems] = useState([false, false, false, false]);

  const tests = [
    "Schema validation passed",
    "Mock payload executed (200 OK)",
    "Rate-limit safe (<60 req/min)",
    "Zero side-effects confirmed",
  ];

  const runVerification = () => {
    setScore(0);
    setCheckedItems([false, false, false, false]);

    setTimeout(() => {
      setCheckedItems((prev) => [true, false, false, false]);
      setScore(24);
    }, 250);

    setTimeout(() => {
      setCheckedItems((prev) => [true, true, false, false]);
      setScore(52);
    }, 600);

    setTimeout(() => {
      setCheckedItems((prev) => [true, true, true, false]);
      setScore(78);
    }, 950);

    setTimeout(() => {
      setCheckedItems([true, true, true, true]);
      setScore(96);
    }, 1300);
  };

  useEffect(() => {
    runVerification();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-md overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
          Pre-Flight Verification
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            runVerification();
          }}
          className="text-[10px] font-mono text-[#e9b45b] hover:text-white px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors cursor-pointer"
        >
          Re-Test
        </button>
      </div>

      {/* Middle: Gauge + Checklist */}
      <div className="my-2.5 flex items-center gap-4">
        {/* Animated Circular Score */}
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className="text-[#e9b45b]"
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              initial={{ strokeDasharray: "0, 100" }}
              animate={{ strokeDasharray: `${score}, 100` }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-sm font-semibold text-white">{score}%</span>
            <span className="text-[7px] font-mono text-[#e9b45b]">READY</span>
          </div>
        </div>

        {/* Test checklist */}
        <div className="flex-1 space-y-1 overflow-hidden">
          {tests.map((test, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[10px] font-mono truncate">
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                  checkedItems[idx]
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-white/[0.05] text-white/20"
                }`}
              >
                {checkedItems[idx] ? "✓" : "·"}
              </span>
              <span className={checkedItems[idx] ? "text-white/80" : "text-white/30"}>{test}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-white/40">
        <span>Synthetic Edge Simulation</span>
        <span className="text-emerald-400 font-medium">Safe to Deploy</span>
      </div>
    </div>
  );
}
