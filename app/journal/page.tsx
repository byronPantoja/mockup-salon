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
