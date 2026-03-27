"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingWidget from "@/app/components/BookingWidget";

const treatments = [
  {
    slug: "signature-facial",
    nameLine1: "Signature ",
    nameLine2: "Facial",
    category: "60 min · Facial",
    description:
      "Our most-loved treatment — a bespoke facial tailored to your skin's needs for lasting clarity and glow.",
    image: "/images/facial.jpg",
    bookingName: "Signature Facial",
    imageLeft: true,
  },
  {
    slug: "stone-therapy",
    nameLine1: "Stone ",
    nameLine2: "Therapy",
    category: "90 min · Body",
    description:
      "Heated basalt stones melt tension from the body while grounding the nervous system into deep rest.",
    image: "/images/stone.jpg",
    bookingName: "Stone Therapy",
    imageLeft: false,
  },
  {
    slug: "aromatherapy",
    nameLine1: "Aroma",
    nameLine2: "therapy",
    category: "60 min · Wellness",
    description:
      "A full-body ritual using essential oil blends to restore balance and invite stillness.",
    image: "/images/aromatherapy.jpg",
    bookingName: "Aromatherapy",
    imageLeft: true,
  },
  {
    slug: "manicure-pedi",
    nameLine1: "Manicure ",
    nameLine2: "& Pedi",
    category: "75 min · Nail Studio",
    description:
      "A luxurious hand and foot ritual with a cuticle treatment, shape, and long-lasting finish.",
    image: "/images/manicure.jpg",
    bookingName: "Manicure & Pedi",
    imageLeft: false,
  },
  {
    slug: "sculpt-lift-facial",
    nameLine1: "Sculpt & Lift ",
    nameLine2: "Facial",
    category: "60 min · Facial",
    description:
      "A 60-minute manual lifting massage using lymphatic drainage and microcurrent technology.",
    image: "/images/facial.jpg",
    bookingName: "Sculpt & Lift Facial",
    imageLeft: true,
  },
  {
    slug: "serenity-glow",
    nameLine1: "The Serenity ",
    nameLine2: "Glow",
    category: "90 min · Glow Treatment",
    description:
      "Our signature chemical-free peel combined with LED light therapy for instant radiance.",
    image: "/images/aromatherapy.jpg",
    bookingName: "The Serenity Glow",
    imageLeft: false,
  },
  {
    slug: "infrared-detox",
    nameLine1: "Infrared ",
    nameLine2: "Detox",
    category: "60 min · Sauna Suite",
    description:
      "A private sauna suite experience designed to reduce inflammation and boost cellular repair.",
    image: "/images/stone.jpg",
    bookingName: "Infrared Detox",
    imageLeft: true,
  },
];

export default function TreatmentsPage() {
  const [openTreatment, setOpenTreatment] = useState<string | null>(null);

  const toggleTreatment = (slug: string) => {
    setOpenTreatment((prev) => (prev === slug ? null : slug));
  };

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero header */}
        <div className="py-20 md:py-28 text-center border-b border-outline-variant/20 px-6">
          <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-primary mb-4">
            The Studio · Our Offerings
          </p>
          <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-6xl mb-6">
            The Art of <em className="font-light">Rejuvenation</em>
          </h1>
          <p className="font-[family-name:var(--font-body)] text-on-surface-variant max-w-md mx-auto">
            Each session is tailored to your unique biology and peace of mind.
          </p>
        </div>

        {/* Treatment rows */}
        {treatments.map((treatment) => (
          <div key={treatment.slug} className="border-b border-outline-variant/20">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 ${
                !treatment.imageLeft ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image column */}
              <div className="relative min-h-[360px]">
                <Image
                  src={treatment.image}
                  alt={`${treatment.nameLine1}${treatment.nameLine2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Text column */}
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-primary mb-3">
                  {treatment.category}
                </p>
                <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl mb-4">
                  {treatment.nameLine1}
                  <em className="font-light">{treatment.nameLine2}</em>
                </h2>
                <p className="font-[family-name:var(--font-body)] text-on-surface-variant leading-relaxed mb-8">
                  {treatment.description}
                </p>

                <div>
                  <button
                    type="button"
                    onClick={() => toggleTreatment(treatment.slug)}
                    className={`flex items-center gap-2 px-10 py-4 rounded-full font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase transition-all duration-500 ${
                      openTreatment === treatment.slug
                        ? "btn-gradient text-on-primary"
                        : "border border-primary/40 text-primary hover:bg-primary hover:text-on-primary"
                    }`}
                  >
                    Book Session
                    <span className="material-symbols-outlined text-base">
                      {openTreatment === treatment.slug
                        ? "expand_less"
                        : "expand_more"}
                    </span>
                  </button>

                  {openTreatment === treatment.slug && (
                    <div className="mt-8 animate-fade-in">
                      <BookingWidget
                        defaultTreatment={treatment.bookingName}
                        compact
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
