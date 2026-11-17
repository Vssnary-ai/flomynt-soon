"use client";

import React from "react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden pt-16 pb-10 px-5 sm:px-10">
      {/* Background ambient warm beam for the giant ghosted wordmark */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[50vw] h-[300px] opacity-40 blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, rgba(24, 198, 180, 0.35) 0%, rgba(31, 111, 235, 0.18) 40%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1340px] mx-auto relative z-10">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-14 border-b border-[#0b1b3a]/10">
          <div className="space-y-2">
            <BrandLogo size={26} />
            <p className="mono-label text-[11px]">
              AUTONOMOUS WORKFLOW INFRASTRUCTURE FOR AGENCIES
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-[11px] text-[#3d4f6b]">
            <button
              onClick={() => scrollTo("home")}
              className="hover:text-[#1f6feb] transition-colors uppercase"
            >
              HOME
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="hover:text-[#1f6feb] transition-colors uppercase"
            >
              FEATURES
            </button>
            <button
              onClick={() => scrollTo("what")}
              className="hover:text-[#1f6feb] transition-colors uppercase"
            >
              WHAT IS FLOMYNT
            </button>
            <button
              onClick={() => scrollTo("why")}
              className="hover:text-[#1f6feb] transition-colors uppercase"
            >
              WHY FLOMYNT
            </button>
            <button
              onClick={() => scrollTo("wishlist")}
              className="hover:text-[#1f6feb] transition-colors uppercase"
            >
              WISHLIST
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:text-[#1f6feb] transition-colors uppercase"
            >
              CONTACT
            </button>
          </nav>
        </div>

        {/* Middle Details & Disclaimers */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#0b1b3a]/45">
          <p>© {new Date().getFullYear()} Flomynt Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#1f6feb]">STATUS: ALL SYSTEMS NOMINAL</span>
            <span>ENCRYPTED END-TO-END</span>
          </div>
        </div>

        {/* Bottom: Giant Ghosted Footer Wordmark (Grok reference style) */}
        <div className="pt-8 select-none overflow-hidden flex justify-center items-center opacity-90 transition-opacity">
          <p
            className="font-light tracking-[-0.04em] leading-[0.8] text-transparent text-center select-none"
            style={{
              fontSize: "clamp(64px, 18vw, 240px)",
              backgroundImage:
                "linear-gradient(90deg, #1f6feb 0%, #2a93ff 45%, #18c6b4 100%)",
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

