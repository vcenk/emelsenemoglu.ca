import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BrokerCard } from "@/components/brand/BrokerCard";
import { CTABand } from "@/components/cta/CTABand";
import { LeadForm } from "@/components/forms/LeadForm";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { serviceCategories } from "@/lib/content/navigation";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: site.name,
  description: site.description,
  path: "/",
  keywords: [
    "Greater Vancouver mortgage broker",
    "Vancouver mortgage broker",
    "BC mortgage broker",
    "Burnaby mortgage broker",
    "Surrey mortgage broker",
    "Richmond mortgage broker",
    "Coquitlam mortgage broker",
    "Emel Senemoglu",
    "Powerhaus Mortgages",
    "first-time home buyer Vancouver",
    "mortgage renewal BC",
    "newcomer mortgage Canada",
  ],
});

const homeFAQs = [
  {
    question: "Why work with a mortgage broker instead of going to my bank?",
    answer:
      "A bank can only sell you their own products. As a licensed broker in BC, I shop dozens of lenders — big banks, monolines, credit unions and alt-A lenders — to find the rate, term and structure that actually fits your life. The lender pays my commission on funding, not you.",
  },
  {
    question: "Do you only work in Greater Vancouver?",
    answer:
      "I'm based in Greater Vancouver and serve clients across British Columbia in person, but I'm licensed to write mortgages anywhere in Canada and frequently help clients in Toronto, Calgary, Montreal and beyond — fully digital, end-to-end.",
  },
  {
    question: "How long does pre-approval take?",
    answer:
      "Most clients can get a soft pre-qualification in under 15 minutes and a fully underwritten pre-approval within 24–48 hours of submitting documents. Rate holds are typically valid for 90–120 days.",
  },
  {
    question: "What's your fee?",
    answer:
      "For prime, insured, and most conventional residential mortgages there is no fee to you — the lender compensates the brokerage on funding. Specialty files (private, equity-only, complex commercial) may carry a brokerage fee, which is always disclosed upfront in writing.",
  },
  {
    question: "I'm new to Canada / on a work permit / non-resident — can you still help?",
    answer:
      "Yes. There are dedicated newcomer programs that accept foreign credit history, work-permit income and overseas down payment. I work with these files regularly and will tell you in our first call exactly what you'll need.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", url: "/" }]),
          faqSchema(homeFAQs),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 via-cream-100 to-emerald-50/50">
        <div aria-hidden className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-coral-200/30 blur-3xl" />
        <div className="container-page relative pt-14 md:pt-20 pb-14 md:pb-24 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-900/5 border border-emerald-900/15 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-emerald-900">
              <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
              Greater Vancouver · British Columbia
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-emerald-950">
              Mortgages built around <em className="not-italic text-coral-600">your life</em>, not the bank's.
            </h1>
            <p className="mt-5 text-lg text-ink-700 max-w-xl leading-relaxed">
              I'm Emel — a Greater Vancouver mortgage broker with access to 40+ Canadian lenders. Whether
              you're buying your first home, renewing, refinancing, investing or new to Canada, I'll
              shop the market for you and translate it into plain English.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/apply" size="lg">Start Your Application</Button>
              <Button href="/calculators" variant="outline" size="lg">Try a Calculator</Button>
            </div>
            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {[
                { k: "40+", v: "Lender partners", caption: "Big banks, monolines & credit unions" },
                { k: "$0", v: "Fee for most files", caption: "Lender pays the brokerage" },
                { k: "24h", v: "Pre-approval", caption: "From clean documents in hand" },
                { k: "BC", v: "Licensed broker", caption: "Greater Vancouver-based" },
              ].map((s) => (
                <li
                  key={s.v}
                  className="group relative rounded-2xl bg-white/85 backdrop-blur p-4 border border-cream-200 hover:border-coral-300 hover:shadow-soft transition-all"
                >
                  <span
                    aria-hidden
                    className="absolute top-3.5 right-3.5 h-1.5 w-1.5 rounded-full bg-coral-400 group-hover:scale-150 transition-transform"
                  />
                  <p className="font-display text-3xl md:text-4xl font-semibold text-emerald-900 leading-none">
                    {s.k}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink-500 mt-3 font-semibold font-sans">
                    {s.v}
                  </p>
                  <p className="text-[11px] text-ink-500 mt-1 leading-snug font-sans">{s.caption}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <BrokerCard />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section tone="cream" id="services">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">What I help with</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-emerald-950">
            Eight ways to fund the move you're trying to make.
          </h2>
          <p className="mt-4 text-ink-700">
            Every cluster below is a real workflow — purchase, renewal, refinance, investment, newcomer,
            specialty. Click any category to see the full list.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((cat) => (
            <Card key={cat.slug} href={`/mortgages/${cat.slug}`} className="h-full flex flex-col">
              <span className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">
                {cat.links.length} solutions
              </span>
              <p className="mt-2 font-display text-xl text-emerald-900 group-hover:text-coral-600 transition-colors">
                {cat.label}
              </p>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">{cat.blurb}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-900">
                Explore <span aria-hidden>→</span>
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* About strip */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden bg-cream-200">
              <Image
                src="/emelsenemoglu.jpg"
                alt={`Mortgage broker ${site.name} serving Greater Vancouver and across BC`}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">About Emel</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-emerald-950">
              A Vancouver mortgage broker who treats your file like it's her own.
            </h2>
            <p className="mt-5 text-ink-700 leading-relaxed">
              With years of experience guiding families across Greater Vancouver through purchases,
              renewals, refinances and investment files, I bring honest advice, careful underwriting,
              and a calm hand to one of the biggest financial decisions you'll ever make.
            </p>
            <p className="mt-3 text-ink-700 leading-relaxed">
              My clients are first-time buyers in Burnaby, self-employed founders in East Vancouver,
              physicians in Surrey, families relocating from Toronto, and newcomers settling in Richmond.
              The thread that ties them together: they want their mortgage to fit their life — not the
              other way around.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/about">More about Emel</Button>
              <Button href="/contact" variant="outline">Book a call</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Calculators */}
      <Section tone="cream">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">Free tools</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-emerald-950">
              Run the numbers before you call me.
            </h2>
          </div>
          <Link href="/calculators" className="text-sm font-medium text-emerald-900 hover:text-coral-600">
            See all calculators →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { slug: "mortgage-payment", label: "Mortgage Payment", blurb: "Calculate principal + interest for any rate, term and amortization." },
            { slug: "affordability", label: "Affordability Calculator", blurb: "How much home can you really afford on your household income?" },
            { slug: "land-transfer-tax", label: "BC Land Transfer Tax", blurb: "Estimate Property Transfer Tax for Vancouver and BC purchases." },
          ].map((c) => (
            <Card key={c.slug} href={`/calculators/${c.slug}`}>
              <p className="font-display text-xl text-emerald-900 group-hover:text-coral-600 transition-colors">
                {c.label}
              </p>
              <p className="mt-2 text-sm text-ink-600">{c.blurb}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-900">
                Open calculator <span aria-hidden>→</span>
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone="white">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">How it works</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-emerald-950">
            A clear path from "I'm thinking about it" to closing day.
          </h2>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {[
            { n: "01", t: "Discovery call", d: "A 20-minute, no-pressure conversation about your goals and timeline." },
            { n: "02", t: "Document review", d: "I tell you exactly what I need and what your file looks like to a lender." },
            { n: "03", t: "Lender shop", d: "I match you to the right lender(s) and negotiate the rate and structure." },
            { n: "04", t: "Closing", d: "I coordinate with your lawyer, realtor and lender so funding day is smooth." },
          ].map((s) => (
            <li key={s.n} className="relative">
              <span className="font-display text-5xl text-coral-300">{s.n}</span>
              <p className="mt-3 font-display text-xl text-emerald-900">{s.t}</p>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Lead form + FAQ */}
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">Frequently asked</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-emerald-950">
              Quick answers before we connect.
            </h2>
            <div className="mt-8">
              <Accordion items={homeFAQs} />
            </div>
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              heading="Let's start a conversation"
              subheading="Tell me a little about your goal. I'll respond within one business day."
            />
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
