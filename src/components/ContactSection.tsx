"use client";

import React, { useState } from "react";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agency, setAgency] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, agency, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to transmit message");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-36 px-5 sm:px-10"
    >
      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Details */}
          <div className="lg:col-span-5">
            <SectionLabel text="CONTACT" />
            <h2 className="mt-4 font-light text-3xl sm:text-5xl text-[#14122b] tracking-[-0.035em] leading-[1.08]">
              Direct <span className="b-grad-text">Engineering</span> Inquiries
            </h2>
            <p className="mt-6 text-[#4a4766] text-sm sm:text-base leading-relaxed">
              Have inquiries regarding custom enterprise enclaves, agency white-label licensing, or private AI infrastructure? Speak directly with our core engineering team.
            </p>

            <div className="mt-10 space-y-6 border-t border-[#14122b]/10 pt-8 text-xs font-mono">
              <div>
                <p className="text-[#14122b]/45 uppercase mb-1">HEADQUARTERS</p>
                <p className="text-[#14122b]">San Francisco, CA · Remote First</p>
              </div>

              <div>
                <p className="text-[#14122b]/45 uppercase mb-1">COMMUNICATION</p>
                <p className="text-[#14122b]">team@flomynt.com</p>
              </div>

              <div>
                <p className="text-[#14122b]/45 uppercase mb-1">AVAILABILITY</p>
                <p className="text-[#6d4cff]">Private Beta Wave 1 · Q2 2026</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hairline Glass Form */}
          <Reveal className="lg:col-span-7 b-glass rounded-[32px] p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full border border-[#6d4cff] text-[#6d4cff] flex items-center justify-center mx-auto text-xl font-mono">
                  ✓
                </div>
                <h3 className="text-2xl font-light text-[#14122b]">
                  Message Dispatched
                </h3>
                <p className="text-sm text-[#4a4766] max-w-[360px] mx-auto leading-relaxed">
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
                      className="block mono-label text-[10px] mb-2"
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
                      className="w-full bg-white/70 border border-[#14122b]/[0.12] focus:border-[#6d4cff] focus:shadow-[0_0_0_4px_rgba(109,76,255,0.14)] rounded-xl px-4 py-3 text-sm text-[#14122b] placeholder:text-[#14122b]/30 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block mono-label text-[10px] mb-2"
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
                      className="w-full bg-white/70 border border-[#14122b]/[0.12] focus:border-[#6d4cff] focus:shadow-[0_0_0_4px_rgba(109,76,255,0.14)] rounded-xl px-4 py-3 text-sm text-[#14122b] placeholder:text-[#14122b]/30 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-agency"
                    className="block mono-label text-[10px] mb-2"
                  >
                    AGENCY OR ORGANIZATION
                  </label>
                  <input
                    id="contact-agency"
                    type="text"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    placeholder="Apex Automation Partners"
                    className="w-full bg-white/70 border border-[#14122b]/[0.12] focus:border-[#6d4cff] focus:shadow-[0_0_0_4px_rgba(109,76,255,0.14)] rounded-xl px-4 py-3 text-sm text-[#14122b] placeholder:text-[#14122b]/30 outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block mono-label text-[10px] mb-2"
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
                    className="w-full bg-white/70 border border-[#14122b]/[0.12] focus:border-[#6d4cff] focus:shadow-[0_0_0_4px_rgba(109,76,255,0.14)] rounded-xl px-4 py-3 text-sm text-[#14122b] placeholder:text-[#14122b]/30 outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto b-btn-primary font-mono uppercase tracking-wider !text-xs disabled:opacity-70"
                  >
                    {loading ? "TRANSMITTING..." : "TRANSMIT INQUIRY ↗"}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

