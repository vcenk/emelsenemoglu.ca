import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/cta/CTABand";
import { PageHero } from "@/components/seo/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { loadAllPosts } from "@/lib/content/loader";

export const metadata = buildMetadata({
  title: "Mortgage Blog — Greater Vancouver & Canada",
  description:
    "Plain-English guides on Canadian mortgages: BC first-time buyer programs, renewals, refinancing, stress test, self-employed, newcomer and Vancouver real estate financing.",
  path: "/blog",
  keywords: [
    "Vancouver mortgage blog",
    "BC mortgage guide",
    "Canadian mortgage advice",
    "first time home buyer BC",
    "mortgage renewal Canada",
    "stress test 2026",
  ],
});

export default function BlogIndex() {
  const posts = loadAllPosts();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }])} />
      <PageHero
        eyebrow="Mortgage blog"
        title="Plain-English guides on Canadian mortgages."
        intro="No fluff and no clickbait — just the explanations I wish my clients had before their first call."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <Section tone="cream">
        {posts.length === 0 ? (
          <p className="text-ink-600">Posts publishing soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Card key={p.slug} href={`/blog/${p.slug}`} className="h-full flex flex-col">
                <span className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">
                  {p.category}
                </span>
                <p className="mt-2 font-display text-xl text-emerald-900 group-hover:text-coral-600 transition-colors">
                  {p.title}
                </p>
                <p className="mt-2 text-sm text-ink-600 flex-1">{p.excerpt}</p>
                <p className="mt-5 text-xs text-ink-500">
                  {new Date(p.publishedAt).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })} · {p.readingMinutes} min read
                </p>
              </Card>
            ))}
          </div>
        )}
      </Section>
      <CTABand />
    </>
  );
}
