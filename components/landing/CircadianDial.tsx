"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CircadianDial() {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: dial shifts up slightly as section scrolls into view
  const dialY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const dialRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  useEffect(() => {
    setMounted(true);
    // Set initial angle based on current time
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    setCurrentAngle((hours / 24) * 360);

    // Slowly rotate to simulate time passing
    const interval = setInterval(() => {
      setCurrentAngle((prev) => (prev + 0.03) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className="w-[320px] h-[320px] md:w-[420px] md:h-[420px]" />;
  }

  const size = 420;
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const innerRadius = outerRadius - 52;
  const tickRadius = outerRadius - 8;

  // Zone definitions (in hours, 0 = midnight)
  const zones = [
    { start: 0, end: 6, color: "#0f2624", label: "Deep Sleep", opacity: 0.95 },
    { start: 6, end: 7.5, color: "#4a3549", label: "Wake", opacity: 0.8 },
    { start: 7.5, end: 15, color: "#4d7a72", label: "Active", opacity: 0.75 },
    { start: 15, end: 19, color: "#61988E", label: "Active", opacity: 0.65 },
    { start: 19, end: 22, color: "#4a3549", label: "Wind Down", opacity: 0.8 },
    { start: 22, end: 24, color: "#0f2624", label: "Sleep", opacity: 0.95 },
  ];

  const hourToAngle = (hour: number) => (hour / 24) * 360 - 90;

  const describeArc = (
    startAngle: number,
    endAngle: number,
    rOuter: number,
    rInner: number
  ) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1Outer = center + rOuter * Math.cos(startRad);
    const y1Outer = center + rOuter * Math.sin(startRad);
    const x2Outer = center + rOuter * Math.cos(endRad);
    const y2Outer = center + rOuter * Math.sin(endRad);
    const x1Inner = center + rInner * Math.cos(endRad);
    const y1Inner = center + rInner * Math.sin(endRad);
    const x2Inner = center + rInner * Math.cos(startRad);
    const y2Inner = center + rInner * Math.sin(startRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${x1Outer} ${y1Outer}
            A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
            L ${x1Inner} ${y1Inner}
            A ${rInner} ${rInner} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}
            Z`;
  };

  // Current time indicator position
  const indicatorAngle = ((currentAngle - 90) * Math.PI) / 180;
  const indicatorX = center + (outerRadius - 26) * Math.cos(indicatorAngle);
  const indicatorY = center + (outerRadius - 26) * Math.sin(indicatorAngle);

  return (
    <div ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: dialY, rotate: dialRotate }}
        className="relative"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 blur-3xl opacity-15 scale-75">
          <div className="w-full h-full rounded-full bg-seagrass/25" />
        </div>

        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative z-10"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softglow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a3d3a" />
              <stop offset="100%" stopColor="#0c1e1c" />
            </radialGradient>
          </defs>

          {/* Outer ring border */}
          <circle
            cx={center}
            cy={center}
            r={outerRadius + 2}
            fill="none"
            stroke="rgba(242, 237, 227, 0.04)"
            strokeWidth="1"
          />

          {/* Zone arcs */}
          {zones.map((zone, i) => (
            <motion.path
              key={i}
              d={describeArc(
                hourToAngle(zone.start),
                hourToAngle(zone.end),
                outerRadius,
                innerRadius
              )}
              fill={zone.color}
              opacity={zone.opacity}
              initial={{ opacity: 0 }}
              animate={{ opacity: zone.opacity }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
              stroke="rgba(242, 237, 227, 0.06)"
              strokeWidth="1"
            />
          ))}

          {/* Center circle */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius - 8}
            fill="url(#centerGradient)"
            stroke="rgba(242, 237, 227, 0.05)"
            strokeWidth="1"
          />

          {/* Center text */}
          <text
            x={center}
            y={center - 10}
            textAnchor="middle"
            style={{ fontSize: "11px", fontWeight: 600, fill: "rgba(242,237,227,0.5)", letterSpacing: "0.12em" }}
          >
            YOUR RHYTHM
          </text>
          <text
            x={center}
            y={center + 12}
            textAnchor="middle"
            style={{ fontSize: "10px", fontWeight: 600, fill: "#61988E", letterSpacing: "0.1em" }}
          >
            ADAPTED DAILY
          </text>

          {/* Hour ticks */}
          {Array.from({ length: 24 }, (_, i) => {
            const angle = ((i / 24) * 360 - 90) * (Math.PI / 180);
            const isMajor = i % 6 === 0;
            const x1 = center + tickRadius * Math.cos(angle);
            const y1 = center + tickRadius * Math.sin(angle);
            const tickLen = isMajor ? 12 : 5;
            const x2 = center + (tickRadius + tickLen) * Math.cos(angle);
            const y2 = center + (tickRadius + tickLen) * Math.sin(angle);

            const labelR = outerRadius + 20;
            const lx = center + labelR * Math.cos(angle);
            const ly = center + labelR * Math.sin(angle);

            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? "rgba(242, 237, 227, 0.45)" : "rgba(242, 237, 227, 0.12)"}
                  strokeWidth={isMajor ? 1.5 : 0.75}
                />
                {isMajor && (
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: "10px", fontWeight: 500, fill: "rgba(242,237,227,0.35)" }}
                  >
                    {i === 0 ? "12a" : i === 6 ? "6a" : i === 12 ? "12p" : "6p"}
                  </text>
                )}
              </g>
            );
          })}

          {/* Current time indicator */}
          {/* Outer pulse ring */}
          <motion.circle
            cx={indicatorX}
            cy={indicatorY}
            r={10}
            fill="none"
            stroke="#61988E"
            strokeWidth="1.5"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          {/* Second pulse ring */}
          <motion.circle
            cx={indicatorX}
            cy={indicatorY}
            r={10}
            fill="none"
            stroke="#61988E"
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.8,
            }}
          />
          {/* Main dot */}
          <motion.circle
            cx={indicatorX}
            cy={indicatorY}
            r={8}
            fill="#61988E"
            filter="url(#glow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
          />
          <motion.circle
            cx={indicatorX}
            cy={indicatorY}
            r={3.5}
            fill="#EEF1BD"
            filter="url(#softglow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
