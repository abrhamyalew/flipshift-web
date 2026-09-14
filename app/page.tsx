"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import HomeView from "../components/landing/HomeView";
import ProblemView from "../components/landing/ProblemView";
import HowItWorksView from "../components/landing/HowItWorksView";

export type ViewType = "home" | "problem" | "how-it-works";

const VIEWS: ViewType[] = ["home", "problem", "how-it-works"];

const viewVariants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: "0%",
    opacity: 1,
    transition: {
      y: { type: "spring" as const, stiffness: 260, damping: 28 },
      opacity: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      y: { type: "spring" as const, stiffness: 260, damping: 28 },
      opacity: { duration: 0.25 },
    },
  }),
};

export default function LandingPage() {
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [direction, setDirection] = useState<number>(1);
  const touchStartY = useRef<number | null>(null);
  const isTransitioning = useRef<boolean>(false);

  // Switch view with directional animation
  const goToView = useCallback(
    (targetView: ViewType) => {
      if (targetView === activeView) return;
      const currentIndex = VIEWS.indexOf(activeView);
      const targetIndex = VIEWS.indexOf(targetView);
      const newDirection = targetIndex > currentIndex ? 1 : -1;

      setDirection(newDirection);
      setActiveView(targetView);

      const targetHash = targetView === "home" ? "" : `#${targetView}`;
      history.pushState(null, "", targetHash || window.location.pathname);
    },
    [activeView]
  );

  const goToNext = useCallback(() => {
    const currentIndex = VIEWS.indexOf(activeView);
    if (currentIndex < VIEWS.length - 1) {
      goToView(VIEWS[currentIndex + 1]);
    }
  }, [activeView, goToView]);

  const goToPrev = useCallback(() => {
    const currentIndex = VIEWS.indexOf(activeView);
    if (currentIndex > 0) {
      goToView(VIEWS[currentIndex - 1]);
    }
  }, [activeView, goToView]);

  // Sync with URL hash on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "problem") {
        setActiveView("problem");
      } else if (hash === "how-it-works") {
        setActiveView("how-it-works");
      } else {
        setActiveView("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Keyboard navigation: ArrowDown, ArrowUp, ArrowRight, ArrowLeft, PageDown, PageUp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept keyboard events if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch swipe support on mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      touchStartY.current = null;

      // Threshold of 50px for swipe gesture
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goToNext, goToPrev]);

  // Join waitlist from any view returns to Home and focuses input
  const handleJoinWaitlist = useCallback(() => {
    goToView("home");
    setTimeout(() => {
      const input = document.getElementById("waitlist-email-input");
      if (input) {
        input.focus();
      }
    }, 450);
  }, [goToView]);

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden relative bg-[#183A37] select-none">
      {/* Floating Side Pagination Indicator */}
      <nav
        aria-label="View Pagination"
        className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 bg-[#121817]/40 backdrop-blur-md border border-cream/10 rounded-full px-2 py-3.5"
      >
        {VIEWS.map((viewName, idx) => {
          const isActive = activeView === viewName;
          const labels: Record<ViewType, string> = {
            home: "01 Home",
            problem: "02 Problem",
            "how-it-works": "03 How it works",
          };
          return (
            <button
              key={viewName}
              onClick={() => goToView(viewName)}
              className="group relative flex items-center justify-center p-1.5 cursor-pointer"
              aria-label={`Go to ${labels[viewName]}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-seagrass scale-125 shadow-[0_0_8px_rgba(97,152,142,0.6)]"
                    : "bg-cream/30 group-hover:bg-cream/60"
                }`}
              />

              {/* Tooltip on hover */}
              <span className="absolute right-7 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap text-[11px] font-sans text-cream bg-[#183A37] border border-cream/15 px-2 py-0.5 rounded-md shadow-md">
                {labels[viewName]}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Floating Keyboard Hint (discreet, bottom-left) */}
      <div className="hidden md:flex items-center gap-2 fixed bottom-4 left-6 z-40 text-cream/40 text-[11px] font-sans pointer-events-none">
        <span className="px-1.5 py-0.5 rounded border border-cream/20 bg-cream/5 font-mono text-[10px]">
          Use keyboard arrows ↑ ↓ to navigate
        </span>
      </div>

      {/* Main Full-Viewport Animated View Stage */}
      <main id="main-content" className="w-full h-full relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {activeView === "home" && (
            <motion.div
              key="home"
              custom={direction}
              variants={viewVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <HomeView onGoToProblem={() => goToView("problem")} />
            </motion.div>
          )}

          {activeView === "problem" && (
            <motion.div
              key="problem"
              custom={direction}
              variants={viewVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <ProblemView
                onGoToHome={() => goToView("home")}
                onGoToHowItWorks={() => goToView("how-it-works")}
              />
            </motion.div>
          )}

          {activeView === "how-it-works" && (
            <motion.div
              key="how-it-works"
              custom={direction}
              variants={viewVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <HowItWorksView
                onGoToProblem={() => goToView("problem")}
                onJoinWaitlist={handleJoinWaitlist}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
