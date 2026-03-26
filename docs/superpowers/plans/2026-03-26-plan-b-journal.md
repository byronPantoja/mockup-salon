# Plan B: Journal Page + Article Pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/journal` listing page (3-column card grid) and individual `/journal/[slug]` article pages with real Unsplash photography, static article data, and SEO metadata.

**Architecture:** A static `app/lib/articles.ts` module exports a typed `Article` array with full body copy and SEO terms. The listing page is a Server Component that imports this data and renders a card grid. The article page uses `generateStaticParams` for SSG and `generateMetadata` for per-article SEO. Both pages use the shared `Navbar` and `Footer` from `app/components/`.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, Tailwind CSS v4, next/image, next/link, `notFound()` from next/navigation, Material Symbols (loaded globally)

**Depends on:** Plan A (Navbar, Footer must exist in `app/components/`)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `public/images/journal-lymphatic.jpg` | Download | Face/facial skincare photo |
| `public/images/journal-mindful-beauty.jpg` | Download | Meditation/wellness photo |
| `public/images/journal-evening-rituals.jpg` | Download | Evening skincare ritual photo |
| `app/lib/articles.ts` | Create | Static article data (3 articles, typed) |
| `app/journal/page.tsx` | Create | Server Component — 3-column journal card grid |
| `app/journal/[slug]/page.tsx` | Create | Server Component — individual article with hero, body, CTA |

---

### Task 1: Download images and create article data module

**Files:**
- Download: `public/images/journal-lymphatic.jpg`
- Download: `public/images/journal-mindful-beauty.jpg`
- Download: `public/images/journal-evening-rituals.jpg`
- Create: `app/lib/articles.ts`

- [ ] **Step 1: Download the three Unsplash images**

```bash
curl -L "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=85" -o public/images/journal-lymphatic.jpg
curl -L "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=85" -o public/images/journal-mindful-beauty.jpg
curl -L "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=85" -o public/images/journal-evening-rituals.jpg
```

Expected: three JPEG files appear in `public/images/`. Verify with `ls -lh public/images/journal-*.jpg`.

- [ ] **Step 2: Create `app/lib/articles.ts`**

```ts
// app/lib/articles.ts

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  seoTerms: string[];
  image: string;
  bookingCta: string;
  body: string[];
}

export const articles: Article[] = [
  {
    slug: "lymphatic-drainage-benefits",
    title: "5 Benefits of Lymphatic Drainage for Clearer Skin",
    category: "Skincare",
    readTime: "5 min read",
    excerpt:
      "Discover why manual lymphatic drainage is the \"secret weapon\" of the skincare world. We break down how moving toxins out can bring the glow back in.",
    seoTerms: ["lymphatic drainage benefits", "holistic skincare", "detox for skin"],
    image: "/images/journal-lymphatic.jpg",
    bookingCta: "Book a Facial",
    body: [
      "The lymphatic system is a network of tissues and organs that help rid the body of toxins, waste, and other unwanted materials. Unlike the cardiovascular system, it has no central pump — it relies entirely on movement, breathing, and manual stimulation to circulate.",
      "When lymphatic flow is sluggish, fluid accumulates beneath the skin, leading to puffiness, dullness, and slower cellular turnover. Manual lymphatic drainage massage applies gentle, rhythmic pressure to redirect this fluid toward the body's natural drainage points.",
      "Here are five ways regular lymphatic drainage benefits your skin: reduces under-eye puffiness and facial bloating; accelerates the removal of metabolic waste from skin cells; improves absorption of serums and moisturisers by clearing congestion from the dermis; supports the skin's immune response, reducing breakouts linked to trapped debris; and restores a natural luminosity by encouraging fresh, oxygenated fluid to circulate to the surface.",
      "At Serenity Studio, our Sculpt & Lift Facial incorporates 20 minutes of focused lymphatic drainage as the foundation of every session — because glowing skin starts from within.",
    ],
  },
  {
    slug: "mindful-beauty-matters",
    title: "The Science of Serenity: Why Mindful Beauty Matters",
    category: "Wellness",
    readTime: "4 min read",
    excerpt:
      "At Serenity Studio, we believe beauty isn't skin deep — it's nervous system deep. Learn how lowering cortisol levels can prevent premature aging.",
    seoTerms: ["stress and aging", "mindful beauty routine", "cortisol skin effects"],
    image: "/images/journal-mindful-beauty.jpg",
    bookingCta: "Book a Treatment",
    body: [
      "Cortisol, your body's primary stress hormone, is a silent saboteur of skin health. When chronically elevated, it triggers inflammation, breaks down collagen, and disrupts the skin barrier — accelerating the visible signs of aging by years.",
      "The nervous system and the skin share a developmental origin: both emerge from the same layer of cells in the embryo. This connection, known as the skin-brain axis, means that what the nervous system experiences, the skin reflects. Stress lives on your face — and mindful beauty practices are the antidote.",
      "A mindful beauty routine doesn't require an hour. It requires presence. Applying a facial oil slowly, breathing deeply during a mask, or simply taking sixty seconds to massage your cleanser in upward strokes — these micro-rituals signal safety to the nervous system, lowering cortisol and allowing the skin to return to its regenerative state.",
      "Every treatment at Serenity Studio is designed with this in mind. Dim lighting, warmed linens, and the measured pace of our practitioners are not incidental — they are the treatment.",
    ],
  },
  {
    slug: "evening-rituals-cellular-repair",
    title: "Evening Rituals: Preparing Your Skin for Cellular Repair",
    category: "Ritual",
    readTime: "6 min read",
    excerpt:
      "Your skin does its best work while you sleep. Here is the ultimate 4-step evening guide to support your skin's natural circadian rhythm.",
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
  },
];
```

