import Link from "next/link";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section tone="cream" size="lg">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-display text-7xl text-coral-500">404</p>
        <h1 className="mt-4 font-display text-3xl md:text-4xl text-emerald-950">Page not found</h1>
        <p className="mt-4 text-ink-700">
          The page you're looking for has moved or never existed. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-medium text-cream-50 hover:bg-emerald-800">Go home</Link>
          <Link href="/calculators" className="rounded-full border border-emerald-900/15 px-6 py-3 text-sm font-medium text-emerald-900 hover:bg-emerald-900/5">Calculators</Link>
          <Link href="/blog" className="rounded-full border border-emerald-900/15 px-6 py-3 text-sm font-medium text-emerald-900 hover:bg-emerald-900/5">Mortgage blog</Link>
          <Link href="/contact" className="rounded-full border border-emerald-900/15 px-6 py-3 text-sm font-medium text-emerald-900 hover:bg-emerald-900/5">Contact Emel</Link>
        </div>
      </div>
    </Section>
  );
}
