"use client";

import { useState } from "react";

interface BookingWidgetProps {
  defaultTreatment?: string;
}

export default function BookingWidget({ defaultTreatment = "" }: BookingWidgetProps) {
  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTreatment, setSelectedTreatment] = useState(defaultTreatment);
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

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
    { name: "Sculpt & Lift Facial", price: "$140", duration: "60 min" },
    { name: "The Serenity Glow", price: "$120", duration: "90 min" },
    { name: "Infrared Detox", price: "$110", duration: "60 min" },
  ];

  const handleConfirm = () => {
    if (!selectedTreatment || !email) return;
    setConfirmed(true);
  };

  const handleReset = () => {
    setSelectedDate(6);
    setSelectedTime("11:00 AM");
    setStep(1);
    setSelectedTreatment(defaultTreatment);
    setEmail("");
    setConfirmed(false);
  };


  return (
    <div className="bg-surface rounded-sm editorial-shadow overflow-hidden">

      {/* Confirmation Success Overlay */}
      {confirmed ? (
        <div className="p-8 md:p-14 text-center animate-fade-in">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span
              className="material-symbols-outlined text-primary text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl mb-6">
            Appointment Confirmed
          </h3>
          <div className="bg-surface-container-low rounded-xl p-6 md:p-8 mb-8 max-w-md mx-auto text-left space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
              <div>
                <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">
                  Date &amp; Time
                </p>
                <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">
                  Wednesday, Nov {selectedDate} at {selectedTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">spa</span>
              <div>
                <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">
                  Treatment
                </p>
                <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">
                  {selectedTreatment}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">mail</span>
              <div>
                <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">
                  Email
                </p>
                <p className="font-[family-name:var(--font-body)] text-on-surface font-medium">
                  {email}
                </p>
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
                  {/* Month navigation — non-functional in mockup */}
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
                      <span className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1 block">
                        {t.duration}
                      </span>
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
                  <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant mb-3">
                    Summary
                  </p>
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
  );
}
