import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/cta/CTABand";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/Hero";
import { Accordion } from "@/components/ui/Accordion";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceCategories, getCategoryBySlug } from "@/lib/content/navigation";
import { getCategoryContent, getServicesByCategory } from "@/lib/content/loader";
import { site } from "@/lib/site";

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  const content = getCategoryContent(category);
  return buildMetadata({
    title: content?.metaTitle ?? `${cat.label} — Greater Vancouver Mortgages`,
    description:
      content?.metaDescription ??
      `${cat.blurb} Personalized guidance from a Greater Vancouver mortgage broker.`,
    path: `/mortgages/${cat.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();
  const content = getCategoryContent(category);
  const services = getServicesByCategory(category);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Mortgages", href: "/" },
    { label: cat.label },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs.map((c) => ({ name: c.label, url: c.href ?? `/mortgages/${cat.slug}` }))),
          ...(content?.faqs?.length ? [faqSchema(content.faqs)] : []),
        ]}
      />

      <PageHero
        eyebrow={`${cat.links.length} solutions`}
        title={content?.title ?? cat.label}
        intro={content?.intro ?? cat.blurb}
        breadcrumbs={crumbs}
      />

      {content?.body && (
        <Section tone="white" size="sm">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="prose-custom max-w-prose" dangerouslySetInnerHTML={{ __html: content.body }} />
            </div>
            {content.highlights && content.highlights.length > 0 && (
              <div className="lg:col-span-4 space-y-4">
                {content.highlights.map((h, i) => (
                  <div key={i} className="rounded-2xl bg-cream-100 p-5 border border-cream-200">
                    <p className="font-display text-lg text-emerald-900">{h.title}</p>
                    <p className="mt-1.5 text-sm text-ink-600">{h.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      <Section tone="cream">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <h2 className="font-display text-3xl text-emerald-950">All {cat.label.toLowerCase()} services</h2>
          <p className="text-sm text-ink-600 max-w-md">
            Each option below links to a dedicated page with details, requirements and FAQs.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cat.links.map((link) => {
            const svc = services.find((s) => s.slug === link.slug);
            return (
              <Card key={link.slug} href={`/mortgages/${cat.slug}/${link.slug}`} className="h-full flex flex-col">
                <p className="font-display text-lg text-emerald-900 group-hover:text-coral-600 transition-colors">
                  {link.label}
                </p>
                <p className="mt-2 text-sm text-ink-600 flex-1">
                  {svc?.intro ? svc.intro.slice(0, 160) + (svc.intro.length > 160 ? "…" : "") : link.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-900">
                  Learn more <span aria-hidden>→</span>
                </span>
              </Card>
            );
          })}
        </div>
      </Section>

      {content?.faqs && content.faqs.length > 0 && (
        <Section tone="white">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">Common questions</p>
              <h2 className="mt-3 font-display text-3xl text-emerald-950">{cat.label} FAQs</h2>
              <p className="mt-4 text-ink-600">Don't see your question? Reach out — answers are always free.</p>
              <Link href="/contact" className="mt-5 inline-block text-sm font-medium text-emerald-900 hover:text-coral-600">
                Ask Emel a question →
              </Link>
            </div>
            <div className="lg:col-span-7">
              <Accordion items={content.faqs} />
            </div>
          </div>
        </Section>
      )}

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl text-emerald-950">
              Talk through {cat.label.toLowerCase()} with Emel.
            </h2>
            <p className="mt-4 text-ink-700">
              Free, no-obligation consultation. {site.address.region} based, Canada-wide service.
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
