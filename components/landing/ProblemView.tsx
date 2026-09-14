"use client";

import { ReactNode } from "react";

interface ProblemItem {
  icon: ReactNode;
  title: string;
  description: string;
}

const problems: ProblemItem[] = [
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "The transition day",
    description:
      "You finished a run of nights and now you need to flip back to days. Your body has no idea what time it is, and every generic app tells you to 'maintain a consistent schedule.'",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.109-.468 1.148-1.084l.39-6.298a3.016 3.016 0 00-.755-2.226L17.1 5.59a2.25 2.25 0 00-1.638-.725H8.538a2.25 2.25 0 00-1.638.725L3.425 9.142a3.016 3.016 0 00-.755 2.226l.39 6.298c.039.616.527 1.084 1.148 1.084H5.25" />
      </svg>
    ),
    title: "The daylight commute",
    description:
      "Driving home at 7 AM into bright sunlight after a night shift. The sun resets your clock in exactly the wrong direction, and nobody warns you about that.",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.5 4.5H6.5L5 14.5m14 0H5" />
      </svg>
    ),
    title: "Caffeine at the wrong time",
    description:
      "That coffee at 3 AM felt necessary, but its half-life means it's still active when you're trying to sleep at 9 AM. No app tracks this for your actual schedule.",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Sleep timing vs duration",
    description:
      "You slept 7 hours but woke up exhausted because you slept at the wrong point in your circadian cycle. Duration isn't the problem. Timing is.",
  },
];

interface ProblemViewProps {
  onGoToHome?: () => void;
  onGoToHowItWorks?: () => void;
}

export default function ProblemView({
  onGoToHome,
  onGoToHowItWorks,
}: ProblemViewProps) {
  return (
    <section
      id="problem-view"
      aria-label="Shift Work Problems"
      className="relative w-full h-full min-h-[100dvh] max-h-[100dvh] bg-[#EEF1BD] text-[#183A37] flex flex-col justify-between px-5 sm:px-10 lg:px-16 py-4 sm:py-6 overflow-y-auto lg:overflow-hidden overscroll-contain"
    >
      {/* Top: Header Row */}
      <div className="flex items-center justify-between flex-shrink-0">
        <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-[#183A37]/60">
          02 / The Shift Problem
        </span>

        <button
          onClick={onGoToHome}
          className="group flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-[#183A37]/60 hover:text-[#183A37] transition-colors cursor-pointer"
          aria-label="Return to Home section"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 text-[#61988E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <span>Home</span>
        </button>
      </div>

      {/* Center: Title and 4 Pain Point Cards */}
      <div className="my-auto py-1 max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-1.5 md:gap-6 mb-3 sm:mb-4">
          <div className="max-w-xl">
            <h2 className="font-serif text-[#183A37] text-xl sm:text-2xl lg:text-[28px] xl:text-[30px] font-normal tracking-tight leading-[1.16]">
              Generic sleep apps were not built for this.
            </h2>
          </div>
          <p className="font-sans text-[#60495A] text-[11px] sm:text-xs leading-relaxed max-w-md font-normal">
            Shift work is a fundamentally different relationship with your
            circadian rhythm. It requires tools built by people who have actually lived it.
          </p>
        </div>

        {/* 4 Cards Grid (All 4 cards fit cleanly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="rounded-xl bg-[#F7F9E8] border border-[#183A37]/10 p-3 sm:p-3.5 lg:p-4 flex flex-col justify-between shadow-[0_2px_10px_rgba(24,58,55,0.03)] hover:border-[#183A37]/20 transition-all duration-300"
            >
              <div>
                <div className="w-6 h-6 rounded-md bg-[#61988E]/15 text-[#183A37] flex items-center justify-center mb-1.5">
                  {problem.icon}
                </div>
                <h3 className="font-serif text-[#183A37] text-xs sm:text-sm font-medium tracking-tight mb-1">
                  {problem.title}
                </h3>
                <p className="font-sans text-[#60495A] text-[11px] sm:text-xs leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Navigation Controls */}
      <div className="flex items-center justify-between flex-shrink-0 pt-2 pb-1">
        <button
          onClick={onGoToHome}
          className="group flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-[#183A37]/60 hover:text-[#183A37] transition-colors cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 text-[#61988E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <span>Previous: Home</span>
        </button>

        <button
          onClick={onGoToHowItWorks}
          className="group flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-[#183A37]/60 hover:text-[#183A37] transition-colors cursor-pointer"
        >
          <span>Next: How it works</span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5 text-[#61988E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
