"use client";

import { useMemo, useState } from "react";
import { bcFirstTimeBuyerExemption, bcPropertyTransferTax } from "@/lib/calculations/mortgage";

const cad = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

export function LandTransferTaxCalculator() {
  const [price, setPrice] = useState(900_000);
  const [firstTime, setFirstTime] = useState(false);
  const [foreign, setForeign] = useState(false);

  const { ptt, exemption, foreignTax, total } = useMemo(() => {
    const baseTax = bcPropertyTransferTax(price);
    const exempt = firstTime ? bcFirstTimeBuyerExemption(price, baseTax) : 0;
    const fbT = foreign ? price * 0.2 : 0;
    return {
      ptt: baseTax,
      exemption: exempt,
      foreignTax: fbT,
      total: Math.max(0, baseTax - exempt) + fbT,
    };
  }, [price, firstTime, foreign]);

  return (
    <div className="rounded-3xl bg-white shadow-soft border border-cream-200 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="p-6 md:p-8 space-y-5 bg-cream-50">
          <h3 className="font-display text-xl text-emerald-900">Property details</h3>
          <Field label="Purchase price (CAD)">
            <input type="number" min={0} step={1000} value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inp} />
          </Field>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={firstTime} onChange={(e) => setFirstTime(e.target.checked)} className="mt-1 h-4 w-4 accent-emerald-700" />
            <div>
              <p className="text-sm font-medium text-ink-800">First-time home buyer (BC)</p>
              <p className="text-xs text-ink-500">Full exemption up to $500k, partial up to $835k.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={foreign} onChange={(e) => setForeign(e.target.checked)} className="mt-1 h-4 w-4 accent-emerald-700" />
            <div>
              <p className="text-sm font-medium text-ink-800">Foreign buyer (Greater Vancouver)</p>
              <p className="text-xs text-ink-500">Adds 20% Additional Property Transfer Tax.</p>
            </div>
          </label>
        </div>

        <div className="p-6 md:p-8 bg-emerald-900 text-cream-100">
          <p className="text-xs uppercase tracking-[0.18em] text-coral-300 font-medium">Total tax payable on closing</p>
          <p className="mt-2 font-display text-4xl md:text-5xl text-cream-50">{cad(total)}</p>

          <dl className="mt-8 grid gap-4 text-sm">
            <Stat k="BC Property Transfer Tax" v={cad(ptt)} />
            {firstTime && <Stat k="First-time buyer exemption" v={`− ${cad(exemption)}`} />}
            {foreign && <Stat k="Additional PTT (foreign buyer)" v={cad(foreignTax)} />}
          </dl>

          <p className="mt-8 text-xs text-cream-100/60 leading-relaxed">
            Estimates the British Columbia Property Transfer Tax for residential purchases. Newly built
            home exemption (up to $1.1M), GST on new builds, and the BC home flipping tax are not
            included here. <a href="/contact" className="underline hover:text-cream-50">Talk to Emel</a> for a full closing-cost breakdown.
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
