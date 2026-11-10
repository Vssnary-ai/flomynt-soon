"use client";

import React from "react";

/**
 * Flomynt wordmark logo with abstract flow-node icon.
 * Replace this component with your real logo file later.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Abstract flow-node icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="7" cy="14" r="3" fill="#19C3E6" />
        <circle cx="21" cy="7" r="2.5" fill="#ffffff" opacity="0.7" />
        <circle cx="21" cy="21" r="2.5" fill="#ffffff" opacity="0.7" />
        <path
          d="M10 14 L18 7.5"
          stroke="#19C3E6"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M10 14 L18 20.5"
          stroke="#19C3E6"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
      {/* Text wordmark */}
      <span className="text-white font-medium text-[17px] tracking-[-0.01em]">
        Flomynt
      </span>
    </div>
  );
}
