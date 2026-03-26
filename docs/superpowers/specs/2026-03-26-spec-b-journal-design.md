# Spec B: Journal Page + Article Pages

**Date:** 2026-03-26
**Status:** Approved
**Depends on:** Spec A (Navbar, Footer shared components)

---

## Objective

Build the `/journal` listing page and three individual article pages (`/journal/[slug]`), with real photography, SEO-optimized content, and brand-consistent design.

---

## Scope

- `app/lib/articles.ts` — static article data
- `app/journal/page.tsx` — blog grid
- `app/journal/[slug]/page.tsx` — individual article
- 3 new images downloaded to `/public/images/`

---

## Article Data — `app/lib/articles.ts`

Static typed array. No CMS, no API. Each article object:

```ts
export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  seoTerms: string[];
  image: string;         // path in /public/images/
  bookingCta: string;    // label for the bottom CTA button, e.g. "Book a Facial"
  body: string[];        // array of paragraph strings (renders as <p> elements)
}
```

### Article 1 — Lymphatic Drainage

```ts
{
  slug: "lymphatic-drainage-benefits",
  title: "5 Benefits of Lymphatic Drainage for Clearer Skin",
  category: "Skincare",
  readTime: "5 min read",
  excerpt: "Discover why manual lymphatic drainage is the \"secret weapon\" of the skincare world. We break down how moving toxins out can bring the glow back in.",
  seoTerms: ["lymphatic drainage benefits", "holistic skincare", "detox for skin"],
  image: "/images/journal-lymphatic.jpg",
  bookingCta: "Book a Facial",
  body: [
    "The lymphatic system is a network of tissues and organs that help rid the body of toxins, waste, and other unwanted materials. Unlike the cardiovascular system, it has no central pump — it relies entirely on movement, breathing, and manual stimulation to circulate.",
    "When lymphatic flow is sluggish, fluid accumulates beneath the skin, leading to puffiness, dullness, and slower cellular turnover. Manual lymphatic drainage massage applies gentle, rhythmic pressure to redirect this fluid toward the body's natural drainage points.",
    "Here are five ways regular lymphatic drainage benefits your skin: reduces under-eye puffiness and facial bloating; accelerates the removal of metabolic waste from skin cells; improves absorption of serums and moisturisers by clearing congestion from the dermis; supports the skin's immune response, reducing breakouts linked to trapped debris; and restores a natural luminosity by encouraging fresh, oxygenated fluid to circulate to the surface.",
    "At Serenity Studio, our Sculpt & Lift Facial incorporates 20 minutes of focused lymphatic drainage as the foundation of every session — because glowing skin starts from within.",
  ],
}
```

### Article 2 — Mindful Beauty

```ts
{
  slug: "mindful-beauty-matters",
  title: "The Science of Serenity: Why Mindful Beauty Matters",
  category: "Wellness",
  readTime: "4 min read",
  excerpt: "At Serenity Studio, we believe beauty isn't skin deep — it's nervous system deep. Learn how lowering cortisol levels can prevent premature aging.",
  seoTerms: ["stress and aging", "mindful beauty routine", "cortisol skin effects"],
  image: "/images/journal-mindful-beauty.jpg",
  bookingCta: "Book a Treatment",
  body: [
    "Cortisol, your body's primary stress hormone, is a silent saboteur of skin health. When chronically elevated, it triggers inflammation, breaks down collagen, and disrupts the skin barrier — accelerating the visible signs of aging by years.",
    "The nervous system and the skin share a developmental origin: both emerge from the same layer of cells in the embryo. This connection, known as the skin-brain axis, means that what the nervous system experiences, the skin reflects. Stress lives on your face — and mindful beauty practices are the antidote.",
    "A mindful beauty routine doesn't require an hour. It requires presence. Applying a facial oil slowly, breathing deeply during a mask, or simply taking sixty seconds to massage your cleanser in upward strokes — these micro-rituals signal safety to the nervous system, lowering cortisol and allowing the skin to return to its regenerative state.",
    "Every treatment at Serenity Studio is designed with this in mind. Dim lighting, warmed linens, and the measured pace of our practitioners are not incidental — they are the treatment.",
  ],
}
```

### Article 3 — Evening Rituals

```ts
{
  slug: "evening-rituals-cellular-repair",
  title: "Evening Rituals: Preparing Your Skin for Cellular Repair",
  category: "Ritual",
  readTime: "6 min read",
  excerpt: "Your skin does its best work while you sleep. Here is the ultimate 4-step evening guide to support your skin's natural circadian rhythm.",
  seoTerms: ["nighttime skincare routine", "cellular repair", "beauty sleep tips"],
  image: "/images/journal-evening-rituals.jpg",
  bookingCta: "Book a Treatment",
  body: [
    "Between 11pm and 4am, the skin's cell turnover rate peaks — old cells are shed and new ones generated at nearly twice the daytime rate. Melatonin production spikes, acting as a potent antioxidant that neutralises the free radical damage accumulated during the day. Growth hormone, responsible for collagen synthesis, reaches its nightly high.",
    "The evening routine you build isn't just skincare. It's scaffolding for these biological processes.",
    "Step 1 — Remove: A double cleanse at night is non-negotiable. Oil-based cleansers dissolve sunscreen and sebum; a water-based follow removes residual debris. Leaving either on overnight means your skin spends its repair window fighting contamination rather than regenerating.",
    "Step 2 — Treat: Apply your most active ingredients now — retinoids, peptides, AHAs. The absence of UV exposure means no photosensitivity risk, and the skin's increased permeability at night means deeper penetration.",
    "Step 3 — Seal: A rich occlusive moisturiser or facial oil traps the actives and prevents transepidermal water loss — the silent cause of dehydration that mattifies, dulls, and ages skin overnight.",
    "Step 4 — Protect: Silk pillowcases reduce friction and absorbency. A humidifier in dry climates maintains the moisture gradient between skin and environment. Sleeping on your back, when possible, prevents compression lines from deepening into permanent creases.",
  ],
}
```

