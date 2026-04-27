"use client";

import { useMemo, useState } from "react";
import { paymentForFrequency, amortizationSchedule } from "@/lib/calculations/mortgage";

const formatCAD = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);
const formatCAD2 = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 2 }).format(n);

export function MortgagePaymentCalculator() {
  const [price, setPrice] = useState(950_000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(4.99);
  const [amort, setAmort] = useState(25);
  const [term, setTerm] = useState(5);
  const [frequency, setFrequency] = useState<"monthly" | "biweekly" | "accelerated-biweekly">("monthly");

  const { mortgage, payment, schedule, totalInterest, balanceAtTermEnd } = useMemo(() => {
    const dp = price * (downPct / 100);
    const m = Math.max(0, price - dp);
    const p = paymentForFrequency(m, rate, amort, frequency);
    const sched = amortizationSchedule(m, rate, amort);
    const totalI = sched.reduce((s, y) => s + y.interestPaid, 0);
    const balEnd = sched[Math.min(term, amort) - 1]?.balance ?? 0;
    return { mortgage: m, payment: p, schedule: sched, totalInterest: totalI, balanceAtTermEnd: balEnd };
  }, [price, downPct, rate, amort, term, frequency]);

  return (
    <div className="rounded-3xl bg-white shadow-soft border border-cream-200 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="p-6 md:p-8 space-y-5 bg-cream-50">
          <h3 className="font-display text-xl text-emerald-900">Inputs</h3>
          <Field label="Home price (CAD)">
            <input type="number" min={0} step={1000} value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inp} />
          </Field>
          <Field label={`Down payment (${downPct}%)`}>
            <input type="range" min={5} max={50} step={1} value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-emerald-700" />
            <p className="text-xs text-ink-500 mt-1">{formatCAD(price * (downPct / 100))} down · {formatCAD(price - price * (downPct / 100))} mortgage</p>
          </Field>
          <Field label="Interest rate (%)">
            <input type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inp} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Amortization (years)">
              <select value={amort} onChange={(e) => setAmort(Number(e.target.value))} className={inp}>
                {[15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} years</option>)}
              </select>
            </Field>
            <Field label="Term (years)">
              <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className={inp}>
                {[1, 2, 3, 4, 5, 7, 10].map((y) => <option key={y} value={y}>{y} years</option>)}
              </select>
            </Field>
          </div>
          <Field label="Payment frequency">
            <select value={frequency} onChange={(e) => setFrequency(e.target.value as typeof frequency)} className={inp}>
              <option value="monthly">Monthly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="accelerated-biweekly">Accelerated bi-weekly</option>
            </select>
          </Field>
        </div>

        <div className="p-6 md:p-8 bg-emerald-900 text-cream-100">
          <p className="text-xs uppercase tracking-[0.18em] text-coral-300 font-medium">Estimated payment</p>
          <p className="mt-2 font-display text-4xl md:text-5xl text-cream-50">{formatCAD2(payment)}</p>
          <p className="mt-1 text-cream-100/70 text-sm">per {frequency.includes("biweekly") ? "two weeks" : "month"}</p>

          <dl className="mt-8 grid gap-4 text-sm">
            <Stat k="Mortgage amount" v={formatCAD(mortgage)} />
            <Stat k={`Balance after ${term}-yr term`} v={formatCAD(balanceAtTermEnd)} />
            <Stat k="Total interest over amortization" v={formatCAD(totalInterest)} />
          </dl>

          <p className="mt-8 text-xs text-cream-100/60 leading-relaxed">
            Estimates only — assumes Canadian semi-annual compounding and a constant rate. Actual rates,
            qualification and stress-test rules vary by lender and applicant. <a href="/contact" className="underline hover:text-cream-50">Talk to Emel</a> for a real quote.
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 border-t border-cream-200">
        <p className="text-xs uppercase tracking-[0.18em] text-coral-600 font-medium">Year-by-year breakdown</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-500 border-b border-cream-200">
                <th className="py-2 pr-4">Year</th>
                <th className="py-2 pr-4">Principal paid</th>
                <th className="py-2 pr-4">Interest paid</th>
                <th className="py-2 pr-4">Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.slice(0, 10).map((y) => (
                <tr key={y.year} className="border-b border-cream-100">
                  <td className="py-2 pr-4 text-ink-700">{y.year}</td>
                  <td className="py-2 pr-4 text-ink-700">{formatCAD(y.principalPaid)}</td>
                  <td className="py-2 pr-4 text-coral-700">{formatCAD(y.interestPaid)}</td>
                  <td className="py-2 pr-4 font-medium text-emerald-900">{formatCAD(y.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const inp = "w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-ink-800 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-700 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-cream-100/15 pb-3">
      <dt className="text-cream-100/70">{k}</dt>
      <dd className="font-medium text-cream-50">{v}</dd>
    </div>
  );
}
