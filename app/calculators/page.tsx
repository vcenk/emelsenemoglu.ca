import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/cta/CTABand";
import { PageHero } from "@/components/seo/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { calculatorOrder } from "@/lib/calculators/registry";
import { loadAllCalculators } from "@/lib/content/loader";

export const metadata = buildMetadata({
  title: "Free Canadian Mortgage Calculators",
  description:
    "Free mortgage calculators for Canadians: monthly payment, affordability, BC Property Transfer Tax, renewal savings and refinance break-even. Built by a Greater Vancouver mortgage broker.",
  path: "/calculators",
  keywords: [
    "Canadian mortgage calculator",
    "Vancouver mortgage calculator",
    "BC mortgage calculator",
    "mortgage affordability calculator Canada",
    "BC property transfer tax calculator",
    "mortgage renewal calculator Canada",
    "refinance calculator Canada",
  ],
});

const blurbs: Record<string, string> = {
  "mortgage-payment": "Calculate principal-and-interest payments for any rate, term and amortization with proper Canadian semi-annual compounding.",
  affordability: "How much home can you afford? Stress-tested using GDS/TDS ratios and the OSFI 5.25% qualifying floor.",
  "land-transfer-tax": "Estimate British Columbia Property Transfer Tax for your purchase, including first-time buyer exemption and foreign buyer surtax.",
  "renewal-savings": "Compare what your bank's renewal letter offers vs. what a broker can shop. The number is usually bigger than you think.",
  "refinance-savings": "Calculate net savings from refinancing after penalty, legal and appraisal costs — and the break-even month.",
};

export default function CalculatorsIndexPage() {
  const calcs = loadAllCalculators();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Calculators", url: "/calculators" }])} />
      <PageHero
        eyebrow="Free tools"
        title="Run the numbers before you call me."
        intro="Five free Canadian mortgage calculators built for real decisions — not for clicks. Numbers use proper Canadian semi-annual compounding and federal stress-test rules where applicable."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Calculators" }]}
      />
      <Section tone="cream">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorOrder.map((slug) => {
            const c = calcs.find((x) => x.slug === slug);
            return (
              <Card key={slug} href={`/calculators/${slug}`} className="h-full flex flex-col">
                <p className="font-display text-xl text-emerald-900 group-hover:text-coral-600 transition-colors">
                  {c?.title ?? slug}
                </p>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">{blurbs[slug]}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-900">
                  Open calculator <span aria-hidden>→</span>
                </span>
              </Card>
            );
          })}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
