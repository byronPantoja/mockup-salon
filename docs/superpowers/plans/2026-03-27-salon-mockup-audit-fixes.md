# Salon Mockup Audit Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 4 real issues on the salon mockup site — dynamic calendar, dead footer links, duplicate treatment images — and confirm 3 already-working items need no changes.

**Architecture:** All changes are in existing React components (BookingWidget, Footer, treatments page) plus one new page (`/legal`). No new dependencies. Calendar logic uses native `Date` API only.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4

---

## Pre-flight: Already-Working Items (verify, skip if confirmed)

Before starting, confirm these already work — no code changes needed if so:

- **Fix 5 (Form feedback):** Contact form has success state (page.tsx ~line 365); booking widget has "Appointment Confirmed" state (BookingWidget.tsx line 58); membership has submitted state (membership/page.tsx line 106). All three already have feedback states. ✓
- **Fix 6 (Cross-page nav):** Navbar uses `href="/#booking"` and `href="/#contact"` — absolute paths from root, work correctly from any sub-page via Next.js `<Link>`. ✓
- **Fix 7 (Accordion icons):** Treatments page uses `expand_less` / `expand_more` toggle with single-accordion state (`openTreatment`). Already correct. ✓

---

## Task 1: Dynamic Calendar in BookingWidget.tsx

**Files:**
- Modify: `app/components/BookingWidget.tsx`

### Context

Current hardcoded state (lines 11–19, 79, 123–124, 170, 246, 269):
- `November 2024` header
- `prevMonthDays = [28, 29, 30, 31]`
- `days = Array.from({ length: 17 }, ...)`
- `Wednesday, Nov {selectedDate}` in availability + confirmation panels
- Chevron buttons have no click handlers

### Steps

- [ ] **Step 1: Replace the static date state and calendar computation**

Replace lines 11–19 with:

```tsx
const now = new Date();
const [calMonth, setCalMonth] = useState<{ year: number; month: number }>({
  year: now.getFullYear(),
  month: now.getMonth(),
});
const [selectedDate, setSelectedDate] = useState(1);
const [selectedTime, setSelectedTime] = useState("11:00 AM");
```

Then add these computed values immediately after the state declarations (before `timeSlots`):

```tsx
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const SHORT_MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];
const DAY_NAMES = [
  "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",
];

const firstDayOfWeek = new Date(calMonth.year, calMonth.month, 1).getDay();
const daysInMonth = new Date(calMonth.year, calMonth.month + 1, 0).getDate();
const prevMonthLastDay = new Date(calMonth.year, calMonth.month, 0).getDate();
const prevMonthDays = Array.from(
  { length: firstDayOfWeek },
  (_, i) => prevMonthLastDay - firstDayOfWeek + 1 + i
);
const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

const monthHeader = `${MONTH_NAMES[calMonth.month]} ${calMonth.year}`;
const shortMonth = SHORT_MONTHS[calMonth.month];
const selectedDayName = DAY_NAMES[
  new Date(calMonth.year, calMonth.month, selectedDate).getDay()
];

const goToPrevMonth = () => {
  setCalMonth((prev) =>
    prev.month === 0
      ? { year: prev.year - 1, month: 11 }
      : { year: prev.year, month: prev.month - 1 }
  );
  setSelectedDate(1);
};
const goToNextMonth = () => {
  setCalMonth((prev) =>
    prev.month === 11
      ? { year: prev.year + 1, month: 0 }
      : { year: prev.year, month: prev.month + 1 }
  );
  setSelectedDate(1);
};
```

- [ ] **Step 2: Update the month header and chevron buttons**

Replace lines 122–134:
```tsx
{/* OLD: */}
<h3 className="font-[family-name:var(--font-headline)] text-xl">
  November 2024
</h3>
{/* Month navigation — non-functional in mockup */}
<div className="flex gap-4">
  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
    chevron_left
  </button>
  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
    chevron_right
  </button>
</div>
```

With:
```tsx
<h3 className="font-[family-name:var(--font-headline)] text-xl">
  {monthHeader}
</h3>
<div className="flex gap-4">
  <button
    onClick={goToPrevMonth}
    className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
  >
    chevron_left
  </button>
  <button
    onClick={goToNextMonth}
    className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
  >
    chevron_right
  </button>
</div>
```

