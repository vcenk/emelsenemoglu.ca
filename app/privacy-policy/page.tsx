import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/seo/Hero";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}, mortgage broker.`,
  path: "/privacy-policy",
  noindex: false,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        intro={`Last updated: April 27, 2026. This page explains how ${site.name} collects, uses and protects your personal information.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <Section tone="white" size="sm">
        <div className="prose-custom max-w-prose">
          <h2>Information we collect</h2>
          <p>
            When you submit a contact, application, or consultation request, we collect the personal
            information you provide — including your name, email address, phone number, city, and any
            details you share about your mortgage goal. With your authorization, we also collect financial
            information (income, debts, credit) and identification documents required to underwrite a
            Canadian mortgage application.
          </p>
          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your inquiry and prepare a mortgage file on your behalf.</li>
            <li>To submit your application to lenders you authorize, in connection with a Canadian mortgage transaction.</li>
            <li>To communicate with you about your file by email, phone, text or video.</li>
            <li>To meet legal, tax, anti-money-laundering and FINTRAC obligations applicable to licensed mortgage brokers in British Columbia.</li>
          </ul>
          <h2>Sharing</h2>
          <p>
            We share your information only with parties required to advance your file, such as the
            specific lender(s), insurer(s), real-estate lawyer or notary, and appraiser involved in your
            transaction, and with our brokerage Powerhaus Mortgages — Dominion Lending Centres National
            Ltd. We do not sell, rent or trade your personal information.
          </p>
          <h2>Cookies and analytics</h2>
          <p>
            Our website uses minimal first-party cookies for navigation and form functionality, and may
            use privacy-respecting analytics (such as Google Analytics or Vercel Analytics) to understand
            aggregate traffic. You can disable cookies in your browser at any time.
          </p>
          <h2>Your rights</h2>
          <p>
            Under PIPEDA and BC's Personal Information Protection Act, you may request access to, or
            correction of, the personal information we hold about you, or withdraw your consent to its
            ongoing use. Email <a href={`mailto:${site.email}`}>{site.email}</a> with your request.
          </p>
          <h2>Contact</h2>
          <p>
            {site.name}, {site.brokerage}. Email: <a href={`mailto:${site.email}`}>{site.email}</a> ·
            Phone: <a href={site.phoneHref}>{site.phone}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
