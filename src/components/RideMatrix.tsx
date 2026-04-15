'use client'

import { useState } from 'react'
import { RIDES, type Ride, type Verdict } from '@/lib/content'

function RideCard({ ride }: { ride: Ride }) {
  return (
    <div className="ride-card">
      <div className="ride-name">{ride.name}</div>
      <div className="ride-land">{ride.land}</div>
      <div className="ride-ages">
        {(['age2', 'age4', 'age6', 'age8'] as const).map((age) => (
          <div key={age} className={`ride-age ${ride[age] as Verdict}`}>
            <span className="age-label">{age.replace('age', 'Age ')}</span>
            {ride[age] === 'must-do' ? '✓' : ride[age] === 'maybe' ? '~' : '✗'}
          </div>
        ))}
      </div>
      <div className="ride-take">💬 {ride.take}</div>
    </div>
  )
}

export default function RideMatrix() {
  const [rideFilter, setRideFilter] = useState<'all' | 'DL' | 'DCA'>('all')
  const filteredRides = rideFilter === 'all' ? RIDES : RIDES.filter(r => r.park === rideFilter)

  return (
    <>
      <div className="itinerary-tabs" style={{ marginBottom: '1.5rem' }}>
        {(['all', 'DL', 'DCA'] as const).map(f => (
          <button
            key={f}
            className={`itinerary-tab ${rideFilter === f ? 'active' : ''}`}
            onClick={() => setRideFilter(f)}
          >
            {f === 'all' ? 'All Rides' : f === 'DL' ? 'Disneyland' : 'DCA'}
          </button>
        ))}
      </div>
      <div className="ride-matrix">
        {filteredRides.map((ride, i) => (
          <RideCard key={i} ride={ride} />
        ))}
      </div>
    </>
  )
}
