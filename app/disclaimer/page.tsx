import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/seo/Hero";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: `Mortgage and rate disclaimer for ${site.name}.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        title="Disclaimer"
        intro="Important information about mortgage rates, calculators and content on this website."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]}
      />
      <Section tone="white" size="sm">
        <div className="prose-custom max-w-prose">
          <h2>Rates are not commitments</h2>
          <p>
            Any mortgage rates, payments, savings or pre-qualification figures shown on this website are
            <strong> illustrative only</strong>. Actual rates and approvals depend on the lender, the
            applicant's credit, income, down payment, property and the prevailing market — all subject to
            change without notice. A binding rate is established only by a written commitment from a
            lender after a complete application, credit review and underwriting.
          </p>
          <h2>Calculator outputs are estimates</h2>
          <p>
            Calculator results assume Canadian semi-annual compounding and use simplified inputs. They
            do not account for every fee, tax, insurance premium, lender-specific qualifying rule, or
            jurisdictional rule that may apply to your file. Use them for planning only.
          </p>
          <h2>Not legal, tax or investment advice</h2>
          <p>
            Content on this website is general in nature and is not a substitute for advice from a
            qualified lawyer, accountant or licensed financial advisor. Always confirm tax and legal
            implications of a mortgage decision with the appropriate professional.
          </p>
          <h2>Licensing</h2>
          <p>{site.licenseDisclaimer}</p>
        </div>
      </Section>
    </>
  );
}
