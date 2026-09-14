"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandIcon } from "../../components/ui/BrandIcons";

interface ConceptData {
  id: 1 | 2 | 3;
  name: string;
  subtitle: string;
  metaphor: string;
  description: string;
}

const concepts: ConceptData[] = [
  {
    id: 1,
    name: "The Circadian Phase Shift",
    subtitle: "Dual Interlocking Orbit",
    metaphor: "Rotating sleep-wake cycles with a grounded biological core",
    description:
      "Two complementary curved arcs rotate around a centered biological clock nucleus. One arc represents the nocturnal shift window, the other represents diurnal recovery. They interlock in continuous rotational harmony, symbolizing an adaptive internal clock that never loses its center.",
  },
  {
    id: 2,
    name: "The Flip Horizon",
    subtitle: "Split Chrono Dial",
    metaphor: "The transition day and circadian twilight threshold",
    description:
      "A precision 24-hour chronometer ring bisected by an S-curved circadian horizon line. It captures the acute reality of shift work: crossing from nocturnal darkness into daylight commutes, balanced by two focal alignment nodes representing sleep and alertness windows.",
  },
  {
    id: 3,
    name: "The Chrono-Monogram",
    subtitle: "Architectural F-Shift",
    metaphor: "Precision shift calibration in an iconic letterform",
    description:
      "A clean Swiss geometric monogram integrating the structural stem of the letter 'F' with dual horizontal phase bars and a 24-hour orbital track. Highly legible and recognizable at small sizes (16px favicon and app badges).",
  },
];

export default function BrandReviewPage() {
  const [selectedConcept, setSelectedConcept] = useState<1 | 2 | 3>(1);

  const activeData = concepts.find((c) => c.id === selectedConcept)!;

  const renderIcon = (id: 1 | 2 | 3, size: number, className = "") => {
    return <BrandIcon size={size} className={className} />;
  };

  return (
    <div className="min-h-screen bg-[#0F2422] text-cream font-sans selection:bg-seagrass selection:text-cream py-10 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-cream/10 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-seagrass font-semibold mb-1">
              Brand Identity System
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-cream font-normal tracking-tight">
              FlipShift Icon Concepts
            </h1>
          </div>

          <Link
            href="/"
            className="group flex items-center gap-2 text-xs uppercase tracking-wider font-sans font-medium text-cream/70 hover:text-cream bg-white/5 border border-cream/15 px-4 py-2 rounded-full transition-colors w-fit"
          >
            <span>← Back to App</span>
          </Link>
        </div>

        {/* Concept Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {concepts.map((concept) => {
            const isSelected = selectedConcept === concept.id;
            return (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#183A37] border-seagrass shadow-[0_8px_30px_rgba(97,152,142,0.2)] ring-1 ring-seagrass"
                    : "bg-[#121817]/60 border-cream/10 hover:border-cream/25 hover:bg-[#183A37]/50"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider text-seagrass font-semibold">
                    Concept 0{concept.id}
                  </span>
                  <div className="p-2 rounded-lg bg-seagrass/15 text-seagrass">
                    {renderIcon(concept.id, 24)}
                  </div>
                </div>

                <h2 className="font-serif text-xl text-cream font-medium tracking-tight mb-1">
                  {concept.name}
                </h2>
                <p className="text-xs text-cream/60 font-light">
                  {concept.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Showcase for Selected Concept */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Large Display Hero */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-12 rounded-3xl bg-[#183A37] border border-cream/15 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-seagrass font-semibold">
                Primary Emblem Presentation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-cream font-normal tracking-tight mt-2 mb-4">
                {activeData.name}
              </h2>
              <p className="text-cream/70 text-sm sm:text-base leading-relaxed font-light max-w-lg mb-8">
                {activeData.description}
              </p>
            </div>

            {/* Centered Large Icon in Brand Colors */}
            <div className="relative z-10 flex items-center justify-center py-10">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-[#121817] border border-cream/15 flex items-center justify-center p-8 text-seagrass shadow-[0_16px_50px_rgba(0,0,0,0.5)]">
                {renderIcon(selectedConcept, 100, "text-seagrass")}
              </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-cream/10 text-xs text-cream/60">
              <span>Metaphor: {activeData.metaphor}</span>
              <span className="font-mono text-seagrass">Vector SVG Scale: Scalable</span>
            </div>
          </div>

          {/* Right: Scale & Colorway Matrix */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Colorway Test: Dark vs Light */}
            <div className="grid grid-cols-2 gap-4">
              {/* Dark Slate Grey Surface */}
              <div className="p-6 rounded-2xl bg-[#183A37] border border-cream/15 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase tracking-wider text-cream/50 mb-4">
                  Dark Mode (#183A37)
                </span>
                <div className="text-seagrass p-3 rounded-xl bg-white/5 border border-cream/10 mb-3">
                  {renderIcon(selectedConcept, 44)}
                </div>
                <span className="text-xs text-cream font-serif font-medium">FlipShift</span>
              </div>

              {/* Light Cream Surface */}
              <div className="p-6 rounded-2xl bg-[#EEF1BD] border border-[#183A37]/15 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#183A37]/60 mb-4">
                  Light Mode (#EEF1BD)
                </span>
                <div className="text-[#183A37] p-3 rounded-xl bg-[#183A37]/10 border border-[#183A37]/15 mb-3">
                  {renderIcon(selectedConcept, 44)}
                </div>
                <span className="text-xs text-[#183A37] font-serif font-semibold">FlipShift</span>
              </div>
            </div>

            {/* Application Size Hierarchy */}
            <div className="p-6 rounded-2xl bg-[#121817]/60 border border-cream/10">
              <span className="text-xs uppercase tracking-widest text-seagrass font-semibold block mb-4">
                Size Hierarchy Check
              </span>

              <div className="flex items-center justify-around py-4 bg-black/20 rounded-xl border border-cream/5">
                {/* 64px Mobile App Icon Tile */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-seagrass text-[#183A37] flex items-center justify-center shadow-lg">
                    {renderIcon(selectedConcept, 32)}
                  </div>
                  <span className="text-[10px] text-cream/50">App Icon</span>
                </div>

                {/* 32px Navbar Scale */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-seagrass text-[#183A37] flex items-center justify-center shadow-md">
                    {renderIcon(selectedConcept, 18)}
                  </div>
                  <span className="text-[10px] text-cream/50">Nav (32px)</span>
                </div>

                {/* 16px Favicon Scale */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-seagrass text-[#183A37] flex items-center justify-center shadow-sm">
                    {renderIcon(selectedConcept, 14)}
                  </div>
                  <span className="text-[10px] text-cream/50">Favicon</span>
                </div>
              </div>
            </div>

            {/* Combined Wordmark Lockup */}
            <div className="p-6 rounded-2xl bg-[#183A37] border border-cream/15 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-wider text-cream/50 mb-3">
                Full Brand Lockup (Emblem + Wordmark)
              </span>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#121817]/50 border border-cream/10">
                <div className="w-10 h-10 rounded-xl bg-seagrass text-[#183A37] flex items-center justify-center shadow-md flex-shrink-0">
                  {renderIcon(selectedConcept, 22)}
                </div>
                <div>
                  <div className="font-serif text-2xl text-cream font-normal tracking-tight leading-none">
                    FlipShift
                  </div>
                  <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-seagrass mt-1">
                    Circadian Intelligence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
