"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li";
}

/** Scroll-triggered fade/rise/de-blur entrance. */
export default function Reveal({ children, delay = 0, y = 36, className, as = "div" }: RevealProps) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
