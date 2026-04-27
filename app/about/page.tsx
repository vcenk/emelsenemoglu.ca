import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/cta/CTABand";
import { PageHero } from "@/components/seo/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Emel Senemoglu — Vancouver Mortgage Broker",
  description:
    "Meet Emel Senemoglu — Director of Client Journey at Powerhaus Mortgages, Dominion Lending Centres National. 35 years in Canadian finance, BCFSA #MB608816, serving Greater Vancouver and across BC.",
  path: "/about",
});

const values = [
  {
    t: "Client-first, every time",
    d: "Every file starts with a conversation about your specific goals — short-term and long-term — before any rate is quoted. If a deal isn't right for you, I'll say so.",
  },
  {
    t: "40+ lender shop",
    d: "I'm not loyal to a bank. I'm loyal to your file. Big-six, monolines, credit unions, alt-A and private — every option on the table.",
  },
  {
    t: "Lasting relationships",
    d: "Trust, transparency and consistent support are the only way I know how to do this work. From pre-approval through renewal and beyond, I stay with you.",
  },
  {
    t: "Greater Vancouver, served Canada-wide",
    d: "Based in BC with deep local market knowledge — also fully digital for clients in Toronto, Calgary, Montreal and beyond.",
  },
];

const careerHighlights = [
  { k: "35", v: "Years in finance", caption: "Banking, lending, investments and advisory" },
  { k: "40+", v: "Lender partners", caption: "Big banks, monolines, credit unions, alt-A and private" },
  { k: "EN · TR", v: "Languages", caption: "Service in English and Turkish" },
  { k: "BC", v: "BCFSA licensed", caption: `Registration #${site.license.number}` },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])} />
      <PageHero
        eyebrow="About Emel"
        title="35 years in Canadian finance — now working entirely for you."
        intro="I'm Emel Senemoglu — a BCFSA-licensed mortgage broker (#MB608816) at Powerhaus Mortgages, a division of Dominion Lending Centres National Ltd."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden bg-cream-200">
              <Image
                src="/emelsenemoglu.jpg"
                alt={`${site.name}, BCFSA-licensed BC mortgage broker at Powerhaus Mortgages — Dominion Lending Centres National`}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 max-w-md mx-auto">
              {careerHighlights.map((h) => (
                <li
                  key={h.v}
                  className="rounded-2xl bg-cream-50 border border-cream-200 p-4"
                >
                  <p className="font-display text-2xl md:text-3xl font-semibold text-emerald-900 leading-none">
                    {h.k}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink-500 mt-3 font-semibold">
                    {h.v}
                  </p>
                  <p className="text-[11px] text-ink-500 mt-1 leading-snug">{h.caption}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 prose-custom">
            <h2 className="font-display text-2xl md:text-3xl text-emerald-950">A career-long client-first approach</h2>
            <p>
              With over 35 years of experience in the finance industry, I help clients navigate their
              mortgage journey with confidence and clarity. I bring a strong client-first mindset,
              focusing on understanding each client's unique goals and delivering tailored solutions
              that support both their immediate needs and long-term financial success.
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-emerald-950 mt-8">Top performer in Canadian banking</h2>
            <p>
              Throughout my career in banking, I have been recognized as a top performer — building
              expertise across mortgages, lending, investments, and overall financial planning. I take
              pride in creating lasting relationships based on trust, transparency, and consistent
              support. Brokerage was the natural next step: instead of representing one institution, I
              now represent the client.
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-emerald-950 mt-8">The brokerage</h2>
            <p>
              I work at <strong>Powerhaus Mortgages</strong>, a division of <strong>Dominion Lending
              Centres National Ltd.</strong> — one of Canada's largest mortgage networks. That means
              access to 40+ prime lenders plus alt-A, B-lenders, private capital, commercial and
              reverse mortgage partners. The lender pays the brokerage on funding, so for the vast
              majority of files there's <strong>no cost to you</strong>.
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-emerald-950 mt-8">Licensing</h2>
            <p>
              Licensed by the <strong>BC Financial Services Authority</strong> under the Mortgage
              Brokers Act — registration <strong>#{site.license.number}</strong>, effective{" "}
              {new Date(site.license.effectiveDate).toLocaleDateString("en-CA", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              . You can verify the registration directly on the{" "}
              <a href={site.license.portalUrl} target="_blank" rel="noopener noreferrer">
                BCFSA public registry
              </a>
              .
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-emerald-950 mt-8">Languages</h2>
            <p>
              I serve clients in <strong>English</strong> and <strong>Turkish</strong>. If you'd be
              more comfortable speaking Turkish, just say so when you reach out.
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-emerald-950 mt-8">Outside the office</h2>
            <p>
              When I'm not on a file, you'll find me <strong>spending time in nature</strong>,{" "}
              <strong>painting</strong>, and at <strong>community events</strong> around Greater
              Vancouver. The combination keeps me grounded, creative, and connected — qualities I
              bring back into the work itself.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">How I work</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-emerald-950">
            Four things you can count on.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <Card key={v.t} interactive={false}>
              <p className="font-display text-xl text-emerald-900">{v.t}</p>
              <p className="mt-2 text-ink-600">{v.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CTABand
        title="Ready to talk through your mortgage?"
        subtitle="No fees, no obligation. A 20-minute call usually saves clients thousands."
      />
    </>
  );
}
