import { site } from "@/lib/site";

export function brokerPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.brokerTitle,
    description: `Greater Vancouver mortgage broker with ${site.yearsExperience}+ years of experience in the Canadian finance industry — recognized as a top performer in banking before transitioning to brokerage. Expertise across mortgages, lending, investments and overall financial planning.`,
    worksFor: {
      "@type": "FinancialService",
      name: site.brokerage,
    },
    telephone: site.phone,
    email: site.email,
    url: site.url,
    image: `${site.url}/emelsenemoglu.jpg`,
    areaServed: site.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "AdministrativeArea", name: "British Columbia, Canada" },
    })),
    knowsLanguage: ["English", "Turkish"],
    knowsAbout: [
      "Mortgage brokerage",
      "Residential mortgages",
      "Mortgage refinancing",
      "Home equity lines of credit",
      "Investment property financing",
      "Personal lending",
      "Investments",
      "Financial planning",
      "First-time home buyers",
      "Mortgage renewals",
      "Newcomer to Canada mortgage programs",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: `${site.license.authority} Mortgage Broker Registration`,
      identifier: site.license.number,
      validFrom: site.license.effectiveDate,
      recognizedBy: {
        "@type": "Organization",
        name: site.license.authorityFull,
      },
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MortgageBroker",
    "@id": `${site.url}#broker`,
    name: `${site.name} — ${site.shortBrokerage}`,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/emelsenemoglu.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressRegion: "BC",
      addressCountry: "CA",
      addressLocality: "Vancouver",
    },
    areaServed: site.serviceArea,
    contactPoint: site.emails.map((address) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone,
      email: address,
      areaServed: "CA",
      availableLanguage: ["English", "Turkish"],
    })),
    identifier: {
      "@type": "PropertyValue",
      propertyID: `${site.license.authority} ${site.license.type}`,
      value: site.license.number,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: `${site.license.authority} Mortgage Broker Registration`,
      identifier: site.license.number,
      validFrom: site.license.effectiveDate,
      recognizedBy: {
        "@type": "Organization",
        name: site.license.authorityFull,
        url: site.license.portalUrl,
      },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${site.url}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ?? `${site.url}/opengraph-image`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.brokerage,
      logo: { "@type": "ImageObject", url: `${site.url}/logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  };
}

export function serviceSchema(input: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mortgage Brokerage",
    name: input.name,
    description: input.description,
    url: input.url,
    areaServed: site.serviceArea,
    provider: { "@type": "MortgageBroker", name: site.name, url: site.url },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en-CA",
    publisher: { "@type": "Organization", name: site.brokerage },
  };
}
