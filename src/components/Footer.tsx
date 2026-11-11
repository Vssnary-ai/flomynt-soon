"use client";

import React from "react";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/[0.14] overflow-hidden pt-16 pb-12 px-6 sm:px-10">
      {/* Background ambient warm beam for the giant ghosted wordmark */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[50vw] h-[300px] opacity-40 blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, rgba(233, 180, 91, 0.35) 0%, rgba(233, 180, 91, 0.1) 40%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1340px] mx-auto relative z-10">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-14 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-light tracking-[-0.03em] text-2xl text-white">
                Flomynt
              </span>
            </div>
            <p className="mono-label text-[11px] text-[#8a8a8a]">
              AUTONOMOUS WORKFLOW INFRASTRUCTURE FOR AGENCIES
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-[11px] text-[#8a8a8a]">
            <button
              onClick={() => scrollTo("home")}
              className="hover:text-white transition-colors uppercase"
            >
              HOME
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="hover:text-white transition-colors uppercase"
            >
              FEATURES
            </button>
            <button
              onClick={() => scrollTo("what")}
              className="hover:text-white transition-colors uppercase"
            >
              WHAT IS FLOMYNT
            </button>
            <button
              onClick={() => scrollTo("why")}
              className="hover:text-white transition-colors uppercase"
            >
              WHY FLOMYNT
            </button>
            <button
              onClick={() => scrollTo("wishlist")}
              className="hover:text-white transition-colors uppercase"
            >
              WISHLIST
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:text-white transition-colors uppercase"
            >
              CONTACT
            </button>
          </nav>
        </div>

        {/* Middle Details & Disclaimers */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} Flomynt Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#e9b45b]">STATUS: ALL SYSTEMS NOMINAL</span>
            <span>ENCRYPTED END-TO-END</span>
          </div>
        </div>

        {/* Bottom: Giant Ghosted Footer Wordmark (Grok reference style) */}
        <div className="pt-8 select-none overflow-hidden flex justify-center items-center opacity-60 hover:opacity-85 transition-opacity">
          <p
            className="font-light tracking-[-0.04em] leading-[0.8] text-transparent text-center"
            style={{
              fontSize: "clamp(64px, 18vw, 240px)",
              backgroundImage:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.45) 85%, rgba(233, 180, 91, 0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.08)",
            }}
          >
            FLOMYNT
          </p>
        </div>
      </div>
    </footer>
  );
}
