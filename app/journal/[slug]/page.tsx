import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { articles } from "../../lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | Serenity Studio`,
    description: article.excerpt,
    keywords: article.seoTerms.join(", "),
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
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
