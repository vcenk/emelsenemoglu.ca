import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CTABand } from "@/components/cta/CTABand";
import { PageHero } from "@/components/seo/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPostBySlug, loadAllPosts } from "@/lib/content/loader";
import { serviceSlugMap } from "@/lib/content/navigation";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return loadAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${slug}`,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${slug}`;
  const allPosts = loadAllPosts();
  const related = (post.relatedPosts ?? [])
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.metaDescription,
            url,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
          }),
          ...(post.faqs?.length ? [faqSchema(post.faqs)] : []),
        ]}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        intro={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <Section tone="white" size="sm">
        <article className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 prose-custom">
            <p className="text-xs text-ink-500">
              Published {new Date(post.publishedAt).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })} · {post.readingMinutes} min read
            </p>
            {post.body.map((block, i) => (
              <div key={i}>
                {block.heading && <h2>{block.heading}</h2>}
                {block.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
                {block.bullets && (
                  <ul>
                    {block.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
                {block.callout && (
                  <aside className="my-6 rounded-2xl border-l-4 border-coral-500 bg-cream-100 p-5 not-prose">
                    <p className="font-display text-lg text-emerald-900">{block.callout.title}</p>
                    <p className="mt-1 text-sm text-ink-700">{block.callout.text}</p>
                  </aside>
                )}
              </div>
            ))}

            {post.faqs && post.faqs.length > 0 && (
              <div className="not-prose mt-10">
                <h2 className="font-display text-2xl text-emerald-950 mb-5">FAQs</h2>
                <Accordion items={post.faqs} />
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-2xl bg-emerald-900 text-cream-100 p-6">
                <p className="font-display text-xl text-cream-50">Got questions about your situation?</p>
                <p className="mt-2 text-sm text-cream-100/80">
                  Send a quick note. Free 20-minute consultation across Greater Vancouver.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex rounded-full bg-coral-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-coral-600"
                >
                  Talk to Emel →
                </Link>
              </div>

              {post.relatedServices && post.relatedServices.length > 0 && (
                <div className="rounded-2xl bg-white border border-cream-200 p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">Related services</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {post.relatedServices.map((s) => {
                      const m = serviceSlugMap[s];
                      if (!m) return null;
                      return (
                        <li key={s}>
                          <Link href={`/mortgages/${m.category}/${s}`} className="text-emerald-900 hover:text-coral-600">
                            {m.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </article>
      </Section>

      {related.length > 0 && (
        <Section tone="cream">
          <h2 className="font-display text-2xl text-emerald-950 mb-6">Keep reading</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Card key={r.slug} href={`/blog/${r.slug}`}>
                <span className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">{r.category}</span>
                <p className="mt-2 font-display text-lg text-emerald-900 group-hover:text-coral-600">{r.title}</p>
                <p className="mt-2 text-sm text-ink-600">{r.excerpt}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <CTABand />
    </>
  );
}
