"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideTextProps {
  tag: string;
  headline: string;
  subtext: string;
  slideKey: number;
  reducedMotion: boolean;
}

/**
 * Parses headline and wraps *word* in italic serif span.
 */
function renderHeadline(headline: string) {
  const parts = headline.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <span
          key={i}
          className="font-normal italic"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const containerVariants = {
  enter: {
    transition: {
      staggerChildren: 0.06,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariantsNormal = {
  initial: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] },
  },
};

const itemVariantsReduced = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function SlideText({
  tag,
  headline,
  subtext,
  slideKey,
  reducedMotion,
}: SlideTextProps) {
  const itemVariants = reducedMotion ? itemVariantsReduced : itemVariantsNormal;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        variants={containerVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="flex flex-col gap-3"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Tag pill */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
            <span
              className="block h-1.5 w-1.5 rounded-full bg-[#19C3E6]"
              style={{
                boxShadow: "0 0 6px 2px rgba(25, 195, 230, 0.5)",
              }}
              aria-hidden="true"
            />
            {tag}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          className="text-white font-medium leading-[1.08] tracking-[-0.02em]"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
          }}
        >
          {renderHeadline(headline)}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-sm text-white/[0.65] leading-relaxed max-w-[340px]"
          style={{ fontSize: "clamp(14px, 1.5vw, 15px)" }}
        >
          {subtext}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
