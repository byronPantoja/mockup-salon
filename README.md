# Serenity Studio — Service Business Landing Page Mockup

**Live:** [mockup-salon.vercel.app](https://mockup-salon.vercel.app)

A fully functional, multi-page website mockup for a fictional boutique wellness studio. Built with Next.js, Tailwind CSS, and TypeScript, this is one of three portfolio projects demonstrating my ability to ship production-quality web applications rapidly.

---

## 🤖 The AI-Assisted Development Process

This project was built in roughly 2 days as part of a 10-day portfolio sprint, serving as a masterclass in modern, AI-assisted development. I don't use AI to write code blindly; I use it as a powerful development partner to accelerate boilerplate, iterate on design decisions, and enforce best practices. 

My workflow demonstrates my ability to act as an **AI-augmented engineer**:

1. **Strategic Planning:** Before writing a single line of code, I defined the sitemap, component architecture, and design system. I established a premium, warm aesthetic targeting the wellness industry (soft neutrals, serif/sans-serif typography pairing, and generous whitespace).
2. **Component-Driven Assembly:** I built isolated, reusable foundational components (`ServiceCard`, `TestimonialCard`, `BookingWidget`) before assembling features into full pages, mirroring the maintainable, modular approach required in real-world team environments.
3. **AI Pair Programming:** I used AI (like Claude and Gemini) for scaffolding components, generating realistic mock copy, immediate debugging, and instant code review. By offloading the boilerplate to AI, I was able to focus entirely on higher-order engineering tasks: architecture planning, state management, UI polish, and user experience. **The result is senior-level output at an accelerated pace.**
4. **Iterative QA & Polish:** I ran a full audit across the application, systemically fixing responsive breakdowns, refining interaction states (like form validation and button feedback), verifying image optimization, and ensuring calendar widget accuracy.

---

## 🎯 What this project demonstrates

**For employers evaluating my work:** This isn't a pre-made template. Every component, layout decision, and state interaction was built intentionally to show what I can deliver for a real client.

| Skill | Where to look |
|-------|---------------|
| **Component Architecture** | Reusable cards, forms, fluid typography, and layout wrappers across multiple routes. |
| **Interactive UI & State** | Booking calendar with date selection, dynamic time slot picking, and structured confirmation flows. |
| **Multi-page Routing** | 4+ distinct routes with persistent navigation, footer, and seamless cross-page transitions. |
| **Responsive Design** | Pixel-perfect mobile parity containing custom hamburger menus, stacked grids, and fluid spacing. |
| **Content Strategy** | Journal section configured with 3 complete blog articles utilizing dynamic Next.js routing. |
| **Attention to Detail** | Form validation UI states, micro-animations, accordion expansions, and robust `next/image` optimization. |

---

## 🗺️ Pages & Features

- **`/` (Home)** — Immersive hero, services overview, philosophy/about section, testimonials, inline booking calendar, and a responsive contact form.
- **`/treatments`** — Comprehensive service catalog (7 treatments), utilizing expanding accordion booking widgets per service.
- **`/journal`** — Blog index featuring 3 articles, each rendering on its own dynamic route with full content structure.
- **`/membership`** — A specialized "coming soon" teaser page oriented around an email capture flow.

---

## 💻 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Images:** `next/image` for automatic layout shifts prevention and WebP optimization
- **Deployment:** Vercel
- **Data:** 100% static/mock data with no external backend dependency. Forms and booking engines maintain full UI application state locally to demonstrate interaction patterns.

---

## 🔍 Key Components Worth Reviewing

### `BookingCalendar`
The most complex component in the repository—a custom month-view calendar featuring:
- Dynamic month/year rendering based on the user's current local date.
- Clickable date cells with persistent visual selected states.
- A dynamic time slot panel that populates based on the selected date.
- A simulated confirmation flow upon clicking "Continue."

### Accordion Treatment Cards
Featured on `/treatments`, each service card expands smoothly to reveal its own isolated inline booking calendar, utilizing React state for toggling and Tailwind for smooth layout transitions.

### `ContactForm`
A production-ready UI form pattern complete with labeled inputs, aesthetic placeholder text, and submission feedback states. Prepared perfectly for integration with a backend service (SendGrid, Resend, etc.).

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/byronpantoja/mockup-salon.git

# Navigate into the project
cd mockup-salon

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Part of a Larger Portfolio

This is **Project 1 of 3** in my portfolio at [byronpantoja.com](https://byronpantoja.com):

1. **Serenity Studio** (this repo) — Service business landing page with a bespoke booking UI.
2. **Next.js + Shopify Storefront** — Headless e-commerce platform integrated with the live Shopify Storefront API.
3. **Business Dashboard** — Internal analytics dashboard featuring configurable charts, sortable data tables, and complex sidebar navigation.

*Each project targets a distinct domain: marketing sites, e-commerce, and internal tools.*

---

## 👋 About Me

I'm **Byron Pantoja** — a web developer based in Davao, Philippines. I turn complex technical requirements into elegant tools that non-technical people actually enjoy using. 

With over 14 years of operations and brand strategy experience at Coffee For Peace, I bring seasoned business acumen to my engineering. I am now focused on building modern, high-performance web applications with Next.js, React, and Tailwind CSS.

**Available for remote work.**  
📧 [byronpantoja@gmail.com](mailto:byronpantoja@gmail.com) · 🔗 [LinkedIn](https://www.linkedin.com/in/byronpantoja)
