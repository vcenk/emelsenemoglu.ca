"use client";

import { useMemo, useState } from "react";
import { affordabilityMaxMortgage, qualifyingRate } from "@/lib/calculations/mortgage";

const cad = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

export function AffordabilityCalculator() {
  const [income, setIncome] = useState(140_000);
  const [debts, setDebts] = useState(450);
  const [tax, setTax] = useState(4500);
  const [heat, setHeat] = useState(120);
  const [condo, setCondo] = useState(0);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(4.99);
  const [amort, setAmort] = useState(25);

  const result = useMemo(
    () =>
      affordabilityMaxMortgage({
        annualHouseholdIncome: income,
        monthlyDebts: debts,
        annualPropertyTax: tax,
        monthlyHeating: heat,
        monthlyCondoFees: condo,
        contractRatePct: rate,
        amortYears: amort,
      }),
    [income, debts, tax, heat, condo, rate, amort],
  );

  const maxPrice = result.maxMortgage / (1 - downPct / 100);
  const stressRate = qualifyingRate(rate);

  return (
    <div className="rounded-3xl bg-white shadow-soft border border-cream-200 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="p-6 md:p-8 space-y-5 bg-cream-50">
          <h3 className="font-display text-xl text-emerald-900">Your situation</h3>
          <Field label="Household annual income"><input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className={inp} /></Field>
          <Field label="Monthly debt payments (cards, loans, support)"><input type="number" value={debts} onChange={(e) => setDebts(Number(e.target.value))} className={inp} /></Field>
          <Field label="Annual property tax (estimate)"><input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} className={inp} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Monthly heating"><input type="number" value={heat} onChange={(e) => setHeat(Number(e.target.value))} className={inp} /></Field>
            <Field label="Monthly condo fees"><input type="number" value={condo} onChange={(e) => setCondo(Number(e.target.value))} className={inp} /></Field>
          </div>
          <Field label={`Down payment (${downPct}%)`}>
            <input type="range" min={5} max={35} step={1} value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-emerald-700" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Contract rate (%)"><input type="number" step={0.01} value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inp} /></Field>
            <Field label="Amortization">
              <select value={amort} onChange={(e) => setAmort(Number(e.target.value))} className={inp}>
                {[20, 25, 30].map((y) => <option key={y} value={y}>{y} years</option>)}
              </select>
            </Field>
          </div>
        </div>
        <div className="p-6 md:p-8 bg-emerald-900 text-cream-100">
          <p className="text-xs uppercase tracking-[0.18em] text-coral-300 font-medium">Estimated max purchase price</p>
          <p className="mt-2 font-display text-4xl md:text-5xl text-cream-50">{cad(maxPrice)}</p>
          <p className="mt-1 text-cream-100/70 text-sm">at {downPct}% down — stress-tested</p>

          <dl className="mt-8 grid gap-4 text-sm">
            <Stat k="Maximum mortgage" v={cad(result.maxMortgage)} />
            <Stat k="Maximum monthly housing payment" v={cad(result.maxPayment)} />
            <Stat k="Limited by" v={result.usingRule === "GDS" ? "Gross Debt Service ratio (39%)" : "Total Debt Service ratio (44%)"} />
            <Stat k="Stress-test qualifying rate" v={`${stressRate.toFixed(2)}%`} />
          </dl>

          <p className="mt-8 text-xs text-cream-100/60 leading-relaxed">
            Federally regulated lenders qualify you at the greater of your contract rate + 2% or 5.25%.
            Lender-specific GDS/TDS limits apply (insured: 39/44, conventional: up to 39/44, alt-A higher).
            <a href="/apply" className="underline hover:text-cream-50 ml-1">Get a real pre-approval →</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const inp = "w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-ink-800 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<label className="block"><span className="block text-sm font-medium text-ink-700 mb-1.5">{label}</span>{children}</label>);
}
function Stat({ k, v }: { k: string; v: string }) {
  return (<div className="flex justify-between gap-4 border-b border-cream-100/15 pb-3"><dt className="text-cream-100/70">{k}</dt><dd className="font-medium text-cream-50 text-right">{v}</dd></div>);
}
