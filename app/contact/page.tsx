import { Section } from "@/components/ui/Section";
import { CTABand } from "@/components/cta/CTABand";
import { LeadForm } from "@/components/forms/LeadForm";
import { BrokerCard } from "@/components/brand/BrokerCard";
import { PageHero } from "@/components/seo/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact a Greater Vancouver Mortgage Broker",
  description:
    "Contact Emel Senemoglu — Greater Vancouver mortgage broker. Free 20-minute consultation by phone, email or video. Serving Vancouver, Burnaby, Surrey, Richmond, Coquitlam and across BC.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        title="Let's talk through your mortgage."
        intro="Free, no-obligation 20-minute consultation. Phone, email, video — whatever's easiest."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <BrokerCard variant="row" showCTA={false} />
            <div className="rounded-2xl bg-white border border-cream-200 p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">Direct</p>
                <p className="mt-1 font-display text-lg text-emerald-900">
                  <a href={site.phoneHref}>{site.phone}</a>
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">Email</p>
                <p className="mt-1 font-display text-lg text-emerald-900 break-all">
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">Service area</p>
                <p className="mt-1 text-ink-700 text-sm">
                  Greater Vancouver and across British Columbia in person; fully digital service for clients
                  anywhere in Canada.
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {site.serviceArea.map((c) => (
                    <li key={c} className="rounded-full bg-cream-100 px-2.5 py-1 text-xs text-ink-700">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">Hours</p>
                <p className="mt-1 text-sm text-ink-700">Mon–Fri 9:00–18:00 · Sat 10:00–16:00 PT</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <LeadForm heading="Send a message" subheading="I read every message and reply within one business day." />
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
