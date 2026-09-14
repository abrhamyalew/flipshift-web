"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  id?: string;
  showIcon?: boolean;
  icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#211E19] text-cream border border-cream/15 hover:bg-[#2d2922] hover:border-cream/30",
  secondary:
    "bg-transparent border border-seagrass/40 text-seagrass hover:bg-seagrass/10 hover:border-seagrass/60",
  ghost:
    "bg-transparent text-current hover:text-seagrass underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, { button: string; iconBadge: string }> = {
  sm: {
    button: "pl-5 pr-2 py-2 text-xs",
    iconBadge: "w-6 h-6 ml-2.5",
  },
  md: {
    button: "pl-6 pr-2.5 py-3 text-sm",
    iconBadge: "w-7 h-7 ml-3",
  },
  lg: {
    button: "pl-8 pr-3 py-4 text-base",
    iconBadge: "w-8 h-8 ml-3.5",
  },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  id,
  showIcon = true,
  icon,
}: ButtonProps) {
  const currentSize = sizeStyles[size];

  const defaultIcon = (
    <svg
      className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className={`
        group relative !rounded-full overflow-hidden font-sans font-medium tracking-wide cursor-pointer
        inline-flex items-center justify-between
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variantStyles[variant]}
        ${currentSize.button}
        ${className}
      `}
    >
      <span className="font-sans font-medium">{children}</span>

      {/* Button-in-Button Trailing Icon Badge per high-end-visual-design */}
      {showIcon && variant !== "ghost" && (
        <span
          className={`
            rounded-full flex items-center justify-center flex-shrink-0
            transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            group-hover:scale-105
            ${variant === "primary" ? "bg-white/15 text-cream" : "bg-seagrass/20 text-seagrass"}
            ${currentSize.iconBadge}
          `}
        >
          {icon || defaultIcon}
        </span>
      )}
    </motion.button>
  );
}
