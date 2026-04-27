import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs md:text-sm text-ink-500">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-emerald-900">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-ink-700" : ""}>{item.label}</span>
              )}
              {!isLast && <span aria-hidden className="text-ink-300">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
