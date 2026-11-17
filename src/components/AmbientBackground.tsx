"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Page-wide bright atmosphere: scroll-parallaxed pastel aurora orbs that
 * shift hue as you travel down the page, over a faint dotted grid.
 */
export default function AmbientBackground() {
  const [reduced, setReduced] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(q.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    q.addEventListener("change", h);
    return () => q.removeEventListener("change", h);
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "-70vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-110vh"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0vh", "-40vh"]);
  const hue = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const filter = useTransform(hue, (h) => `blur(110px) hue-rotate(${h}deg)`);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(31,111,235,0.22) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
        }}
      />
      {!reduced && (
        <>
          <motion.div
            style={{ y: y1, filter }}
            className="absolute -top-[10%] -left-[10%] w-[55vw] max-w-[760px] aspect-square rounded-full bg-[#a9d1ff]/60"
          />
          <motion.div
            style={{ y: y2, filter }}
            className="absolute top-[40%] -right-[12%] w-[50vw] max-w-[700px] aspect-square rounded-full bg-[#d6ebff]/55"
          />
          <motion.div
            style={{ y: y3, filter }}
            className="absolute top-[85%] left-[20%] w-[55vw] max-w-[760px] aspect-square rounded-full bg-[#bfe6ff]/55"
          />
        </>
      )}
    </div>
  );
}
