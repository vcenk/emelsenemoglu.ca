"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { serviceCategories } from "@/lib/content/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 bg-cream-100/85 backdrop-blur-md border-b border-cream-300/70">
      <div className="container-page flex items-center justify-between py-4">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              className="px-3 py-2 text-[0.95rem] text-ink-700 hover:text-emerald-900 font-medium"
              aria-haspopup="true"
              aria-expanded={openMenu === "services"}
            >
              Services
            </button>
            {openMenu === "services" && <ServicesMegaMenu />}
          </div>
          <Link href="/calculators" className="px-3 py-2 text-[0.95rem] text-ink-700 hover:text-emerald-900 font-medium">
            Calculators
          </Link>
          <Link href="/blog" className="px-3 py-2 text-[0.95rem] text-ink-700 hover:text-emerald-900 font-medium">
            Blog
          </Link>
          <Link href="/about" className="px-3 py-2 text-[0.95rem] text-ink-700 hover:text-emerald-900 font-medium">
            About
          </Link>
          <Link href="/contact" className="px-3 py-2 text-[0.95rem] text-ink-700 hover:text-emerald-900 font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={site.phoneHref} className="text-sm font-medium text-emerald-900 hover:text-coral-600">
            {site.phone}
          </a>
          <Link
            href="/apply"
            className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-emerald-800 transition"
          >
            Apply Now
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/15 text-emerald-900"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function ServicesMegaMenu() {
  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 w-[min(96vw,1100px)]">
      <div className="rounded-3xl bg-white shadow-soft border border-cream-200 p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
        {serviceCategories.map((cat) => (
          <div key={cat.slug}>
            <Link
              href={`/mortgages/${cat.slug}`}
              className="font-display text-[0.95rem] tracking-tight text-emerald-900 hover:text-coral-600 border-b border-cream-300 pb-2 mb-3 inline-block"
            >
              {cat.label}
            </Link>
            <ul className="space-y-1.5">
              {cat.links.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/mortgages/${cat.slug}/${link.slug}`}
                    className="block text-sm text-ink-600 hover:text-emerald-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="lg:hidden border-t border-cream-300 bg-cream-100 max-h-[calc(100vh-72px)] overflow-y-auto">
      <div className="container-page py-4 space-y-2">
        {serviceCategories.map((cat) => (
          <div key={cat.slug} className="border-b border-cream-300/70 pb-2">
            <button
              className={cn(
                "flex w-full items-center justify-between py-3 font-display text-base text-emerald-900",
              )}
              onClick={() => setExpanded(expanded === cat.slug ? null : cat.slug)}
              aria-expanded={expanded === cat.slug}
            >
              {cat.label}
              <span className={cn("transition-transform", expanded === cat.slug && "rotate-180")}>▾</span>
            </button>
            {expanded === cat.slug && (
              <ul className="pb-3 pl-2 space-y-1">
                <li>
                  <Link
                    href={`/mortgages/${cat.slug}`}
                    onClick={onClose}
                    className="block py-1.5 text-sm font-medium text-ink-700"
                  >
                    All {cat.label}
                  </Link>
                </li>
                {cat.links.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/mortgages/${cat.slug}/${link.slug}`}
                      onClick={onClose}
                      className="block py-1.5 text-sm text-ink-600 hover:text-emerald-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link href="/calculators" onClick={onClose} className="rounded-full border border-emerald-900/15 px-4 py-2.5 text-center text-sm font-medium text-emerald-900">
            Calculators
          </Link>
          <Link href="/blog" onClick={onClose} className="rounded-full border border-emerald-900/15 px-4 py-2.5 text-center text-sm font-medium text-emerald-900">
            Blog
          </Link>
          <Link href="/about" onClick={onClose} className="rounded-full border border-emerald-900/15 px-4 py-2.5 text-center text-sm font-medium text-emerald-900">
            About
          </Link>
          <Link href="/contact" onClick={onClose} className="rounded-full border border-emerald-900/15 px-4 py-2.5 text-center text-sm font-medium text-emerald-900">
            Contact
          </Link>
        </div>
        <Link
          href="/apply"
          onClick={onClose}
          className="block rounded-full bg-emerald-900 px-4 py-3 text-center text-sm font-semibold text-cream-50 mt-3"
        >
          Apply Now
        </Link>
        <a
          href={site.phoneHref}
          className="block text-center text-sm text-emerald-900 mt-3"
        >
          Call {site.phone}
        </a>
      </div>
    </div>
  );
}
