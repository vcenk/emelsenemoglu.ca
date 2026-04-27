import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  noindex,
  ogImage,
  keywords,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
  const fullTitle =
    title === site.name ? `${site.name} — Greater Vancouver Mortgage Broker` : `${title} | ${site.name}`;

  // When ogImage is explicitly passed, override; otherwise let Next.js
  // auto-discover the dynamic /opengraph-image at the app root.
  const explicitImages = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }]
    : undefined;

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_CA",
      ...(explicitImages ? { images: explicitImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    authors: [{ name: site.name, url: site.url }],
    category: "finance",
  };
}

export const defaultKeywords = [
  "mortgage broker Vancouver",
  "Greater Vancouver mortgage broker",
  "BC mortgage broker",
  "Canada mortgage broker",
  "Emel Senemoglu",
  "Powerhaus Mortgages",
  "Dominion Lending Centres",
  "first time home buyer Vancouver",
  "mortgage renewal BC",
  "refinance Vancouver",
  "newcomer mortgage Canada",
  "investment property mortgage BC",
];
