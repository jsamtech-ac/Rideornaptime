import { getAwayTodayUrl } from '@/lib/affiliate'

type Props = {
  campaign: string
  label: string
  sub?: string
}

export default function EventCTA({ campaign, label, sub }: Props) {
  const href = getAwayTodayUrl(campaign)

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener"
      className="event-cta"
      aria-label={`${label} (affiliate link, opens in a new tab)`}
    >
      <span className="event-cta-label">{label}</span>
      {sub && <span className="event-cta-sub">{sub}</span>}
      <span className="event-cta-arrow" aria-hidden="true">
        →
      </span>
    </a>
  )
}
