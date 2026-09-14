import Link from "next/link";
import { BrandIcon } from "../ui/BrandIcons";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="section-dark border-t border-cream/5"
    >
      <div
        className="max-w-[1280px] mx-auto"
        style={{
          paddingLeft: "var(--section-padding-x)",
          paddingRight: "var(--section-padding-x)",
        }}
      >

        {/* Bottom row */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <BrandIcon
              size={24}
              className="w-6 h-6 transition-smooth group-hover:scale-105"
            />
            <span className="font-serif text-cream/80 text-base font-medium">
              FlipShift
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-cream/50 font-sans">
            <Link
              href="/privacy"
              className="hover:text-cream transition-smooth"
            >
              Privacy policy
            </Link>
            <span className="text-cream/20">|</span>
            <Link
              href="/terms"
              className="hover:text-cream transition-smooth"
            >
              Terms
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-cream/30 text-xs font-sans">
            &copy; {new Date().getFullYear()} FlipShift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
