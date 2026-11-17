"use client";

import React, { useState } from "react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const [idea, setIdea] = useState("");
  const [sending, setSending] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleJoin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (sending) return;
    setSending(true);
    const text = idea.trim() || "Join the Flomynt wishlist";
    window.dispatchEvent(
      new CustomEvent("flomynt:set-wishlist-idea", { detail: { idea: text } })
    );
    setTimeout(() => {
      setSending(false);
      scrollTo("wishlist");
    }, 900);
  };

  return (
    <footer className="relative w-full overflow-hidden pt-20 pb-10 px-5 sm:px-10">
      {/* Ambient wash behind the ghost wordmark */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[50vw] h-[300px] opacity-40 blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, rgba(24, 198, 180, 0.35) 0%, rgba(31, 111, 235, 0.18) 40%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1340px] mx-auto relative z-10">
        {/* ============================================================
            FINAL WISHLIST CTA BAND — mirrors the hero's command bar
            so the footer closes the page with the same primary action.
           ============================================================ */}
        <div className="relative rounded-[32px] overflow-hidden mb-14 bg-[#0b1b3a] text-white px-6 sm:px-10 py-10 sm:py-14 shadow-[0_40px_90px_-30px_rgba(11,27,58,0.55)]">
          {/* soft lime glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-[460px] h-[460px] rounded-full bg-[#bff02e]/14 blur-[110px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 -right-10 w-[420px] h-[420px] rounded-full bg-[#2a93ff]/22 blur-[110px]" aria-hidden="true" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="font-mono text-[10.5px] tracking-[0.18em] text-[#bff02e] mb-3">
                FINAL CALL · PRIVATE BETA
              </p>
              <h3 className="font-light text-[28px] sm:text-[36px] leading-[1.08] tracking-[-0.03em]">
                Lock in your{" "}
                <span className="font-display italic text-[#bff02e]">early seat.</span>
              </h3>
              <p className="mt-3 text-[13.5px] text-white/65 max-w-[380px] leading-relaxed">
                One command bar, one spot held. We onboard new agencies in weekly waves.
              </p>
            </div>

            <form
              onSubmit={handleJoin}
              className="lg:col-span-7 relative flex items-center rounded-full p-2 bg-white/10 border border-white/20 backdrop-blur-md focus-within:bg-white/18 focus-within:border-[#bff02e]/60 transition-all"
            >
              <span className="hidden sm:flex shrink-0 w-11 h-11 rounded-full bg-white/8 border border-white/15 items-center justify-center text-[#bff02e] mr-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </span>

              <input
                type="email"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="your@agency.com or a workflow idea"
                aria-label="Email or workflow idea"
                className="flex-1 min-w-0 bg-transparent text-white placeholder:text-white/40 outline-none text-[14px] px-2 h-11"
              />

              <button
                type="submit"
                disabled={sending}
                className="group shrink-0 h-11 pl-5 pr-2 rounded-full bg-[#bff02e] hover:bg-[#d4f85a] text-[#0b1b3a] font-mono text-[11px] tracking-[0.12em] uppercase font-semibold flex items-center gap-2.5 transition-all shadow-[0_12px_28px_-8px_rgba(140,200,10,0.55),inset_0_1px_0_rgba(255,255,255,0.6)] disabled:opacity-80"
              >
                <span>{sending ? "Opening…" : "Join Wishlist"}</span>
                <span className="w-8 h-8 rounded-full bg-[#0b1b3a] text-[#bff02e] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* ============ TOP ROW: brand + nav ============ */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#0b1b3a]/10">
          <div className="space-y-2">
            <BrandLogo size={26} />
            <p className="mono-label text-[11px]">
              AUTONOMOUS WORKFLOW INFRASTRUCTURE FOR AGENCIES
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-[11px] text-[#3d4f6b]">
            <button onClick={() => scrollTo("home")} className="hover:text-[#1f6feb] transition-colors uppercase">
              Home
            </button>
            <button onClick={() => scrollTo("features")} className="hover:text-[#1f6feb] transition-colors uppercase">
              Features
            </button>
            <button onClick={() => scrollTo("why")} className="hover:text-[#1f6feb] transition-colors uppercase">
              Why Flomynt
            </button>
            <button onClick={() => scrollTo("wishlist")} className="hover:text-[#1f6feb] transition-colors uppercase">
              Wishlist
            </button>
            <button onClick={() => scrollTo("contact")} className="hover:text-[#1f6feb] transition-colors uppercase">
              Contact
            </button>
          </nav>
        </div>

        {/* ============ META ROW ============ */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#0b1b3a]/50">
          <p>© {new Date().getFullYear()} Flomynt Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#1f6feb] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1f6feb] animate-pulse" />
              All systems nominal
            </span>
            <span>Encrypted end-to-end</span>
          </div>
        </div>

        {/* ============ GIANT GHOSTED WORDMARK ============ */}
        <div className="pt-6 select-none overflow-hidden flex justify-center items-center opacity-90">
          <p
            className="font-light tracking-[-0.04em] leading-[0.8] text-transparent text-center select-none"
            style={{
              fontSize: "clamp(64px, 18vw, 240px)",
              backgroundImage: "linear-gradient(90deg, #1f6feb 0%, #2a93ff 45%, #18c6b4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FLOMYNT
          </p>
        </div>
      </div>
    </footer>
  );
}
