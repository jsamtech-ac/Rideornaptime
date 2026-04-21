import Image from 'next/image'
import { getAwayTodayUrl } from '@/lib/affiliate'

type Props = {
  location: string
}

export default function TicketsCTA({ location }: Props) {
  const href = getAwayTodayUrl(location)

  return (
    <section className="tickets-section" aria-label="Disneyland tickets affiliate offer">
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener"
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
      </a>
    </section>
  )
}
