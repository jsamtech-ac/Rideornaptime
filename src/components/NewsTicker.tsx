import Link from 'next/link'
import { getTickerData } from '@/lib/news'

function formatUpdated(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Los_Angeles',
  })
}

export default function NewsTicker() {
  const { lastUpdated, ticker } = getTickerData()
  if (!ticker.length) return null

  const formatted = formatUpdated(lastUpdated)
  const items = ticker

  return (
    <aside className="news-ticker" aria-label="This week's Disneyland news">
      <div className="news-ticker-label">
        <span aria-hidden="true">📅</span>
        <span className="news-ticker-label-text">
          Updated <time dateTime={lastUpdated}>{formatted}</time>
        </span>
      </div>

      <div className="news-ticker-track-wrap">
        <ul className="news-ticker-track" aria-label="Latest headlines">
          {items.map((item) => (
            <li key={`a-${item.id}`} className="news-ticker-item">
              {item.tag && <span className="news-ticker-tag">{item.tag}</span>}
              <Link href={item.link} className="news-ticker-link">
                {item.headline}
              </Link>
            </li>
          ))}
          {items.map((item) => (
            <li key={`b-${item.id}`} className="news-ticker-item" aria-hidden="true">
              {item.tag && <span className="news-ticker-tag">{item.tag}</span>}
              <Link href={item.link} tabIndex={-1} className="news-ticker-link">
                {item.headline}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
