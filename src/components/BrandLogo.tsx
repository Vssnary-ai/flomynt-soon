import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({
  size = 22,
  className = "",
  showText = true,
}: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Real brand logo icon */}
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image
          src="/logo.png"
          alt="Flomynt Emblem"
          width={size}
          height={size}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {showText && (
        <span className="font-light tracking-[-0.03em] text-[19px] text-white">
          Flomynt
        </span>
      )}
    </div>
  );
}
