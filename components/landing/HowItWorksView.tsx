"use client";

import Button from "../ui/Button";

interface StepItem {
  number: string;
  title: string;
  description: string;
  badge: string;
}

const steps: StepItem[] = [
  {
    number: "01",
    badge: "Automated sync",
    title: "Import your schedule",
    description:
      "Connect your work calendar or rostering app. FlipShift reads your shifts automatically with zero manual entry. It knows when you are on days, nights, or in recovery transition.",
  },
  {
    number: "02",
    badge: "Dynamic intelligence",
    title: "Get your daily circadian plan",
    description:
      "Each morning, FlipShift generates a calibrated timeline: optimal sleep timing, targeted daylight exposure, precise caffeine cutoff hours, and alertness forecasts.",
  },
  {
    number: "03",
    badge: "Adaptive loop",
    title: "Check in each morning",
    description:
      "A quick 30-second check-in asks how you slept and how you feel. FlipShift continuously adapts your upcoming windows based on reality, not just static schedules.",
  },
];

interface HowItWorksViewProps {
  onGoToProblem?: () => void;
  onJoinWaitlist?: () => void;
  onGoToProgress?: () => void;
}

export default function HowItWorksView({
  onGoToProblem,
  onJoinWaitlist,
  onGoToProgress,
}: HowItWorksViewProps) {
  return (
    <section
      id="how-it-works-view"
      aria-label="How FlipShift Works"
      className="relative w-full h-full min-h-[100dvh] max-h-[100dvh] bg-[#183A37] text-cream flex flex-col justify-between px-5 sm:px-10 lg:px-16 py-4 sm:py-6 overflow-y-auto lg:overflow-hidden overscroll-contain"
    >
      {/* Top: Header Row */}
      <div className="flex items-center justify-between flex-shrink-0">
        <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-cream/60">
          03 / How It Works
        </span>

        <button
          onClick={onGoToProblem}
          className="group flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-cream/60 hover:text-cream transition-colors cursor-pointer"
          aria-label="Return to Problem section"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 text-seagrass"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <span>Problem</span>
        </button>
      </div>

      {/* Center: Title and 3 Step Cards */}
      <div className="my-auto py-1 max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-1.5 md:gap-6 mb-3 sm:mb-4">
          <div className="max-w-xl">
            <h2 className="font-serif text-cream text-xl sm:text-2xl lg:text-[28px] xl:text-[30px] font-normal tracking-tight leading-[1.16]">
              Your schedule goes in.
              <br />
              Your plan comes out.
            </h2>
          </div>
          <p className="font-sans text-cream/70 text-[11px] sm:text-xs leading-relaxed max-w-md font-light">
            No manual logging. No guesswork. FlipShift syncs directly with your roster
            so your biological clock is protected before your shift begins.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative rounded-xl bg-[#121817]/40 border border-cream/12 p-3 sm:p-3.5 lg:p-4 flex flex-col justify-between hover:border-cream/25 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-base font-light text-seagrass">
                    {step.number}
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-cream/60 px-2 py-0.5 rounded-full border border-cream/15 bg-cream/5">
                    {step.badge}
                  </span>
                </div>

                <h3 className="font-serif text-cream text-xs sm:text-sm font-medium tracking-tight mb-1">
                  {step.title}
                </h3>

                <p className="font-sans text-cream/70 text-[11px] sm:text-xs leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Action Bar with Previous Button and Waitlist CTA */}
      <div className="flex items-center justify-between flex-shrink-0 pt-2 pb-1 border-t border-cream/10">
        <button
          onClick={onGoToProblem}
          className="group flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-cream/60 hover:text-cream transition-colors cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 text-seagrass"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <span>Previous: Problem</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onGoToProgress}
            className="group flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-cream/60 hover:text-cream transition-colors cursor-pointer"
          >
            <span>Next: Project status</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5 text-seagrass"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          <Button
            variant="primary"
            size="sm"
            id="how-it-works-waitlist-cta"
            onClick={onJoinWaitlist}
            className="!py-1.5 !px-3.5 !text-xs !rounded-full"
          >
            Join the waitlist
          </Button>
        </div>
      </div>
    </section>
  );
}
