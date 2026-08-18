'use client'

import { usePathname } from 'next/navigation'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

export type AffiliatePartner = 'getawaytoday' | 'amazon' | 'undercovertourist'

/**
 * Where on the page the link sits. Drives the `affiliate_placement` dimension
 * in GA4, so keep this list small and stable.
 */
export type AffiliatePlacement = 'navbar' | 'hero' | 'inline' | 'footer-cta' | 'card'

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

/**
 * Hostname → partner. Matched against the host suffix so subdomains and the
 * amzn.to short domain both resolve. Order matters only in that the first
 * suffix hit wins.
 */
const PARTNER_HOSTS: ReadonlyArray<readonly [string, AffiliatePartner]> = [
  ['getawaytoday.com', 'getawaytoday'],
  ['amazon.com', 'amazon'],
  ['amzn.to', 'amazon'],
  ['undercovertourist.com', 'undercovertourist'],
  // CJ Affiliate redirectors — Undercover Tourist's network deep links.
  ['anrdoezrs.net', 'undercovertourist'],
  ['dpbolvw.net', 'undercovertourist'],
  ['jdoqocy.com', 'undercovertourist'],
  ['kqzyfj.com', 'undercovertourist'],
  ['tkqlhce.com', 'undercovertourist'],
]

/**
 * Infers the partner from the href's hostname. Returns null for a host we
 * don't recognise, in which case the caller must pass `partner` explicitly.
 */
export function inferPartner(href: string): AffiliatePartner | null {
  let host: string
  try {
    host = new URL(href, 'https://rideornaptime.com').hostname.toLowerCase()
  } catch {
    return null
  }

  for (const [suffix, partner] of PARTNER_HOSTS) {
    if (host === suffix || host.endsWith(`.${suffix}`)) return partner
  }
  return null
}

export interface AffiliateLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children' | 'rel' | 'target'
> {
  href: string
  /** Short stable slug, e.g. 'package-promo' or 'stroller-uppababy-minu'. */
  product: string
  /** Defaults to 'inline' — the most common case (in-body text and product links). */
  placement?: AffiliatePlacement
  /** Override the hostname-inferred partner. Required for unrecognised hosts. */
  partner?: AffiliatePartner
  children: ReactNode
}

/**
 * The single outbound path for every affiliate click on the site.
 *
 * Pushes one `affiliate_click` event to the GTM dataLayer and then gets out of
 * the way — no preventDefault, no await, no beacon. Navigation is never
 * blocked or delayed; if the push throws, the click still goes through.
 */
export default function AffiliateLink({
  href,
  product,
  placement = 'inline',
  partner,
  children,
  onClick,
  ...rest
}: AffiliateLinkProps) {
  const pathname = usePathname()
  const resolvedPartner = partner ?? inferPartner(href)

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    try {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'affiliate_click',
        affiliate_partner: resolvedPartner ?? 'unknown',
        affiliate_product: product,
        affiliate_placement: placement,
        page_path: pathname,
      })
    } catch {
      // Analytics must never break an outbound click.
    }
    onClick?.(event)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="sponsored nofollow noopener"
      data-affiliate-partner={resolvedPartner ?? undefined}
      data-affiliate-product={product}
      data-affiliate-placement={placement}
      {...rest}
    >
      {children}
    </a>
  )
}

export { AffiliateLink }