- [ ] **Step 3: Verify the module compiles**

```bash
cd /Users/dbp/Developer/mockup-salon && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors related to `app/lib/articles.ts`.

- [ ] **Step 4: Commit**

```bash
git add public/images/journal-lymphatic.jpg public/images/journal-mindful-beauty.jpg public/images/journal-evening-rituals.jpg app/lib/articles.ts
git commit -m "feat: add journal article data and images"
```

---

### Task 2: Create `/journal` listing page

**Files:**
- Create: `app/journal/page.tsx`

- [ ] **Step 1: Create `app/journal/page.tsx`**

```tsx
// app/journal/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { articles } from "../lib/articles";

export const metadata = {
  title: "Journal | Serenity Studio",
  description:
    "Wellness insights, skincare rituals, and mindful beauty research from the Serenity Studio team.",
};

export default function JournalPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <header className="py-20 md:py-28 text-center border-b border-outline-variant/20">
          <p className="font-label text-xs uppercase tracking-widest text-primary mb-4">
            The Serenity Journal
          </p>
          <h1 className="font-headline text-5xl md:text-6xl mb-4">
            Wellness{" "}
            <span className="italic font-light">Insights</span>
          </h1>
          <p className="font-body text-on-surface-variant">
            Rituals, research, and reflections from the studio.
          </p>
        </header>

        {/* Card grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="block border border-outline-variant/20 group"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-label text-xs uppercase tracking-widest text-white/80">
                    {article.category} · {article.readTime}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 bg-surface">
                <h2 className="font-headline text-xl mb-3">{article.title}</h2>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                <span className="font-label text-xs uppercase tracking-widest text-primary">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Run build to verify no errors**

```bash
cd /Users/dbp/Developer/mockup-salon && npm run build 2>&1 | tail -20
```

Expected: build succeeds, `/journal` route listed under static pages.

- [ ] **Step 3: Commit**

```bash
git add app/journal/page.tsx
git commit -m "feat: add /journal listing page"
```

---

### Task 3: Create `/journal/[slug]` article page

**Files:**
- Create: `app/journal/[slug]/page.tsx`

- [ ] **Step 1: Create `app/journal/[slug]/page.tsx`**

```tsx
// app/journal/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { articles } from "../../lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Serenity Studio`,
    description: article.excerpt,
    keywords: article.seoTerms.join(", "),
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero image */}
        <div className="relative h-[50vh] min-h-[320px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-10 left-6 md:left-12 max-w-2xl">
            <p className="font-label text-xs text-white/70 uppercase tracking-widest mb-3">
              {article.category} · {article.readTime}
            </p>
            <h1 className="font-headline text-3xl md:text-5xl text-white font-light">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-2xl mx-auto px-6 md:px-12 py-16">
          {/* SEO tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {article.seoTerms.map((term) => (
              <span
                key={term}
                className="border border-outline-variant/40 rounded-full px-4 py-1 font-label text-xs text-on-surface-variant"
              >
                {term}
              </span>
            ))}
          </div>

          {/* Lede */}
          <blockquote className="border-l-2 border-primary pl-6 mb-10 font-body text-lg italic text-on-surface leading-relaxed">
            {article.excerpt}
          </blockquote>

          {/* Body paragraphs */}
          {article.body.map((paragraph, i) => (
            <p
              key={i}
              className="font-body text-on-surface-variant leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}

          {/* Footer CTA */}
          <div className="border-t border-outline-variant/20 pt-10 flex justify-between items-center">
            <Link
              href="/journal"
              className="font-label text-xs uppercase tracking-widest text-primary"
            >
              ← Back to Journal
            </Link>
            <button className="btn-gradient text-on-primary px-8 py-3 rounded-full font-label text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all">
              {article.bookingCta}
            </button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Run build to verify all three article routes generate**

```bash
cd /Users/dbp/Developer/mockup-salon && npm run build 2>&1 | tail -30
```

Expected: build succeeds. Under static routes you should see:
- `/journal/lymphatic-drainage-benefits`
- `/journal/mindful-beauty-matters`
- `/journal/evening-rituals-cellular-repair`

- [ ] **Step 3: Commit**

```bash
git add app/journal/[slug]/page.tsx
git commit -m "feat: add /journal/[slug] article pages"
```
