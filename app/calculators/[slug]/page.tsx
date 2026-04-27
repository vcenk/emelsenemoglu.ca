import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CTABand } from "@/components/cta/CTABand";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/seo/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { calculatorOrder, calculatorRegistry, hasCalculator } from "@/lib/calculators/registry";
import { getCalculatorBySlug } from "@/lib/content/loader";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return calculatorOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const c = getCalculatorBySlug(slug);
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/calculators/${slug}`,
  });
}

export default async function CalculatorPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!hasCalculator(slug)) notFound();
  const Calc = calculatorRegistry[slug];
  const content = getCalculatorBySlug(slug);
  if (!content) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Calculators", url: "/calculators" },
            { name: content.title, url: `/calculators/${slug}` },
          ]),
          ...(content.faqs?.length ? [faqSchema(content.faqs)] : []),
        ]}
      />
      <PageHero
        eyebrow="Calculator"
        title={content.title}
        intro={content.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: content.title },
        ]}
      />

      <Section tone="white" size="sm">
        <Calc />
      </Section>

      <Section tone="cream" size="sm">
        <div className="max-w-3xl prose-custom">
          <h2 className="font-display text-2xl text-emerald-950">About this calculator</h2>
          {content.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      {content.faqs && content.faqs.length > 0 && (
        <Section tone="white">
          <h2 className="font-display text-2xl text-emerald-950 mb-6">Frequently asked questions</h2>
          <Accordion items={content.faqs} />
        </Section>
      )}

      {content.related && content.related.length > 0 && (
        <Section tone="cream" size="sm">
          <h2 className="font-display text-xl text-emerald-950 mb-5">Related calculators</h2>
          <ul className="flex flex-wrap gap-2">
            {content.related.map((r) => (
              <li key={r}>
                <Link
                  href={`/calculators/${r}`}
                  className="rounded-full border border-emerald-900/15 bg-white px-4 py-2 text-sm text-emerald-900 hover:bg-emerald-900/5"
                >
                  {r.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTABand />
    </>
  );
}
