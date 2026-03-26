"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex items-center gap-2 transition-colors duration-500 cursor-pointer ${
            scrolled ? "text-primary" : "text-white"
          }`}
        >
          <span className="material-symbols-outlined text-2xl">spa</span>
          <span className="font-[family-name:var(--font-headline)] text-xl md:text-2xl font-bold">
            Serenity Studio
          </span>
        </a>
        <div className="hidden md:flex gap-10">
          {[
            { label: "Treatments", href: "#services" },
            { label: "Journal", href: "#" },
            { label: "Membership", href: "#" },
            { label: "Contact", href: "#contact" },
          ].map((link) => (
            <a
              key={link.label}
              className={`font-[family-name:var(--font-headline)] text-lg tracking-tight transition-all duration-500 ${
                scrolled
                  ? "text-stone-500 hover:text-emerald-800 hover:tracking-widest"
                  : "text-white/70 hover:text-white hover:tracking-widest"
              }`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <button className="btn-gradient text-on-primary px-6 md:px-8 py-3 rounded-full font-[family-name:var(--font-label)] font-medium tracking-wide hover:opacity-90 transition-all duration-500 text-sm md:text-base">
          Book Session
        </button>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-4"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className={`material-symbols-outlined text-2xl ${
              scrolled ? "text-on-surface" : "text-white"
            }`}
          >
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav mt-2 mx-4 rounded-xl p-6 space-y-4 animate-fade-in">
          {["Treatments", "Journal", "Membership", "Contact"].map(
            (link) => (
              <a
                key={link}
                href={
                  link === "Treatments"
                    ? "#services"
                    : link === "Contact"
                    ? "#contact"
                    : "#"
                }
                className="block font-[family-name:var(--font-headline)] text-lg text-on-surface py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
}

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

function ServicesSection() {
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

function BookingSection() {
  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [treatmentOpen, setTreatmentOpen] = useState(false);

  const prevMonthDays = [28, 29, 30, 31];
  const days = Array.from({ length: 17 }, (_, i) => i + 1);

  const timeSlots = [
    "09:30 AM",
    "11:00 AM",
    "01:30 PM",
    "03:00 PM",
    "04:30 PM",
  ];

  const treatments = [
    { name: "Signature Facial", price: "$120", duration: "60 min" },
    { name: "Stone Therapy", price: "$150", duration: "90 min" },
    { name: "Aromatherapy", price: "$95", duration: "60 min" },
    { name: "Manicure & Pedi", price: "$85", duration: "75 min" },
  ];

  const handleConfirm = () => {
    if (!selectedTreatment || !email) return;
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    setStep(1);
    setSelectedTreatment("");
    setEmail("");
  };

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
            <div className="bg-surface rounded-sm editorial-shadow overflow-hidden">

              {/* Confirmation Success Overlay */}
              {confirmed ? (
                <div className="p-8 md:p-14 text-center animate-fade-in">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl mb-6">
                    Appointment Confirmed
                  </h3>
                  <div className="bg-surface-container-low rounded-xl p-6 md:p-8 mb-8 max-w-md mx-auto text-left space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                      <div>
                        <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">Date & Time</p>
                        <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">Wednesday, Nov {selectedDate} at {selectedTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">spa</span>
                      <div>
                        <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">Treatment</p>
                        <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">{selectedTreatment}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">mail</span>
                      <div>
                        <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">Email</p>
                        <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">{email}</p>
                      </div>
                    </div>
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-on-surface-variant text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                    A confirmation with your appointment details has been sent to your email.
                  </p>
                  <button
                    onClick={handleReset}
                    className="font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase text-primary border border-primary/40 px-10 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-500"
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Step 1: Calendar + Time */}
                  {step === 1 ? (
                    <>
                      <div className="p-6 md:p-10 md:border-r border-b md:border-b-0 border-surface-container">
                        <div className="flex justify-between items-center mb-8">
                          <h3 className="font-[family-name:var(--font-headline)] text-xl">
                            November 2024
                          </h3>
                          <div className="flex gap-4">
                            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                              chevron_left
                            </button>
                            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                              chevron_right
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 text-center text-xs font-[family-name:var(--font-label)] text-on-surface-variant mb-4 tracking-widest uppercase">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                            <span key={day}>{day}</span>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {prevMonthDays.map((d) => (
                            <div
                              key={`prev-${d}`}
                              className="py-3 text-on-surface-variant/30 text-sm"
                            >
                              {d}
                            </div>
                          ))}
                          {days.map((d) => (
                            <button
                              key={d}
                              className={`py-3 text-sm transition-colors rounded-full ${
                                selectedDate === d
                                  ? "bg-primary text-white font-bold"
                                  : "hover:bg-surface-container-low"
                              }`}
                              onClick={() => setSelectedDate(d)}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 md:p-10 flex flex-col">
                        <h3 className="font-[family-name:var(--font-headline)] text-xl mb-4">
                          Availability
                        </h3>
                        <p className="font-[family-name:var(--font-label)] text-xs text-on-surface-variant uppercase tracking-widest mb-8">
                          Wednesday, Nov {selectedDate}
                        </p>
                        <div className="space-y-3 flex-grow overflow-y-auto max-h-[300px] pr-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              className={`w-full py-4 px-6 text-left font-[family-name:var(--font-label)] text-sm flex justify-between items-center rounded-sm transition-colors ${
                                selectedTime === time
                                  ? "bg-primary-container/20 border border-primary/20 text-on-primary-container"
                                  : "bg-surface-container-low hover:bg-surface-container-high"
                              }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              <span>{time}</span>
                              <span
                                className={`text-[10px] tracking-tighter ${
                                  selectedTime === time
                                    ? "font-bold"
                                    : "text-on-surface-variant"
                                }`}
                              >
                                {selectedTime === time ? "SELECTED" : "AVAILABLE"}
                              </span>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setStep(2)}
                          className="mt-8 btn-gradient text-on-primary w-full py-4 rounded-full font-[family-name:var(--font-label)] font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Step 2: Treatment + Email */
                    <>
                      <div className="p-6 md:p-10 md:border-r border-b md:border-b-0 border-surface-container">
                        <div className="flex items-center gap-3 mb-8">
                          <button
                            onClick={() => setStep(1)}
                            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
                          >
                            arrow_back
                          </button>
                          <h3 className="font-[family-name:var(--font-headline)] text-xl">
                            Select Treatment
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {treatments.map((t) => (
                            <button
                              key={t.name}
                              className={`w-full py-4 px-6 text-left font-[family-name:var(--font-label)] rounded-sm transition-all duration-300 ${
                                selectedTreatment === t.name
                                  ? "bg-primary-container/20 border border-primary/20"
                                  : "bg-surface-container-low hover:bg-surface-container-high"
                              }`}
                              onClick={() => setSelectedTreatment(t.name)}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-on-surface">{t.name}</span>
                                <span className="text-primary font-semibold">{t.price}</span>
                              </div>
                              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1 block">{t.duration}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 md:p-10 flex flex-col">
                        <h3 className="font-[family-name:var(--font-headline)] text-xl mb-2">
                          Your Details
                        </h3>
                        <p className="font-[family-name:var(--font-label)] text-xs text-on-surface-variant uppercase tracking-widest mb-8">
                          Nov {selectedDate} · {selectedTime}
                        </p>

                        <div className="mb-6">
                          <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                            Email Address
                          </label>
                          <input
                            className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant font-[family-name:var(--font-body)]"
                            placeholder="your@email.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        {/* Summary */}
                        <div className="bg-surface-container-low rounded-sm p-5 mb-6 space-y-2 flex-grow">
                          <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-3">Summary</p>
                          <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
                            <span className="text-on-surface-variant">Date</span>
                            <span className="text-on-surface font-medium">Nov {selectedDate}</span>
                          </div>
                          <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
                            <span className="text-on-surface-variant">Time</span>
                            <span className="text-on-surface font-medium">{selectedTime}</span>
                          </div>
                          <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
                            <span className="text-on-surface-variant">Treatment</span>
                            <span className="text-on-surface font-medium">{selectedTreatment || "—"}</span>
                          </div>
                        </div>

                        <button
                          onClick={handleConfirm}
                          disabled={!selectedTreatment || !email}
                          className={`mt-auto btn-gradient text-on-primary w-full py-4 rounded-full font-[family-name:var(--font-label)] font-bold uppercase tracking-widest text-xs transition-all hover:scale-[1.01] active:scale-[0.99] ${
                            !selectedTreatment || !email ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"
                          }`}
                        >
                          Confirm Appointment
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
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
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                Full Name
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant"
                placeholder="Your name"
                type="text"
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
              />
            </div>
            <div>
              <label className="block font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                Message
              </label>
              <textarea
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 focus:outline-none px-0 pb-4 transition-all placeholder:text-outline-variant resize-none"
                placeholder="How can we help?"
                rows={4}
              />
            </div>
            <button
              className="font-[family-name:var(--font-label)] font-bold text-sm tracking-[0.2em] uppercase text-primary border border-primary/40 px-10 py-5 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-500"
              type="submit"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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
            {["Journal", "Membership", "Sustainability Report", "Gift Cards"].map(
              (link) => (
                <li key={link}>
                  <a
                    className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-[family-name:var(--font-body)] text-sm tracking-wide"
                    href="#"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
