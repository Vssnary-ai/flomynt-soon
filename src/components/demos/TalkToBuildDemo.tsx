"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TalkToBuildDemo({ isPowered = true }: { isPowered?: boolean }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const promptText = "Sync Stripe refunds over $100 to Slack and update Notion";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= promptText.length) {
        setDisplayedText(promptText.slice(0, currentIdx));
        currentIdx++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        // Progress through canvas generation
        setTimeout(() => setActiveStep(1), 400);
        setTimeout(() => setActiveStep(2), 1000);
        setTimeout(() => setActiveStep(3), 1600);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisplayedText("");
    setIsTyping(true);
    setActiveStep(0);
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= promptText.length) {
        setDisplayedText(promptText.slice(0, currentIdx));
        currentIdx++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        setTimeout(() => setActiveStep(1), 400);
        setTimeout(() => setActiveStep(2), 1000);
        setTimeout(() => setActiveStep(3), 1600);
      }
    }, 35);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-md overflow-hidden relative group/demo">
      {/* Top Bar: Live Waveform & Status */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#e9b45b] animate-pulse" />
          <span className="font-mono text-[11px] text-[#e9b45b] tracking-wider uppercase font-medium">
            AI Architect Active
          </span>
        </div>
        
        {/* Equalizer waveform */}
        <div className="flex items-center gap-1 h-4">
          {[40, 80, 50, 100, 65, 90, 45].map((h, i) => (
            <motion.div
              key={i}
              className="w-[3px] bg-[#e9b45b] rounded-full"
              animate={isPowered ? { height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] } : { height: "20%" }}
              transition={{ repeat: Infinity, duration: 0.8 + i * 0.1, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      {/* Voice / Text Prompt Input */}
      <div className="my-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <svg className="w-4 h-4 text-[#e9b45b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <p className="font-mono text-xs text-white/90 truncate">
            {displayedText}
            {isTyping && <span className="inline-block w-1.5 h-3.5 bg-[#e9b45b] ml-1 animate-pulse" />}
          </p>
        </div>
        <button
          onClick={handleRestart}
          aria-label="Replay prompt synthesis"
          className="text-[10px] font-mono text-white/50 hover:text-white px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors shrink-0"
        >
          Replay
        </button>
      </div>

      {/* Generated Canvas Nodes Flow */}
      <div className="relative py-2 flex items-center justify-between gap-2 overflow-x-auto">
        {/* Node 1 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: activeStep >= 1 ? 1 : 0.3, y: 0 }}
          className={`flex-1 p-2.5 rounded-lg border text-center transition-all ${
            activeStep >= 1 ? "bg-white/[0.06] border-[#e9b45b]/50 shadow-[0_0_15px_rgba(233,180,91,0.15)]" : "border-white/[0.06] bg-transparent"
          }`}
        >
          <div className="font-mono text-[9px] text-[#e9b45b] uppercase tracking-wider mb-1">Trigger</div>
          <div className="text-xs font-medium text-white truncate">Stripe Refund</div>
        </motion.div>

        {/* Connector 1 */}
        <div className="w-4 sm:w-6 h-[1px] relative bg-white/[0.1] shrink-0">
          {activeStep >= 2 && (
            <motion.div
              className="absolute inset-0 bg-[#e9b45b] shadow-[0_0_8px_#e9b45b]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {/* Node 2 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: activeStep >= 2 ? 1 : 0.3, y: 0 }}
          className={`flex-1 p-2.5 rounded-lg border text-center transition-all ${
            activeStep >= 2 ? "bg-white/[0.06] border-[#e9b45b]/50 shadow-[0_0_15px_rgba(233,180,91,0.15)]" : "border-white/[0.06] bg-transparent"
          }`}
        >
          <div className="font-mono text-[9px] text-white/50 uppercase tracking-wider mb-1">Logic</div>
          <div className="text-xs font-medium text-white truncate">Amount &gt; $100</div>
        </motion.div>

        {/* Connector 2 */}
        <div className="w-4 sm:w-6 h-[1px] relative bg-white/[0.1] shrink-0">
          {activeStep >= 3 && (
            <motion.div
              className="absolute inset-0 bg-[#e9b45b] shadow-[0_0_8px_#e9b45b]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {/* Node 3 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: activeStep >= 3 ? 1 : 0.3, y: 0 }}
          className={`flex-1 p-2.5 rounded-lg border text-center transition-all ${
            activeStep >= 3 ? "bg-white/[0.06] border-[#e9b45b]/50 shadow-[0_0_15px_rgba(233,180,91,0.15)]" : "border-white/[0.06] bg-transparent"
          }`}
        >
          <div className="font-mono text-[9px] text-[#e9b45b] uppercase tracking-wider mb-1">Action</div>
          <div className="text-xs font-medium text-white truncate">Slack + Notion</div>
        </motion.div>
      </div>

      {/* Footer Meta */}
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-white/40">
        <span>Latency: 280ms</span>
        <span className="text-[#e9b45b]">Canvas verified ✓</span>
      </div>
    </div>
  );
}
