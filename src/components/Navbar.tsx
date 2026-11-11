"use client";

import React, { useState, useEffect } from "react";
import PillButton from "./PillButton";

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.14] py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1340px] mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Left: Brand mark & Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
            className="flex items-center gap-2.5 text-white hover:opacity-80 transition-opacity"
            aria-label="Flomynt Home"
          >
            {/* Minimalist geometric wireframe logo mark */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#e9b45b]"
              aria-hidden="true"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="white" strokeWidth="1.2" />
              <polyline points="2 17 12 22 22 17" stroke="#e9b45b" strokeWidth="1.2" />
              <polyline points="2 12 12 17 22 12" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" />
            </svg>
            <span className="font-light tracking-[-0.03em] text-[19px] text-white">
              Flomynt
            </span>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive =
                activeSection === link.href.replace("#", "") ||
                (link.href === "#home" && activeSection === "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={`mono-label transition-colors duration-200 ${
                    isActive
                      ? "text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                      : "text-[#8a8a8a] hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Pill button */}
          <div className="hidden sm:flex items-center gap-3">
            <PillButton
              href="#contact"
              onClick={() => scrollTo("#contact")}
            >
              CONTACT US
            </PillButton>
          </div>

          {/* Mobile Hamburger button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white/80 hover:text-white focus:outline-none"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-between px-8 py-24 md:hidden">
          <nav className="flex flex-col gap-6 pt-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="mono-label text-base text-[#8a8a8a] hover:text-white py-2 border-b border-white/[0.08]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-6">
            <PillButton
              href="#contact"
              onClick={() => scrollTo("#contact")}
              className="w-full text-center py-3"
            >
              CONTACT US
            </PillButton>
          </div>
        </div>
      )}
    </>
  );
}
