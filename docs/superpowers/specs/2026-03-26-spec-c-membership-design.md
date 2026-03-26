# Spec C: Membership Page

**Date:** 2026-03-26
**Status:** Approved
**Depends on:** Spec A (Navbar, Footer shared components)

---

## Objective

Build the `/membership` coming-soon page with a blurred studio background, aspirational locked aesthetic, feature preview at low opacity, and an email capture form that shows a success notification on submit.

---

## Scope

- `app/membership/page.tsx`
- 1 new background image downloaded to `/public/images/membership-bg.jpg`

---

## Image

| File | Unsplash URL | Subject |
|------|-------------|---------|
| `membership-bg.jpg` | `https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=85` | Serene spa/studio interior |

---

## Page — `/membership`

**File:** `app/membership/page.tsx`
**Directive:** `"use client"` (email state + submitted toggle)

### Metadata
```ts
export const metadata = {
  title: "Membership | Serenity Studio",
  description: "Join The Inner Circle — a curated wellness journey arriving Fall 2026. Priority booking, exclusive treatments, and member-only retreats.",
};
```

Because `app/membership/page.tsx` uses `"use client"`, metadata is exported from `app/membership/layout.tsx` instead:

```ts
// app/membership/layout.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Membership | Serenity Studio",
  description: "Join The Inner Circle — a curated wellness journey arriving Fall 2026. Priority booking, exclusive treatments, and member-only retreats.",
};
export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

`app/membership/page.tsx` has `"use client"` and no `metadata` export.

---

## Layout

```
<div className="relative min-h-screen flex flex-col">
  <BackgroundImage />   ← blurred, fixed, full-viewport
  <Navbar />            ← transparent variant on dark bg
  <main>
    <CenterContent />   ← default or submitted state
  </main>
</div>
```

No `<Footer />` on this page — the full-bleed dark aesthetic is broken by the light footer. The page ends after the CTA.

---

## Background

- `next/image` with `fill`, `object-cover`, `priority`
- `className="absolute inset-0"` — sits behind all content
- CSS filter: `style={{ filter: "blur(12px) brightness(0.4)", transform: "scale(1.05)" }}`
- The `scale(1.05)` prevents blur from showing white edges

---

## Navbar Variant

The existing `Navbar` component already switches between light/dark states based on scroll. On this page, the background is always dark, so pass a `forceDark` prop (or rely on the scroll-based logic — since the page has no scrollable content, `scrolled` will always be `false`, rendering the transparent/white-text state, which works correctly on the dark background). No Navbar changes needed.

---

## Default State (submitted === false)

Vertically and horizontally centred within `min-h-screen`. Container: `max-w-md mx-auto px-6 text-center`.

### Lock Icon
- `w-14 h-14 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8`
- `material-symbols-outlined text-white/60 text-2xl` — icon: `lock`

### Label
- `"Coming Fall 2026"` — `font-label text-xs uppercase tracking-widest text-white/50 mb-4`

### Headline
- `"The Inner "` + `<span className="italic font-light">Circle</span>` — `font-headline text-5xl md:text-6xl text-white mb-4`

### Subtitle
- `"A curated wellness journey, arriving Fall 2026."` — `font-body text-white/60 mb-12`

### Feature Preview
- `opacity-30` wrapper div
- Three rows, each: `flex items-center gap-4 py-4 border-b border-white/10 text-left`
  - Icon: `✦` in `text-primary-fixed-dim text-sm`
  - Text: `font-body text-sm text-white`
- Items:
  1. Priority Booking & Seasonal Treatments
  2. Exclusive Access to the Journal Deep-Dive Series
  3. Member-Only Evening Retreats

### Email Capture
- Container: `mt-10 bg-white/5 border border-white/15 rounded-xl p-8`
- Label: `"Be the first to know"` — `font-label text-xs uppercase tracking-widest text-white/60 mb-6`
- Form: `flex flex-col sm:flex-row gap-3`
  - Input: controlled, `type="email"`, `required`, `placeholder="your@email.com"` — `bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/30 font-body text-sm focus:outline-none focus:border-white/40 flex-1`
  - Button: `type="submit"` — `btn-gradient text-on-primary px-8 py-3 rounded-full font-label font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all whitespace-nowrap`
  - Label: `"Stay in the Loop"`
- `onSubmit`: `e.preventDefault(); setSubmitted(true)`

---

## Success State (submitted === true)

Replaces the default state content with the success notification. Same centering and container. Animates in with `animate-fade-in`.

### Check Icon
- `w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20`
- `material-symbols-outlined text-primary-fixed-dim text-4xl` with `style={{ fontVariationSettings: "'FILL' 1" }}` — icon: `check_circle`

### Headline
- `"You're on the "` + `<span className="italic font-light">List</span>` — `font-headline text-4xl md:text-5xl text-white mb-4`

### Confirmation Card
- `bg-white/5 border border-white/15 rounded-xl p-6 mb-10 max-w-sm mx-auto`
- Email row: `flex items-center justify-center gap-3`
  - Icon: `mail` — `material-symbols-outlined text-primary-fixed-dim text-xl`
  - Value: `{email}` — `font-body text-white/80 text-sm`
- Sub-text: `"We'll be in touch when memberships open in Fall 2026."` — `font-body text-white/40 text-xs mt-3`

### Return to Top Button
- `type="button"` — `border border-white/25 text-white/70 px-10 py-4 rounded-full font-label font-bold text-sm tracking-[0.2em] uppercase hover:border-white/50 hover:text-white transition-all duration-500`
- `onClick`: `window.scrollTo({ top: 0, behavior: "smooth" })`
