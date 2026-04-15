'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PACKING_LIST, type PackingItem } from '@/lib/content'

function ChecklistItem({ item }: { item: PackingItem }) {
  const [checked, setChecked] = useState(false)
  return (
    <div className={`checklist-item ${checked ? 'checked' : ''}`} onClick={() => setChecked(!checked)}>
      <div className="checklist-check">{checked ? '✓' : ''}</div>
      <div className="checklist-text">
        <strong>{item.item}</strong>
        <br />
        <span>{item.why}</span>

        {item.affiliates && item.affiliates.length > 0 && (
          <div
            style={{ marginTop: '0.6rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            {item.affiliates.map((a, i) => (
              <a
                key={i}
                href={a.href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="affiliate-cta"
                aria-label={`Check price on Amazon — ${a.label}`}
              >
                Check Price on Amazon →
              </a>
            ))}
          </div>
        )}

        {item.related && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }} onClick={(e) => e.stopPropagation()}>
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
