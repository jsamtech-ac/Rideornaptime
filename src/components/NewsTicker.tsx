import Link from 'next/link'
import { getTickerData, type TickerItem } from '@/lib/news'

function formatUpdated(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Los_Angeles',
  })
}

function TickerEntry({ item, duplicate }: { item: TickerItem; duplicate: boolean }) {
  return (
    <li className="news-ticker-item" aria-hidden={duplicate || undefined}>
      {item.tag && <span className="news-ticker-tag">{item.tag}</span>}
      <Link
        href={item.href}
        className="news-ticker-link"
        // The duplicate set exists only to make the marquee loop seamlessly.
        // aria-hidden on the <li> keeps it out of the a11y tree; tabIndex={-1}
        // keeps it out of the tab order so the same headline isn't reachable
        // twice, and crawlers see one copy of each link text.
        tabIndex={duplicate ? -1 : undefined}
      >
        {item.headline}
      </Link>
    </li>
  )
}

export default function NewsTicker() {
  const { lastUpdated, ticker } = getTickerData()
  if (!ticker.length) return null

  const formatted = formatUpdated(lastUpdated)

  return (
    <aside className="news-ticker" aria-label="This week's Disneyland news">
      <div className="news-ticker-label">
        <span aria-hidden="true">📅</span>
        <span className="news-ticker-label-text">
          Updated <time dateTime={lastUpdated}>{formatted}</time>
        </span>
      </div>

      {/* Focusable so a keyboard user can stop the marquee before tabbing into
          it — the CSS pauses the scroll on :hover, :focus and :focus-within. */}
      <div
        className="news-ticker-track-wrap"
        tabIndex={0}
        role="region"
        aria-label="Latest headlines — scrolling. Focus to pause."
      >
        <ul className="news-ticker-track">
          {ticker.map((item) => (
            <TickerEntry key={`a-${item.id}`} item={item} duplicate={false} />
          ))}
          {ticker.map((item) => (
            <TickerEntry key={`b-${item.id}`} item={item} duplicate />
          ))}
        </ul>
      </div>
    </aside>
  )
}
