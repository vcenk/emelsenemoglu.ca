import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, intro, breadcrumbs }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 via-cream-100 to-emerald-50/40">
      <div aria-hidden className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-coral-200/25 blur-3xl" />
      <div className="container-page relative pt-10 md:pt-14 pb-12 md:pb-16">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && (
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">{eyebrow}</p>
        )}
        <h1 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-emerald-950 max-w-4xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-ink-700 leading-relaxed">{intro}</p>}
      </div>
    </section>
  );
}
