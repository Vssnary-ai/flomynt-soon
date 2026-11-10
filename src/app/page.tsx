"use client";

import dynamic from "next/dynamic";
import GlassButton from "@/components/GlassButton";

const Carousel = dynamic(() => import("@/components/Carousel"), { ssr: false });
const WaitlistForm = dynamic(() => import("@/components/WaitlistForm"), {
  ssr: false,
});

const visitSiteUrl =
  process.env.NEXT_PUBLIC_VISIT_SITE_URL || "https://flomynt.com";
const sparkleUrl =
  process.env.NEXT_PUBLIC_SPARKLE_URL || "https://flomynt.com";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] bg-black flex flex-col">
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 lg:px-8">
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-16">
          {/* LEFT: Carousel card */}
          <div className="w-full lg:w-auto lg:flex-1 flex justify-center">
            <div
              className="w-full max-w-[440px] lg:max-w-none"
              style={{
                maxHeight: "min(80dvh, 680px)",
              }}
            >
              <Carousel />
            </div>
          </div>

          {/* RIGHT: Waitlist form */}
          <div className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </div>

      {/* Bottom-left: Visit site button */}
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

      {/* Bottom-right: Sparkle icon button */}
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

      {/* Footer */}
      <footer className="pb-8 pt-4 text-center">
        <p className="text-white/30 text-xs">Built by Flomynt</p>
      </footer>
    </main>
  );
}
