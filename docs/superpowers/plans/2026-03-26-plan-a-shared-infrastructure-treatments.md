# Plan A: Shared Infrastructure + Treatments Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract Navbar, Footer, and BookingWidget into shared components, then build the `/treatments` page with alternating image/text layout and accordion booking.

**Architecture:** Three shared components are extracted from `app/page.tsx` into `app/components/`. The home page imports them with no visible change. The new `app/treatments/page.tsx` (client component) uses these shared components plus a local accordion state to toggle inline `BookingWidget` panels per treatment.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, Tailwind CSS v4, next/image, next/link, Material Symbols (loaded globally)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `app/components/Navbar.tsx` | Create | Fixed nav with scroll state, updated route hrefs |
| `app/components/Footer.tsx` | Create | Site-wide footer with updated route links |
| `app/components/BookingWidget.tsx` | Create | Full booking flow (date/time/treatment/email/confirmation) |
| `app/page.tsx` | Modify | Replace inline Navbar/Footer/booking state with imports |
| `app/treatments/layout.tsx` | Create | Exports page metadata (required since page.tsx is client) |
| `app/treatments/page.tsx` | Create | Treatments listing with accordion booking |

---

### Task 1: Create Navbar component

**Files:**
- Create: `app/components/Navbar.tsx`

- [ ] **Step 1: Create the file**

```tsx
// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
        <div className="hidden md:flex gap-10">
          {[
            { label: "Treatments", href: "/treatments" },
            { label: "Journal", href: "/journal" },
            { label: "Membership", href: "/membership" },
            { label: "Contact", href: "/#contact" },
          ].map((link) => (
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
        <Link
          href="/#booking"
          className="btn-gradient text-on-primary px-6 md:px-8 py-3 rounded-full font-[family-name:var(--font-label)] font-medium tracking-wide hover:opacity-90 transition-all duration-500 text-sm md:text-base"
        >
          Book Session
        </Link>

        <button
          type="button"
          className="md:hidden ml-4"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className={`material-symbols-outlined text-2xl ${
              scrolled ? "text-on-surface" : "text-white"
            }`}
          >
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass-nav mt-2 mx-4 rounded-xl p-6 space-y-4 animate-fade-in">
          {[
            { label: "Treatments", href: "/treatments" },
            { label: "Journal", href: "/journal" },
            { label: "Membership", href: "/membership" },
            { label: "Contact", href: "/#contact" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block font-[family-name:var(--font-headline)] text-lg text-on-surface py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/dbp/Developer/mockup-salon && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/Navbar.tsx
git commit -m "feat: extract Navbar to shared component with updated route hrefs"
```

---

### Task 2: Create Footer component

**Files:**
- Create: `app/components/Footer.tsx`

- [ ] **Step 1: Create the file**

```tsx
// app/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-16 md:py-20 px-6 md:px-12 bg-surface-container-high">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
        {/* Brand & Address */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">spa</span>
            <span className="font-[family-name:var(--font-headline)] text-xl text-on-surface font-bold">
              Serenity Studio
            </span>
          </div>
          <div className="text-on-surface-variant font-[family-name:var(--font-body)] text-sm tracking-wide leading-relaxed">
            124 Serenity Lane
            <br />
            West Hollywood, CA 90069
            <br />
            United States
          </div>
          <div className="flex gap-4">
            <a
              className="text-primary hover:text-primary-container transition-all text-sm font-medium"
              href="#"
            >
              Instagram
            </a>
            <a
              className="text-primary hover:text-primary-container transition-all text-sm font-medium"
              href="#"
            >
              Pinterest
            </a>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="space-y-6">
          <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest font-bold">
            The Studio
          </p>
          <ul className="space-y-4">
            {[
              { label: "Journal", href: "/journal" },
              { label: "Membership", href: "/membership" },
              { label: "Sustainability Report", href: "#" },
              { label: "Gift Cards", href: "#" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-[family-name:var(--font-body)] text-sm tracking-wide"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Hours */}
        <div className="space-y-6">
          <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest font-bold">
            Opening Hours
          </p>
          <ul className="space-y-4 font-[family-name:var(--font-body)] text-sm tracking-wide text-on-surface-variant">
            <li className="flex justify-between">
              <span>Mon - Fri</span> <span>09:00 - 20:00</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span> <span>10:00 - 18:00</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span> <span>Closed</span>
            </li>
          </ul>
        </div>
        {/* Map */}
        <div className="h-48 bg-surface-container rounded-sm relative overflow-hidden group">
          <Image
            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
            src="/images/map.jpg"
            alt="Map showing West Hollywood, CA location"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-surface/80 backdrop-blur px-4 py-2 text-xs font-[family-name:var(--font-label)] uppercase tracking-widest">
              View Map
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-16 md:mt-20 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-on-surface-variant font-[family-name:var(--font-body)] text-sm tracking-wide">
          © 2024 Serenity Studio. All rights reserved.
        </p>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
            <a
              key={link}
              className="text-on-surface-variant hover:text-primary font-[family-name:var(--font-body)] text-sm tracking-wide transition-colors"
              href="#"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "feat: extract Footer to shared component with updated route links"
```

