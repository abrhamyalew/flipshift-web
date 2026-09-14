"use client";

import WaitlistCapture from "../ui/WaitlistCapture";
import SmokeShader from "../ui/SmokeShader";

export default function HomeView() {
  return (
    <section
      id="home-view"
      aria-label="FlipShift Home"
      className="relative w-full h-full min-h-[100dvh] flex flex-col lg:flex-row items-stretch justify-between bg-[#183A37] text-cream overflow-y-auto lg:overflow-hidden"
    >
      {/* Left Column: Eyebrow-Free Headline, Scaled-Down Body, Waitlist */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-16 pt-24 sm:pt-28 lg:pt-32 pb-10 z-20">
        <div className="max-w-md xl:max-w-lg">
          <h1 className="font-serif text-cream text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-normal leading-[1.18] tracking-tight mb-4">
            Your schedule rotates.
            <br />
            Your body doesn&apos;t have to guess.
          </h1>

          <p className="font-sans text-cream/75 text-sm sm:text-[15px] leading-relaxed mb-6 max-w-md font-light">
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

      {/* Right Column: Seamless Blurred Transition from Solid into Fluid Animation */}
      <div className="w-full lg:w-1/2 relative min-h-[360px] lg:min-h-full flex-1 overflow-hidden">
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
          className="lg:hidden absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#183A37] via-[#183A37]/80 to-transparent pointer-events-none z-10 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] [webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
