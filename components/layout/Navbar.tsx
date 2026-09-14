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
      <header
        id="main-navbar"
        className="sticky top-0 z-50 w-full bg-[#183A37] border-b border-cream/10 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick("home")}
            id="navbar-logo"
            className="flex items-center gap-3 group cursor-pointer text-left"
          >
            <div
              className="w-8 h-8 rounded-xl bg-seagrass flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ boxShadow: "0 2px 10px rgba(97,152,142,0.3)" }}
            >
              <span className="text-cream font-sans font-bold text-xs tracking-wider">F</span>
            </div>
            <span className="font-serif text-lg md:text-xl text-cream font-medium tracking-tight">
              FlipShift
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-200 py-1.5 cursor-pointer ${
                    isActive ? "text-cream" : "text-cream/65 hover:text-cream"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-seagrass rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}

            <Button
              variant="primary"
              size="sm"
              id="navbar-cta"
              onClick={handleCtaClick}
            >
              Join the waitlist
            </Button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            id="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-cream rounded-full transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-cream rounded-full transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-cream rounded-full transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
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
