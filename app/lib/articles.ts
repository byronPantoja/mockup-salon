export interface Article {
  slug: string
  title: string
  category: string
  readTime: string
  excerpt: string
  seoTerms: string[]
  image: string
  bookingCta: string
  body: string[]
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
]
