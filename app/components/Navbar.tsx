"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Treatments", href: "/treatments" },
  { label: "Journal", href: "/journal" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className={`flex items-center gap-2 transition-colors duration-500 cursor-pointer ${
            scrolled ? "text-primary" : "text-white"
          }`}
        >
          <span className="material-symbols-outlined text-2xl">spa</span>
          <span className="font-[family-name:var(--font-headline)] text-xl md:text-2xl font-bold">
            Serenity Studio
          </span>
        </Link>
        <div className="hidden lg:flex gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              className={`font-[family-name:var(--font-headline)] text-lg tracking-tight transition-all duration-500 ${
                scrolled
                  ? "text-stone-500 hover:text-emerald-800 hover:tracking-widest"
                  : "text-white/70 hover:text-white hover:tracking-widest"
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/#booking"
            className="hidden lg:block btn-gradient text-on-primary px-8 py-3 rounded-full font-[family-name:var(--font-label)] font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all"
          >
            Book Session
          </Link>
          <button
            type="button"
            className={`lg:hidden transition-colors duration-500 ${
              scrolled ? "text-primary" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-sm border-t border-outline-variant/20 px-6 py-6 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-[family-name:var(--font-label)] text-sm uppercase tracking-widest text-on-surface hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#booking"
            className="btn-gradient text-on-primary px-8 py-3 rounded-full font-[family-name:var(--font-label)] font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Session
          </Link>
        </div>
      )}
    </nav>
  );
}
