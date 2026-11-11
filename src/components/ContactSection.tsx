"use client";

import React, { useState } from "react";
import SectionLabel from "./SectionLabel";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agency, setAgency] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050505] py-28 px-6 sm:px-10 border-t border-white/[0.14]"
    >
      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Details */}
          <div className="lg:col-span-5">
            <SectionLabel text="CONTACT" />
            <h2 className="mt-4 font-light text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-tight">
              Direct Engineering Inquiries
            </h2>
            <p className="mt-6 text-[#8a8a8a] text-sm sm:text-base leading-relaxed">
              Have inquiries regarding custom enterprise enclaves, agency white-label licensing, or private AI infrastructure? Speak directly with our core engineering team.
            </p>

            <div className="mt-10 space-y-6 border-t border-white/[0.08] pt-8 text-xs font-mono">
              <div>
                <p className="text-white/40 uppercase mb-1">HEADQUARTERS</p>
                <p className="text-white">San Francisco, CA · Remote First</p>
              </div>

              <div>
                <p className="text-white/40 uppercase mb-1">COMMUNICATION</p>
                <p className="text-white">team@flomynt.com</p>
              </div>

              <div>
                <p className="text-white/40 uppercase mb-1">AVAILABILITY</p>
                <p className="text-[#e9b45b]">Private Beta Wave 1 · Q2 2026</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hairline Form */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/[0.14] rounded-2xl p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full border border-[#e9b45b] text-[#e9b45b] flex items-center justify-center mx-auto text-xl font-mono">
                  ✓
                </div>
                <h3 className="text-2xl font-light text-white">
                  Message Dispatched
                </h3>
                <p className="text-sm text-[#8a8a8a] max-w-[360px] mx-auto leading-relaxed">
                  Thank you, {name}. Our engineering lead will respond to {email} within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="pill-btn mt-4 text-xs"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block mono-label text-[10px] text-white/50 mb-2"
                    >
                      FULL NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-black/60 border border-white/[0.14] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block mono-label text-[10px] text-white/50 mb-2"
                    >
                      WORK EMAIL *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@agency.com"
                      className="w-full bg-black/60 border border-white/[0.14] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-agency"
                    className="block mono-label text-[10px] text-white/50 mb-2"
                  >
                    AGENCY OR ORGANIZATION
                  </label>
                  <input
                    id="contact-agency"
                    type="text"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    placeholder="Apex Automation Partners"
                    className="w-full bg-black/60 border border-white/[0.14] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block mono-label text-[10px] text-white/50 mb-2"
                  >
                    MESSAGE OR WORKFLOW SPEC *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the workflows you're building, clients you serve, or specific integration requirements..."
                    className="w-full bg-black/60 border border-white/[0.14] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto pill-btn py-3 px-8 text-xs font-semibold hover:bg-white hover:text-black transition-all"
                  >
                    {loading ? "TRANSMITTING..." : "TRANSMIT INQUIRY ↗"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
