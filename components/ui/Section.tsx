import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "white" | "emerald" | "ink";
  size?: "sm" | "md" | "lg";
  id?: string;
};

const toneClasses: Record<NonNullable<Props["tone"]>, string> = {
  cream: "bg-cream-100 text-ink-800",
  white: "bg-white text-ink-800",
  emerald: "bg-emerald-900 text-cream-100",
  ink: "bg-ink-900 text-cream-100",
};

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  sm: "py-10 md:py-14",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

export function Section({ children, className, tone = "cream", size = "md", id }: Props) {
  return (
    <section id={id} className={cn(toneClasses[tone], sizeClasses[size], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
