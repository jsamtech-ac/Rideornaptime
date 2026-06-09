'use client'

import { useState } from 'react'
import Link from 'next/link'
import AffiliateLink from '@/components/AffiliateLink'
import {
  PACKING_LIST,
  CATEGORY_ORDER,
  CATEGORY_META,
  affiliateHref,
  type PackingItem,
  type PackingCategory,
} from '@/data/packingList'

const AGE_ORDER: (2 | 4 | 6 | 8)[] = [2, 4, 6, 8]

function ChecklistItem({ item }: { item: PackingItem }) {
  const [checked, setChecked] = useState(false)
  const ageNotes = item.ageNotes
    ? AGE_ORDER.filter((age) => item.ageNotes?.[age]).map((age) => ({
        age,
        note: item.ageNotes![age]!,
      }))
    : []

  return (
    <div className={`checklist-item ${checked ? 'checked' : ''}`}>
      {/* The toggle is a real button so it's keyboard-operable and announces its
          pressed state. Links live OUTSIDE it — a control can't contain focusable
          descendants. */}
      <button
        type="button"
        className="checklist-toggle"
        aria-pressed={checked}
        aria-label={`Pack: ${item.name}`}
        onClick={() => setChecked(!checked)}
      >
        <span className="checklist-check" aria-hidden="true">
          {checked ? '✓' : ''}
        </span>
        <span className="checklist-text">
          <strong>{item.name}</strong>
          <span className="checklist-pick">Pick: {item.recommendedPick}</span>
          <span>{item.why}</span>

          {item.priceAnchor && <span className="checklist-anchor">💸 {item.priceAnchor}</span>}

          {ageNotes.length > 0 && (
            <span className="checklist-ages">
              {ageNotes.map(({ age, note }) => (
                <span key={age} className="checklist-age">
                  <em>Age {age}:</em> {note}
                </span>
              ))}
            </span>
          )}
        </span>
      </button>

      {(item.affiliateSlug || item.related) && (
        <div className="checklist-links">
          {item.affiliateSlug && (
            <AffiliateLink href={affiliateHref(item.affiliateSlug)} label={item.recommendedPick} />
          )}
          {item.related && (
            <Link className="checklist-related" href={item.related.href}>
              {item.related.text}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

function CategoryGroup({ category }: { category: PackingCategory }) {
  const meta = CATEGORY_META[category]
  const items = PACKING_LIST.filter((i) => i.category === category)
  if (items.length === 0) return null

  return (
    <div className="checklist-group">
      <div className="checklist-group-header">
        <h3>
          <span aria-hidden="true">{meta.icon}</span> {meta.label}
        </h3>
        <p>{meta.intro}</p>
      </div>
      <div className="checklist">
        {items.map((item) => (
          <ChecklistItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function PackingChecklist({
  categories = CATEGORY_ORDER,
}: {
  categories?: PackingCategory[]
}) {
  return (
    <div className="checklist-groups">
      {categories.map((category) => (
        <CategoryGroup key={category} category={category} />
      ))}
    </div>
  )
}
