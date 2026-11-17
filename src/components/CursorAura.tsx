"use client";

import React, { useEffect, useRef } from "react";

/** Soft gradient cursor aura + a crisp trailing ring that grows over interactive elements. Desktop pointer only. */
export default function CursorAura() {
  const aura = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let tx = -200, ty = -200, rx = -200, ry = -200, ax = -200, ay = -200;
    let raf = 0;
    let big = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as HTMLElement | null;
      big = !!t?.closest("a,button,input,textarea,select,[role='button']");
    };
    const tick = () => {
      rx += (tx - rx) * 0.22;
      ry += (ty - ry) * 0.22;
      ax += (tx - ax) * 0.07;
      ay += (ty - ay) * 0.07;
      if (aura.current) aura.current.style.transform = `translate3d(${ax - 260}px, ${ay - 260}px, 0)`;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${big ? 1.9 : 1})`;
        ring.current.style.opacity = big ? "0.55" : "0.9";
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="hidden [@media(hover:hover)_and_(pointer:fine)]:block pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div
        ref={aura}
        className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(31,111,235,0.16) 0%, rgba(24,198,180,0.08) 40%, transparent 70%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        ref={ring}
        className="absolute top-0 left-0 w-8 h-8 rounded-full will-change-transform transition-[opacity] duration-200"
        style={{ border: "1.5px solid rgba(31,111,235,0.7)", boxShadow: "0 0 18px rgba(31,111,235,0.35)" }}
      />
    </div>
  );
}
