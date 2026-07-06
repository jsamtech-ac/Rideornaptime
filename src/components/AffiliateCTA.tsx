import Image from 'next/image'
import { getAwayTodayUrl } from '@/lib/affiliate'

type Partner = 'getawaytoday' | 'undercovertourist' | 'amazon'

interface Props {
  partner: Partner
  headline?: string
  body?: string
  cta?: string
  campaign?: string
}

const DEFAULTS: Record<Partner, { headline: string; body: string; cta: string }> = {
  getawaytoday: {
    headline: 'Book Disneyland through Get Away Today',
    body: 'Authorized seller, real human concierges, and the promo code RIDETIME knocks $10 off any package.',
    cta: 'See ticket deals →',
  },
  undercovertourist: {
    headline: 'Compare ticket prices on Undercover Tourist',
    body: 'Authorized Disneyland reseller. Often the cheapest multi-day Park Hopper price online.',
    cta: 'Check prices →',
  },
  amazon: {
    headline: 'See it on Amazon',
    body: 'Quick-ship gear that holds up in the parks — strollers, fans, snack containers.',
    cta: 'Shop on Amazon →',
  },
}

// Partner images live in /public. Only list a partner here when its file
// actually exists on disk — a partner omitted from this map renders text-only
// (no <img> element at all, so there is never a broken-image icon).
//
// TODO (to add a partner image): drop the asset in /public, then add an entry
// below with its real intrinsic dimensions, e.g.:
//   undercovertourist: {
//     src: '/undercover-tourist.jpg', width: 1200, height: 630,
//     alt: 'Undercover Tourist — authorized Disneyland ticket reseller',
//   },
const PARTNER_IMAGE: Partial<
  Record<Partner, { src: string; width: number; height: number; alt: string }>
> = {
  getawaytoday: {
    src: '/getaway.jpg',
    width: 1080,
    height: 1350,
    alt: 'Get Away Today — Disneyland authorized ticket seller, your vacation now for less',
  },
}

function resolveHref(partner: Partner, campaign?: string): string {
  switch (partner) {
    case 'getawaytoday':
      return getAwayTodayUrl(campaign ?? 'news_post')
    case 'undercovertourist':
      /* TODO: insert CJ deep link */
      return '#'
    case 'amazon':
      return 'https://www.amazon.com/?tag=rideornaptime-20'
  }
}

const PARTNER_LABEL: Record<Partner, string> = {
  getawaytoday: 'Get Away Today',
  undercovertourist: 'Undercover Tourist',
  amazon: 'Amazon',
}

export default function AffiliateCTA({ partner, headline, body, cta, campaign }: Props) {
  const href = resolveHref(partner, campaign)
  const d = DEFAULTS[partner]
  const h = headline ?? d.headline
  const p = body ?? d.body
  const c = cta ?? d.cta
  const image = PARTNER_IMAGE[partner]

  return (
    <aside
      className={`affiliate-cta affiliate-cta--${partner}`}
      aria-label={`${PARTNER_LABEL[partner]} affiliate offer`}
    >
      <div className="affiliate-cta-tag">Sponsored · {PARTNER_LABEL[partner]}</div>
      {image ? (
        <div className="affiliate-cta-image">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 360px, 100vw"
          />
        </div>
      ) : null}
      <h3 className="affiliate-cta-headline">{h}</h3>
      <p className="affiliate-cta-body">{p}</p>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener"
        className="affiliate-cta-link"
        aria-label={`${h} (affiliate link, opens in a new tab)`}
      >
        {c}
      </a>
    </aside>
  )
}