---

## Images

Download these three Unsplash images to `/public/images/` at implementation time:

| File | Unsplash URL | Subject |
|------|-------------|---------|
| `journal-lymphatic.jpg` | `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=85` | Face/facial skincare |
| `journal-mindful-beauty.jpg` | `https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=85` | Meditation/wellness |
| `journal-evening-rituals.jpg` | `https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=85` | Evening skincare ritual |

---

## Journal Listing Page — `/journal`

**File:** `app/journal/page.tsx`
**Directive:** none (Server Component)

### Metadata
```ts
export const metadata = {
  title: "Journal | Serenity Studio",
  description: "Wellness insights, skincare rituals, and mindful beauty research from the Serenity Studio team.",
};
```

### Layout

```
<Navbar />
<main>
  <header>  ← label, headline, subtitle
  <section> ← 3-column card grid (1 col mobile, 3 col lg)
</main>
<Footer />
```

### Header
- Label: `"The Serenity Journal"` — `font-label text-xs uppercase tracking-widest text-primary`
- Headline: `"Wellness "` + `<span className="italic font-light">Insights</span>` — `font-headline text-5xl md:text-6xl`
- Subtitle: `"Rituals, research, and reflections from the studio."` — `font-body text-on-surface-variant`
- `py-20 md:py-28 text-center border-b border-outline-variant/20`

### Card Grid
- `grid grid-cols-1 md:grid-cols-3 gap-0` — cards separated by borders, no gap
- Each card: `<Link href={/journal/${article.slug}}>` wrapping the card content

### Card Structure
- **Photo:** `next/image` with `fill` and `object-cover`, container height `h-64`. Dark gradient overlay bottom-to-top (`bg-gradient-to-t from-black/50`). Category + read time label overlaid at bottom-left in white, `font-label text-xs uppercase tracking-widest`.
- **Body:** `p-8 bg-surface`
  - Title: `font-headline text-xl mb-3`
  - Excerpt: `font-body text-sm text-on-surface-variant leading-relaxed mb-6`
  - CTA: `"Read Article →"` — `font-label text-xs uppercase tracking-widest text-primary`
- Card border: `border border-outline-variant/20`

---

## Article Page — `/journal/[slug]`

**File:** `app/journal/[slug]/page.tsx`
**Directive:** none (Server Component)

### Dynamic Metadata
```ts
export function generateMetadata({ params }) {
  const article = articles.find(a => a.slug === params.slug);
  return {
    title: `${article.title} | Serenity Studio`,
    description: article.excerpt,
    keywords: article.seoTerms.join(", "),
  };
}
```

### Static Params
```ts
export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}
```

### Layout

```
<Navbar />
<main>
  <HeroImage />      ← full-width photo, title overlaid
  <article>
    <SEOTags />      ← keyword chips
    <Lede />         ← blockquote excerpt
    <BodyCopy />     ← paragraphs
    <Footer CTA />   ← Back to Journal + Book button
  </article>
</main>
<Footer />
```

### Hero Image
- `relative h-[50vh] min-h-[320px]` container
- `next/image` with `fill` and `object-cover`
- Gradient overlay: `bg-gradient-to-t from-black/60 via-black/20 to-transparent`
- Title overlaid at bottom-left: category + date + read time in `font-label text-xs text-white/70 uppercase tracking-widest`, then article title in `font-headline text-3xl md:text-5xl text-white font-light`

### Article Body
- Max width `max-w-2xl mx-auto px-6 md:px-12 py-16`
- **SEO tags:** `flex flex-wrap gap-2 mb-10` — each term in `border border-outline-variant/40 rounded-full px-4 py-1 font-label text-xs text-on-surface-variant`
- **Lede (excerpt):** `border-l-2 border-primary pl-6 mb-10 font-body text-lg italic text-on-surface leading-relaxed`
- **Body paragraphs:** `font-body text-on-surface-variant leading-relaxed mb-6` for each paragraph in `article.body`
- **Footer CTA:** `border-t border-outline-variant/20 pt-10 flex justify-between items-center`
  - Left: `← Back to Journal` as `<Link href="/journal">` — `font-label text-xs uppercase tracking-widest text-primary`
  - Right: `article.bookingCta` button — `btn-gradient text-on-primary px-8 py-3 rounded-full font-label text-sm font-bold uppercase tracking-widest hover:opacity-90`

### 404 Handling
If `articles.find()` returns `undefined`, call `notFound()` from `next/navigation`.
