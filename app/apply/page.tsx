import { Section } from "@/components/ui/Section";
import { CTABand } from "@/components/cta/CTABand";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/seo/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Start Your Mortgage Application",
  description:
    "Start your mortgage application with Emel Senemoglu, Greater Vancouver mortgage broker. Free pre-approval, no hard credit pull until you're ready, and 40+ Canadian lenders shopped on your behalf.",
  path: "/apply",
});

const steps = [
  { t: "Tell me your goal", d: "Five-minute form below — no documents required at this stage." },
  { t: "I review your file", d: "Within one business day, I'll send you a clear list of what's needed and what you likely qualify for." },
  { t: "We submit to lenders", d: "I shop your file across 40+ lenders and bring you the strongest option(s) to review." },
  { t: "You sign, we close", d: "I coordinate with your lawyer, lender and realtor through funding and beyond." },
];

export default function ApplyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Apply", url: "/apply" }])} />
      <PageHero
        eyebrow="Apply"
        title="Start your mortgage with a 5-minute form."
        intro="No hard credit pull until you give the green light. Your information stays with me and is never sold or shared."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Apply" }]}
      />

      <Section tone="white" size="sm">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-coral-600 font-medium">What happens next</p>
            <h2 className="mt-3 font-display text-3xl text-emerald-950">A clear path to closing.</h2>
            <ol className="mt-8 space-y-6">
              {steps.map((s, i) => (
                <li key={s.t} className="flex gap-5">
                  <span className="font-display text-3xl text-coral-500 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-lg text-emerald-900">{s.t}</p>
                    <p className="mt-1 text-sm text-ink-600">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-2xl bg-emerald-900/5 border border-emerald-900/10 p-5 text-sm text-ink-700">
              <p><strong className="text-emerald-900">Privacy:</strong> Your data is used only to prepare your mortgage file. It is never shared with third parties without your explicit consent.</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <LeadForm variant="apply" heading="Tell me about your goal" subheading="Anything you don't know — just leave blank. I'll fill in the gaps with you." />
          </div>
        </div>
      </Section>

      <CTABand title="Prefer to talk first?" subtitle="Book a 20-minute discovery call before submitting anything." primaryHref="/contact" primaryLabel="Book a Call" />
    </>
  );
}
