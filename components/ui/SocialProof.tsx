"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar";

const AVATARS = [
  { initials: "MK", bg: "#61988E", src: "/avatars/avatar-1.jpg" },
  { initials: "JR", bg: "#7fb3a8", src: "/avatars/avatar-2.jpg" },
  { initials: "AL", bg: "#60495A", src: "/avatars/avatar-3.jpg" },
  { initials: "TS", bg: "#4d7a72", src: "/avatars/avatar-4.jpg" },
  { initials: "RN", bg: "#8B7B85", src: "/avatars/avatar-5.jpg" },
];

interface SocialProofProps {
  count?: number;
  variant?: "dark" | "light";
  className?: string;
}

export default function SocialProof({
  count = 811,
  variant = "dark",
  className = "",
}: SocialProofProps) {
  const isDark = variant === "dark";

  const formattedCount =
    count >= 1000
      ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k+`
      : `${count}+`;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <AvatarGroup className="-space-x-2.5">
        {AVATARS.map((avatar) => (
          <Avatar
            key={avatar.initials}
            size="sm"
            className="ring-[#183A37]"
          >
            <AvatarImage src={avatar.src} alt="Waitlist member" />
            <AvatarFallback
              className="text-[9px] font-semibold text-cream/90"
              style={{ backgroundColor: avatar.bg }}
            >
              {avatar.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>

      <p
        className={`font-sans text-[11px] sm:text-xs font-medium ${
          isDark ? "text-cream/55" : "text-slate-grey/55"
        }`}
      >
        <span
          className={`font-semibold ${
            isDark ? "text-cream/80" : "text-slate-grey/80"
          }`}
        >
          {formattedCount}
        </span>{" "}
        shift workers already joined
      </p>
    </div>
  );
}
