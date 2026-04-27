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

  return (
    <Link href="/" aria-label="Emel Senemoglu — Mortgage Broker" className={cn("inline-flex items-center gap-3", className)}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <rect x="1" y="1" width="42" height="42" rx="12" stroke={ink} strokeWidth="1.5" />
        <path d="M11 14h14v3.2H14.4v4.4h9.5v3.1h-9.5v4.7H25.4v3.2H11V14Z" fill={ink} />
        <path
          d="M27.6 14h6.4c2.7 0 4.4 1.5 4.4 3.9 0 1.7-.9 2.9-2.4 3.5 1.9.5 3 1.9 3 4 0 2.7-1.9 4.5-4.9 4.5h-6.5V14Zm6.1 6.4c1.3 0 2.1-.7 2.1-1.8s-.8-1.8-2.1-1.8h-2.7v3.6h2.7Zm.4 6.4c1.5 0 2.4-.8 2.4-2.1 0-1.2-.9-2-2.4-2h-3.1v4.1h3.1Z"
          fill={accent}
        />
      </svg>
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] md:text-[1.15rem] tracking-tight" style={{ color: ink }}>
            Emel Senemoglu
          </span>
          <span className="mt-0.5 text-[0.68rem] md:text-[0.7rem] uppercase tracking-[0.18em]" style={{ color: tone === "dark" ? "#4a565d" : "#cdd3d7" }}>
            Mortgage Broker · BC
          </span>
        </span>
      )}
    </Link>
  );
}
