"use client";

import React from "react";
import { motion } from "framer-motion";

interface WireframeProps {
  className?: string;
}

export function PrivacyWireframe({ className = "" }: WireframeProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`w-full h-full text-white/35 group-hover:text-white/60 transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Outer shield perimeter */}
      <path
        d="M160 20 L230 45 V90 C230 125 160 148 160 148 C160 148 90 125 90 90 V45 Z"
        strokeDasharray="4 4"
        strokeOpacity="0.6"
      />
      {/* Inner solid shield */}
      <path
        d="M160 30 L218 52 V88 C218 116 160 136 160 136 C160 136 102 116 102 88 V52 Z"
        stroke="var(--accent)"
        strokeOpacity="0.4"
      />
      {/* Padlock center */}
      <rect x="146" y="75" width="28" height="22" rx="3" stroke="white" strokeWidth="1.4" />
      <path d="M152 75 V66 C152 61.5 155.5 58 160 58 C164.5 58 168 61.5 168 66 V75" stroke="white" strokeWidth="1.4" />
      <circle cx="160" cy="85" r="2.5" fill="var(--accent)" stroke="none" />
      {/* Cryptographic hash audit lines */}
      <line x1="40" y1="50" x2="75" y2="50" strokeOpacity="0.3" strokeDasharray="2 3" />
      <line x1="40" y1="65" x2="80" y2="65" strokeOpacity="0.3" strokeDasharray="2 3" />
      <line x1="245" y1="50" x2="280" y2="50" strokeOpacity="0.3" strokeDasharray="2 3" />
      <line x1="240" y1="65" x2="280" y2="65" strokeOpacity="0.3" strokeDasharray="2 3" />
      <text x="40" y="90" fill="var(--accent)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.1em" stroke="none" opacity="0.6">SHA-256 LOCKED</text>
      <text x="220" y="90" fill="white" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.1em" stroke="none" opacity="0.4">AES-256-GCM</text>
    </svg>
  );
}

export function WhiteLabelWireframe({ className = "" }: WireframeProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`w-full h-full text-white/35 group-hover:text-white/60 transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Browser window frame */}
      <rect x="40" y="25" width="240" height="115" rx="6" stroke="white" strokeOpacity="0.3" />
      <line x1="40" y1="46" x2="280" y2="46" stroke="white" strokeOpacity="0.2" />
      {/* Window dots */}
      <circle cx="52" cy="35" r="2.5" fill="white" fillOpacity="0.4" stroke="none" />
      <circle cx="60" cy="35" r="2.5" fill="white" fillOpacity="0.2" stroke="none" />
      <circle cx="68" cy="35" r="2.5" fill="white" fillOpacity="0.2" stroke="none" />
      {/* Address bar with custom domain */}
      <rect x="85" y="30" width="130" height="11" rx="3" stroke="white" strokeOpacity="0.2" />
      <text x="92" y="38" fill="var(--accent)" fontSize="6.5" fontFamily="var(--font-mono)" letterSpacing="0.05em" stroke="none">app.agency-brand.com</text>
      {/* Brand logo in nav */}
      <rect x="52" y="55" width="26" height="10" rx="2" stroke="var(--accent)" strokeWidth="1" />
      {/* Navigation placeholder */}
      <line x1="90" y1="60" x2="130" y2="60" strokeOpacity="0.3" />
      <line x1="140" y1="60" x2="180" y2="60" strokeOpacity="0.3" />
      {/* Dashboard cards */}
      <rect x="52" y="74" width="60" height="48" rx="3" stroke="white" strokeOpacity="0.2" strokeDasharray="3 3" />
      <rect x="120" y="74" width="95" height="48" rx="3" stroke="white" strokeOpacity="0.2" />
      {/* Mini chart wireframe */}
      <path d="M128 108 L145 98 L160 102 L180 88 L205 92" stroke="var(--accent)" strokeWidth="1.2" />
      {/* Brand Color Swatches */}
      <circle cx="235" cy="85" r="4.5" stroke="var(--accent)" strokeWidth="1" />
      <circle cx="250" cy="85" r="4.5" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="265" cy="85" r="4.5" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <text x="228" y="105" fill="white" fontSize="7" fontFamily="var(--font-mono)" stroke="none" opacity="0.4">CUSTOM CSS</text>
    </svg>
  );
}

