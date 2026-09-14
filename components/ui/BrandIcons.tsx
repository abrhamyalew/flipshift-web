import React from "react";

interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

/**
 * Pure SVG letterform path of the FlipShift "F"
 * (extracted from Newsreader Bold Display optical size)
 */
export const FLIPSHIFT_F_PATH =
  "M330.64 197.5 320.66 265.02 330.64 332.34H324.69L297.3 276.07L215.55 270.97V258.87L297.3 253.35L324.69 197.5ZM365.46 96H368.86L391.16 204.93L383.94 207.27L327.24 120.84L362.07 130.61H191.77V112.35H334.89ZM239.33 112.35V398.8L272.24 408.57V416H120.84V408.57L153.97 398.8V129.34L120.84 119.78V112.35Z";

/**
 * Full FlipShift App Icon:
 * Squircle container in Dark Slate Grey (#183A37) with hairline rim
 * and centered Newsreader serif "F" in Warm Cream (#EEF1BD).
 */
export function BrandIcon({
  size = 32,
  className = "",
  ...props
}: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`inline-block flex-shrink-0 ${className}`}
      aria-label="FlipShift icon"
      role="img"
      {...props}
    >
      <rect
        width="464"
        height="464"
        x="24"
        y="24"
        rx="104"
        ry="104"
        fill="#183A37"
        stroke="#EEF1BD"
        strokeOpacity="0.14"
        strokeWidth="2"
      />
      <path d={FLIPSHIFT_F_PATH} fill="#EEF1BD" />
    </svg>
  );
}

/**
 * Pure glyph mark without the squircle container.
 * Fills with currentColor or custom fill prop.
 */
export function BrandMark({
  size = 24,
  className = "",
  fill = "currentColor",
  ...props
}: BrandIconProps & { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="100 80 312 350"
      width={size}
      height={size}
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d={FLIPSHIFT_F_PATH} fill={fill} />
    </svg>
  );
}

export default BrandIcon;
