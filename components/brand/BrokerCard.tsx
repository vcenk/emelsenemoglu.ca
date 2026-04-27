import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

type Props = {
  variant?: "stacked" | "row";
  className?: string;
  showCTA?: boolean;
};

export function BrokerCard({ variant = "stacked", className, showCTA = true }: Props) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-6 md:p-8 shadow-soft border border-cream-200",
        variant === "row" ? "flex items-center gap-6" : "flex flex-col items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full ring-4 ring-cream-100 ring-offset-4 ring-offset-white",
          variant === "stacked" ? "h-36 w-36 md:h-44 md:w-44 mb-5" : "h-24 w-24",
        )}
      >
        <Image
          src="/emel-senemoglu.jpg"
          alt={`${site.name}, ${site.brokerTitle}`}
          fill
          sizes="(max-width: 768px) 144px, 176px"
          className="object-cover"
          priority
        />
      </div>
      <div className={cn(variant === "row" && "flex-1")}>
        <p className="font-display text-xl md:text-2xl text-emerald-900 tracking-tight uppercase">
          {site.name}
        </p>
        <p className="mt-1 text-sm md:text-base text-ink-700">{site.brokerTitle}</p>
        <p className="mt-2 text-sm text-ink-500">
          {site.brokerage}
        </p>
        <div className={cn("mt-4 flex flex-wrap gap-2 text-sm", variant === "stacked" && "justify-center")}>
          <a href={site.phoneHref} className="font-medium text-emerald-900 hover:text-coral-600">
            {site.phone}
          </a>
          <span className="text-ink-300">·</span>
          <a href={`mailto:${site.email}`} className="font-medium text-emerald-900 hover:text-coral-600 break-all">
            {site.email}
          </a>
        </div>
        {showCTA && (
          <div className={cn("mt-5 flex flex-wrap gap-3", variant === "stacked" && "justify-center")}>
            <a
              href="/apply"
              className="inline-flex items-center rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-emerald-800"
            >
              Start Application
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full border border-emerald-900/20 px-5 py-2.5 text-sm font-medium text-emerald-900 hover:bg-emerald-900/5"
            >
              Book a Call
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
