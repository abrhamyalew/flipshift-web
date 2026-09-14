"use client";

import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * Concept 1: The Circadian Phase Shift
 * Two complementary curved crescent orbits representing night and day phases,
 * rotating around a centered biological clock nucleus.
 */
export function CircadianPhaseShiftIcon({
  size = 32,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer Phase Orbit A (Seagrass nocturnal-to-day transition) */}
      <path
        d="M24 6C14.0589 6 6 14.0589 6 24C6 29.5186 8.48785 34.4578 12.4374 37.7578C12.9897 38.2193 13.8058 38.0827 14.1802 37.472C14.5369 36.8899 14.3314 36.1264 13.7533 35.6961C10.5147 33.2844 8.5 28.9189 8.5 24C8.5 15.4396 15.4396 8.5 24 8.5C28.9189 8.5 33.2844 10.5147 35.6961 13.7533C36.1264 14.3314 36.8899 14.5369 37.472 14.1802C38.0827 13.8058 38.2193 12.9897 37.7578 12.4374C34.4578 8.48785 29.5186 6 24 6Z"
        fill="currentColor"
      />

      {/* Outer Phase Orbit B (Counter-phase rotational arc) */}
      <path
        d="M24 42C33.9411 42 42 33.9411 42 24C42 18.4814 39.5122 13.5422 35.5626 10.2422C35.0103 9.78065 34.1942 9.91728 33.8198 10.528C33.4631 11.1101 33.6686 11.8736 34.2467 12.3039C37.4853 14.7156 39.5 19.0811 39.5 24C39.5 32.5604 32.5604 39.5 24 39.5C19.0811 39.5 14.7156 37.4853 12.3039 34.2467C11.8736 33.6686 11.1101 33.4631 10.528 33.8198C9.91728 34.1942 9.78065 35.0103 10.2422 35.5626C13.5422 39.5122 18.4814 42 24 42Z"
        fill="currentColor"
        fillOpacity="0.5"
      />

      {/* Internal Inversion Shift Nodes (Interlocking phase alignment) */}
      <path
        d="M24 15C19.0294 15 15 19.0294 15 24C15 26.3768 15.922 28.5385 17.4326 30.1388C17.9304 30.666 18.7845 30.6558 19.2662 30.1085C19.7214 29.5913 19.6416 28.7997 19.1245 28.3445C18.1189 27.2882 17.5 25.7262 17.5 24C17.5 20.4101 20.4101 17.5 24 17.5C25.7262 17.5 27.2882 18.1189 28.3445 19.1245C28.7997 19.6416 29.5913 19.7214 30.1085 19.2662C30.6558 18.7845 30.666 17.9304 30.1388 17.4326C28.5385 15.922 26.3768 15 24 15Z"
        fill="currentColor"
      />

      {/* Biological Chrono Core */}
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

/**
 * Concept 2: The Flip Horizon (Split Chrono Dial)
 * A precision circular dial split across an S-curved circadian twilight horizon.
 */
export function FlipHorizonIcon({
  size = 32,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer Dial Ring */}
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="3 3"
        strokeOpacity="0.4"
      />

      {/* Day / Alertness Semicircle Pulse */}
      <path
        d="M24 8C32.8366 8 40 15.1634 40 24C40 28.5 36.5 32 32 32C27.5 32 25 28.5 25 24C25 19.5 20.5 16 16 16C13.5 16 10.5 17.5 8.5 20C9.5 13 16 8 24 8Z"
        fill="currentColor"
      />

      {/* Night / Recovery Phase Threshold */}
      <path
        d="M24 40C15.1634 40 8 32.8366 8 24C8 19.5 11.5 16 16 16C20.5 16 23 19.5 23 24C23 28.5 27.5 32 32 32C34.5 32 37.5 30.5 39.5 28C38.5 35 32 40 24 40Z"
        fill="currentColor"
        fillOpacity="0.4"
      />

      {/* Circadian Axis Pivot Points */}
      <circle cx="16" cy="24" r="2.2" fill="#EEF1BD" />
      <circle cx="32" cy="24" r="2.2" fill="#183A37" />
    </svg>
  );
}

/**
 * Concept 3: The Chrono-Monogram (Architectural F-Shift)
 * A Swiss geometric monogram fusing the letter 'F' with circadian orbit tracks.
 */
export function ChronoMonogramIcon({
  size = 32,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* 24-Hour Circular Orbital Rail */}
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.3"
      />

      {/* Upper Phase Shift Bar (F top horizontal bar) */}
      <rect
        x="15"
        y="14"
        width="19"
        height="4"
        rx="2"
        fill="currentColor"
      />

      {/* Mid Transition Bar (F middle offset bar with arrow terminal) */}
      <rect
        x="15"
        y="22"
        width="14"
        height="4"
        rx="2"
        fill="currentColor"
        fillOpacity="0.8"
      />

      {/* Vertical Spine */}
      <rect
        x="15"
        y="14"
        width="4.5"
        height="20"
        rx="2.25"
        fill="currentColor"
      />

      {/* Shifting Circadian Indicator Dot */}
      <circle
        cx="33"
        cy="32"
        r="3"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Master Brand Mark with customizable concept
 */
export default function BrandLogo({
  concept = 1,
  size = 28,
  showText = true,
  className = "",
}: {
  concept?: 1 | 2 | 3;
  size?: number;
  showText?: boolean;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className="rounded-lg bg-seagrass text-[#183A37] flex items-center justify-center p-1.5 shadow-[0_2px_8px_rgba(97,152,142,0.3)]"
        style={{ width: size + 8, height: size + 8 }}
      >
        {concept === 1 && <CircadianPhaseShiftIcon size={size} className="text-[#183A37]" />}
        {concept === 2 && <FlipHorizonIcon size={size} className="text-[#183A37]" />}
        {concept === 3 && <ChronoMonogramIcon size={size} className="text-[#183A37]" />}
      </div>

      {showText && (
        <span className="font-serif text-lg text-cream font-medium tracking-tight">
          FlipShift
        </span>
      )}
    </div>
  );
}
