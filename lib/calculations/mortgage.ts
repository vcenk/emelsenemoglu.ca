// Canadian mortgages compound semi-annually but pay monthly. We use the
// effective monthly rate derived from the semi-annual nominal rate.

export function canadianMonthlyRate(annualRatePct: number): number {
  const r = annualRatePct / 100;
  // (1 + r/2)^(2/12) - 1
  return Math.pow(1 + r / 2, 2 / 12) - 1;
}

export function paymentForFrequency(
  principal: number,
  annualRatePct: number,
  amortYears: number,
  frequency: "monthly" | "biweekly" | "weekly" | "accelerated-biweekly" | "accelerated-weekly" = "monthly",
): number {
  if (principal <= 0 || amortYears <= 0) return 0;
  const monthly = canadianMonthlyRate(annualRatePct);
  const nMonths = amortYears * 12;
  const monthlyPayment =
    monthly === 0 ? principal / nMonths : (principal * monthly) / (1 - Math.pow(1 + monthly, -nMonths));

  switch (frequency) {
    case "monthly":
      return monthlyPayment;
    case "biweekly":
      return (monthlyPayment * 12) / 26;
    case "weekly":
      return (monthlyPayment * 12) / 52;
    case "accelerated-biweekly":
      return monthlyPayment / 2;
    case "accelerated-weekly":
      return monthlyPayment / 4;
  }
}

export function amortizationSchedule(
  principal: number,
  annualRatePct: number,
  amortYears: number,
): Array<{ year: number; balance: number; principalPaid: number; interestPaid: number }> {
  const monthly = canadianMonthlyRate(annualRatePct);
  const payment = paymentForFrequency(principal, annualRatePct, amortYears, "monthly");
  let balance = principal;
  const out: Array<{ year: number; balance: number; principalPaid: number; interestPaid: number }> = [];
  for (let y = 1; y <= amortYears; y++) {
    let principalPaid = 0;
    let interestPaid = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * monthly;
      const principalPart = payment - interest;
      balance -= principalPart;
      principalPaid += principalPart;
      interestPaid += interest;
    }
    out.push({ year: y, balance: Math.max(balance, 0), principalPaid, interestPaid });
  }
  return out;
}

// CMHC mortgage default insurance premiums (as % of mortgage principal)
// Source: CMHC standard purchase tier (subject to change — broker confirms)
export function cmhcPremiumRate(loanToValuePct: number): number {
  if (loanToValuePct <= 65) return 0.6;
  if (loanToValuePct <= 75) return 1.7;
  if (loanToValuePct <= 80) return 2.4;
  if (loanToValuePct <= 85) return 2.8;
  if (loanToValuePct <= 90) return 3.1;
  if (loanToValuePct <= 95) return 4.0;
  return 0;
}

// BC Property Transfer Tax — General property
// 1% on first $200,000; 2% on $200,000-$2,000,000; 3% on $2M-$3M; 5% on portion above $3M (residential)
export function bcPropertyTransferTax(price: number): number {
  if (price <= 0) return 0;
  let tax = 0;
  const tiers = [
    { upTo: 200_000, rate: 0.01 },
    { upTo: 2_000_000, rate: 0.02 },
    { upTo: 3_000_000, rate: 0.03 },
    { upTo: Infinity, rate: 0.05 },
  ];
  let prev = 0;
  for (const t of tiers) {
    const slice = Math.max(0, Math.min(price, t.upTo) - prev);
    tax += slice * t.rate;
    prev = t.upTo;
    if (price <= t.upTo) break;
  }
  return tax;
}

// BC First-time home buyer PTT exemption (full exemption up to $500k, partial up to $835k as of 2026)
export function bcFirstTimeBuyerExemption(price: number, ptt: number): number {
  if (price <= 500_000) return ptt;
  if (price < 835_000) {
    // partial exemption phasing out linearly
    const factor = (835_000 - price) / 335_000;
    return Math.max(0, ptt * factor);
  }
  return 0;
}

// Stress test qualifying rate — greater of contract+2% or 5.25% (OSFI floor)
export function qualifyingRate(contractRatePct: number): number {
  return Math.max(contractRatePct + 2, 5.25);
}

// Maximum mortgage based on GDS (typically 39%) and TDS (typically 44%)
export function affordabilityMaxMortgage(input: {
  annualHouseholdIncome: number;
  monthlyDebts: number;
  annualPropertyTax: number;
  monthlyHeating: number;
  monthlyCondoFees?: number;
  contractRatePct: number;
  amortYears: number;
  gdsLimit?: number;
  tdsLimit?: number;
}): { maxMortgage: number; maxPayment: number; usingRule: "GDS" | "TDS" } {
  const gds = input.gdsLimit ?? 0.39;
  const tds = input.tdsLimit ?? 0.44;
  const monthlyIncome = input.annualHouseholdIncome / 12;
  const monthlyTax = input.annualPropertyTax / 12;
  const condoHalf = (input.monthlyCondoFees ?? 0) * 0.5;

  const gdsBudget = monthlyIncome * gds - monthlyTax - input.monthlyHeating - condoHalf;
  const tdsBudget = monthlyIncome * tds - monthlyTax - input.monthlyHeating - condoHalf - input.monthlyDebts;

  const allowable = Math.max(0, Math.min(gdsBudget, tdsBudget));
  const usingRule = gdsBudget < tdsBudget ? "GDS" : "TDS";

  const qual = qualifyingRate(input.contractRatePct);
  const monthly = canadianMonthlyRate(qual);
  const n = input.amortYears * 12;
  const maxMortgage = monthly === 0 ? allowable * n : (allowable * (1 - Math.pow(1 + monthly, -n))) / monthly;
  return { maxMortgage: Math.max(0, maxMortgage), maxPayment: allowable, usingRule };
}
