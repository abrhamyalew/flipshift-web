"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar, { ViewType } from "../components/layout/Navbar";
import HomeView from "../components/landing/HomeView";
import ProblemView from "../components/landing/ProblemView";
import HowItWorksView from "../components/landing/HowItWorksView";

export default function LandingPage() {
  const [activeView, setActiveView] = useState<ViewType>("home");

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

  const handleSelectView = useCallback((view: ViewType) => {
    setActiveView(view);
    const targetHash = view === "home" ? "" : `#${view}`;
    if (window.location.hash !== targetHash) {
      history.pushState(null, "", targetHash || window.location.pathname);
    }
  }, []);

  const handleJoinWaitlist = useCallback(() => {
    handleSelectView("home");
    setTimeout(() => {
      const input = document.getElementById("waitlist-email-input");
      if (input) {
        input.focus();
      }
    }, 300);
  }, [handleSelectView]);

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full flex flex-col overflow-hidden bg-[#183A37]">
      {/* Top Fixed Full-Width Navbar */}
      <Navbar
        activeView={activeView}
        onSelectView={handleSelectView}
        onJoinWaitlist={handleJoinWaitlist}
      />

      {/* Main Full-Viewport Discrete View Area */}
      <main id="main-content" className="flex-1 w-full overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full overflow-y-auto"
            >
              <HomeView />
            </motion.div>
          )}

          {activeView === "problem" && (
            <motion.div
              key="problem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full overflow-y-auto"
            >
              <ProblemView />
            </motion.div>
          )}

          {activeView === "how-it-works" && (
            <motion.div
              key="how-it-works"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full overflow-y-auto"
            >
              <HowItWorksView onJoinWaitlist={handleJoinWaitlist} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
