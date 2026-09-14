import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spouse Radar",
  description: "Live status shared by your shift-working partner.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RadarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
