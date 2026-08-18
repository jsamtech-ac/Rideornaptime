import { SITE_URL } from '@/lib/content'
import { breadcrumbsFor, type Crumb, type PagePath } from '@/lib/pages'

export type { Crumb }

/**
 * Emits BreadcrumbList JSON-LD. Prefer the `path` form — it reads the trail
 * from the page registry in `@/lib/pages`, so a new page needs one line there
 * and nothing here. Pass `items` only for routes outside the registry
 * (currently just the dynamic news posts).
 */
type Props = { path: PagePath; items?: never } | { items: Crumb[]; path?: never }

export default function BreadcrumbJsonLd(props: Props) {
  const items = props.items ?? breadcrumbsFor(props.path)

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
