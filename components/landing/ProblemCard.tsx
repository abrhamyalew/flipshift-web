"use client";

import { ReactNode } from "react";

interface ProblemCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number;
}

export default function ProblemCard({
  icon,
  title,
  description,
}: ProblemCardProps) {
  return (
    <div className="group relative rounded-2xl bg-cream border border-slate-grey/12 p-7 md:p-8 shadow-sm transition-all duration-300 hover:border-slate-grey/30 hover:shadow-md hover:-translate-y-0.5">
      <div>
        {/* Icon container */}
        <div className="w-12 h-12 rounded-xl bg-seagrass/10 border border-seagrass/20 flex items-center justify-center mb-5 text-seagrass transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>

        {/* Typography */}
        <h3 className="font-serif text-slate-grey text-xl md:text-2xl mb-3 font-medium tracking-tight">
          {title}
        </h3>

        <p className="font-sans text-mauve text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
