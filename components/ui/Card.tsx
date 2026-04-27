import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  href?: string;
  className?: string;
  children: ReactNode;
  interactive?: boolean;
};

export function Card({ href, className, children, interactive = true }: Props) {
  const classes = cn(
    "group block rounded-2xl bg-white shadow-card border border-cream-200/80 p-6 md:p-7 transition-all",
    interactive && "hover:-translate-y-0.5 hover:shadow-soft hover:border-emerald-200",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
