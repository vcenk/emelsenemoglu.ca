"use client";

import { useMemo, useState } from "react";
import { paymentForFrequency } from "@/lib/calculations/mortgage";

const cad = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

export function RefinanceCalculator() {
  const [balance, setBalance] = useState(620_000);
  const [oldRate, setOldRate] = useState(5.69);
  const [newRate, setNewRate] = useState(4.39);
  const [amort, setAmort] = useState(25);
  const [penalty, setPenalty] = useState(11_000);
  const [legal, setLegal] = useState(1_400);
  const [appraisal, setAppraisal] = useState(400);

  const { oldPay, newPay, monthlySavings, costs, breakeven, fiveYearNet } = useMemo(() => {
    const a = paymentForFrequency(balance, oldRate, amort, "monthly");
    const b = paymentForFrequency(balance, newRate, amort, "monthly");
    const c = penalty + legal + appraisal;
    const sav = a - b;
    const months = sav > 0 ? c / sav : Infinity;
    const fiveYearGross = sav * 60;
    return {
      oldPay: a,
      newPay: b,
      monthlySavings: sav,
      costs: c,
      breakeven: months,
      fiveYearNet: fiveYearGross - c,
    };
  }, [balance, oldRate, newRate, amort, penalty, legal, appraisal]);

  return (
    <div className="rounded-3xl bg-white shadow-soft border border-cream-200 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="p-6 md:p-8 space-y-5 bg-cream-50">
          <h3 className="font-display text-xl text-emerald-900">Refinance scenario</h3>
          <Field label="Current mortgage balance (CAD)"><input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} className={inp} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Current rate (%)"><input type="number" step={0.01} value={oldRate} onChange={(e) => setOldRate(Number(e.target.value))} className={inp} /></Field>
            <Field label="New rate (%)"><input type="number" step={0.01} value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} className={inp} /></Field>
          </div>
          <Field label="Remaining amortization (years)">
            <select value={amort} onChange={(e) => setAmort(Number(e.target.value))} className={inp}>
              {[10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} years</option>)}
            </select>
          </Field>
          <Field label="Estimated prepayment penalty (CAD)"><input type="number" value={penalty} onChange={(e) => setPenalty(Number(e.target.value))} className={inp} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Legal fees"><input type="number" value={legal} onChange={(e) => setLegal(Number(e.target.value))} className={inp} /></Field>
            <Field label="Appraisal"><input type="number" value={appraisal} onChange={(e) => setAppraisal(Number(e.target.value))} className={inp} /></Field>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-emerald-900 text-cream-100">
          <p className="text-xs uppercase tracking-[0.18em] text-coral-300 font-medium">Net 5-year savings</p>
          <p className="mt-2 font-display text-4xl md:text-5xl text-cream-50">{cad(fiveYearNet)}</p>
          <p className="mt-1 text-cream-100/70 text-sm">after costs of {cad(costs)}</p>

          <dl className="mt-8 grid gap-4 text-sm">
            <Stat k="Old monthly payment" v={cad(oldPay)} />
            <Stat k="New monthly payment" v={cad(newPay)} />
            <Stat k="Monthly cash-flow savings" v={cad(monthlySavings)} />
            <Stat k="Months to break even" v={isFinite(breakeven) ? `${breakeven.toFixed(1)} months` : "—"} />
          </dl>

          <p className="mt-8 text-xs text-cream-100/60 leading-relaxed">
            Refinancing only makes sense if the savings clearly beat the costs and you'll stay in the
            mortgage long enough to recover. <a href="/mortgages/refinance-equity/refinancing-your-home" className="underline hover:text-cream-50">When refinancing makes sense →</a>
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
  return (<div className="flex justify-between gap-4 border-b border-cream-100/15 pb-3"><dt className="text-cream-100/70">{k}</dt><dd className="font-medium text-cream-50">{v}</dd></div>);
}
