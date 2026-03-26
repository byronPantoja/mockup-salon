"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

const features = [
  "Priority Booking & Seasonal Treatments",
  "Exclusive Access to the Journal Deep-Dive Series",
  "Member-Only Evening Retreats",
];

export default function MembershipPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/membership-bg.jpg"
          alt="Serenity Studio interior"
          fill
          className="object-cover"
          style={{ filter: "blur(12px) brightness(0.4)", transform: "scale(1.05)" }}
          priority
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-32">
        <div className="max-w-md mx-auto px-6 text-center w-full">
          {!submitted ? (
            /* Default state */
            <>
              {/* Lock icon */}
              <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="material-symbols-outlined text-white/60 text-2xl">
                  lock
                </span>
              </div>

              {/* Label */}
              <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-white/50 mb-4">
                Coming Fall 2026
              </p>

              {/* Headline */}
              <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-6xl text-white mb-4">
                The Inner{" "}
                <span className="italic font-light">Circle</span>
              </h1>

              {/* Subtitle */}
              <p className="font-[family-name:var(--font-body)] text-white/60 mb-12">
                A curated wellness journey, arriving Fall 2026.
              </p>

              {/* Feature preview */}
              <div className="opacity-30">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-4 py-4 border-b border-white/10 text-left"
                  >
                    <span className="text-primary-fixed-dim text-sm">✦</span>
                    <span className="font-[family-name:var(--font-body)] text-sm text-white">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Email capture */}
              <div className="mt-10 bg-white/5 border border-white/15 rounded-xl p-8">
                <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-white/60 mb-6">
                  Be the first to know
                </p>
                <form
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/30 font-[family-name:var(--font-body)] text-sm focus:outline-none focus:border-white/40 flex-1"
                  />
                  <button
                    type="submit"
                    className="btn-gradient text-on-primary px-8 py-3 rounded-full font-[family-name:var(--font-label)] font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all whitespace-nowrap"
                  >
                    Stay in the Loop
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="animate-fade-in">
              {/* Check icon */}
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
                <span
                  className="material-symbols-outlined text-primary-fixed-dim text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl text-white mb-4">
                You&apos;re on the{" "}
                <span className="italic font-light">List</span>
              </h1>

              {/* Confirmation card */}
              <div className="bg-white/5 border border-white/15 rounded-xl p-6 mb-10 max-w-sm mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-xl">
                    mail
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-white/80 text-sm">{email}</span>
                </div>
                <p className="font-[family-name:var(--font-body)] text-white/40 text-xs mt-3">
                  We&apos;ll be in touch when memberships open in Fall 2026.
                </p>
              </div>

              {/* Return to top */}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="border border-white/25 text-white/70 px-10 py-4 rounded-full font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase hover:border-white/50 hover:text-white transition-all duration-500"
              >
                Return to Top
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
