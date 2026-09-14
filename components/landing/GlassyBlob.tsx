"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";

interface GlassyBlobProps {
  variant?: "hero" | "accent";
  className?: string;
}

export default function GlassyBlob({
  variant = "hero",
  className = "",
}: GlassyBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<SVGGElement>(null);
  const satellitesRef = useRef<(SVGGElement | null)[]>([]);
  const rawId = useId();
  const uniqueId = rawId.replace(/[^a-zA-Z0-9-_]/g, "");

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const isHero = variant === "hero";

  // Gradient & element IDs
  const coreGradId = `core-grad-${uniqueId}`;
  const coreSpecularId = `core-specular-${uniqueId}`;
  const coreCausticId = `core-caustic-${uniqueId}`;
  const coreRimGradId = `core-rim-${uniqueId}`;
  const satPinkId = `sat-pink-${uniqueId}`;
  const satGreenId = `sat-green-${uniqueId}`;
  const satEchoId = `sat-echo-${uniqueId}`;
  const satHighlightId = `sat-highlight-${uniqueId}`;
  const ambientGlowId = `ambient-glow-${uniqueId}`;

  // Interactive 3D Haptic Tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHero || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Core breathing scale pulse
      if (coreRef.current) {
        gsap.to(coreRef.current, {
          duration: isHero ? 4.8 : 6,
          scale: 1.04,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          svgOrigin: "200 200",
          transformOrigin: "200px 200px",
        });
      }

      // Orbital motion with celestial velocity curves
      if (isHero) {
        satellitesRef.current.forEach((satGroup, index) => {
          if (!satGroup) return;
          // Varied orbital cycle durations
          const orbitDurations = [22, 28, 17, 34];
          const duration = orbitDurations[index % orbitDurations.length];
          const direction = index % 2 === 0 ? 360 : -360;

          gsap.to(satGroup, {
            duration,
            rotation: direction,
            svgOrigin: "200 200",
            transformOrigin: "200px 200px",
            repeat: -1,
            ease: "none",
            delay: index * 0.6,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isHero]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ perspective: "1000px" }}
      aria-hidden="true"
    >
      {/* 3D Haptic Tilt Wrapper */}
      <div
        ref={stageRef}
        className="w-full h-full relative flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{
          transform: isHero
            ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
            : undefined,
        }}
      >
        {/* Double-Bezel Concentric Machine Stage (Hero only) */}
        {isHero && (
          <div className="absolute inset-2 md:inset-4 rounded-full p-2 bg-white/[0.02] border border-white/10 ring-1 ring-white/5 pointer-events-none shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <div className="w-full h-full rounded-full border border-white/[0.06] flex items-center justify-center relative">
              {/* Outer chronometer etched dial markers */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/[0.08]" />
              {/* Micro-pips on cardinal axes */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-sans font-medium tracking-widest text-cream/40 uppercase">00h</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-sans font-medium tracking-widest text-cream/40 uppercase">06h</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-sans font-medium tracking-widest text-cream/40 uppercase">12h</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-sans font-medium tracking-widest text-cream/40 uppercase">18h</span>
            </div>
          </div>
        )}

        <svg
          viewBox="0 0 400 400"
          className="w-full h-full overflow-visible relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ambient Caustic Aura (isolated backdrop, no vector blur) */}
            <radialGradient id={ambientGlowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#61988E" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#183A37" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#183A37" stopOpacity="0" />
            </radialGradient>

            {/* Core Glass Sphere: Deep 3D refractive gradient */}
            <radialGradient id={coreGradId} cx="30%" cy="26%" r="74%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
              <stop offset="10%" stopColor="#EEF1BD" stopOpacity="0.93" />
              <stop offset="35%" stopColor="#3b6962" stopOpacity="0.88" />
              <stop offset="68%" stopColor="#1a3f3b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0b1e1d" stopOpacity="0.98" />
            </radialGradient>

            {/* Internal Caustic Reflection (depth inside glass) */}
            <radialGradient id={coreCausticId} cx="70%" cy="75%" r="55%">
              <stop offset="0%" stopColor="#61988E" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#EEF1BD" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#183A37" stopOpacity="0" />
            </radialGradient>

            {/* Core Specular Glare (crisp glass surface light reflection) */}
            <radialGradient id={coreSpecularId} cx="35%" cy="30%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#EEF1BD" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EEF1BD" stopOpacity="0" />
            </radialGradient>

            {/* Core Fresnel Rim Gradient */}
            <linearGradient id={coreRimGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EEF1BD" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#61988E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
            </linearGradient>

            {/* Satellite 1: Radiant Glass Soft Obsidian Black */}
            <radialGradient id={satPinkId} cx="28%" cy="26%" r="72%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
              <stop offset="16%" stopColor="#8A9E9B" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#1C2624" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#0B1211" stopOpacity="0.98" />
            </radialGradient>

            {/* Satellite 2: Radiant Glass Seagrass */}
            <radialGradient id={satGreenId} cx="28%" cy="26%" r="72%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
              <stop offset="15%" stopColor="#c5ede4" stopOpacity="0.92" />
              <stop offset="52%" stopColor="#61988E" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#1d423b" stopOpacity="0.98" />
            </radialGradient>

            {/* Satellite 3: Core Echo Deep Pearl */}
            <radialGradient id={satEchoId} cx="30%" cy="26%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
              <stop offset="16%" stopColor="#EEF1BD" stopOpacity="0.88" />
              <stop offset="58%" stopColor="#2c524e" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#0e2321" stopOpacity="0.96" />
            </radialGradient>

            {/* Satellite 4: Ultra Luminous Cream Starlight Point */}
            <radialGradient id={satHighlightId} cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="38%" stopColor="#EEF1BD" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#bfc47b" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Ambient background glow ring */}
          <circle
            cx="200"
            cy="200"
            r={isHero ? "165" : "135"}
            fill={`url(#${ambientGlowId})`}
          />

          {/* Concentric Orbital Tracks (thin etched guide hairlines) */}
          {isHero && (
            <g opacity="0.18">
              <circle cx="200" cy="200" r="118" fill="none" stroke="#EEF1BD" strokeWidth="0.8" strokeDasharray="3 5" />
              <circle cx="200" cy="200" r="142" fill="none" stroke="#61988E" strokeWidth="0.8" strokeDasharray="2 6" />
            </g>
          )}

          {/* Core Sphere Group */}
          <g ref={coreRef}>
            {/* Main sphere body with sharp vector boundary */}
            <circle
              cx="200"
              cy="200"
              r={isHero ? "88" : "78"}
              fill={`url(#${coreGradId})`}
              stroke={`url(#${coreRimGradId})`}
              strokeWidth="1.2"
            />

            {/* Internal Caustic Bounce Light */}
            <circle
              cx="200"
              cy="200"
              r={isHero ? "87" : "77"}
              fill={`url(#${coreCausticId})`}
              style={{ mixBlendMode: "screen" }}
            />

            {/* Glass specular surface glare */}
            <ellipse
              cx="174"
              cy="166"
              rx={isHero ? "40" : "34"}
              ry={isHero ? "25" : "21"}
              transform="rotate(-25 174 166)"
              fill={`url(#${coreSpecularId})`}
            />

            {/* Sharp micro specular pinpoint */}
            <circle
              cx="163"
              cy="155"
              r="4.2"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>

          {/* Orbiting Satellite 1: Soft Obsidian Optical Crystal */}
          <g
            ref={(el) => {
              satellitesRef.current[0] = el;
            }}
            style={{ mixBlendMode: "screen" }}
          >
            <circle
              cx="294"
              cy="136"
              r="32"
              fill={`url(#${satPinkId})`}
              stroke="rgba(238, 241, 189, 0.35)"
              strokeWidth="1"
            />
            {/* Specular glint on pink satellite */}
            <ellipse
              cx="285"
              cy="126"
              rx="10"
              ry="6"
              transform="rotate(-25 285 126)"
              fill="#FFFFFF"
              opacity="0.75"
            />
            <circle cx="282" cy="123" r="2.4" fill="#FFFFFF" opacity="0.95" />
          </g>

          {/* Orbiting Satellite 2: Seagrass Optical Crystal */}
          <g
            ref={(el) => {
              satellitesRef.current[1] = el;
            }}
            style={{ mixBlendMode: "screen" }}
          >
            <circle
              cx="124"
              cy="266"
              r="25"
              fill={`url(#${satGreenId})`}
              stroke="rgba(230, 250, 245, 0.45)"
              strokeWidth="1"
            />
            {/* Specular glint on green satellite */}
            <ellipse
              cx="117"
              cy="258"
              rx="8"
              ry="5"
              transform="rotate(-25 117 258)"
              fill="#FFFFFF"
              opacity="0.75"
            />
            <circle cx="114" cy="256" r="2" fill="#FFFFFF" opacity="0.95" />
          </g>

          {/* Orbiting Satellite 3: Core Echo Deep Pearl (Hero only) */}
          {isHero && (
            <g
              ref={(el) => {
                satellitesRef.current[2] = el;
              }}
              style={{ mixBlendMode: "screen" }}
            >
              <circle
                cx="262"
                cy="268"
                r="18"
                fill={`url(#${satEchoId})`}
                stroke="rgba(238, 241, 189, 0.4)"
                strokeWidth="0.9"
              />
              <circle cx="257" cy="262" r="4" fill="#FFFFFF" opacity="0.65" />
            </g>
          )}

          {/* Orbiting Satellite 4: Ultra Luminous Starlight Pearl */}
          <g
            ref={(el) => {
              satellitesRef.current[3] = el;
            }}
            style={{ mixBlendMode: "screen" }}
          >
            <circle
              cx={isHero ? "148" : "154"}
              cy={isHero ? "142" : "146"}
              r={isHero ? "11" : "8"}
              fill={`url(#${satHighlightId})`}
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="0.8"
            />
            <circle
              cx={isHero ? "145" : "152"}
              cy={isHero ? "139" : "144"}
              r="2.2"
              fill="#FFFFFF"
              opacity="0.98"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
