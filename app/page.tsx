"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingWidget from "./components/BookingWidget";

function HeroSection() {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          className="w-full h-full object-cover"
          src="/images/hero.jpg"
          alt="Luxury spa interior with soft natural light, stone textures and minimalist wooden furniture"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <span className="inline-block text-primary-container uppercase tracking-[0.3em] font-[family-name:var(--font-label)] text-sm mb-6 opacity-0 animate-fade-in-up">
            Experience Serenity Studio
          </span>
          <h1 className="font-[family-name:var(--font-headline)] text-5xl sm:text-6xl lg:text-8xl text-white mb-8 tracking-tighter leading-[1.1] opacity-0 animate-fade-in-up animation-delay-200">
            Unwind.
            <br />
            Rejuvenate.
            <br />
            <span className="italic font-light">Repeat.</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center opacity-0 animate-fade-in-up animation-delay-400">
            <a
              className="btn-gradient text-on-primary px-10 py-5 rounded-full font-[family-name:var(--font-label)] font-bold text-lg hover:opacity-95 transition-all hover:scale-[1.02] active:scale-[0.98]"
              href="#booking"
            >
              Book Now
            </a>
            <a
              className="text-white font-[family-name:var(--font-label)] font-medium tracking-widest border-b border-white/40 pb-1 hover:border-white transition-all text-sm"
              href="#services"
            >
              EXPLORE TREATMENTS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Signature Facial",
    price: "$120",
    duration: "60 Minutes",
    description:
      "A bespoke deep cleansing ritual using seasonal botanicals and lymphatic drainage.",
    image: "/images/facial.jpg",
    alt: "Close up of hands applying organic botanical facial oil",
    offset: false,
  },
  {
    title: "Stone Therapy",
    price: "$150",
    duration: "90 Minutes",
    description:
      "Basalt stones melted into the muscles to dissolve tension and restore energy flow.",
    image: "/images/stone.jpg",
    alt: "Warm basalt stones placed on a person's back during massage",
    offset: true,
  },
  {
    title: "Aromatherapy",
    price: "$95",
    duration: "60 Minutes",
    description:
      "Sensory immersion using hand-distilled oils to balance the nervous system.",
    image: "/images/aromatherapy.jpg",
    alt: "Calming head and shoulder massage with aromatic essential oils",
    offset: false,
  },
  {
    title: "Manicure & Pedi",
    price: "$85",
    duration: "75 Minutes",
    description:
      "Refined grooming with organic treatments and sustainable polish collections.",
    image: "/images/manicure.jpg",
    alt: "Minimalist manicure setup with neutral nail polish bottles",
    offset: true,
  },
];

