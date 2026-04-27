import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/seo/Hero";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${site.url}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Use"
        intro="Last updated: April 27, 2026."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />
      <Section tone="white" size="sm">
        <div className="prose-custom max-w-prose">
          <h2>Use of this website</h2>
          <p>
            This website is operated by {site.name} of {site.brokerage}. The content is provided for
            general informational purposes only and does not constitute mortgage, legal, tax or
            investment advice. Calculator outputs are estimates based on the assumptions stated and
            should not be relied on as a quote, approval or commitment to lend.
          </p>
          <h2>No agency</h2>
          <p>
            Reading this website does not create a broker-client relationship. A relationship is
            established only when you provide written authorization for {site.name} to act on your
            behalf in connection with a specific mortgage application.
          </p>
          <h2>Third-party links</h2>
          <p>
            Where we link to external websites (lenders, government resources, partner services), we do
            not endorse and are not responsible for the content, terms or privacy practices of those
            sites.
          </p>
          <h2>Intellectual property</h2>
          <p>
            All content on this site — including text, calculators, design and code — is the property of
            {` ${site.name}`} or its brokerage and may not be copied, reproduced or republished without
            written permission.
          </p>
          <h2>Changes</h2>
          <p>
            These terms may be updated from time to time. Continued use of the site after changes are
            posted constitutes acceptance of the revised terms.
          </p>
        </div>
      </Section>
    </>
  );
}
