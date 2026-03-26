# Spec A: Shared Infrastructure + Treatments Page

**Date:** 2026-03-26
**Status:** Approved

---

## Objective

Extract shared UI components from the monolithic `app/page.tsx` so they can be reused across new pages, then build the `/treatments` route using those components.

---

## Scope

- Extract `Navbar` → `app/components/Navbar.tsx`
- Extract `Footer` → `app/components/Footer.tsx`
- Extract `BookingWidget` → `app/components/BookingWidget.tsx`
- Update `app/page.tsx` to import from shared components (no behavior change)
- Create `app/treatments/page.tsx`

---

## Shared Components

### `app/components/Navbar.tsx`

Identical to the current `Navbar` function in `page.tsx`. One change: update nav link `href` values from hash anchors to real routes:

| Label | Old href | New href |
|-------|----------|----------|
| Treatments | `#services` | `/treatments` |
| Journal | `#` | `/journal` |
| Membership | `#` | `/membership` |
| Contact | `#contact` | `/#contact` |

Mobile menu links update in the same way. "Book Session" button remains as-is (opens to `/#booking` or triggers booking flow on page).

### `app/components/Footer.tsx`

Identical to the current `Footer` function in `page.tsx`. Update footer link hrefs:

| Link | New href |
|------|----------|
| Journal | `/journal` |
| Membership | `/membership` |
| All others | `#` (unchanged) |

### `app/components/BookingWidget.tsx`

Extracted from the stateful booking logic inside `BookingSection`. This component handles the full booking flow: date selection, time selection, treatment selection, email input, confirmation, and the "Appointment Confirmed" success overlay.

**Props:**
```tsx
interface BookingWidgetProps {
  defaultTreatment?: string; // pre-selects treatment in the dropdown
}
```

**Internal state:** `selectedDate`, `selectedTime`, `step`, `selectedTreatment`, `email`, `confirmed`, `treatmentOpen` — all identical to what currently lives in `BookingSection`.

**Treatment list** (matches existing data in `BookingSection`):
```ts
const treatments = [
  { name: "Signature Facial", price: "$120", duration: "60 min" },
  { name: "Stone Therapy", price: "$150", duration: "90 min" },
  { name: "Aromatherapy", price: "$95", duration: "60 min" },
  { name: "Manicure & Pedi", price: "$85", duration: "75 min" },
  // Added for Treatments page:
  { name: "Sculpt & Lift Facial", price: "$140", duration: "60 min" },
  { name: "The Serenity Glow", price: "$120", duration: "90 min" },
  { name: "Infrared Detox", price: "$110", duration: "60 min" },
];
```

When `defaultTreatment` is provided, `selectedTreatment` initializes to that value (`useState(defaultTreatment ?? "")`).

**Behavior:** Renders the two-step booking UI (calendar + time / treatment + email) and the "Appointment Confirmed" success overlay. Visually identical to the current `BookingSection` inner card. Exported as a named export.

### `app/page.tsx` after extraction

- Imports `Navbar`, `Footer` from `app/components/`
- `BookingSection` imports `BookingWidget` and renders it inside its existing layout shell
- No visible change to the home page

---

## Treatments Page — `/treatments`

**File:** `app/treatments/page.tsx`
**Directive:** `"use client"` (accordion state)

### Page Metadata

Because `app/treatments/page.tsx` uses `"use client"`, metadata cannot be exported from the page file directly. Create `app/treatments/layout.tsx` (Server Component) to export metadata, rendering `{children}` as its only content:

```ts
// app/treatments/layout.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Treatments | Serenity Studio",
  description: "Explore our bespoke treatments — Sculpt & Lift Facial, The Serenity Glow, and Infrared Detox. Tailored to your unique biology.",
};
export default function TreatmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### Page Structure

```
<Navbar />
<main>
  <HeroHeader />
  <TreatmentRow treatment="Sculpt & Lift Facial" imageLeft={true} />
  <TreatmentRow treatment="The Serenity Glow" imageLeft={false} />
  <TreatmentRow treatment="Infrared Detox" imageLeft={true} />
</main>
<Footer />
```

### Hero Header

- Section: `py-20 md:py-28 border-b border-outline-variant/20 text-center`
- Label: `"The Studio · Our Offerings"` — `font-label text-xs uppercase tracking-widest text-primary`
- Headline: `"The Art of "` + `<span className="italic font-light">Rejuvenation</span>` — `font-headline text-5xl md:text-6xl`
- Subtitle: `"Each session is tailored to your unique biology and peace of mind."` — `font-body text-on-surface-variant max-w-md mx-auto`

### Treatment Data

```ts
const treatments = [
  {
    slug: "sculpt-lift-facial",
    name: "Sculpt & Lift Facial",
    category: "60 min · Facial",
    description: "A 60-minute manual lifting massage using lymphatic drainage and microcurrent technology.",
    image: "/images/facial.jpg",
    bookingName: "Sculpt & Lift Facial",
  },
  {
    slug: "serenity-glow",
    name: "The Serenity Glow",
    category: "90 min · Glow Treatment",
    description: "Our signature chemical-free peel combined with LED light therapy for instant radiance.",
    image: "/images/aromatherapy.jpg",
    bookingName: "The Serenity Glow",
  },
  {
    slug: "infrared-detox",
    name: "Infrared Detox",
    category: "60 min · Sauna Suite",
    description: "A private sauna suite experience designed to reduce inflammation and boost cellular repair.",
    image: "/images/stone.jpg",
    bookingName: "Infrared Detox",
  },
];
```

### Treatment Row Layout

Each treatment alternates layout: rows 1 & 3 are image-left/text-right; row 2 is text-left/image-right.

**Grid:** `grid grid-cols-1 lg:grid-cols-2` with a `border-b border-outline-variant/20`

**Image column:** `next/image` with `fill` and `object-cover`, minimum height `min-h-[360px]`. Uses existing `/public/images/` assets.

**Text column:** `p-10 md:p-16 flex flex-col justify-center`
- Category label: `font-label text-xs uppercase tracking-widest text-primary mb-3`
- Treatment name: `font-headline text-3xl md:text-4xl mb-4` with `<em>` on the last word
- Description: `font-body text-on-surface-variant leading-relaxed mb-8`
- "Book Session" button: when accordion is **closed** — `border border-primary/40 text-primary` ghost style; when **open** — `btn-gradient text-on-primary` with a chevron-down icon

### Accordion Booking

**State:** `openTreatment: string | null` — only one accordion open at a time. Clicking "Book Session" sets `openTreatment` to that treatment's slug; clicking again (or clicking another) collapses it.

**Accordion panel:** renders directly below the button inside the text column, animates in with `animate-fade-in`. Contains `<BookingWidget defaultTreatment={treatment.bookingName} />`.

The `BookingWidget` shows the full two-step booking flow. On "Appointment Confirmed", shows the success overlay inside the accordion panel.

---

## What Does Not Change

- Home page appearance and behavior are identical after extraction.
- `globals.css`, `layout.tsx`, and all design tokens are untouched.
