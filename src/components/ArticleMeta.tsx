interface Props {
  datePublished: string
  dateModified?: string
  readTime?: string
}

const FMT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

function pretty(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return FMT.format(new Date(Date.UTC(y, m - 1, d)))
}

export default function ArticleMeta({
  datePublished,
  dateModified,
  readTime,
}: Props) {
  const modified = dateModified ?? datePublished
  return (
    <p
      style={{
        margin: '0.5rem 0 0',
        fontSize: '0.9rem',
        color: 'var(--ink-muted)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        alignItems: 'center',
      }}
    >
      <span>
        By <strong style={{ color: 'var(--ink-soft)' }}>Ride or Naptime</strong>
      </span>
      <span aria-hidden>·</span>
      <span>
        Updated{' '}
        <time dateTime={modified}>{pretty(modified)}</time>
      </span>
      {readTime ? (
        <>
          <span aria-hidden>·</span>
          <span>{readTime}</span>
        </>
      ) : null}
    </p>
  )
}
