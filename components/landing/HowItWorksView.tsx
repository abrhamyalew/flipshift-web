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
  onJoinWaitlist?: () => void;
}

export default function HowItWorksView({ onJoinWaitlist }: HowItWorksViewProps) {
  return (
    <section
      id="how-it-works-view"
      aria-label="How FlipShift Works"
      className="relative w-full h-full min-h-[100dvh] bg-[#183A37] text-cream flex flex-col justify-start lg:justify-center px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto w-full my-auto">
        {/* Header (No Eyebrow Label) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-12 mb-8 md:mb-12">
          <div className="max-w-xl">
            <h2 className="font-serif text-cream text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.15]">
              Your schedule goes in.
              <br />
              Your plan comes out.
            </h2>
          </div>
          <p className="font-sans text-cream/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md font-light">
            No manual logging. No guesswork. FlipShift syncs directly with your roster
            so your biological clock is protected before your shift begins.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-[#121817]/40 border border-cream/12 p-6 sm:p-7 lg:p-8 flex flex-col justify-between hover:border-cream/25 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <span className="font-serif text-2xl font-light text-seagrass">
                    {step.number}
                  </span>
                  <span className="font-sans text-xs uppercase tracking-wider text-cream/60 px-2.5 py-1 rounded-full border border-cream/15 bg-cream/5">
                    {step.badge}
                  </span>
                </div>

                <h3 className="font-serif text-cream text-xl sm:text-2xl font-medium tracking-tight mb-2.5">
                  {step.title}
                </h3>

                <p className="font-sans text-cream/70 text-sm sm:text-base leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-cream/10">
          <p className="font-sans text-xs sm:text-sm text-cream/60">
            Available on iOS and Android. Early access launching soon.
          </p>

          <Button
            variant="primary"
            size="md"
            id="how-it-works-waitlist-cta"
            onClick={onJoinWaitlist}
          >
            Join the waitlist
          </Button>
        </div>
      </div>
    </section>
  );
}
