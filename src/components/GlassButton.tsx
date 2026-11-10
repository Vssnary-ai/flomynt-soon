"use client";

import React from "react";

interface GlassButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  round?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

export default function GlassButton({
  href,
  children,
  className = "",
  round = false,
  ariaLabel,
  onClick,
}: GlassButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    backdrop-blur-xl
    bg-white/[0.12]
    border border-white/[0.08]
    text-white text-sm font-medium
    transition-all duration-200
    hover:bg-white/[0.18] hover:border-white/[0.14]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19C3E6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black
    active:scale-95
    ${round ? "h-11 w-11 rounded-full p-0" : "h-11 rounded-full px-5 gap-2"}
    ${className}
  `.trim();

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      aria-label={ariaLabel}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
