type Props = {
  date: string
  label?: string
}

export default function UpdatedBadge({ date, label = 'Updated for 2026' }: Props) {
  const formatted = new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <div
      className="updated-badge"
      role="status"
      aria-label={`${label}, last reviewed ${formatted}`}
    >
      <span className="updated-badge-dot" aria-hidden="true" />
      <span className="updated-badge-label">{label}</span>
      <span className="updated-badge-sep" aria-hidden="true">
        ·
      </span>
      <time className="updated-badge-date" dateTime={date}>
        Reviewed {formatted}
      </time>
    </div>
  )
}
