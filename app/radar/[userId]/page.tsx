"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Mock data - will be replaced with Server Action call to NestJS
const mockRadarData = {
  name: "Alex",
  status: "sleeping" as "sleeping" | "awake",
  until: "6:30 AM",
  energyAtWake: "Good",
  energyLevel: 75,
  nextFreeWindow: {
    start: "10:00 AM",
    end: "2:00 PM",
  },
};

export default function SpouseRadarPage() {
  const [data, setData] = useState(mockRadarData);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Simulate checking status every 30 seconds
    const interval = setInterval(() => {
      // In production this would call getRadarStatus(userId)
      setData((prev) => ({ ...prev }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-grey flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cream/20 border-t-cream rounded-full animate-spin" />
      </div>
    );
  }

  const isSleeping = data.status === "sleeping";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.status}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`
          min-h-screen flex flex-col items-center justify-center relative overflow-hidden
          transition-colors duration-1000
          ${isSleeping ? "bg-slate-grey" : "bg-cream"}
        `}
      >
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {isSleeping ? (
            <>
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-seagrass/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-seagrass/5 rounded-full blur-3xl" />
              {/* Stars effect for sleeping */}
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cream/20 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.6, 0.1],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </>
          ) : (
            <>
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-seagrass/8 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-slate-grey/5 rounded-full blur-3xl" />
            </>
          )}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
          {/* Status indicator pulse */}
          <motion.div
            className="mx-auto mb-8 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div
              className={`w-5 h-5 rounded-full mx-auto ${
                isSleeping ? "bg-seagrass" : "bg-slate-grey"
              }`}
            />
            <motion.div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full ${
                isSleeping ? "bg-seagrass" : "bg-slate-grey"
              }`}
              animate={{
                scale: [1, 3],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>

          {/* Status text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`font-serif text-6xl md:text-8xl font-medium mb-3 ${
              isSleeping ? "text-cream" : "text-slate-grey"
            }`}
          >
            {isSleeping ? "Sleeping" : "Awake"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`font-sans text-xl md:text-2xl mb-16 ${
              isSleeping ? "text-cream/50" : "text-mauve"
            }`}
          >
            until {data.until}
          </motion.p>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className={`
              rounded-2xl p-6 md:p-8 space-y-6
              ${
                isSleeping
                  ? "glass-dark"
                  : "glass-light"
              }
            `}
          >
            {/* Energy at wake */}
            <div>
              <p
                className={`font-sans text-xs uppercase tracking-widest mb-2 ${
                  isSleeping ? "text-cream/30" : "text-mauve/60"
                }`}
              >
                {isSleeping ? "Energy at wake" : "Current energy"}
              </p>

              <div className="flex items-center justify-center gap-3">
                <span
                  className={`font-serif text-2xl font-medium ${
                    isSleeping ? "text-cream" : "text-slate-grey"
                  }`}
                >
                  {data.energyAtWake}
                </span>

                {/* Energy bar */}
                <div
                  className={`w-32 h-2 rounded-full overflow-hidden ${
                    isSleeping ? "bg-cream/10" : "bg-slate-grey/10"
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.energyLevel}%` }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className={`h-full rounded-full ${
                      data.energyLevel > 60 ? "bg-seagrass" : "bg-mauve"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className={`h-px ${isSleeping ? "bg-cream/5" : "bg-slate-grey/5"}`}
            />

            {/* Next free window */}
            <div>
              <p
                className={`font-sans text-xs uppercase tracking-widest mb-2 ${
                  isSleeping ? "text-cream/30" : "text-mauve/60"
                }`}
              >
                Next free window
              </p>
              <p
                className={`font-serif text-2xl font-medium ${
                  isSleeping ? "text-cream" : "text-slate-grey"
                }`}
              >
                {data.nextFreeWindow.start} - {data.nextFreeWindow.end}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-0 right-0 text-center px-6"
        >
          <p
            className={`font-sans text-xs ${
              isSleeping ? "text-cream/20" : "text-mauve/40"
            }`}
          >
            Spouse Radar by{" "}
            <Link
              href="/"
              className={`underline underline-offset-2 transition-smooth ${
                isSleeping
                  ? "hover:text-cream/50"
                  : "hover:text-mauve/70"
              }`}
            >
              FlipShift
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
