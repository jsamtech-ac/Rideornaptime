import { PLACEHOLDER_AFFILIATE } from '@/data/packingList'

interface Props {
  /** Destination URL. While links are unfilled this is the TODO placeholder. */
  href: string
  /** Product name, used for the accessible label. */
  label: string
  /** Override the visible button text. */
  children?: React.ReactNode
}

/**
 * Single source of truth for affiliate link behavior: consistent rel, target,
 * and aria-label everywhere. Unfilled links (TODO_AMAZON_LINK) render disabled
 * so a placeholder never ships as a live, clickable dead link.
 */
export default function AffiliateLink({ href, label, children }: Props) {
  const text = children ?? 'Check Price on Amazon →'
  const unfilled = href === PLACEHOLDER_AFFILIATE

  if (unfilled) {
    return (
      <span
        className="affiliate-cta affiliate-cta--pending"
        role="link"
        aria-disabled="true"
        aria-label={`${label} — Amazon link coming soon`}
        title="Link coming soon"
      >
        {text}
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className="affiliate-cta"
      aria-label={`Check price on Amazon — ${label}`}
    >
      {text}
    </a>
  )
}
