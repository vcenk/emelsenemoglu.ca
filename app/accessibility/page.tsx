import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/seo/Hero";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Accessibility",
  description: "Our commitment to keeping this site accessible for everyone.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        title="Accessibility statement"
        intro="We're committed to making this website usable for everyone, including people with disabilities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
      />
      <Section tone="white" size="sm">
        <div className="prose-custom max-w-prose">
          <h2>Our standards</h2>
          <p>
            We aim to align with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. This
            includes meaningful alt text on images, sufficient colour contrast, keyboard-navigable
            menus, descriptive link text, and form fields with associated labels.
          </p>
          <h2>What we've done</h2>
          <ul>
            <li>Skip-to-content link on every page.</li>
            <li>Logical heading hierarchy and semantic HTML landmarks.</li>
            <li>Visible focus styles for keyboard users.</li>
            <li>Form fields with explicit labels and clear validation.</li>
          </ul>
          <h2>Tell us if something isn't working</h2>
          <p>
            If you encounter an accessibility barrier on this site, please email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> and we will work to fix it. Your feedback
            helps us improve.
          </p>
        </div>
      </Section>
    </>
  );
}
