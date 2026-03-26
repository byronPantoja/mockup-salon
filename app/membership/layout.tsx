import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership | Serenity Studio",
  description:
    "Join The Inner Circle — a curated wellness journey arriving Fall 2026. Priority booking, exclusive treatments, and member-only retreats.",
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
