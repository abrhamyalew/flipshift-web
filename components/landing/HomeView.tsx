"use client";

import WaitlistCapture from "../ui/WaitlistCapture";
import SmokeShader from "../ui/SmokeShader";

export default function HomeView() {
  return (
    <section
      id="home-view"
      aria-label="FlipShift Home"
      className="relative w-full h-full min-h-[calc(100dvh-73px)] flex flex-col lg:flex-row items-stretch justify-between bg-[#183A37] text-cream overflow-hidden"
    >
      {/* Left Column: Eyebrow-Free Headline, Supporting Copy, Waitlist */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12 lg:py-0 z-10">
        <div className="max-w-xl">
          <h1 className="font-serif text-cream text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight mb-6">
            Your schedule rotates.
            <br />
            Your body doesn&apos;t have to guess.
          </h1>

          <p className="font-sans text-cream/75 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-lg font-light">
            FlipShift reads your actual work schedule and builds a daily
            circadian plan around it. Sleep timing, light exposure, caffeine
            cutoffs, alertness forecasts. Specific to your next shift, not
            generic advice.
          </p>

          <div className="w-full">
            <WaitlistCapture variant="dark" id="home-waitlist" />
          </div>
        </div>
      </div>

      {/* Right Column: Generative Creamy Smoke Shader Canvas */}
      <div className="w-full lg:w-1/2 relative min-h-[360px] lg:min-h-full flex-1 border-t lg:border-t-0 lg:border-l border-cream/10 bg-[#121817]/60">
        {/* Generative Two-Level Domain Warp Shader */}
        <SmokeShader
          className="absolute inset-0 w-full h-full cursor-crosshair"
          interactive={true}
        />

        {/* Subtle Edge Vignettes to blend seamlessly */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t lg:bg-gradient-to-r from-[#183A37]/80 via-transparent to-transparent opacity-60" />
      </div>
    </section>
  );
}
