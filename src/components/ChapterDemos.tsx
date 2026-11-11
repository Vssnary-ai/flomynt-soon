"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Demo 1: Zero-Trust Data Privacy */
export function PrivacyDemo() {
  const [showDecrypted, setShowDecrypted] = useState(false);

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.14] rounded-lg p-5 text-left font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e9b45b] animate-pulse" />
          <span className="text-white text-[11px]">AUDIT VAULT & LOGS</span>
        </div>
        <button
          onClick={() => setShowDecrypted(!showDecrypted)}
          className="text-[10px] text-[#e9b45b] hover:text-white border border-[#e9b45b]/40 rounded px-2 py-0.5 transition-colors"
        >
          {showDecrypted ? "MASK KEYS" : "VERIFY ENCRYPTION"}
        </button>
      </div>

      <div className="space-y-2 text-[#8a8a8a] text-[11px]">
        <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-white/[0.04]">
          <span>STRIPE_SECRET_KEY</span>
          <span className="text-white">
            {showDecrypted ? "sk_live_...e9b4 (AES-256-GCM)" : "••••••••••••••••••••••••••••••••"}
          </span>
        </div>

        <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-white/[0.04]">
          <span>OPENAI_ORG_KEY</span>
          <span className="text-white">
            {showDecrypted ? "org-vault_...99b2 (AES-256-GCM)" : "••••••••••••••••••••••••••••••••"}
          </span>
        </div>

        <div className="pt-2 text-[10px] text-white/50 border-t border-white/[0.06] flex items-center justify-between">
          <span>Zero External Model Training</span>
          <span className="text-[#e9b45b]">PASSED (SHA-256 SIGNED)</span>
        </div>
      </div>
    </div>
  );
}

/* Demo 2: Instant White-Label SaaS */
export function WhiteLabelDemo() {
  const [isClientMode, setIsClientMode] = useState(false);

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.14] rounded-lg p-5 text-left font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
        <span className="text-white text-[11px]">PORTAL VIEW MODE</span>
        <div className="flex items-center bg-white/[0.06] rounded-full p-0.5 border border-white/[0.1]">
          <button
            onClick={() => setIsClientMode(false)}
            className={`px-3 py-1 rounded-full text-[10px] transition-all ${
              !isClientMode ? "bg-white text-black font-semibold" : "text-white/60 hover:text-white"
            }`}
          >
            FLOMYNT STUDIO
          </button>
          <button
            onClick={() => setIsClientMode(true)}
            className={`px-3 py-1 rounded-full text-[10px] transition-all ${
              isClientMode ? "bg-[#e9b45b] text-black font-semibold" : "text-white/60 hover:text-white"
            }`}
          >
            CLIENT PORTAL
          </button>
        </div>
      </div>

      <div className="bg-black/60 border border-white/[0.08] rounded p-4">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: isClientMode ? "#e9b45b" : "#ffffff" }}
            />
            <span className="text-white font-medium text-xs">
              {isClientMode ? "AcmeGrowth Automation Hub" : "Flomynt Engine v2.1"}
            </span>
          </div>
          <span className="text-[10px] text-[#8a8a8a]">
            {isClientMode ? "app.acmegrowth.com" : "studio.flomynt.com/w/91"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[10px]">
          <div className="bg-white/[0.03] p-2.5 rounded border border-white/[0.04]">
            <p className="text-white/50">Active Workflows</p>
            <p className="text-white text-sm font-semibold mt-1">42 Automated</p>
          </div>
          <div className="bg-white/[0.03] p-2.5 rounded border border-white/[0.04]">
            <p className="text-white/50">Client Health Score</p>
            <p className="text-[#e9b45b] text-sm font-semibold mt-1">99.8% Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Demo 3: Live Agentic Talk-to-Build */
export function TalkToBuildDemo() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { voice: "Find all leads from Twitter with >500 followers, enrich in Apollo, and draft personalized Loom scripts.", node: "Agentic Architect initializing canvas..." },
    { voice: "Auto-connecting Apollo API with credit optimization...", node: "Step 1: Ingest Twitter Stream -> Step 2: Apollo Enrich" },
    { voice: "Adding Gemini 1.5 Pro to write customized video pitches...", node: "Step 3: AI Script Synthesizer (Gemini Flash fallback ready)" },
  ];

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.14] rounded-lg p-5 text-left font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e9b45b] animate-ping" />
          <span className="text-white text-[11px]">JARVIS VOICE CANVAS</span>
        </div>
        <button
          onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
          className="text-[10px] text-[#e9b45b] hover:text-white border border-[#e9b45b]/40 rounded px-2 py-0.5 transition-colors"
        >
          NEXT PROMPT
        </button>
      </div>

      <div className="bg-black/60 p-3 rounded border border-white/[0.06] mb-3">
        <p className="text-[10px] text-[#e9b45b] mb-1">VOICE INPUT CAPTURE:</p>
        <p className="text-white text-xs leading-relaxed italic">
          &ldquo;{steps[activeStep].voice}&rdquo;
        </p>
      </div>

      <div className="bg-white/[0.02] border border-dashed border-white/[0.1] p-3 rounded text-[11px] text-[#8a8a8a]">
        <p className="text-[10px] text-white/50 mb-1">CANVAS STATE:</p>
        <p className="text-white">{steps[activeStep].node}</p>
      </div>
    </div>
  );
}

