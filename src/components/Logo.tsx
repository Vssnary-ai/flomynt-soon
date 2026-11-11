"use client";

import React from "react";

/**
 * Flomynt wordmark logo with abstract flow-node icon.
 * Dark charcoal color ensures maximum contrast on the white frosted card top.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Abstract flow-node icon */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="7" cy="14" r="3.2" fill="#0a0a0c" />
        <circle cx="21" cy="7" r="2.6" fill="#0a0a0c" opacity="0.6" />
        <circle cx="21" cy="21" r="2.6" fill="#0a0a0c" opacity="0.6" />
        <path
          d="M10 14 L18 7.5"
          stroke="#0a0a0c"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M10 14 L18 20.5"
          stroke="#0a0a0c"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
      {/* Text wordmark */}
      <span className="text-[#0a0a0c] font-semibold text-[17px] tracking-[-0.01em]">
        Flomynt
      </span>
    </div>
  );
}
