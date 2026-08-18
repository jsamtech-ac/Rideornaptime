import Link from 'next/link'
import Image from 'next/image'

export const AUTHOR_NAME = 'Ashu Chohan'
export const AUTHOR_CREDENTIAL =
  'Disneyland dad — every ride, itinerary, and food pick on this site is tested with my own kids.'

interface Props {
  /**
   * Author photo in /public. Omit until a real headshot exists — the strip
   * falls back to an initials avatar rather than rendering a broken image.
   */
  photo?: string
  /** Overrides the one-line credential under the name. */
  credential?: string
}

/**
 * Byline strip: photo slot, name, one-line credential. Links through to /about.
 */
export default function AuthorByline({ photo, credential = AUTHOR_CREDENTIAL }: Props) {
  const initials = AUTHOR_NAME.split(' ')
    .map((part) => part[0])
    .join('')

  return (
    // A byline is not complementary content, so no <aside>: that would declare
    // a complementary landmark nested inside the page's section content.
    <div className="author-byline">
      <div className="author-byline-photo">
        {photo ? (
          <Image src={photo} alt={AUTHOR_NAME} width={64} height={64} />
        ) : (
          <span className="author-byline-initials" aria-hidden="true">
            {initials}
          </span>
        )}
      </div>
      <div className="author-byline-text">
        <div className="author-byline-name">
          Written by <strong>{AUTHOR_NAME}</strong>
        </div>
        <p className="author-byline-credential">{credential}</p>
        <Link href="/about" className="author-byline-link">
          More about {AUTHOR_NAME.split(' ')[0]} →
        </Link>
      </div>
    </div>
  )
}
