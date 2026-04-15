'use client'

import { useState } from 'react'
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