export function TalkToBuildWireframe({ className = "" }: WireframeProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`w-full h-full text-white/35 group-hover:text-white/60 transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Microphone node */}
      <rect x="35" y="60" width="36" height="42" rx="4" stroke="var(--accent)" strokeWidth="1.2" />
      <rect x="47" y="68" width="12" height="18" rx="6" stroke="white" strokeWidth="1.2" />
      <path d="M43 78 C43 85 63 85 63 78" stroke="white" strokeWidth="1.2" />
      <line x1="53" y1="86" x2="53" y2="92" stroke="white" strokeWidth="1.2" />
      {/* Voice soundwave lines */}
      <path d="M78 81 C86 65 92 97 100 81 C108 65 114 97 122 81" stroke="var(--accent)" strokeWidth="1.2" />
      {/* Arrow into canvas node 1 */}
      <path d="M122 81 L145 81" stroke="white" strokeDasharray="3 3" />
      <polygon points="144,78 150,81 144,84" fill="white" stroke="none" />
      {/* Live canvas nodes */}
      <rect x="150" y="62" width="55" height="36" rx="4" stroke="white" strokeOpacity="0.4" />
      <text x="158" y="76" fill="white" fontSize="7" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">PARSE INTENT</text>
      <text x="158" y="88" fill="var(--accent)" fontSize="6" fontFamily="var(--font-mono)" stroke="none">Jarvis Core</text>
      {/* Branching connections */}
      <path d="M205 72 L235 52" stroke="white" strokeOpacity="0.3" />
      <path d="M205 88 L235 108" stroke="white" strokeOpacity="0.3" />
      <rect x="235" y="38" width="55" height="30" rx="3" stroke="white" strokeOpacity="0.3" strokeDasharray="2 2" />
      <text x="242" y="55" fill="white" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none" opacity="0.6">SYNC CRM</text>
      <rect x="235" y="94" width="55" height="30" rx="3" stroke="white" strokeOpacity="0.3" strokeDasharray="2 2" />
      <text x="242" y="111" fill="white" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none" opacity="0.6">SEND EMAIL</text>
    </svg>
  );
}

export function RoutingWireframe({ className = "" }: WireframeProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`w-full h-full text-white/35 group-hover:text-white/60 transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Incoming Request Source */}
      <circle cx="45" cy="80" r="14" stroke="white" strokeOpacity="0.5" />
      <text x="35" y="83" fill="white" fontSize="7" fontFamily="var(--font-mono)" stroke="none">INPUT</text>
      {/* Smart Router Node */}
      <path d="M60 80 L100 80" stroke="var(--accent)" strokeWidth="1.4" />
      <rect x="100" y="58" width="45" height="44" rx="4" stroke="var(--accent)" strokeWidth="1.4" />
      <text x="106" y="78" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" stroke="none">ROUTER</text>
      <text x="106" y="88" fill="white" fontSize="6" fontFamily="var(--font-mono)" stroke="none" opacity="0.7">12ms tier</text>
      {/* 5 Provider Nodes */}
      {/* 1. OpenAI */}
      <path d="M145 70 L185 35 L220 35" stroke="white" strokeOpacity="0.3" />
      <rect x="220" y="24" width="65" height="22" rx="3" stroke="white" strokeOpacity="0.3" />
      <text x="228" y="38" fill="white" fontSize="7" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">OpenAI GPT-4o</text>
      {/* 2. Anthropic */}
      <path d="M145 75 L185 62 L220 62" stroke="white" strokeOpacity="0.3" />
      <rect x="220" y="51" width="65" height="22" rx="3" stroke="white" strokeOpacity="0.3" />
      <text x="228" y="65" fill="white" fontSize="7" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">Claude 3.5 S</text>
      {/* 3. Gemini (Active Hot Route) */}
      <path d="M145 80 L220 80" stroke="var(--accent)" strokeWidth="1.5" />
      <rect x="220" y="74" width="65" height="22" rx="3" stroke="var(--accent)" strokeWidth="1.4" />
      <text x="228" y="88" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" stroke="none">Gemini 1.5 P</text>
      {/* 4. Groq */}
      <path d="M145 85 L185 105 L220 105" stroke="white" strokeOpacity="0.3" />
      <rect x="220" y="98" width="65" height="22" rx="3" stroke="white" strokeOpacity="0.3" />
      <text x="228" y="112" fill="white" fontSize="7" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">Groq Llama 3</text>
      {/* 5. OpenRouter Failover */}
      <path d="M145 90 L185 130 L220 130" stroke="white" strokeOpacity="0.2" strokeDasharray="2 2" />
      <rect x="220" y="122" width="65" height="20" rx="3" stroke="white" strokeOpacity="0.2" strokeDasharray="2 2" />
      <text x="228" y="135" fill="white" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none" opacity="0.5">OpenRouter</text>
    </svg>
  );
}

