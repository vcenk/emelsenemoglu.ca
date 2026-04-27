export type NavLink = { slug: string; label: string; description?: string };
export type NavCategory = {
  slug: string;
  label: string;
  blurb: string;
  links: NavLink[];
};

export const serviceCategories: NavCategory[] = [
  {
    slug: "home-buying",
    label: "Home Buying",
    blurb: "Plan, qualify, and finance your purchase across Greater Vancouver.",
    links: [
      { slug: "first-time-home-buyers", label: "First-Time Home Buyers", description: "Programs, incentives and step-by-step guidance for your first BC purchase." },
      { slug: "pre-approval", label: "Mortgage Pre-Approval", description: "Lock a rate and shop with a real budget in hand." },
      { slug: "pre-qualify", label: "Pre-Qualify in Minutes", description: "A quick read on what you can afford before you apply." },
      { slug: "buying-your-next-home", label: "Buying Your Next Home", description: "Move up, downsize, or relocate without the guesswork." },
      { slug: "homeownership-journey", label: "Your Homeownership Journey", description: "An end-to-end overview from offer to closing in BC." },
    ],
  },
  {
    slug: "renewals-transfers",
    label: "Renewals & Transfers",
    blurb: "Don't auto-sign. Re-shop your mortgage and keep more of your money.",
    links: [
      { slug: "mortgage-renewals", label: "Mortgage Renewals", description: "Why renewing with the same lender often costs you thousands." },
      { slug: "early-renewals", label: "Early Renewals", description: "When breaking early actually saves you money." },
      { slug: "transfers-and-switches", label: "Transfers & Switches", description: "Move your mortgage to a better lender with no penalty in many cases." },
      { slug: "renewal-benefits", label: "Renewal Benefits", description: "What you can renegotiate beyond the rate." },
      { slug: "renewing-your-mortgage", label: "Renewing Your Mortgage", description: "A 90-day playbook before your term ends." },
    ],
  },
  {
    slug: "refinance-equity",
    label: "Refinance & Equity Access",
    blurb: "Use your home's equity to consolidate, renovate, invest or free up cash.",
    links: [
      { slug: "refinancing-your-home", label: "Refinancing Your Home", description: "Restructure your mortgage to lower payments or unlock cash." },
      { slug: "home-equity-line-of-credit", label: "Home Equity Line of Credit (HELOC)", description: "Flexible access to up to 65–80% of your home's value." },
      { slug: "purchase-plus-improvements", label: "Purchase Plus Improvements", description: "Buy and renovate with one mortgage." },
      { slug: "equity-based-mortgages", label: "Equity-Based Mortgages", description: "When equity matters more than income on your application." },
      { slug: "bridge-financing", label: "Bridge Financing", description: "Buy your next home before the old one closes." },
    ],
  },
  {
    slug: "by-profession",
    label: "Mortgage By Profession",
    blurb: "Specialized programs for non-traditional incomes and high-earning careers.",
    links: [
      { slug: "self-employed", label: "Self-Employed Mortgage", description: "Stated-income, BFS and alt-A solutions across Canada." },
      { slug: "medical-professionals", label: "Medical Professionals", description: "Resident, fellow and physician mortgages with flexible underwriting." },
      { slug: "sports-professionals", label: "Sports Professionals", description: "Income recognition for athletes with variable contracts." },
    ],
  },
  {
    slug: "newcomers",
    label: "Newcomers & Non-Residents",
    blurb: "Buying in Canada from abroad or as a new permanent resident.",
    links: [
      { slug: "new-to-canada", label: "New to Canada", description: "Programs for permanent residents and work permit holders." },
      { slug: "newcomers-to-canada", label: "Newcomers to Canada", description: "How to qualify in your first 5 years in Canada." },
      { slug: "international-home-purchases", label: "International Home Purchases", description: "Foreign-currency-friendly mortgages on Canadian real estate." },
      { slug: "non-resident-mortgage", label: "Non-Resident Mortgage", description: "Down payment, tax and structure rules for non-residents." },
    ],
  },
  {
    slug: "investment-vacation",
    label: "Investment & Vacation",
    blurb: "Build a real-estate portfolio or finance your second property in BC.",
    links: [
      { slug: "investment-properties", label: "Investment Properties", description: "Rental purchase financing with up to 80% LTV." },
      { slug: "vacation-secondary-homes", label: "Vacation & Secondary Homes", description: "Whistler, Sunshine Coast, Okanagan and beyond." },
      { slug: "second-and-third-mortgages", label: "Second & Third Mortgages", description: "Equity take-out without breaking your first mortgage." },
      { slug: "second-property", label: "Second Property", description: "Family help, co-ownership and 5% down second homes." },
    ],
  },
  {
    slug: "construction-commercial",
    label: "Construction & Commercial",
    blurb: "Build, develop, and finance commercial real estate.",
    links: [
      { slug: "new-build-mortgages", label: "New Build Mortgages", description: "Pre-sale financing for Vancouver, Burnaby and Surrey condos." },
      { slug: "construction-mortgage", label: "Construction Mortgage", description: "Draw schedules, completion mortgages and self-builds." },
      { slug: "commercial-mortgage", label: "Commercial Mortgage", description: "Multi-family, mixed-use, retail, office and industrial." },
    ],
  },
  {
    slug: "other-programs",
    label: "Other Programs",
    blurb: "Specialty mortgage solutions when standard programs don't fit.",
    links: [
      { slug: "cash-back-mortgages", label: "Cash-Back Mortgages", description: "Lender cash incentives at funding — and when they make sense." },
      { slug: "bad-credit-mortgage", label: "Bad-Credit Mortgage", description: "Bruised-credit and rebuild-credit programs." },
      { slug: "no-commitment-mortgage", label: "The No-Commitment Mortgage", description: "Fully open mortgages for short holding periods." },
      { slug: "pre-sales", label: "Pre-Sales", description: "Financing assignments and new pre-construction in BC." },
      { slug: "special-programs", label: "Special Programs", description: "Family-gift, co-signor, and lender-specific niche products." },
      { slug: "leasing", label: "Leasing", description: "Equipment, vehicle and commercial leasing referrals." },
      { slug: "chip-reverse-mortgage", label: "CHIP Reverse Mortgage", description: "HomeEquity Bank reverse mortgages for ages 55+." },
      { slug: "reverse-mortgage", label: "Reverse Mortgage", description: "Tax-free home equity income with no monthly payments." },
      { slug: "prepayment-penalties", label: "Pre-Payment Penalties & Privileges", description: "How IRD and 3-month interest penalties really work." },
      { slug: "complex-mortgage-solutions", label: "Complex Mortgage Solutions", description: "Tailored structures for multi-property and high-net-worth clients." },
    ],
  },
];

export const serviceSlugMap: Record<string, { category: string; categoryLabel: string; label: string; description?: string }> = (() => {
  const map: Record<string, { category: string; categoryLabel: string; label: string; description?: string }> = {};
  for (const cat of serviceCategories) {
    for (const link of cat.links) {
      map[link.slug] = {
        category: cat.slug,
        categoryLabel: cat.label,
        label: link.label,
        description: link.description,
      };
    }
  }
  return map;
})();

export function getCategoryBySlug(slug: string): NavCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

export function allServiceSlugs(): Array<{ category: string; service: string }> {
  return serviceCategories.flatMap((c) => c.links.map((l) => ({ category: c.slug, service: l.slug })));
}
