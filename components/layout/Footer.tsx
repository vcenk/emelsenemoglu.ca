import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { serviceCategories } from "@/lib/content/navigation";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-cream-100">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 text-cream-100/80 leading-relaxed max-w-sm">{site.description}</p>
            <div className="mt-6 space-y-1.5 text-sm">
              <p className="text-cream-100/60">{site.brokerage}</p>
              <p>
                <a href={site.phoneHref} className="text-cream-50 hover:text-coral-300">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="text-cream-50 hover:text-coral-300 break-all">
                  {site.email}
                </a>
              </p>
              <p className="text-cream-100/60">{site.address.region}, {site.address.country}</p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {serviceCategories.slice(0, 4).map((cat) => (
              <div key={cat.slug}>
                <Link
                  href={`/mortgages/${cat.slug}`}
                  className="font-display text-cream-50 mb-3 inline-block hover:text-coral-300"
                >
                  {cat.label}
                </Link>
                <ul className="space-y-1.5">
                  {cat.links.slice(0, 5).map((l) => (
                    <li key={l.slug}>
                      <Link
                        href={`/mortgages/${cat.slug}/${l.slug}`}
                        className="text-cream-100/70 hover:text-cream-50"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 text-sm">
            <p className="font-display text-cream-50 mb-3">More</p>
            <ul className="space-y-1.5">
              <li><Link href="/calculators" className="text-cream-100/70 hover:text-cream-50">Calculators</Link></li>
              <li><Link href="/blog" className="text-cream-100/70 hover:text-cream-50">Mortgage Blog</Link></li>
              <li><Link href="/about" className="text-cream-100/70 hover:text-cream-50">About Emel</Link></li>
              <li><Link href="/contact" className="text-cream-100/70 hover:text-cream-50">Contact</Link></li>
              <li><Link href="/apply" className="text-cream-100/70 hover:text-cream-50">Apply</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 md:items-center text-xs text-cream-100/60 border-t border-cream-100/10 pt-6">
          <p>© {year} {site.name}. {site.licenseDisclaimer}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 md:justify-end">
            <li><Link href="/privacy-policy" className="hover:text-cream-50">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-cream-50">Terms</Link></li>
            <li><Link href="/disclaimer" className="hover:text-cream-50">Disclaimer</Link></li>
            <li><Link href="/accessibility" className="hover:text-cream-50">Accessibility</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
