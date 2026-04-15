'use client'

import { useState } from 'react'
import { ITINERARIES } from '@/lib/content'

export default function ItineraryTabs() {
  const [active, setActive] = useState('1day')
  const current = ITINERARIES[active]

  return (
    <>
      <div className="itinerary-tabs">
        {Object.entries(ITINERARIES).map(([key, val]) => (
          <button
            key={key}
            className={`itinerary-tab ${active === key ? 'active' : ''}`}
            onClick={() => setActive(key)}
          >
            {val.label}
          </button>
        ))}
      </div>
      <div className="timeline">
        {current.events.map((event, i) => (
          <div key={i} className={`timeline-item ${event.type}`}>
            <div className="timeline-time">{event.time}</div>
            <div className="timeline-title">{event.title}</div>
            <div className="timeline-desc">{event.desc}</div>
          </div>
        ))}
      </div>
    </>
  )
}
