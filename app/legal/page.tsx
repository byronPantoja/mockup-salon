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
