"use client";

import { ReactNode } from "react";

interface FeaturePreviewProps {
  title: string;
  description: string;
  preview: ReactNode;
  index: number;
}

export default function FeaturePreview({
  title,
  description,
  preview,
  index,
}: FeaturePreviewProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16 py-10`}
    >
      {/* Solid Preview pane */}
      <div className="w-full md:w-1/2 flex-shrink-0">
        <div className="rounded-2xl bg-slate-grey border border-cream/12 p-8 md:p-10 shadow-md transition-all duration-300 hover:border-cream/25">
          <div className="flex items-center justify-center min-h-[170px]">
            {preview}
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-serif text-slate-grey text-2xl md:text-3xl mb-4 font-medium">
          {title}
        </h3>
        <p className="font-sans text-mauve text-base leading-7 max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ===== Mini Preview Artifacts ===== */

export function DrowsyDrivingPreview() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      {/* Alert notification */}
      <div
        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-grey/90 border border-cream/10 text-cream"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      >
        <div className="w-10 h-10 rounded-full bg-seagrass/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-seagrass" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-sans text-sm font-semibold text-cream">Drowsy driving alert</p>
          <p className="font-sans text-xs text-cream/60 mt-0.5">
            Alertness at 23%. Wait 20 min before driving.
          </p>
        </div>
      </div>

      {/* Alertness bar */}
      <div
        className="p-4 rounded-2xl bg-slate-grey/80 border border-cream/10"
      >
        <div className="flex justify-between mb-2">
          <span className="font-sans text-xs text-cream/70 font-medium">Current alertness</span>
          <span className="font-sans text-xs text-cream font-bold">23%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            style={{ width: "23%" }}
            className="h-full bg-seagrass rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export function SpouseRadarPreview() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="rounded-3xl overflow-hidden border border-cream/10"
        style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
      >
        {/* Status header */}
        <div className="bg-slate-grey p-6 text-center relative">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-seagrass/15 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div
                className="w-2.5 h-2.5 rounded-full bg-seagrass animate-pulse"
              />
              <span className="font-sans text-seagrass text-xs font-semibold uppercase tracking-wider">Sleeping</span>
            </div>
            <p className="font-serif text-cream text-3xl font-medium">until 6:30 AM</p>
            <p className="font-sans text-cream/50 text-xs mt-2">4 hr 12 min remaining</p>
          </div>
        </div>

        {/* Details */}
        <div className="bg-slate-grey/95 px-5 py-4 border-t border-cream/10 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="font-sans text-cream/40 text-xs mb-1">Energy at wake</p>
            <p className="font-sans text-seagrass text-sm font-semibold">Good</p>
          </div>
          <div className="text-center border-l border-cream/10">
            <p className="font-sans text-cream/40 text-xs mb-1">Free window</p>
            <p className="font-sans text-cream text-sm font-semibold">10a - 2p</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WeeklyRecapPreview() {
  const bars = [65, 80, 45, 90, 70, 55, 85];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const avg = Math.round(bars.reduce((a, b) => a + b, 0) / bars.length);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="rounded-2xl p-5 bg-slate-grey/90 border border-cream/10"
        style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="font-sans text-xs text-cream/70 font-semibold">Sleep quality</p>
          <span className="font-sans text-xs font-bold text-seagrass">{avg}% avg</span>
        </div>
        <div className="flex items-end justify-between gap-1.5 h-20 mb-3">
          {bars.map((height, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div
                style={{ height: `${height}%` }}
                className={`w-full rounded-t-sm ${
                  height > 70 ? "bg-seagrass" : height > 50 ? "bg-seagrass/60" : "bg-cream/30"
                }`}
              />
              <span className="font-sans text-[10px] text-cream/50">{days[i]}</span>
            </div>
          ))}
        </div>
        <div className="h-px bg-cream/10 mb-3" />
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-seagrass" />
          <p className="font-sans text-xs text-cream/70">Best alignment: Tue, Fri</p>
        </div>
      </div>
    </div>
  );
}
