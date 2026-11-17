"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "./BrandLogo";

const NAV_LINKS = [
  { name: "HOME", href: "#home" },
  { name: "FEATURES", href: "#features" },
  { name: "WHAT IS FLOMYNT", href: "#what" },
  { name: "WHY FLOMYNT", href: "#why" },
  { name: "WISHLIST", href: "#wishlist" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ["home", "features", "what", "why", "wishlist", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto mx-auto max-w-[1180px] flex items-center justify-between rounded-full b-glass !bg-white/80 transition-all duration-500 pl-5 pr-2 sm:pr-2.5 ${
            scrolled ? "py-2 shadow-[0_18px_50px_-18px_rgba(80,50,200,0.45)]" : "py-2.5"
          }`}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
            className="hover:opacity-80 transition-opacity"
            aria-label="Flomynt Home"
          >
            <BrandLogo size={24} />
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={`relative mono-label px-3.5 py-2 rounded-full transition-colors duration-200 ${
                    isActive ? "!text-[#14122b]" : "hover:!text-[#14122b]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_4px_14px_-4px_rgba(109,76,255,0.4)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="b-btn-primary !py-2.5 !px-5 !text-[11px] font-mono uppercase tracking-[0.08em]"
            >
              CONTACT US <span aria-hidden>↗</span>
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 mr-1 rounded-full text-[#14122b] hover:bg-white/70 focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#f6f5ff]/90 backdrop-blur-2xl flex flex-col justify-between px-8 py-28 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="text-3xl font-light tracking-tight text-[#14122b] py-3 border-b border-[#14122b]/10"
                >
                  {link.name.charAt(0) + link.name.slice(1).toLowerCase()}
                </motion.a>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="b-btn-primary w-full"
            >
              CONTACT US ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
