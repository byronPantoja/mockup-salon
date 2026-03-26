import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-16 md:py-20 px-6 md:px-12 bg-surface-container-high">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
        {/* Brand & Address */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">spa</span>
            <span className="font-[family-name:var(--font-headline)] text-xl text-on-surface font-bold">Serenity Studio</span>
          </div>
          <div className="text-on-surface-variant font-[family-name:var(--font-body)] text-sm tracking-wide leading-relaxed">
            124 Serenity Lane
            <br />
            West Hollywood, CA 90069
            <br />
            United States
          </div>
          <div className="flex gap-4">
            <a
              className="text-primary hover:text-primary-container transition-all text-sm font-medium"
              href="#"
            >
              Instagram
            </a>
            <a
              className="text-primary hover:text-primary-container transition-all text-sm font-medium"
              href="#"
            >
              Pinterest
            </a>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="space-y-6">
          <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest font-bold">
            The Studio
          </p>
          <ul className="space-y-4">
            {[
              { label: "Journal", href: "/journal" },
              { label: "Membership", href: "/membership" },
              { label: "Sustainability Report", href: "#" },
              { label: "Gift Cards", href: "#" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-[family-name:var(--font-body)] text-sm tracking-wide"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Hours */}
        <div className="space-y-6">
          <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest font-bold">
            Opening Hours
          </p>
          <ul className="space-y-4 font-[family-name:var(--font-body)] text-sm tracking-wide text-on-surface-variant">
            <li className="flex justify-between">
              <span>Mon - Fri</span> <span>09:00 - 20:00</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span> <span>10:00 - 18:00</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span> <span>Closed</span>
            </li>
          </ul>
        </div>
        {/* Map Placeholder */}
        <div className="h-48 bg-surface-container rounded-sm relative overflow-hidden group">
          <Image
            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
            src="/images/map.jpg"
            alt="Map showing West Hollywood, CA location"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-surface/80 backdrop-blur px-4 py-2 text-xs font-[family-name:var(--font-label)] uppercase tracking-widest">
              View Map
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-16 md:mt-20 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-on-surface-variant font-[family-name:var(--font-body)] text-sm tracking-wide">
          © 2024 Serenity Studio. All rights reserved.
        </p>
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
      </div>
    </footer>
  );
}
