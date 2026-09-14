"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  variant?: "dark" | "light";
  className?: string;
  id?: string;
  fullHeight?: boolean;
  noise?: boolean;
}

export default function SectionWrapper({
  children,
  variant = "dark",
  className = "",
  id,
  fullHeight = true,
  noise = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`
        relative overflow-hidden scroll-mt-16
        ${fullHeight ? "min-h-screen" : ""}
        ${variant === "dark" ? "section-dark" : "section-light"}
        ${noise ? "noise-overlay" : ""}
        ${className}
      `}
    >
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full h-full"
        style={fullHeight ? { minHeight: "calc(100vh - 4rem)" } : {}}
      >
        <div
          className="w-full max-w-[var(--content-max-width,1280px)] mx-auto"
          style={{
            paddingLeft: "var(--section-padding-x)",
            paddingRight: "var(--section-padding-x)",
            paddingTop: "var(--section-padding-y)",
            paddingBottom: "calc(var(--section-padding-y) * 1.15)",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
