# Plan C: Membership Coming-Soon Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/membership` coming-soon page with a full-viewport blurred background, locked aesthetic, feature preview at low opacity, and an email capture form that transitions to a success notification on submit.

**Architecture:** A client component (`"use client"`) handles email and submitted state. Metadata is exported from a separate `app/membership/layout.tsx` Server Component. The page uses the shared `Navbar` from `app/components/` but intentionally omits `Footer` to preserve the full-bleed dark aesthetic. One Unsplash background image is downloaded to `/public/images/`.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, Tailwind CSS v4, next/image, Material Symbols (loaded globally)

**Depends on:** Plan A (Navbar must exist in `app/components/`)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `public/images/membership-bg.jpg` | Download | Serene spa/studio interior for background |
| `app/membership/layout.tsx` | Create | Exports page metadata (Server Component) |
| `app/membership/page.tsx` | Create | Client Component — email capture with submitted toggle |

---

### Task 1: Download background image and create metadata layout

**Files:**
- Download: `public/images/membership-bg.jpg`
- Create: `app/membership/layout.tsx`

- [ ] **Step 1: Download the background image**

```bash
curl -L "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=85" -o public/images/membership-bg.jpg
```

Expected: file appears at `public/images/membership-bg.jpg`. Verify with `ls -lh public/images/membership-bg.jpg`.

- [ ] **Step 2: Create `app/membership/layout.tsx`**

```tsx
// app/membership/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership | Serenity Studio",
  description:
    "Join The Inner Circle — a curated wellness journey arriving Fall 2026. Priority booking, exclusive treatments, and member-only retreats.",
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

- [ ] **Step 3: Commit**

```bash
git add public/images/membership-bg.jpg app/membership/layout.tsx
git commit -m "feat: add membership background image and layout metadata"
```

---

### Task 2: Create `/membership` page

**Files:**
- Create: `app/membership/page.tsx`

- [ ] **Step 1: Create `app/membership/page.tsx`**

```tsx
// app/membership/page.tsx
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
              <p className="font-label text-xs uppercase tracking-widest text-white/50 mb-4">
                Coming Fall 2026
              </p>

              {/* Headline */}
              <h1 className="font-headline text-5xl md:text-6xl text-white mb-4">
                The Inner{" "}
                <span className="italic font-light">Circle</span>
              </h1>

              {/* Subtitle */}
              <p className="font-body text-white/60 mb-12">
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
                    <span className="font-body text-sm text-white">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Email capture */}
              <div className="mt-10 bg-white/5 border border-white/15 rounded-xl p-8">
                <p className="font-label text-xs uppercase tracking-widest text-white/60 mb-6">
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
                    className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-white/40 flex-1"
                  />
                  <button
                    type="submit"
                    className="btn-gradient text-on-primary px-8 py-3 rounded-full font-label font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all whitespace-nowrap"
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
              <h1 className="font-headline text-4xl md:text-5xl text-white mb-4">
                You&apos;re on the{" "}
                <span className="italic font-light">List</span>
              </h1>

              {/* Confirmation card */}
              <div className="bg-white/5 border border-white/15 rounded-xl p-6 mb-10 max-w-sm mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-xl">
                    mail
                  </span>
                  <span className="font-body text-white/80 text-sm">{email}</span>
                </div>
                <p className="font-body text-white/40 text-xs mt-3">
                  We&apos;ll be in touch when memberships open in Fall 2026.
                </p>
              </div>

              {/* Return to top */}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="border border-white/25 text-white/70 px-10 py-4 rounded-full font-label font-bold text-sm tracking-[0.2em] uppercase hover:border-white/50 hover:text-white transition-all duration-500"
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
```

- [ ] **Step 2: Run build to verify no errors**

```bash
cd /Users/dbp/Developer/mockup-salon && npm run build 2>&1 | tail -20
```

Expected: build succeeds. `/membership` listed under static routes.

- [ ] **Step 3: Commit**

```bash
git add app/membership/page.tsx
git commit -m "feat: add /membership coming-soon page with email capture"
```
