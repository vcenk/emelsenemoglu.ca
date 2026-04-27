export type FAQ = { question: string; answer: string };

export type ServiceContent = {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  whoItsFor?: string[];
  requirements?: string[];
  process?: Array<{ step: string; detail: string }>;
  faqs: FAQ[];
  related?: string[];
  cta?: { title: string; description: string; buttonLabel: string };
  keywords?: string[];
};

export type CategoryContent = {
  slug: string;
  label: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: string;
  highlights?: Array<{ title: string; description: string }>;
  services: string[];
  faqs?: FAQ[];
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  body: Array<{
    heading?: string;
    paragraphs?: string[];
    bullets?: string[];
    callout?: { title: string; text: string };
  }>;
  faqs?: FAQ[];
  relatedPosts?: string[];
  relatedServices?: string[];
};

export type CalculatorContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  description: string[];
  faqs?: FAQ[];
  related?: string[];
};
