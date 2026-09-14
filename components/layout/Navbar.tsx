"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

export type ViewType = "home" | "problem" | "how-it-works";

interface NavbarProps {
  activeView: ViewType;
  onSelectView: (view: ViewType) => void;
  onJoinWaitlist?: () => void;
}

const navItems: { id: ViewType; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "how-it-works", label: "How it works" },
];

export default function Navbar({
  activeView,
  onSelectView,
  onJoinWaitlist,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile overlay is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (view: ViewType) => {
    onSelectView(view);
    setMobileOpen(false);
  };

  const handleCtaClick = () => {
    if (onJoinWaitlist) {
      onJoinWaitlist();
    } else {
      onSelectView("home");
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Floating Compact Island Navbar (Small Horizontally) */}
      <header
        id="main-navbar"
        className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[94vw] pointer-events-auto"
      >
        <div className="flex items-center gap-3 sm:gap-5 px-3 sm:px-4 py-2 rounded-full bg-[#183A37]/85 backdrop-blur-md border border-cream/15 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick("home")}
            id="navbar-logo"
            className="flex items-center gap-2.5 group cursor-pointer text-left pl-1 sm:pl-2"
          >
            <div
              className="w-7 h-7 rounded-lg bg-seagrass flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
              style={{ boxShadow: "0 2px 8px rgba(97,152,142,0.3)" }}
            >
              <span className="text-cream font-sans font-bold text-xs tracking-wider">F</span>
            </div>
            <span className="font-serif text-base sm:text-lg text-cream font-medium tracking-tight">
              FlipShift
            </span>
          </button>

          {/* Desktop Navigation Links (Compact horizontal pill) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 px-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1 rounded-full font-sans text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-cream bg-white/10"
                      : "text-cream/65 hover:text-cream hover:bg-white/5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:block">
            <Button
              variant="primary"
              size="sm"
              id="navbar-cta"
              onClick={handleCtaClick}
              showIcon={false}
              className="!py-1.5 !px-3.5 !text-xs whitespace-nowrap"
            >
              Join the waitlist
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center cursor-pointer text-cream"
            aria-label="Toggle navigation menu"
          >
            <div className="w-4 h-3 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-cream rounded-full transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-cream rounded-full transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-cream rounded-full transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Screen-Filling Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="navbar-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#183A37] flex flex-col items-center justify-center gap-8 px-6"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-cream cursor-pointer"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => {
                const isActive = activeView === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`font-serif text-3xl font-medium tracking-tight cursor-pointer ${
                        isActive ? "text-seagrass" : "text-cream hover:text-seagrass"
                      } transition-colors`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.2, duration: 0.25 }}
              className="mt-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleCtaClick}
              >
                Join the waitlist
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
