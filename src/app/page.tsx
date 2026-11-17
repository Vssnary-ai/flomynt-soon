"use client";

import React, { useEffect } from "react";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesGrid from "@/components/FeaturesGrid";
import WhatIsFlomynt from "@/components/WhatIsFlomynt";
import WhyFlomynt from "@/components/WhyFlomynt";
import WishlistSection from "@/components/WishlistSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorAura from "@/components/CursorAura";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "instant" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="theme-bright relative min-h-screen overflow-x-clip selection:bg-[#1f6feb]/25 selection:text-[#0b1b3a]">
      {/* Ambient background with aurora blobs, mouse spotlight, particles, dot grid & grain */}
      <AmbientBackground />

      {/* Top scroll progress indicator */}
      <ScrollProgress />

      {/* Interactive cursor aura (desktop pointers only) */}
      <CursorAura />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="relative z-10">
        {/* 1. Hero (#home) with giant ghosted wordmark and amber light beam */}
        <Hero />

        {/* 2. Features Grid (#features) with 7 cards & wireframe SVGs */}
        <FeaturesGrid />

        {/* 3. What Is Flomynt (#what) sticky left & timeline with 7 chapters */}
        <WhatIsFlomynt />

        {/* 4. Why Flomynt (#why) legacy vs autonomous comparison table */}
        <WhyFlomynt />

        {/* 5. Wishlist Section (#wishlist) with 16:10 carousel & signup form */}
        <WishlistSection />

        {/* 6. Contact Section (#contact) direct engineering inquiry */}
        <ContactSection />
      </main>

      {/* Footer with giant ghosted wordmark */}
      <Footer />
    </div>
  );
}
