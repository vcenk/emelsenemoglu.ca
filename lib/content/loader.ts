import fs from "node:fs";
import path from "node:path";
import type { BlogPost, CalculatorContent, CategoryContent, ServiceContent } from "./types";
import { allServiceSlugs, serviceCategories, serviceSlugMap } from "./navigation";

const ROOT = path.join(process.cwd(), "lib", "content");

function readJson<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

let serviceCache: ServiceContent[] | null = null;
let categoryCache: CategoryContent[] | null = null;
let blogCache: BlogPost[] | null = null;
let calculatorCache: CalculatorContent[] | null = null;

export function loadAllServices(): ServiceContent[] {
  if (serviceCache) return serviceCache;
  const services: ServiceContent[] = [];
  for (const { category, service } of allServiceSlugs()) {
    const file = path.join(ROOT, "services", category, `${service}.json`);
    const data = readJson<ServiceContent>(file);
    if (data) services.push(data);
  }
  serviceCache = services;
  return services;
}

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return loadAllServices().find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): ServiceContent[] {
  return loadAllServices().filter((s) => s.category === category);
}

export function loadAllCategories(): CategoryContent[] {
  if (categoryCache) return categoryCache;
  const categories: CategoryContent[] = [];
  for (const cat of serviceCategories) {
    const file = path.join(ROOT, "categories", `${cat.slug}.json`);
    const data = readJson<CategoryContent>(file);
    if (data) categories.push(data);
  }
  categoryCache = categories;
  return categories;
}

export function getCategoryContent(slug: string): CategoryContent | undefined {
  return loadAllCategories().find((c) => c.slug === slug);
}

export function loadAllPosts(): BlogPost[] {
  if (blogCache) return blogCache;
  const dir = path.join(ROOT, "blog");
  if (!fs.existsSync(dir)) {
    blogCache = [];
    return [];
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const posts: BlogPost[] = [];
  for (const f of files) {
    const data = readJson<BlogPost>(path.join(dir, f));
    if (data) posts.push(data);
  }
  posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  blogCache = posts;
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return loadAllPosts().find((p) => p.slug === slug);
}

export function loadAllCalculators(): CalculatorContent[] {
  if (calculatorCache) return calculatorCache;
  const dir = path.join(ROOT, "calculators");
  if (!fs.existsSync(dir)) {
    calculatorCache = [];
    return [];
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const items: CalculatorContent[] = [];
  for (const f of files) {
    const data = readJson<CalculatorContent>(path.join(dir, f));
    if (data) items.push(data);
  }
  calculatorCache = items;
  return items;
}

export function getCalculatorBySlug(slug: string): CalculatorContent | undefined {
  return loadAllCalculators().find((c) => c.slug === slug);
}

export { serviceCategories, serviceSlugMap };