export function SelfHealingWireframe({ className = "" }: WireframeProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`w-full h-full text-white/35 group-hover:text-white/60 transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Telegram phone mockup */}
      <rect x="45" y="25" width="70" height="115" rx="10" stroke="white" strokeOpacity="0.3" />
      <line x1="68" y1="32" x2="92" y2="32" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
      {/* Alert banner inside phone */}
      <rect x="52" y="44" width="56" height="34" rx="4" stroke="rgba(255,255,255,0.2)" fill="rgba(233,180,91,0.08)" />
      <text x="56" y="55" fill="var(--accent)" fontSize="6" fontFamily="var(--font-mono)" stroke="none">ERROR CAUGHT</text>
      <text x="56" y="64" fill="white" fontSize="5" fontFamily="var(--font-mono)" stroke="none" opacity="0.7">API 429 Throttle</text>
      {/* Auto-handle action button inside phone */}
      <rect x="55" y="70" width="50" height="10" rx="2" stroke="var(--accent)" strokeWidth="1" />
      <text x="59" y="77" fill="var(--accent)" fontSize="5.5" fontFamily="var(--font-mono)" stroke="none">1-CLICK HEAL</text>
      {/* Connect pulse to AI Replay Engine */}
      <path d="M115 65 C145 65 145 90 175 90" stroke="var(--accent)" strokeDasharray="3 3" />
      {/* Healing Replay node */}
      <rect x="175" y="65" width="105" height="52" rx="4" stroke="white" strokeOpacity="0.4" />
      <text x="185" y="80" fill="white" fontSize="7" fontFamily="var(--font-mono)" stroke="none">SYNTHETIC REPLAY</text>
      <text x="185" y="93" fill="var(--accent)" fontSize="6" fontFamily="var(--font-mono)" stroke="none">Payload verified: 100%</text>
      <path d="M185 105 L192 110 L202 98" stroke="var(--accent)" strokeWidth="1.4" />
      <text x="208" y="106" fill="white" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">Auto-restored</text>
    </svg>
  );
}

export function VerificationWireframe({ className = "" }: WireframeProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`w-full h-full text-white/35 group-hover:text-white/60 transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Pre-flight checklist card */}
      <rect x="35" y="25" width="130" height="110" rx="6" stroke="white" strokeOpacity="0.3" />
      <text x="48" y="42" fill="white" fontSize="8" fontFamily="var(--font-mono)" stroke="none">PRE-FLIGHT CHECKS</text>
      <line x1="35" y1="48" x2="165" y2="48" stroke="white" strokeOpacity="0.15" />
      {/* Check item 1 */}
      <circle cx="50" cy="62" r="4" stroke="var(--accent)" strokeWidth="1.2" />
      <polyline points="48,62 50,64 53,60" stroke="var(--accent)" strokeWidth="1.2" />
      <text x="60" y="64" fill="white" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">Null payload test</text>
      {/* Check item 2 */}
      <circle cx="50" cy="78" r="4" stroke="var(--accent)" strokeWidth="1.2" />
      <polyline points="48,78 50,80 53,76" stroke="var(--accent)" strokeWidth="1.2" />
      <text x="60" y="80" fill="white" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">Rate limit spike</text>
      {/* Check item 3 */}
      <circle cx="50" cy="94" r="4" stroke="var(--accent)" strokeWidth="1.2" />
      <polyline points="48,94 50,96 53,92" stroke="var(--accent)" strokeWidth="1.2" />
      <text x="60" y="96" fill="white" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">Schema drift check</text>
      {/* Check item 4 */}
      <circle cx="50" cy="110" r="4" stroke="var(--accent)" strokeWidth="1.2" />
      <polyline points="48,110 50,112 53,108" stroke="var(--accent)" strokeWidth="1.2" />
      <text x="60" y="112" fill="white" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">Auth boundary scan</text>
      {/* Circular Confidence Meter on Right */}
      <circle cx="235" cy="80" r="40" stroke="white" strokeOpacity="0.15" strokeWidth="3" />
      <circle
        cx="235"
        cy="80"
        r="40"
        stroke="var(--accent)"
        strokeWidth="3.5"
        strokeDasharray="251"
        strokeDashoffset="25"
        strokeLinecap="round"
      />
      <text x="215" y="78" fill="white" fontSize="16" fontFamily="var(--font-sans)" fontWeight="300" stroke="none">99.2%</text>
      <text x="210" y="92" fill="var(--accent)" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none">CONFIDENCE</text>
    </svg>
  );
}

export function MarketplaceWireframe({ className = "" }: WireframeProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`w-full h-full text-white/35 group-hover:text-white/60 transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Stacked template cards */}
      <rect x="90" y="20" width="140" height="70" rx="4" stroke="white" strokeOpacity="0.15" />
      <rect x="70" y="38" width="160" height="70" rx="4" stroke="white" strokeOpacity="0.25" />
      <rect x="50" y="56" width="180" height="80" rx="5" stroke="var(--accent)" strokeWidth="1.4" fill="#0d0d0d" />
      {/* Card Details */}
      <text x="65" y="76" fill="white" fontSize="8" fontFamily="var(--font-mono)" stroke="none">AI SEO Blog Pipeline v2.4</text>
      <text x="65" y="88" fill="var(--accent)" fontSize="6.5" fontFamily="var(--font-mono)" stroke="none">BY APEX AUTOMATION AGENCY</text>
      <line x1="65" y1="96" x2="215" y2="96" stroke="white" strokeOpacity="0.15" />
      {/* Credentials Stripped tag */}
      <rect x="65" y="105" width="85" height="15" rx="3" stroke="white" strokeOpacity="0.3" />
      <text x="70" y="115" fill="white" fontSize="5.5" fontFamily="var(--font-mono)" stroke="none" opacity="0.8">KEYS AUTO-STRIPPED</text>
      {/* Clone Pill */}
      <rect x="160" y="105" width="55" height="15" rx="8" stroke="var(--accent)" fill="var(--accent)" fillOpacity="0.1" />
      <text x="172" y="115" fill="var(--accent)" fontSize="6" fontFamily="var(--font-mono)" stroke="none">DEPLOY ↗</text>
    </svg>
  );
}
