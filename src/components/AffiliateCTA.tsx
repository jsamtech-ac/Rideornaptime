import Image from 'next/image'
import AffiliateLink, { type AffiliatePartner } from '@/components/AffiliateLink'
import { getAwayTodayUrl } from '@/lib/affiliate'

type Partner = AffiliatePartner

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
    width: 1920,
    height: 1080,
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

// `affiliate_product` slug reported to GA4 for each partner's CTA block.
const PARTNER_PRODUCT: Record<Partner, string> = {
  getawaytoday: 'package-promo',
  undercovertourist: 'ticket-compare',
  amazon: 'amazon-storefront',
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
            sizes="(min-width: 768px) 640px, 100vw"
          />
        </div>
      ) : null}
      <h3 className="affiliate-cta-headline">{h}</h3>
      <p className="affiliate-cta-body">{p}</p>
      <AffiliateLink
        href={href}
        partner={partner}
        product={PARTNER_PRODUCT[partner]}
        placement="card"
        className="affiliate-cta-link"
        aria-label={`${h} (affiliate link, opens in a new tab)`}
      >
        {c}
      </AffiliateLink>
    </aside>
  )
}