---

### Task 3: Create BookingWidget component

**Files:**
- Create: `app/components/BookingWidget.tsx`

- [ ] **Step 1: Create the file**

This is the full booking flow extracted from `BookingSection` in `app/page.tsx` (lines 362–666). The outer `<section>` and layout grid stay in `BookingSection`; only the inner card and all its state moves here.

```tsx
// app/components/BookingWidget.tsx
"use client";

import { useState } from "react";

interface BookingWidgetProps {
  defaultTreatment?: string;
}

export default function BookingWidget({ defaultTreatment = "" }: BookingWidgetProps) {
  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTreatment, setSelectedTreatment] = useState(defaultTreatment);
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [treatmentOpen, setTreatmentOpen] = useState(false);

  const prevMonthDays = [28, 29, 30, 31];
  const days = Array.from({ length: 17 }, (_, i) => i + 1);

  const timeSlots = [
    "09:30 AM",
    "11:00 AM",
    "01:30 PM",
    "03:00 PM",
    "04:30 PM",
  ];

  const treatments = [
    { name: "Signature Facial", price: "$120", duration: "60 min" },
    { name: "Stone Therapy", price: "$150", duration: "90 min" },
    { name: "Aromatherapy", price: "$95", duration: "60 min" },
    { name: "Manicure & Pedi", price: "$85", duration: "75 min" },
    { name: "Sculpt & Lift Facial", price: "$140", duration: "60 min" },
    { name: "The Serenity Glow", price: "$120", duration: "90 min" },
    { name: "Infrared Detox", price: "$110", duration: "60 min" },
  ];

  const handleConfirm = () => {
    if (!selectedTreatment || !email) return;
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    setStep(1);
    setSelectedTreatment(defaultTreatment);
    setEmail("");
  };

  return (
    <div className="bg-surface rounded-sm editorial-shadow overflow-hidden">
      {confirmed ? (
        <div className="p-8 md:p-14 text-center animate-fade-in">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span
              className="material-symbols-outlined text-primary text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl mb-6">
            Appointment Confirmed
          </h3>
          <div className="bg-surface-container-low rounded-xl p-6 md:p-8 mb-8 max-w-md mx-auto text-left space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
              <div>
                <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">
                  Date & Time
                </p>
                <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">
                  Wednesday, Nov {selectedDate} at {selectedTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">spa</span>
              <div>
                <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">
                  Treatment
                </p>
                <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">
                  {selectedTreatment}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">mail</span>
              <div>
                <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">
                  Email
                </p>
                <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">
                  {email}
                </p>
              </div>
            </div>
          </div>
          <p className="font-[family-name:var(--font-body)] text-on-surface-variant text-sm mb-10 max-w-sm mx-auto leading-relaxed">
            A confirmation with your appointment details has been sent to your email.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase text-primary border border-primary/40 px-10 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-500"
          >
            Book Another
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {step === 1 ? (
            <>
              <div className="p-6 md:p-10 md:border-r border-b md:border-b-0 border-surface-container">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-[family-name:var(--font-headline)] text-xl">
                    November 2024
                  </h3>
                  <div className="flex gap-4">
                    <button type="button" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                      chevron_left
                    </button>
                    <button type="button" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                      chevron_right
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center text-xs font-[family-name:var(--font-label)] text-on-surface-variant mb-4 tracking-widest uppercase">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {prevMonthDays.map((d) => (
                    <div key={`prev-${d}`} className="py-3 text-on-surface-variant/30 text-sm">
                      {d}
                    </div>
                  ))}
                  {days.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`py-3 text-sm transition-colors rounded-full ${
                        selectedDate === d
                          ? "bg-primary text-white font-bold"
                          : "hover:bg-surface-container-low"
                      }`}
                      onClick={() => setSelectedDate(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 md:p-10 flex flex-col">
                <h3 className="font-[family-name:var(--font-headline)] text-xl mb-4">
                  Availability
                </h3>
                <p className="font-[family-name:var(--font-label)] text-xs text-on-surface-variant uppercase tracking-widest mb-8">
                  Wednesday, Nov {selectedDate}
                </p>
                <div className="space-y-3 flex-grow overflow-y-auto max-h-[300px] pr-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`w-full py-4 px-6 text-left font-[family-name:var(--font-label)] text-sm flex justify-between items-center rounded-sm transition-colors ${
                        selectedTime === time
                          ? "bg-primary-container/20 border border-primary/20 text-on-primary-container"
                          : "bg-surface-container-low hover:bg-surface-container-high"
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <span>{time}</span>
                      <span className={`text-[10px] tracking-tighter ${selectedTime === time ? "font-bold" : "text-on-surface-variant"}`}>
                        {selectedTime === time ? "SELECTED" : "AVAILABLE"}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-8 btn-gradient text-on-primary w-full py-4 rounded-full font-[family-name:var(--font-label)] font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Continue
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="p-6 md:p-10 md:border-r border-b md:border-b-0 border-surface-container">
                <div className="flex items-center gap-3 mb-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                  >
                    arrow_back
                  </button>
                  <h3 className="font-[family-name:var(--font-headline)] text-xl">
                    Select Treatment
                  </h3>
                </div>
                <div className="space-y-3">
                  {treatments.map((t) => (
                    <button
                      key={t.name}
                      type="button"
                      className={`w-full py-4 px-6 text-left font-[family-name:var(--font-label)] rounded-sm transition-all duration-300 ${
                        selectedTreatment === t.name
                          ? "bg-primary-container/20 border border-primary/20"
                          : "bg-surface-container-low hover:bg-surface-container-high"
                      }`}
                      onClick={() => setSelectedTreatment(t.name)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-on-surface">{t.name}</span>
                        <span className="text-primary font-semibold">{t.price}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1 block">
                        {t.duration}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 md:p-10 flex flex-col">
                <h3 className="font-[family-name:var(--font-headline)] text-xl mb-2">
                  Your Details
                </h3>
                <p className="font-[family-name:var(--font-label)] text-xs text-on-surface-variant uppercase tracking-widest mb-8">
                  Nov {selectedDate} · {selectedTime}
                </p>
                <div className="mb-6">
                  <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant font-[family-name:var(--font-body)]"
                    placeholder="your@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="bg-surface-container-low rounded-sm p-5 mb-6 space-y-2 flex-grow">
                  <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-3">
                    Summary
                  </p>
                  <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
                    <span className="text-on-surface-variant">Date</span>
                    <span className="text-on-surface font-medium">Nov {selectedDate}</span>
                  </div>
                  <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
                    <span className="text-on-surface-variant">Time</span>
                    <span className="text-on-surface font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
                    <span className="text-on-surface-variant">Treatment</span>
                    <span className="text-on-surface font-medium">{selectedTreatment || "—"}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={!selectedTreatment || !email}
                  className={`mt-auto btn-gradient text-on-primary w-full py-4 rounded-full font-[family-name:var(--font-label)] font-bold uppercase tracking-widest text-xs transition-all hover:scale-[1.01] active:scale-[0.99] ${
                    !selectedTreatment || !email ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"
                  }`}
                >
                  Confirm Appointment
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add app/components/BookingWidget.tsx
git commit -m "feat: extract BookingWidget as reusable component with defaultTreatment prop"
```

---

### Task 4: Update page.tsx to use shared components

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the import line and remove inline Navbar and Footer functions**

Find and replace the top of the file. The first 5 lines currently are:

```tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
```

Replace with:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingWidget from "@/app/components/BookingWidget";
```

- [ ] **Step 2: Delete the entire Navbar function**

Delete lines 6–98 (the entire `function Navbar() { ... }` block). After deletion, the next function in the file should be `function HeroSection()`.

- [ ] **Step 3: Replace BookingSection with a version that uses BookingWidget**

Find the entire `function BookingSection()` block (lines 361–667 in the original file — starts with `function BookingSection() {` and ends with the closing `}` before `function ContactSection()`). Replace it entirely with:

```tsx
function BookingSection() {
  return (
    <section className="py-20 md:py-32 bg-surface-container-low" id="booking">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl mb-8 leading-tight">
              Reserve Your <br />
              <span className="italic font-light">Moment of Peace</span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-on-surface-variant mb-12">
              Select your preferred date and time, then choose your treatment
              and provide your email for instant confirmation.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">verified</span>
                <div>
                  <h4 className="font-[family-name:var(--font-label)] font-bold text-sm uppercase">
                    Instant Confirmation
                  </h4>
                  <p className="text-xs text-on-surface-variant">Secure your slot in real-time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">history</span>
                <div>
                  <h4 className="font-[family-name:var(--font-label)] font-bold text-sm uppercase">
                    Flexible Rescheduling
                  </h4>
                  <p className="text-xs text-on-surface-variant">Cancel or move up to 24h before.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Delete the Footer function**

Delete the entire `function Footer() { ... }` block (after `ContactSection`, before `export default function Home()`).

- [ ] **Step 5: Verify build and home page behavior**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`. The home page at `http://localhost:3000` must look and behave identically — nav, footer, booking section all present and functional.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "refactor: use shared Navbar, Footer, BookingWidget components in home page"
```

---

### Task 5: Create treatments layout and page

**Files:**
- Create: `app/treatments/layout.tsx`
- Create: `app/treatments/page.tsx`

- [ ] **Step 1: Create the layout file for metadata**

```tsx
// app/treatments/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatments | Serenity Studio",
  description:
    "Explore our bespoke treatments — Sculpt & Lift Facial, The Serenity Glow, and Infrared Detox. Tailored to your unique biology.",
};

export default function TreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

- [ ] **Step 2: Create the treatments page**

```tsx
// app/treatments/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingWidget from "@/app/components/BookingWidget";

const treatments = [
  {
    slug: "sculpt-lift-facial",
    nameLine1: "Sculpt & Lift ",
    nameLine2: "Facial",
    category: "60 min · Facial",
    description:
      "A 60-minute manual lifting massage using lymphatic drainage and microcurrent technology.",
    image: "/images/facial.jpg",
    bookingName: "Sculpt & Lift Facial",
    imageLeft: true,
  },
  {
    slug: "serenity-glow",
    nameLine1: "The Serenity ",
    nameLine2: "Glow",
    category: "90 min · Glow Treatment",
    description:
      "Our signature chemical-free peel combined with LED light therapy for instant radiance.",
    image: "/images/aromatherapy.jpg",
    bookingName: "The Serenity Glow",
    imageLeft: false,
  },
  {
    slug: "infrared-detox",
    nameLine1: "Infrared ",
    nameLine2: "Detox",
    category: "60 min · Sauna Suite",
    description:
      "A private sauna suite experience designed to reduce inflammation and boost cellular repair.",
    image: "/images/stone.jpg",
    bookingName: "Infrared Detox",
    imageLeft: true,
  },
];

export default function TreatmentsPage() {
  const [openTreatment, setOpenTreatment] = useState<string | null>(null);

  const toggleTreatment = (slug: string) => {
    setOpenTreatment((prev) => (prev === slug ? null : slug));
  };

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero header */}
        <div className="py-20 md:py-28 text-center border-b border-outline-variant/20 px-6">
          <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-primary mb-4">
            The Studio · Our Offerings
          </p>
          <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-6xl mb-6">
            The Art of <em className="font-light">Rejuvenation</em>
          </h1>
          <p className="font-[family-name:var(--font-body)] text-on-surface-variant max-w-md mx-auto">
            Each session is tailored to your unique biology and peace of mind.
          </p>
        </div>

        {/* Treatment rows */}
        {treatments.map((treatment) => (
          <div key={treatment.slug} className="border-b border-outline-variant/20">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 ${
                !treatment.imageLeft ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image column */}
              <div className="relative min-h-[360px]">
                <Image
                  src={treatment.image}
                  alt={`${treatment.nameLine1}${treatment.nameLine2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Text column */}
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-primary mb-3">
                  {treatment.category}
                </p>
                <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl mb-4">
                  {treatment.nameLine1}
                  <em className="font-light">{treatment.nameLine2}</em>
                </h2>
                <p className="font-[family-name:var(--font-body)] text-on-surface-variant leading-relaxed mb-8">
                  {treatment.description}
                </p>

                <div>
                  <button
                    type="button"
                    onClick={() => toggleTreatment(treatment.slug)}
                    className={`flex items-center gap-2 px-10 py-4 rounded-full font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase transition-all duration-500 ${
                      openTreatment === treatment.slug
                        ? "btn-gradient text-on-primary"
                        : "border border-primary/40 text-primary hover:bg-primary hover:text-on-primary"
                    }`}
                  >
                    Book Session
                    <span className="material-symbols-outlined text-base">
                      {openTreatment === treatment.slug
                        ? "expand_less"
                        : "expand_more"}
                    </span>
                  </button>

                  {openTreatment === treatment.slug && (
                    <div className="mt-8 animate-fade-in">
                      <BookingWidget
                        defaultTreatment={treatment.bookingName}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`. Static pages generated include `/treatments`.

- [ ] **Step 4: Smoke test the treatments page**

Start dev server: `npm run dev`

Navigate to `http://localhost:3000/treatments` and verify:
- [ ] Navbar present, "Treatments" link active
- [ ] Hero: "The Art of Rejuvenation" headline
- [ ] 3 treatment rows — rows 1 & 3 image-left, row 2 image-right
- [ ] Clicking "Book Session" on any treatment opens the `BookingWidget` accordion below that treatment
- [ ] Clicking again collapses it; clicking a different treatment collapses the first and opens the second
- [ ] `BookingWidget` pre-selects the correct treatment in Step 2
- [ ] Completing the booking shows "Appointment Confirmed"
- [ ] Footer present with Journal → `/journal`, Membership → `/membership`

- [ ] **Step 5: Commit**

```bash
git add app/treatments/layout.tsx app/treatments/page.tsx
git commit -m "feat: add /treatments page with alternating layout and accordion booking"
```
