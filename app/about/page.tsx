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
    "Meet Emel Senemoglu, Director of Client Journey at Powerhaus Mortgages — Dominion Lending Centres National. A Greater Vancouver mortgage broker who turns complicated mortgages into clear decisions.",
  path: "/about",
});

const values = [
  { t: "Honest, in plain English", d: "I translate underwriting jargon into language you can act on. If a deal isn't right for you, I'll say so — even if that means I don't get paid." },
  { t: "40+ lender shop", d: "I'm not loyal to a bank. I'm loyal to your file. Big-six, monolines, credit unions, alt-A and private — every option on the table." },
  { t: "Workflow, not a transaction", d: "From pre-approval through closing and renewal, I stay with you for the full journey. Your file isn't done when funds advance." },
  { t: "Greater Vancouver, served Canada-wide", d: "Based in BC with deep local market knowledge — also fully digital for clients in Toronto, Calgary, Montreal and beyond." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])} />
      <PageHero
        eyebrow="About Emel"
        title="A Vancouver mortgage broker who treats your file like it's her own."
        intro="I'm Emel Senemoglu — a licensed BC mortgage broker, multilingual immigrant, and Director of Client Journey at Powerhaus Mortgages, a division of Dominion Lending Centres National Ltd."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden bg-cream-200">
              <Image src="/emelsenemoglu.jpg" alt={`${site.name}, licensed BC mortgage broker at Powerhaus Mortgages — Dominion Lending Centres National`} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 prose-custom">
            <h2 className="font-display text-2xl md:text-3xl text-emerald-950">Why I do this work</h2>
            <p>
              Buying a home in Greater Vancouver is hard. Renewing one without rethinking is expensive.
              Refinancing without a strategy can quietly cost you tens of thousands. I started brokering
              mortgages because I watched too many smart people sign whatever the bank put in front of them
              — and I knew there was a better way.
            </p>
            <p>
              My clients are first-time buyers in Burnaby and Surrey, self-employed founders in East
              Vancouver, physicians and professionals across the Lower Mainland, families relocating from
              Toronto and Calgary, and newcomers settling in Richmond, Coquitlam and the North Shore. The
              thread that ties them together: they want their mortgage to fit their life — not the other
              way around.
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-emerald-950 mt-8">The brokerage</h2>
            <p>
              I work at <strong>Powerhaus Mortgages</strong>, a division of <strong>Dominion Lending Centres
              National Ltd.</strong> — one of Canada's largest mortgage networks. That means access to 40+
              prime lenders plus alt-A, B-lenders, private capital, commercial and reverse mortgage
              partners. The lender pays the brokerage on funding, so for the vast majority of files
              there's <strong>no cost to you</strong>.
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-emerald-950 mt-8">Languages</h2>
            <p>I serve clients in <strong>English</strong> and <strong>Turkish</strong>. If you'd be more comfortable speaking Turkish, just say so when you reach out.</p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">How I work</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-emerald-950">Four things you can count on.</h2>
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

      <CTABand title="Ready to talk through your mortgage?" subtitle="No fees, no obligation. A 20-minute call usually saves clients thousands." />
    </>
  );
}