- [ ] **Step 3: Update the Availability panel date label**

Replace line 170:
```tsx
{/* OLD: */}
Wednesday, Nov {selectedDate}
```
With:
```tsx
{selectedDayName}, {shortMonth} {selectedDate}
```

- [ ] **Step 4: Update the Step 2 "Your Details" date header**

Replace line 246:
```tsx
{/* OLD: */}
Nov {selectedDate} · {selectedTime}
```
With:
```tsx
{shortMonth} {selectedDate} · {selectedTime}
```

- [ ] **Step 5: Update the Step 2 Summary date**

Replace line 269:
```tsx
{/* OLD: */}
<span className="text-on-surface font-medium">Nov {selectedDate}</span>
```
With:
```tsx
<span className="text-on-surface font-medium">{shortMonth} {selectedDate}</span>
```

- [ ] **Step 6: Update the Confirmation screen date**

Replace line 79:
```tsx
{/* OLD: */}
Wednesday, Nov {selectedDate} at {selectedTime}
```
With:
```tsx
{selectedDayName}, {shortMonth} {selectedDate} at {selectedTime}
```

- [ ] **Step 7: Verify it compiles**

```bash
cd /Users/dbp/Developer/mockup-salon && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 8: Commit**

```bash
git add app/components/BookingWidget.tsx
git commit -m "feat: make booking calendar dynamic — shows current month, real day names, functional month navigation"
```

---

## Task 2: Footer — Remove Dead Links, Create /legal Page

**Files:**
- Modify: `app/components/Footer.tsx`
- Create: `app/legal/page.tsx`

### Steps

- [ ] **Step 1: Create the /legal placeholder page**

Create `app/legal/page.tsx`:

```tsx
import Link from "next/link";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Legal | Serenity Studio",
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-40 text-center">
        <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-6">
          Design Mockup
        </p>
        <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl text-on-surface mb-6">
          Legal
        </h1>
        <p className="font-[family-name:var(--font-body)] text-on-surface-variant leading-relaxed mb-10">
          This is a design mockup. No real services are offered, no data is
          collected, and no legal obligations exist. Serenity Studio is a
          fictional brand created for portfolio purposes only.
        </p>
        <Link
          href="/"
          className="font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase text-primary border border-primary/40 px-10 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-500"
        >
          Back to Home
        </Link>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Update Footer.tsx — remove dead nav links, fix legal links, remove social links**

In `app/components/Footer.tsx`:

**Remove Instagram and Pinterest** — replace lines 21–34 entirely with nothing (delete the social links `<div>`).

**Remove Sustainability Report and Gift Cards** — update the navigation links array (lines 42–47) from:
```tsx
{ label: "Journal", href: "/journal" },
{ label: "Membership", href: "/membership" },
{ label: "Sustainability Report", href: "#" },
{ label: "Gift Cards", href: "#" },
```
To:
```tsx
{ label: "Journal", href: "/journal" },
{ label: "Membership", href: "/membership" },
```

**Fix Privacy Policy / Terms of Service / Accessibility** — replace lines 105–117:
```tsx
{/* OLD: */}
<div className="flex gap-8">
  {["Privacy Policy", "Terms of Service", "Accessibility"].map(
    (link) => (
      <a
        key={link}
        className="text-on-surface-variant hover:text-primary font-[family-name:var(--font-body)] text-sm tracking-wide transition-colors"
        href="#"
      >
        {link}
      </a>
    )
  )}
</div>
```
With:
```tsx
<div className="flex gap-8">
  {["Privacy Policy", "Terms of Service", "Accessibility"].map(
    (link) => (
      <Link
        key={link}
        className="text-on-surface-variant hover:text-primary font-[family-name:var(--font-body)] text-sm tracking-wide transition-colors"
        href="/legal"
      >
        {link}
      </Link>
    )
  )}
</div>
```

Note: `Link` is already imported at the top of Footer.tsx — no new import needed.

- [ ] **Step 3: Verify it compiles**

