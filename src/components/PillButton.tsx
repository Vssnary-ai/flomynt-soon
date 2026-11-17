"use client";

import React from "react";

interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  arrow?: boolean;
  className?: string;
}

const baseStyle: React.CSSProperties = {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: "var(--font-mono)",
  textTransform: "uppercase",
  fontSize: "11px",
  letterSpacing: "0.08em",
  padding: "8px 20px",
  border: "1px solid var(--pill-line, rgba(255,255,255,.14))",
  borderRadius: "9999px",
  color: "var(--pill-ink, #ffffff)",
  cursor: "pointer",
  transition: "all 200ms",
  backgroundColor: "transparent",
};

const hoverStyle: React.CSSProperties = {
  backgroundColor: "var(--pill-hover-bg, #ffffff)",
  color: "var(--pill-hover-ink, #050505)",
};

export default function PillButton({
  children,
  href,
  onClick,
  arrow,
  className,
}: PillButtonProps) {
  const [hovered, setHovered] = React.useState(false);

  const style: React.CSSProperties = {
    ...baseStyle,
    ...(hovered ? hoverStyle : {}),
  };

  const content = (
    <>
      {children}
      {arrow && " ↗"}
    </>
  );

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (href) {
    return (
      <a href={href} style={style} className={className} {...handlers}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={className}
      {...handlers}
    >
      {content}
    </button>
  );
}
