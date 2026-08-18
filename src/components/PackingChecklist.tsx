'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AffiliateLink from '@/components/AffiliateLink'
import { PACKING_LIST, type PackingItem } from '@/lib/content'

/**
 * Turns a product label into the short, stable `affiliate_product` slug
 * reported to GA4 — e.g. "Anker 10,000mAh Power Bank (USB-C built in)"
 * becomes "anker-10-000mah-power-bank". Trailing detail is trimmed to keep the
 * slug readable in GA4 reports.
 */
function productSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 5)
    .join('-')
}

function ChecklistItem({ item }: { item: PackingItem }) {
  const [checked, setChecked] = useState(false)
  return (
    <div
      className={`checklist-item ${checked ? 'checked' : ''}`}
      onClick={() => setChecked(!checked)}
    >
      <div className="checklist-check">{checked ? '✓' : ''}</div>
      <div className="checklist-text">
        <strong>{item.item}</strong>
        <br />
        <span>{item.why}</span>

        {item.affiliates && item.affiliates.length > 0 && (
          // Stop propagation so tapping a product doesn't also tick the row off.
          <div className="packing-products" onClick={(e) => e.stopPropagation()}>
            {item.affiliates.map((a, i) => (
              <AffiliateLink
                key={i}
                href={a.href}
                product={productSlug(a.label)}
                placement="inline"
                className="packing-product"
                aria-label={`Check price on Amazon — ${a.label}`}
              >
                {a.image && (
                  <span className="packing-product-thumb">
                    <Image src={a.image} alt={a.label} width={72} height={72} />
                  </span>
                )}
                <span className="packing-product-cta">Check Price on Amazon →</span>
              </AffiliateLink>
            ))}
          </div>
        )}

        {item.related && (
          <div
            style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Link href={item.related.href}>{item.related.text}</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PackingChecklist() {
  return (
    <div className="checklist">
      {PACKING_LIST.map((item, i) => (
        <ChecklistItem key={i} item={item} />
      ))}
    </div>
  )
}