/* Demo 4: Unlimited Scale & Smart AI Routing */
export function RoutingDemo() {
  const [isFailed, setIsFailed] = useState(false);

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.14] rounded-lg p-5 text-left font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
        <span className="text-white text-[11px]">MULTI-PROVIDER ROUTER</span>
        <button
          onClick={() => setIsFailed(!isFailed)}
          className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
            isFailed
              ? "border-red-500 text-red-400 bg-red-500/10"
              : "border-white/20 text-white/70 hover:text-white"
          }`}
        >
          {isFailed ? "RECOVER PRIMARY" : "SIMULATE OPENAI OUTAGE"}
        </button>
      </div>

      <div className="space-y-2">
        <div
          className={`flex items-center justify-between p-2.5 rounded border transition-all ${
            isFailed
              ? "bg-red-500/10 border-red-500/30 text-red-300"
              : "bg-white/[0.04] border-white/[0.08] text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isFailed ? "bg-red-500" : "bg-green-400"}`} />
            <span>OpenAI (GPT-4o)</span>
          </div>
          <span className="text-[10px]">
            {isFailed ? "503 TIMEOUT (BLOCKED)" : "142ms · $0.005/req"}
          </span>
        </div>

        <div
          className={`flex items-center justify-between p-2.5 rounded border transition-all ${
            isFailed
              ? "bg-[#e9b45b]/10 border-[#e9b45b]/40 text-[#e9b45b]"
              : "bg-black/40 border-white/[0.04] text-[#8a8a8a]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isFailed ? "bg-[#e9b45b] animate-pulse" : "bg-white/20"}`} />
            <span>Gemini 1.5 Flash (Instant Failover)</span>
          </div>
          <span className="text-[10px]">
            {isFailed ? "ACTIVE ROUTE · 68ms (0 Dropped)" : "Standby Hot Spare"}
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded border bg-black/40 border-white/[0.04] text-[#8a8a8a]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>Anthropic Claude 3.5 Sonnet</span>
          </div>
          <span className="text-[10px]">Ready (Tier 2)</span>
        </div>
      </div>
    </div>
  );
}

