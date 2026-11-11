"use client";

import GlassButton from "@/components/GlassButton";
import Carousel from "@/components/Carousel";
import WaitlistForm from "@/components/WaitlistForm";

const visitSiteUrl =
  process.env.NEXT_PUBLIC_VISIT_SITE_URL || "https://flomynt.com";
const sparkleUrl =
  process.env.NEXT_PUBLIC_SPARKLE_URL || "https://flomynt.com";

export default function Home() {
  return (
    <main className="relative bg-black text-white w-full min-h-[100dvh] lg:h-[100dvh] lg:overflow-hidden flex flex-col justify-between">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(25, 195, 230, 0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main content grid: Vertically centered two columns on desktop */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-8 pb-32 lg:px-8 lg:py-0">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          {/* LEFT: Showcase carousel card */}
          <div className="w-full max-w-[400px] sm:max-w-[440px] lg:max-w-none lg:w-auto flex items-center justify-center flex-shrink-0">
            <div className="w-full lg:w-auto h-auto lg:h-[min(80vh,700px)] aspect-[4/5] flex">
              <Carousel />
            </div>
          </div>

          {/* RIGHT: Waitlist panel */}
          <div className="w-full max-w-[420px] flex items-center justify-center flex-shrink-0">
            <WaitlistForm />
          </div>
        </div>
      </div>

      {/* Bottom controls on desktop & mobile */}
      {/* Bottom-left: Visit site glass button */}
      <div className="fixed bottom-6 left-6 z-30">
        <GlassButton href={visitSiteUrl} ariaLabel="Visit Flomynt website">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 10L10 4" />
            <path d="M5 4H10V9" />
          </svg>
          Visit site
        </GlassButton>
      </div>

      {/* Bottom-right: Sparkle glass button */}
      <div className="fixed bottom-6 right-6 z-30">
        <GlassButton href={sparkleUrl} round ariaLabel="Explore Flomynt AI">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
          </svg>
        </GlassButton>
      </div>

      {/* Bottom-center: Footer text */}
      <footer className="relative lg:fixed lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 z-20 pb-8 pt-4 lg:py-0 text-center pointer-events-none">
        <p className="text-white/40 text-xs tracking-wide">Built by Flomynt</p>
      </footer>
    </main>
  );
}
