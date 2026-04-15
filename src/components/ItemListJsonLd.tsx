import { SITE_URL } from '@/lib/content'

interface Item {
  name: string
  url?: string
  description?: string
}

interface Props {
  items: Item[]
  path: string
  name?: string
}

export default function ItemListJsonLd({ items, path, name }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    url: `${SITE_URL}${path}`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.description ? { description: it.description } : {}),
      ...(it.url ? { url: it.url } : {}),
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
