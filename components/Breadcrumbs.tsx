import Link from 'next/link';

export type Crumb = { name: string; href: string };

/**
 * Visible breadcrumb trail. Rendered on the same pages that emit
 * BreadcrumbList JSON-LD so the markup reflects something users can see.
 * The last crumb is the current page (not a link).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ padding: '120px 32px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <ol
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {last ? (
                  <span style={{ color: '#F97316' }} aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} style={{ color: '#71717a', textDecoration: 'none' }}>
                      {c.name}
                    </Link>
                    <span style={{ color: '#3f3f46' }} aria-hidden>
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
