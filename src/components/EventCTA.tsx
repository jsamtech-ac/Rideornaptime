import AffiliateLink from '@/components/AffiliateLink'
import { getAwayTodayUrl } from '@/lib/affiliate'

type Props = {
  campaign: string
  label: string
  sub?: string
}

/**
 * Campaign ids already carry an `event_` prefix (`event_halloween`), so strip
 * it before re-prefixing — otherwise the GA4 slug reads `event-event_halloween`.
 */
function productSlug(campaign: string): string {
  return `event-${campaign.replace(/^event_/, '').replace(/_/g, '-')}`
}

export default function EventCTA({ campaign, label, sub }: Props) {
  const href = getAwayTodayUrl(campaign)

  return (
    <AffiliateLink
      href={href}
      product={productSlug(campaign)}
      placement="inline"
      className="event-cta"
      aria-label={`${label} (affiliate link, opens in a new tab)`}
    >
      <span className="event-cta-label">{label}</span>
      {sub && <span className="event-cta-sub">{sub}</span>}
      <span className="event-cta-arrow" aria-hidden="true">
        →
      </span>
    </AffiliateLink>
  )
}
