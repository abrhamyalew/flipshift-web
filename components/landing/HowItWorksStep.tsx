import { ReactNode } from "react";

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
  isLast?: boolean;
}

export default function HowItWorksStep({
  number,
  title,
  description,
  icon,
  isLast = false,
}: HowItWorksStepProps) {
  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Step indicator + connector line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 border border-seagrass/30"
          style={{
            background: "rgba(97, 152, 142, 0.12)",
            boxShadow: "0 0 0 4px rgba(97, 152, 142, 0.06)",
          }}
        >
          <span className="font-sans font-bold text-lg text-seagrass">{number}</span>
        </div>
        {!isLast && (
          <div
            className="w-px bg-gradient-to-b from-seagrass/40 to-transparent flex-1 mt-2"
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 pt-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-cream/50">{icon}</span>
          <h3 className="font-serif text-cream text-xl md:text-2xl font-medium">
            {title}
          </h3>
        </div>
        <p className="font-sans text-cream/60 text-sm md:text-base leading-7 max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}
