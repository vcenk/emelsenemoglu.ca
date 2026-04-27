import Link from "next/link";
import { site } from "@/lib/site";

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function CTABand({
  title = "Let's talk through your mortgage options.",
  subtitle = "Free, no-obligation consultation with a Greater Vancouver mortgage broker.",
  primaryHref = "/apply",
  primaryLabel = "Start Your Application",
}: Props) {
  return (
    <section className="bg-emerald-900 text-cream-100 relative overflow-hidden">
      <div aria-hidden className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-coral-500/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-700/40 blur-3xl" />
      <div className="container-page relative py-14 md:py-16 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-display text-2xl md:text-3xl tracking-tight text-cream-50">{title}</p>
          <p className="mt-2 text-cream-100/80">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link
            href={primaryHref}
            className="rounded-full bg-coral-500 px-6 py-3 text-sm font-semibold text-white hover:bg-coral-600"
          >
            {primaryLabel}
          </Link>
          <a
            href={site.phoneHref}
            className="rounded-full border border-cream-100/30 px-6 py-3 text-sm font-medium text-cream-50 hover:bg-cream-100/10"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
