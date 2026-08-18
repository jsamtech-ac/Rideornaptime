import Image from 'next/image'
import AffiliateLink from '@/components/AffiliateLink'
import { getAwayTodayUrl } from '@/lib/affiliate'

type Props = {
  location: string
  /**
   * Accessible name for the landmark. Pages that render more than one
   * TicketsCTA must give each a distinct label — two identically-named regions
   * on one page are ambiguous to screen-reader users (axe `landmark-unique`).
   */
  label?: string
}

export default function TicketsCTA({
  location,
  label = 'Disneyland tickets affiliate offer',
}: Props) {
  const href = getAwayTodayUrl(location)

  return (
    <section className="tickets-section" aria-label={label}>
      <AffiliateLink
        href={href}
        product="package-promo"
        placement="footer-cta"
        className="tickets-cta"
      >
        <div className="tickets-cta-promo" role="note">
          <span className="tickets-cta-promo-label">Promo Code</span>
          <span className="tickets-cta-promo-code">RIDETIME</span>
          <span className="tickets-cta-promo-desc">$10 off packages</span>
        </div>
        <div className="tickets-cta-image">
          <Image
            src="/getaway.jpg"
            alt="Get Away Today — Disneyland authorized ticket seller, your vacation now for less"
            width={1080}
            height={1350}
            sizes="(min-width: 768px) 520px, 100vw"
          />
        </div>
      </AffiliateLink>
    </section>
  )
}
