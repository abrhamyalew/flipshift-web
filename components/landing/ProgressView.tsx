"use client";

import Button from "../ui/Button";

interface ProgressViewProps {
  onGoToHowItWorks?: () => void;
  onJoinWaitlist?: () => void;
}

const progressItems = [
  {
    label: "Sprint 3 / Circadian engine",
    status: "Complete",
    detail: "Sleep timing, caffeine cutoffs, light guidance, and shift transitions are calculated.",
  },
  {
    label: "Ambient light sensor integration",
    status: "Complete",
    detail: "Light levels can be checked against the pre-sleep and sleep-window thresholds.",
  },
  {
    label: "Brand and waitlist foundation",
    status: "Live",
    detail: "The identity, landing page, responsive views, and sign-up flow are in place.",
  },
];

export default function ProgressView({
  onGoToHowItWorks,
  onJoinWaitlist,
}: ProgressViewProps) {
  return (
    <section
      id="progress-view"
      aria-label="FlipShift Project Status"
      className="relative w-full h-full min-h-[100dvh] max-h-[100dvh] bg-[#EEF1BD] text-[#183A37] flex flex-col justify-between px-5 sm:px-10 lg:px-16 py-4 sm:py-6 overflow-y-auto lg:overflow-hidden overscroll-contain"
    >
      {/* Top: Header Row */}
      <div className="flex items-center justify-between flex-shrink-0">
        <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-[#183A37]/60">
          04 / Project Status
        </span>

        <button
          onClick={onGoToHowItWorks}
          className="group flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-[#183A37]/60 hover:text-[#183A37] transition-colors cursor-pointer"
          aria-label="Return to How It Works section"
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
          <span>How it works</span>
        </button>
      </div>

      {/* Center: High-level progress snapshot */}
      <div className="my-auto py-5 max-w-5xl mx-auto w-full">
        <div className="max-w-2xl mb-5 sm:mb-7">
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] font-semibold text-[#61988E] mb-2">
            Early build, visible progress
          </p>
          <h2 className="font-serif text-[#183A37] text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-tight leading-[1.08] mb-3">
            The first layer is in place.
          </h2>
          <p className="font-sans text-[#60495A] text-xs sm:text-sm leading-relaxed max-w-xl">
            The product direction, core calculations, and first working experience are already taking shape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-3 sm:gap-4">
          <div className="rounded-xl bg-[#183A37] text-cream border border-[#183A37]/10 p-4 sm:p-6 flex flex-col justify-between min-h-[190px]">
            <div className="flex items-center justify-between gap-4 mb-8">
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] font-semibold text-cream/60">
                Current phase
              </span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-seagrass-light">
                In progress
              </span>
            </div>
            <div>
              <p className="font-serif text-cream text-2xl sm:text-3xl font-normal tracking-tight">
                Phase 1 / Sprint 4
              </p>
              <p className="font-sans text-cream/70 text-xs sm:text-sm mt-1">
                24-hour circular dial UI
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#F7F9E8] border border-[#183A37]/10 px-4 sm:px-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.16em] font-semibold text-[#183A37]/50 pt-3.5 sm:pt-4">
              Completed and in place
            </p>
            {progressItems.map((item, index) => (
              <div
                key={item.label}
                className={`py-3.5 sm:py-4 ${index > 0 ? "border-t border-[#183A37]/10" : ""}`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h3 className="font-serif text-[#183A37] text-sm sm:text-base font-medium tracking-tight">
                    {item.label}
                  </h3>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#61988E] whitespace-nowrap">
                    {item.status}
                  </span>
                </div>
                <p className="font-sans text-[#60495A] text-[11px] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#183A37]/15 pt-3">
          <span className="font-sans text-[10px] uppercase tracking-wider font-semibold text-[#183A37]/60">
            Next: dial polish, morning check-in, settings, integration
          </span>
        </div>
      </div>

      {/* Bottom: Navigation Controls */}
      <div className="flex items-center justify-between flex-shrink-0 pt-2 pb-1 border-t border-[#183A37]/15">
        <button
          onClick={onGoToHowItWorks}
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
          <span>Previous: How it works</span>
        </button>

        <Button
          variant="primary"
          size="sm"
          id="progress-waitlist-cta"
          onClick={onJoinWaitlist}
          className="!py-1.5 !px-3.5 !text-xs !rounded-full"
        >
          Join the waitlist
        </Button>
      </div>
    </section>
  );
}
