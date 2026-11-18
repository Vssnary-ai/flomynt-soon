import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  /** Rendered height of the wordmark in px. Width scales from the source aspect ratio (3:1). */
  size?: number;
  className?: string;
  /** Kept for backward compatibility — the wordmark already contains the brand text, so this is ignored. */
  showText?: boolean;
}

/**
 * Flomynt brand lock-up — the full wordmark image (icon + "flomynt").
 * Source asset is 2172×724 (~3:1), so width = size * 3 keeps the proportions.
 */
export default function BrandLogo({ size = 22, className = "" }: BrandLogoProps) {
  const height = size;
  const width = Math.round(size * 3); // aspect ratio of the wordmark asset

  return (
    <div className={`flex items-center ${className}`} style={{ height }}>
      <Image
        src="/logo-wordmark.png"
        alt="Flomynt"
        width={width * 2}
        height={height * 2}
        priority
        draggable={false}
        className="object-contain"
        style={{ height, width: "auto", pointerEvents: "none" }}
      />
    </div>
  );
}