/* Demo 5: 1-Click Self-Healing Engine */
export function SelfHealingDemo() {
  const [healed, setHealed] = useState(false);
  const [healing, setHealing] = useState(false);

  const handleHeal = () => {
    setHealing(true);
    setTimeout(() => {
      setHealing(false);
      setHealed(true);
    }, 1100);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.14] rounded-lg p-5 text-left font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#0088cc]">✈</span>
          <span className="text-white text-[11px]">TELEGRAM EMERGENCY ALERT</span>
        </div>
        <span className="text-[10px] text-[#8a8a8a]">Just now</span>
      </div>

      <div className="bg-black/60 p-3 rounded border border-white/[0.06] mb-3">
        <p className="text-red-400 font-semibold text-[11px] mb-1">
          {healed ? "✓ RESOLVED: Step 4 Rate Limit Handled" : "⚠ FLOMYNT ALERT: Step 4 API 429 Throttle"}
        </p>
        <p className="text-[#8a8a8a] text-[10px] leading-relaxed">
          {healed
            ? "Autonomous patch applied: exponential backoff + synthetic replay passed against real payload."
            : "HubSpot API rate limit exceeded. AI has generated a jitter backoff patch and verified test payload."}
        </p>
      </div>

      {!healed ? (
        <button
          onClick={handleHeal}
          disabled={healing}
          className="w-full py-2 bg-[#e9b45b] hover:bg-white text-black font-semibold rounded text-[11px] tracking-wider uppercase transition-all flex items-center justify-center gap-2"
        >
          {healing ? "REPLAYING FIX & VERIFYING..." : "⚡ TAP AUTO-HANDLE (1-CLICK)"}
        </button>
      ) : (
        <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 p-2 rounded text-green-300 text-[10px]">
          <span>Workflow restored in 1.1s</span>
          <button
            onClick={() => setHealed(false)}
            className="underline text-white/50 hover:text-white"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

/* Demo 6: Pre-Flight Sandbox Verification */
export function VerificationDemo() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(99.4);

  const runTest = () => {
    setRunning(true);
    setScore(78.2);
    setTimeout(() => {
      setScore(99.4);
      setRunning(false);
    }, 1200);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.14] rounded-lg p-5 text-left font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
        <span className="text-white text-[11px]">SYNTHETIC RUNTIME AUDIT</span>
        <button
          onClick={runTest}
          disabled={running}
          className="text-[10px] text-[#e9b45b] hover:text-white border border-[#e9b45b]/40 rounded px-2 py-0.5 transition-colors"
        >
          {running ? "TESTING EDGE CASES..." : "RE-RUN AUDIT"}
        </button>
      </div>

      <div className="flex items-center justify-between p-3 bg-black/60 rounded border border-white/[0.06] mb-3">
        <div>
          <p className="text-[10px] text-[#8a8a8a]">PRE-FLIGHT CONFIDENCE</p>
          <p className="text-white text-2xl font-light font-sans tracking-tight">
            {score}%
          </p>
        </div>
        <div className="text-right text-[10px] text-[#e9b45b]">
          <p>✓ 10,000 SYNTHETIC CALLS</p>
          <p>✓ ZERO MEMORY LEAKS</p>
        </div>
      </div>

      <div className="space-y-1.5 text-[10px] text-[#8a8a8a]">
        <div className="flex justify-between">
          <span>Malformed JSON Payload:</span>
          <span className="text-white">Caught by Fallback</span>
        </div>
        <div className="flex justify-between">
          <span>Concurrency Spike (500 req/sec):</span>
          <span className="text-white">Autoscaled cleanly</span>
        </div>
      </div>
    </div>
  );
}

/* Demo 7: Agency Template Marketplace */
export function MarketplaceDemo() {
  const [exported, setExported] = useState(false);

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.14] rounded-lg p-5 text-left font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
        <span className="text-white text-[11px]">CROSS-WORKSPACE EXPORT</span>
        <span className="text-[10px] text-[#e9b45b]">PUBLIC READY</span>
      </div>

      <div className="bg-black/60 p-3 rounded border border-white/[0.06] mb-3">
        <div className="flex justify-between items-center mb-1">
          <p className="text-white font-medium text-xs">Multi-Tenant E-Commerce Sync</p>
          <span className="text-[9px] bg-white/[0.1] px-1.5 py-0.5 rounded text-white/70">
            v3.2
          </span>
        </div>
        <p className="text-[#8a8a8a] text-[10px]">
          Syncs Shopify orders to NetSuite, Notion, and Discord with self-healing webhooks.
        </p>
      </div>

      <button
        onClick={() => setExported(true)}
        className="w-full py-2 bg-transparent hover:bg-white hover:text-black text-white border border-white/[0.14] font-medium rounded text-[10px] tracking-wider uppercase transition-all"
      >
        {exported ? "✓ CREDENTIALS STRIPPED & EXPORT READY" : "STRIP SECRETS & DEPLOY TO CLIENT"}
      </button>
    </div>
  );
}
