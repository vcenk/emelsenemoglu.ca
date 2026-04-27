import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Props = {
  variant?: "full" | "mark";
  tone?: "dark" | "light";
  className?: string;
};

export function Logo({ variant = "full", tone = "dark", className }: Props) {
  const ink = tone === "dark" ? "#0F4C3A" : "#FAF7F2";
  const accent = "#E07856";
  const subtle = tone === "dark" ? "#4a565d" : "#cdd3d7";

  return (
    <Link
      href="/"
      aria-label="Emel Senemoglu — Greater Vancouver Mortgage Broker"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden role="img">
        <rect x="1" y="1" width="44" height="44" rx="11" stroke={ink} strokeWidth="1.5" />
        {/* Letter E */}
        <g fill={ink}>
          <rect x="11" y="13" width="11" height="3" />
          <rect x="11" y="13" width="3" height="20" />
          <rect x="11" y="21.5" width="9" height="3" />
          <rect x="11" y="30" width="11" height="3" />
        </g>
        {/* Letter S */}
        <g fill={accent}>
          <rect x="24" y="13" width="11" height="3" />
          <rect x="24" y="13" width="3" height="9" />
          <rect x="24" y="21.5" width="11" height="3" />
          <rect x="32" y="22.5" width="3" height="8.5" />
          <rect x="24" y="30" width="11" height="3" />
        </g>
      </svg>
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display text-[1.1rem] md:text-[1.2rem] font-semibold tracking-tight"
            style={{ color: ink }}
          >
            Emel Senemoglu
          </span>
          <span
            className="mt-1 text-[0.65rem] md:text-[0.68rem] uppercase tracking-[0.22em] font-sans"
            style={{ color: subtle }}
          >
            Mortgage Broker · BC
          </span>
        </span>
      )}
    </Link>
  );
}
