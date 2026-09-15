import type { Metadata } from "next";
import { Newsreader, Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "FlipShift - Circadian Wellness for Shift Workers",
    template: "%s | FlipShift",
  },
  description:
    "FlipShift understands the specific reality of shift work. Smart circadian guidance that adapts to your rotating schedule, not the other way around.",
  keywords: [
    "shift work",
    "circadian rhythm",
    "sleep",
    "wellness",
    "rotating schedule",
    "night shift",
    "shift worker health",
  ],
  openGraph: {
    title: "FlipShift - Circadian Wellness for Shift Workers",
    description:
      "Smart circadian guidance that adapts to your rotating schedule.",
    type: "website",
    locale: "en_US",
    siteName: "FlipShift",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", newsreader.variable, montserrat.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col relative bg-transparent">
        {/* Fixed physical film grain texture per high-end-visual-design */}
        <div
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] mix-blend-overlay noise-texture"
          aria-hidden="true"
        />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
