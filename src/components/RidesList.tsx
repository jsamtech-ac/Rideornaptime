'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { RIDES, type Ride, type Verdict } from '@/lib/content'
import AgeFilter, { type AgeBracket } from '@/components/AgeFilter'

const AGE_FIELD: Record<AgeBracket, 'age2' | 'age4' | 'age6' | 'age8'> = {
  2: 'age2',
  4: 'age4',
  6: 'age6',
  8: 'age8',
}

function parseAgesParam(raw: string | null): AgeBracket[] {
  if (!raw) return []
  const out: AgeBracket[] = []
  for (const part of raw.split(',')) {
    const n = Number(part)
    if (n === 2 || n === 4 || n === 6 || n === 8) {
      if (!out.includes(n)) out.push(n)
    }
  }
  return out.sort((a, b) => a - b)
}

function buildQueryString(ages: AgeBracket[], showAll: boolean): string {
  const params = new URLSearchParams()
  if (ages.length > 0) params.set('ages', ages.join(','))
  if (showAll) params.set('all', '1')
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

/**
 * A ride matches the selected ages when, for every selected age, the ride's
 * verdict at that age is 'must-do' or 'maybe'. Any 'skip' verdict at a
 * selected age disqualifies the ride.
 */
function rideMatches(ride: Ride, ages: AgeBracket[]): boolean {
  if (ages.length === 0) return true
  for (const age of ages) {
    const verdict: Verdict = ride[AGE_FIELD[age]]
    if (verdict === 'skip') return false
  }
  return true
}

function RideCard({ ride, dimmed }: { ride: Ride; dimmed: boolean }) {
  return (
    <div className={`ride-card${dimmed ? ' dimmed' : ''}`}>
      {dimmed && (
        <div className="ride-card-skip-badge" aria-label="Not for selected ages">
          Not for selected ages
        </div>
      )}
      <div className="ride-card-head">
        <div className="ride-card-head-text">
          <div className="ride-name">{ride.name}</div>
          <div className="ride-land">{ride.land}</div>
        </div>
        <div className="ride-meta">
          <span className="ride-height">📏 {ride.height}</span>
          {ride.closing && <span className="ride-closing">⚠ {ride.closing}</span>}
        </div>
      </div>
      <div className="ride-ages" role="group" aria-label="Verdict by age">
        {(['age2', 'age4', 'age6', 'age8'] as const).map((age) => {
          const verdict = ride[age] as Verdict
          const symbol = verdict === 'must-do' ? '✓' : verdict === 'maybe' ? '~' : '✗'
          const label = verdict === 'must-do' ? 'must do' : verdict === 'maybe' ? 'maybe' : 'skip'
          return (
            <div
              key={age}
              className={`ride-age ${verdict}`}
              aria-label={`Age ${age.replace('age', '')}: ${label}`}
            >
              <span className="age-label">{age.replace('age', 'Age ')}</span>
              <span className="age-verdict" aria-hidden="true">
                {symbol}
              </span>
            </div>
          )
        })}
      </div>
      <p className="ride-take">{ride.take}</p>
    </div>
  )
}

type ParkFilter = 'all' | 'DL' | 'DCA'

export default function RidesList() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Park filter stays in-memory (no URL state per brief — only ages + all are URL-synced)
  const [parkFilter, setParkFilter] = useState<ParkFilter>('all')

  // URL-synced state
  const [selectedAges, setSelectedAges] = useState<AgeBracket[]>(() =>
    parseAgesParam(searchParams.get('ages'))
  )
  const [showAll, setShowAll] = useState<boolean>(() => searchParams.get('all') === '1')

  // Sync URL when filter state changes (shallow, no scroll, no reload)
  useEffect(() => {
    const qs = buildQueryString(selectedAges, showAll)
    router.replace(`/rides${qs}`, { scroll: false })
  }, [selectedAges, showAll, router])

  const handleAgesChange = useCallback((ages: AgeBracket[]) => setSelectedAges(ages), [])
  const handleShowAllToggle = useCallback((v: boolean) => setShowAll(v), [])

  const parkRides = useMemo(
    () => (parkFilter === 'all' ? RIDES : RIDES.filter((r) => r.park === parkFilter)),
    [parkFilter]
  )

  const matchCount = useMemo(
    () => parkRides.filter((r) => rideMatches(r, selectedAges)).length,
    [parkRides, selectedAges]
  )

  const hasAgeFilter = selectedAges.length > 0
  const visibleRides = useMemo(() => {
    if (!hasAgeFilter || showAll) return parkRides
    return parkRides.filter((r) => rideMatches(r, selectedAges))
  }, [parkRides, selectedAges, showAll, hasAgeFilter])

  const noMatches = hasAgeFilter && matchCount === 0

  return (
    <>
      <AgeFilter
        selectedAges={selectedAges}
        onChange={handleAgesChange}
        showAllToggle
        showAll={showAll}
        onShowAllToggle={handleShowAllToggle}
        matchCount={matchCount}
        totalCount={parkRides.length}
      />

      <div className="itinerary-tabs" style={{ marginBottom: '1.5rem' }}>
        {(['all', 'DL', 'DCA'] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`itinerary-tab ${parkFilter === f ? 'active' : ''}`}
            onClick={() => setParkFilter(f)}
          >
            {f === 'all' ? 'All Rides' : f === 'DL' ? 'Disneyland' : 'DCA'}
          </button>
        ))}
      </div>

      {noMatches && !showAll ? (
        <div className="ride-filter-empty">
          <p>
            <strong>No rides match all selected ages.</strong>
          </p>
          <p>
            Try removing one of the age filters, or check &quot;Show all rides&quot; above to see
            the full list with skip-worthy options dimmed.
          </p>
        </div>
      ) : (
        <div className="ride-matrix">
          {visibleRides.map((ride, i) => {
            const dim = hasAgeFilter && showAll && !rideMatches(ride, selectedAges)
            return <RideCard key={`${ride.id ?? ride.name}-${i}`} ride={ride} dimmed={dim} />
          })}
        </div>
      )}
    </>
  )
}
