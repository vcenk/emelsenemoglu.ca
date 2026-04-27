"use client";

import { useMemo, useState } from "react";
import { paymentForFrequency, amortizationSchedule } from "@/lib/calculations/mortgage";

const cad = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

export function RenewalCalculator() {
  const [balance, setBalance] = useState(540_000);
  const [remainingAmort, setRemainingAmort] = useState(20);
  const [renewalRate, setRenewalRate] = useState(4.79);
  const [shopRate, setShopRate] = useState(4.39);
  const [term, setTerm] = useState(5);

  const { renewalPayment, shopPayment, savingsTerm, savingsAmort } = useMemo(() => {
    const a = paymentForFrequency(balance, renewalRate, remainingAmort, "monthly");
    const b = paymentForFrequency(balance, shopRate, remainingAmort, "monthly");
    const totalA_term = a * 12 * term;
    const totalB_term = b * 12 * term;
    const totalA_amort = a * 12 * remainingAmort;
    const totalB_amort = b * 12 * remainingAmort;
    return {
      renewalPayment: a,
      shopPayment: b,
      savingsTerm: totalA_term - totalB_term,
      savingsAmort: totalA_amort - totalB_amort,
    };
  }, [balance, remainingAmort, renewalRate, shopRate, term]);

  return (
    <div className="rounded-3xl bg-white shadow-soft border border-cream-200 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="p-6 md:p-8 space-y-5 bg-cream-50">
          <h3 className="font-display text-xl text-emerald-900">Your renewal</h3>
          <Field label="Outstanding balance (CAD)"><input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} className={inp} /></Field>
          <Field label="Remaining amortization (years)">
            <select value={remainingAmort} onChange={(e) => setRemainingAmort(Number(e.target.value))} className={inp}>
              {[10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} years</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Lender's renewal rate (%)"><input type="number" step={0.01} value={renewalRate} onChange={(e) => setRenewalRate(Number(e.target.value))} className={inp} /></Field>
            <Field label="Broker-shopped rate (%)"><input type="number" step={0.01} value={shopRate} onChange={(e) => setShopRate(Number(e.target.value))} className={inp} /></Field>
          </div>
          <Field label="Term length (years)">
            <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className={inp}>
              {[1, 2, 3, 4, 5].map((y) => <option key={y} value={y}>{y} years</option>)}
            </select>
          </Field>
        </div>

        <div className="p-6 md:p-8 bg-emerald-900 text-cream-100">
          <p className="text-xs uppercase tracking-[0.18em] text-coral-300 font-medium">Your potential savings</p>
          <p className="mt-2 font-display text-4xl md:text-5xl text-cream-50">{cad(savingsTerm)}</p>
          <p className="mt-1 text-cream-100/70 text-sm">over your {term}-year term</p>

          <dl className="mt-8 grid gap-4 text-sm">
            <Stat k="Lender renewal payment / month" v={cad(renewalPayment)} />
            <Stat k="Broker-shopped payment / month" v={cad(shopPayment)} />
            <Stat k="Monthly difference" v={cad(renewalPayment - shopPayment)} />
            <Stat k="Savings over full amortization" v={cad(savingsAmort)} />
          </dl>

          <p className="mt-8 text-xs text-cream-100/60 leading-relaxed">
            Most renewal letters come in 15–60 bps above what the same lender will offer when pushed.
            That's the whole game. <a href="/mortgages/renewals-transfers/mortgage-renewals" className="underline hover:text-cream-50">Read the renewal playbook →</a>
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
