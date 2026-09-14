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
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "The transition day",
    description:
      "You finished a run of nights and now you need to flip back to days. Your body has no idea what time it is, and every generic app tells you to 'maintain a consistent schedule.'",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.109-.468 1.148-1.084l.39-6.298a3.016 3.016 0 00-.755-2.226L17.1 5.59a2.25 2.25 0 00-1.638-.725H8.538a2.25 2.25 0 00-1.638.725L3.425 9.142a3.016 3.016 0 00-.755 2.226l.39 6.298c.039.616.527 1.084 1.148 1.084H5.25" />
      </svg>
    ),
    title: "The daylight commute",
    description:
      "Driving home at 7 AM into bright sunlight after a night shift. The sun resets your clock in exactly the wrong direction, and nobody warns you about that.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.5 4.5H6.5L5 14.5m14 0H5" />
      </svg>
    ),
    title: "Caffeine at the wrong time",
    description:
      "That coffee at 3 AM felt necessary, but its half-life means it's still active when you're trying to sleep at 9 AM. No app tracks this for your actual schedule.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Sleep timing vs duration",
    description:
      "You slept 7 hours but woke up exhausted because you slept at the wrong point in your circadian cycle. Duration isn't the problem. Timing is.",
  },
];

export default function ProblemView() {
  return (
    <section
      id="problem-view"
      aria-label="Shift Work Problems"
      className="relative w-full h-full min-h-[calc(100dvh-73px)] bg-[#EEF1BD] text-[#183A37] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12 lg:py-16 overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header (No Eyebrow Label) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-12 mb-10 md:mb-12">
          <div className="max-w-xl">
            <h2 className="font-serif text-[#183A37] text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.15]">
              Generic sleep apps were not built for this.
            </h2>
          </div>
          <p className="font-sans text-[#60495A] text-base sm:text-lg leading-relaxed max-w-md font-normal">
            Shift work is a fundamentally different relationship with your
            circadian rhythm. It requires tools built by people who have actually lived it.
          </p>
        </div>

        {/* 4 Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#F7F9E8] border border-[#183A37]/10 p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(24,58,55,0.06)] hover:border-[#183A37]/20 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#61988E]/15 text-[#183A37] flex items-center justify-center mb-5">
                  {problem.icon}
                </div>
                <h3 className="font-serif text-[#183A37] text-xl sm:text-2xl font-medium tracking-tight mb-3">
                  {problem.title}
                </h3>
                <p className="font-sans text-[#60495A] text-sm sm:text-base leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
