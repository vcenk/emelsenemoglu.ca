import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allServiceSlugs, serviceCategories } from "@/lib/content/navigation";
import { calculatorOrder } from "@/lib/calculators/registry";
import { loadAllPosts } from "@/lib/content/loader";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/apply`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/calculators`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = serviceCategories.map((cat) => ({
    url: `${base}/mortgages/${cat.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const servicePages: MetadataRoute.Sitemap = allServiceSlugs().map(({ category, service }) => ({
    url: `${base}/mortgages/${category}/${service}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const calculatorPages: MetadataRoute.Sitemap = calculatorOrder.map((slug) => ({
    url: `${base}/calculators/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = loadAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...servicePages, ...calculatorPages, ...blogPages];
}
