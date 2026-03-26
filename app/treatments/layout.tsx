import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatments | Serenity Studio",
  description:
    "Explore our bespoke treatments — Sculpt & Lift Facial, The Serenity Glow, and Infrared Detox. Tailored to your unique biology.",
};

export default function TreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