```bash
cd /Users/dbp/Developer/mockup-salon && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add app/components/Footer.tsx app/legal/page.tsx
git commit -m "fix: remove dead footer links — drop social/Sustainability/Gift Cards, link legal pages to /legal"
```

---

## Task 3: Fix Duplicate Treatment Images

**Files:**
- Download: `public/images/facial-lift.jpg`, `public/images/serenity-glow.jpg`, `public/images/infrared-detox.jpg`
- Modify: `app/treatments/page.tsx`

### Context

Duplicates:
- "Sculpt & Lift Facial" uses `/images/facial.jpg` (same as Signature Facial)
- "The Serenity Glow" uses `/images/aromatherapy.jpg` (same as Aromatherapy)
- "Infrared Detox" uses `/images/stone.jpg` (same as Stone Therapy)

### Steps

- [ ] **Step 1: Download 3 unique images from Unsplash**

```bash
curl -L "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80&auto=format&fit=crop" \
  -o /Users/dbp/Developer/mockup-salon/public/images/facial-lift.jpg

curl -L "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format&fit=crop" \
  -o /Users/dbp/Developer/mockup-salon/public/images/serenity-glow.jpg

curl -L "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80&auto=format&fit=crop" \
  -o /Users/dbp/Developer/mockup-salon/public/images/infrared-detox.jpg
```

Verify the files were downloaded (each should be > 50KB):
```bash
ls -lh /Users/dbp/Developer/mockup-salon/public/images/facial-lift.jpg \
        /Users/dbp/Developer/mockup-salon/public/images/serenity-glow.jpg \
        /Users/dbp/Developer/mockup-salon/public/images/infrared-detox.jpg
```

**If any download fails** (file < 50KB or curl error): use these CSS gradient alternatives instead by modifying the treatment data structure (see Step 1 fallback below).

**Step 1 fallback — gradient approach:** If images fail to download, open `app/treatments/page.tsx` and for each of the 3 duplicates, change their `image` field to a unique path like `/images/facial-lift.jpg` anyway — the `<Image>` tag will show a broken image, which is fine as long as it doesn't throw a build error. To avoid the error, use a `style` background instead (see Task 3 Step 2 fallback).

- [ ] **Step 2: Update treatments page image references**

In `app/treatments/page.tsx`, update the treatments array entries for the 3 duplicates (lines 54–87):

For "Sculpt & Lift Facial" (line ~58), change:
```tsx
image: "/images/facial.jpg",
```
To:
```tsx
image: "/images/facial-lift.jpg",
```

For "The Serenity Glow" (line ~69), change:
```tsx
image: "/images/aromatherapy.jpg",
```
To:
```tsx
image: "/images/serenity-glow.jpg",
```

For "Infrared Detox" (line ~80), change:
```tsx
image: "/images/stone.jpg",
```
To:
```tsx
image: "/images/infrared-detox.jpg",
```

- [ ] **Step 3: Verify it compiles**

```bash
cd /Users/dbp/Developer/mockup-salon && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add public/images/facial-lift.jpg public/images/serenity-glow.jpg public/images/infrared-detox.jpg app/treatments/page.tsx
git commit -m "fix: replace duplicate treatment card images with unique images"
```

---

## Task 4: Final Build Verification

- [ ] **Step 1: Run full production build**

```bash
cd /Users/dbp/Developer/mockup-salon && npm run build
```
Expected: `✓ Compiled successfully` with no errors. Warnings about missing images or lint are acceptable if they don't block compilation.

- [ ] **Step 2: Confirm checklist**

After successful build, verify:
- [ ] Zero links on the site point to `"#"` (search: `grep -r 'href="#"' app/`)
- [ ] BookingWidget shows current month in the header (it's initialized with `new Date()`)
- [ ] Treatments page: `facial.jpg`, `aromatherapy.jpg`, `stone.jpg` each appear exactly once in the treatments array

```bash
grep -n 'href="#"' /Users/dbp/Developer/mockup-salon/app/components/Footer.tsx
grep -n 'href="#"' /Users/dbp/Developer/mockup-salon/app/components/Navbar.tsx
grep -n '"image"' /Users/dbp/Developer/mockup-salon/app/treatments/page.tsx
```

Expected: no `href="#"` results, and no two image entries in treatments match.