function ServicesSection({ onServiceClick }: { onServiceClick: (title: string) => void }) {
  return (
    <section className="py-20 md:py-32 bg-surface-bright" id="services">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-20">
          <h2 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl text-on-surface mb-4">
            The Ritual Collection
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Each treatment is a choreographed movement of wellness, designed to
            restore your natural rhythm through ancestral techniques and modern
            science.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              onClick={() => onServiceClick(service.title)}
              className={`group cursor-pointer ${
                service.offset ? "lg:mt-12" : ""
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden mb-6 rounded-sm relative">
                <Image
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-[family-name:var(--font-headline)] text-xl md:text-2xl text-on-surface">
                  {service.title}
                </h3>
                <span className="font-[family-name:var(--font-label)] text-primary font-semibold">
                  {service.price}
                </span>
              </div>
              <p className="font-[family-name:var(--font-body)] text-on-surface-variant text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="text-xs font-[family-name:var(--font-label)] tracking-widest uppercase text-on-surface-variant group-hover:text-primary transition-colors">
                {service.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-surface-container-low overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-12 items-center gap-10 md:gap-20">
        <div className="col-span-12 lg:col-span-5">
          <span className="text-primary font-[family-name:var(--font-label)] uppercase tracking-widest text-sm mb-6 block">
            Our Philosophy
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-4xl md:text-6xl text-on-surface mb-8 leading-tight">
            A Sanctuary for the{" "}
            <span className="italic">Modern Soul</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-on-surface-variant mb-6 leading-relaxed">
            Founded in 2018, Serenity Studio was born from a desire to
            reclaim the slow pace of intentional living. We believe that wellness
            is not a luxury, but a necessity for clarity and creativity.
          </p>
          <p className="font-[family-name:var(--font-body)] text-lg text-on-surface-variant mb-10 leading-relaxed">
            Our studio is a curation of the senses—where architectural silence
            meets the healing power of touch. Every therapist is an artisan,
            every movement a purpose.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-primary" />
            <span className="font-[family-name:var(--font-headline)] italic text-xl">
              Elena Vane, Founder
            </span>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 relative">
          <div className="relative z-10 aspect-[16/10] bg-surface rounded-sm editorial-shadow overflow-hidden lg:translate-x-12 lg:translate-y-12">
            <Image
              className="w-full h-full object-cover"
              src="/images/team.jpg"
              alt="Professional portrait of a diverse team of wellness practitioners"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
          <div className="hidden lg:block absolute inset-0 border border-primary/20 -translate-x-12 -translate-y-12" />
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      '"The moment you step inside, the city\'s noise simply evaporates. The signature facial is transformative—my skin has never felt more alive."',
    name: "Julianna M.",
    role: "Visual Designer",
  },
  {
    quote:
      '"A masterclass in luxury. The stone therapy released tension I\'ve carried for years. It\'s truly a sanctuary for those who appreciate the finer details."',
    name: "Marcus Thorne",
    role: "Architect",
  },
  {
    quote:
      '"Minimalist, elegant, and deeply effective. Serenity Studio is where I come to find myself again after a long week of work."',
    name: "Clara H.",
    role: "Creative Director",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl mb-4">
            Client Reverie
          </h2>
          <p className="font-[family-name:var(--font-label)] uppercase tracking-widest text-primary text-sm">
            Whispers of Rest
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-surface-container-low p-8 md:p-12 rounded-sm ghost-border relative hover:editorial-shadow transition-shadow duration-500"
            >
              <div className="flex text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings: "'FILL' 1",
                      fontSize: "20px",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-[family-name:var(--font-body)] text-lg italic text-on-surface mb-8 leading-relaxed">
                {testimonial.quote}
              </p>
              <div>
                <p className="font-[family-name:var(--font-label)] font-bold text-sm uppercase tracking-wider">
                  {testimonial.name}
                </p>
                <p className="text-xs text-on-surface-variant font-[family-name:var(--font-label)]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection({ selectedTreatment }: { selectedTreatment: string }) {
  return (
    <section className="py-20 md:py-32 bg-surface-container-low" id="booking">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl mb-8 leading-tight">
              Reserve Your <br />
              <span className="italic font-light">Moment of Peace</span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-on-surface-variant mb-12">
              Select your preferred date and time, then choose your treatment
              and provide your email for instant confirmation.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">
                  verified
                </span>
                <div>
                  <h4 className="font-[family-name:var(--font-label)] font-bold text-sm uppercase">
                    Instant Confirmation
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Secure your slot in real-time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">
                  history
                </span>
                <div>
                  <h4 className="font-[family-name:var(--font-label)] font-bold text-sm uppercase">
                    Flexible Rescheduling
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Cancel or move up to 24h before.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <BookingWidget key={selectedTreatment} defaultTreatment={selectedTreatment} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-32 bg-surface" id="contact">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        <div>
          <h2 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl mb-8">
            Get in <span className="italic font-light">Touch</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-on-surface-variant mb-12 max-w-md">
            Have a question about our rituals or need help planning your
            sanctuary day? Our concierge is here to assist.
          </p>
          <div className="space-y-8">
            <div>
              <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-primary mb-2">
                Call Us
              </p>
              <p className="font-[family-name:var(--font-body)] text-xl text-on-surface">
                +1 (234) 567-8900
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-primary mb-2">
                Email
              </p>
              <p className="font-[family-name:var(--font-body)] text-xl text-on-surface">
                concierge@serenitystudio.com
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 md:p-12 rounded-sm ghost-border">
          {submitted ? (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl mb-6">
                Message Sent!
              </h3>
              <div className="bg-surface-container rounded-xl p-6 md:p-8 mb-8 max-w-md mx-auto text-left space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">person</span>
                  <div>
                    <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">From</p>
                    <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">{name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">topic</span>
                  <div>
                    <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">Subject</p>
                    <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">{subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">mail</span>
                  <div>
                    <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">Reply To</p>
                    <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">{email}</p>
                  </div>
                </div>
              </div>
              <p className="font-[family-name:var(--font-body)] text-on-surface-variant text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. We&apos;ve received your inquiry regarding{" "}
                {subject}. A member of the Serenity Studio team will respond to{" "}
                {email} shortly.
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase text-primary border border-primary/40 px-10 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-500"
              >
                Return to Top
              </button>
            </div>
          ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                Full Name
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant"
                placeholder="Your name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                Email Address
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant"
                placeholder="email@example.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                Subject
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant"
                placeholder="How can we help?"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                Message
              </label>
              <textarea
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant resize-none"
                placeholder="Tell us more…"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              className="btn-gradient text-on-primary px-10 py-5 rounded-full font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-500"
              type="submit"
            >
              Send Inquiry
            </button>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  const [selectedTreatment, setSelectedTreatment] = useState("");

  const handleServiceClick = (title: string) => {
    setSelectedTreatment(title);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection onServiceClick={handleServiceClick} />
        <AboutSection />
        <TestimonialsSection />
        <BookingSection selectedTreatment={selectedTreatment} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
