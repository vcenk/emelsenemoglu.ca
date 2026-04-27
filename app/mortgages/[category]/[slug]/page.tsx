import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/cta/CTABand";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/Hero";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { allServiceSlugs, serviceSlugMap } from "@/lib/content/navigation";
import { getServiceBySlug } from "@/lib/content/loader";
import { site } from "@/lib/site";

type Params = Promise<{ category: string; slug: string }>;

export function generateStaticParams() {
  return allServiceSlugs().map(({ category, service }) => ({ category, slug: service }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category, slug } = await params;
  const meta = serviceSlugMap[slug];
  if (!meta || meta.category !== category) return {};
  const svc = getServiceBySlug(slug);
  return buildMetadata({
    title: svc?.metaTitle ?? `${meta.label} — Greater Vancouver Mortgage Broker`,
    description:
      svc?.metaDescription ??
      meta.description ??
      `${meta.label} from Emel Senemoglu, a Greater Vancouver mortgage broker.`,
    path: `/mortgages/${category}/${slug}`,
    keywords: svc?.keywords,
  });
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { category, slug } = await params;
  const meta = serviceSlugMap[slug];
  if (!meta || meta.category !== category) notFound();
  const svc = getServiceBySlug(slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: meta.categoryLabel, href: `/mortgages/${meta.category}` },
    { label: meta.label },
  ];

  const url = `${site.url}/mortgages/${category}/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            crumbs.map((c, i) => ({
              name: c.label,
              url: c.href ?? (i === crumbs.length - 1 ? `/mortgages/${category}/${slug}` : "/"),
            })),
          ),
          serviceSchema({
            name: meta.label,
            description: svc?.metaDescription ?? meta.description ?? meta.label,
            url,
          }),
          ...(svc?.faqs?.length ? [faqSchema(svc.faqs)] : []),
        ]}
      />

      <PageHero
        eyebrow={meta.categoryLabel}
        title={svc?.title ?? meta.label}
        intro={svc?.intro ?? meta.description}
        breadcrumbs={crumbs}
      />

      <Section tone="white" size="sm">
        <div className="grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8 space-y-8">
            {svc?.body?.map((block, i) => (
              <div key={i}>
                <h2 className="font-display text-2xl md:text-3xl text-emerald-950 mt-2 mb-4">{block.heading}</h2>
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="text-ink-700 leading-relaxed mb-4">{p}</p>
                ))}
                {block.bullets && block.bullets.length > 0 && (
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-ink-700 marker:text-coral-500">
                    {block.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {svc?.process && svc.process.length > 0 && (
              <div className="mt-10 rounded-3xl bg-cream-100 border border-cream-200 p-7 md:p-9">
                <h2 className="font-display text-2xl text-emerald-950">How it works</h2>
                <ol className="mt-6 grid gap-4 md:grid-cols-2">
                  {svc.process.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-display text-2xl text-coral-500 leading-none mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-display text-lg text-emerald-900">{step.step}</p>
                        <p className="text-sm text-ink-600 mt-1">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {svc?.faqs && svc.faqs.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-emerald-950 mb-5">Frequently asked questions</h2>
                <Accordion items={svc.faqs} />
              </div>
            )}
          </article>

          <aside className="lg:col-span-4 space-y-5">
            {svc?.whoItsFor && svc.whoItsFor.length > 0 && (
              <div className="rounded-2xl bg-emerald-900 text-cream-100 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-coral-300 font-medium">Best for</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {svc.whoItsFor.map((w, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden className="text-coral-300">●</span>
                      <span className="text-cream-100/90">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {svc?.requirements && svc.requirements.length > 0 && (
              <div className="rounded-2xl bg-white border border-cream-200 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">What you'll need</p>
                <ul className="mt-3 space-y-2 text-sm text-ink-700">
                  {svc.requirements.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden className="text-emerald-700">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl bg-cream-100 border border-cream-200 p-6">
              <p className="font-display text-lg text-emerald-900">{svc?.cta?.title ?? "Ready when you are."}</p>
              <p className="mt-2 text-sm text-ink-600">
                {svc?.cta?.description ??
                  "Free 20-minute consultation. No fees, no obligation, no pressure."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button href="/apply" size="sm">
                  {svc?.cta?.buttonLabel ?? "Apply now"}
                </Button>
                <Button href="/contact" variant="outline" size="sm">Book a call</Button>
              </div>
            </div>

            {svc?.related && svc.related.length > 0 && (
              <div className="rounded-2xl bg-white border border-cream-200 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">Related</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {svc.related.map((slug) => {
                    const r = serviceSlugMap[slug];
                    if (!r) return null;
                    return (
                      <li key={slug}>
                        <Link href={`/mortgages/${r.category}/${slug}`} className="text-emerald-900 hover:text-coral-600">
                          {r.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl text-emerald-950">Have a question about {meta.label.toLowerCase()}?</h2>
            <p className="mt-4 text-ink-700">
              Send a quick note. I read every message and reply within one business day.
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
