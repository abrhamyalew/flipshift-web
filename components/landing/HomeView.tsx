"use client";

import WaitlistCapture from "../ui/WaitlistCapture";
import SmokeShader from "../ui/SmokeShader";

interface HomeViewProps {
  onGoToProblem?: () => void;
}

export default function HomeView({ onGoToProblem }: HomeViewProps) {
  return (
    <section
      id="home-view"
      aria-label="FlipShift Home"
      className="relative w-full h-full min-h-[100dvh] max-h-[100dvh] flex flex-col lg:flex-row items-stretch justify-between bg-[#183A37] text-cream overflow-hidden"
    >
      {/* Left Column: Brand Logo, Headline, Supporting Copy, Waitlist, and Next Arrow */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 sm:px-12 lg:px-16 xl:px-20 py-8 sm:py-10 z-20">
        {/* Top: Elegant Minimal Brand Mark */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg bg-seagrass flex items-center justify-center shadow-[0_2px_8px_rgba(97,152,142,0.3)]"
          >
            <span className="text-cream font-sans font-bold text-xs tracking-wider">F</span>
          </div>
          <span className="font-serif text-lg sm:text-xl text-cream font-medium tracking-tight">
            FlipShift
          </span>
        </div>

        {/* Center: Headline, Body, and Waitlist Form */}
        <div className="my-auto py-6 max-w-lg">
          <h1 className="font-serif text-cream text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-normal leading-[1.14] tracking-tight mb-5">
            Your schedule rotates.
            <br />
            Your body doesn&apos;t have to guess.
          </h1>

          <p className="font-sans text-cream/75 text-sm sm:text-base leading-relaxed mb-6 font-light">
            FlipShift reads your actual work schedule and builds a daily
            circadian plan around it. Sleep timing, light exposure, caffeine
            cutoffs, alertness forecasts. Specific to your next shift, not
            generic advice.
          </p>

          <div className="w-full">
            <WaitlistCapture variant="dark" id="home-waitlist" />
          </div>
        </div>

        {/* Bottom: On-screen Next Page Action Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onGoToProblem}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-medium text-cream/60 hover:text-cream transition-colors cursor-pointer"
            aria-label="Advance to Problem section"
          >
            <span>The shift reality</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5 text-seagrass"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          <span className="text-[11px] font-sans text-cream/40 hidden sm:inline">
            Press ↓ or tap to advance
          </span>
        </div>
      </div>

      {/* Right Column: Seamless Blurred Transition from Solid into Fluid Animation */}
      <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full flex-1 overflow-hidden">
        {/* Soft Feathered Mask on the Fluid Shader Container */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.9) 35%, black 48%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.9) 35%, black 48%)",
          }}
        >
          <SmokeShader className="w-full h-full pointer-events-none" />
        </div>

        {/* Soft Organic Blur / Gradient Feather from Solid Dark Slate Grey into Fluid */}
        <div
          className="absolute inset-y-0 left-0 w-32 sm:w-48 lg:w-64 bg-gradient-to-r from-[#183A37] via-[#183A37]/80 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-28 sm:w-40 pointer-events-none z-20 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,black_10%,transparent_100%)] [webkit-mask-image:linear-gradient(to_right,black_10%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Top Fade for Mobile Stack */}
        <div
          className="lg:hidden absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#183A37] via-[#183A37]/80 to-transparent pointer-events-none z-10 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] [webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
