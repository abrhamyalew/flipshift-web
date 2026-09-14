"use client";

import WaitlistCapture from "../ui/WaitlistCapture";
import SmokeShader from "../ui/SmokeShader";
import { BrandIcon } from "../ui/BrandIcons";

interface HomeViewProps {
  onGoToProblem?: () => void;
}

export default function HomeView({ onGoToProblem }: HomeViewProps) {
  return (
    <section
      id="home-view"
      aria-label="FlipShift Home"
      className="relative w-full h-full min-h-[100dvh] max-h-[100dvh] flex flex-col lg:flex-row items-stretch justify-between bg-[#183A37] text-cream overflow-y-auto lg:overflow-hidden overscroll-contain"
    >
      {/* Left Column: Brand Logo, Headline, Supporting Copy, Waitlist, and Next Arrow */}
      <div className="w-full lg:w-[56%] xl:w-[52%] h-full flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-16 py-5 sm:py-7 lg:py-8 z-20">
        {/* Top: Brand Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <BrandIcon size={28} className="w-7 h-7" />
          <span className="font-serif text-base sm:text-lg text-cream font-medium tracking-tight">
            FlipShift
          </span>
        </div>

        {/* Center: Headline, Body, and Waitlist Form */}
        <div className="my-auto py-2 sm:py-3 max-w-lg">
          <h1 className="font-serif text-cream text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] font-normal leading-[1.18] tracking-tight mb-3">
            Your schedule rotates. Your body doesn&apos;t have to guess.
          </h1>

          <p className="font-sans text-cream/75 text-xs sm:text-sm leading-relaxed mb-4 max-w-md font-light">
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
        <div className="flex items-center justify-between flex-shrink-0 pt-2 pb-1">
          <button
            onClick={onGoToProblem}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-medium text-cream/60 hover:text-cream transition-colors cursor-pointer"
            aria-label="Advance to Problem section"
          >
            <span>The shift reality</span>
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

          <span className="text-[11px] font-sans text-cream/40 hidden sm:inline">
            Scroll or press ↓ to advance
          </span>
        </div>
      </div>

      {/* Right Column: Fluid Animation strictly on desktop, hidden on mobile */}
      <div className="hidden lg:block lg:w-[44%] xl:w-[48%] relative h-full flex-1 overflow-hidden">
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
          className="absolute inset-y-0 left-0 w-28 sm:w-40 pointer-events-none z-20 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,black_10%,transparent_100%)] [webkit-mask-image:linear-gradient(to_right,black_10%,transparent_100%)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
