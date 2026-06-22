'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  findDayTemplate,
  type Park,
  type Pace,
  type Phase,
  type TimeBlock,
  type TimeBlockType,
} from '@/data/itineraries'
import { findRideById } from '@/data/rides'

export interface DayConfig {
  park: Park
  lightningLane: boolean
  nap: boolean
  pace: Pace
}

interface ItineraryConfiguratorProps {
  /** If provided, the configurator starts in this state and does NOT sync to/from the URL. */
  initialDayStates?: DayConfig[]
  /** If false, changing the trip length navigates to a matching sub-route (or /itineraries). Default true. */
  allowDayCountChange?: boolean
}

const DEFAULT_DAY: DayConfig = {
  park: 'DL',
  lightningLane: true,
  nap: true,
  pace: 'relaxed',
}

const PARK_LABEL: Record<Park, string> = {
  DL: 'Disneyland',
  DCA: 'California Adventure',
  HOPPER: 'Park Hopper',
}

const PARK_CODE_TO_ENUM: Record<string, Park> = {
  DL: 'DL',
  DCA: 'DCA',
  HOP: 'HOPPER',
}

const ENUM_TO_PARK_CODE: Record<Park, string> = {
  DL: 'DL',
  DCA: 'DCA',
  HOPPER: 'HOP',
}

const BLOCK_ICON: Record<TimeBlockType, string> = {
  'rope-drop': '🌅',
  ride: '🎢',
  meal: '🍽',
  break: '😴',
  'll-booking': '📱',
  show: '🎆',
  character: '🐭',
  travel: '🚶',
  tip: '💡',
}

function phaseFor(index: number, total: number): Phase {
  if (total === 1) return 'only'
  if (index === 0) return 'first'
  if (index === total - 1) return 'last'
  return 'middle'
}

function serializeDay(d: DayConfig): string {
  return [
    ENUM_TO_PARK_CODE[d.park],
    `LL${d.lightningLane ? 'Y' : 'N'}`,
    `N${d.nap ? 'Y' : 'N'}`,
    d.pace === 'relaxed' ? 'R' : 'B',
  ].join('-')
}

function parseDay(segment: string): DayConfig | null {
  const parts = segment.split('-')
  if (parts.length !== 4) return null
  const [parkCode, ll, nap, pace] = parts
  const park = PARK_CODE_TO_ENUM[parkCode]
  if (!park) return null
  if (ll !== 'LLY' && ll !== 'LLN') return null
  if (nap !== 'NY' && nap !== 'NN') return null
  if (pace !== 'R' && pace !== 'B') return null
  return {
    park,
    lightningLane: ll === 'LLY',
    nap: nap === 'NY',
    pace: pace === 'R' ? 'relaxed' : 'blitz',
  }
}

function parseQuery(raw: string | null): DayConfig[] {
  if (!raw) return [DEFAULT_DAY]
  const segments = raw.split(',').slice(0, 3)
  const parsed = segments.map(parseDay).filter((d): d is DayConfig => d !== null)
  return parsed.length > 0 ? parsed : [DEFAULT_DAY]
}

function serializeDays(days: DayConfig[]): string {
  return days.map(serializeDay).join(',')
}

/**
 * Maps (park, dayCount) → sub-route path if one exists.
 * Used by sub-routes when the user changes trip length: navigate to the matching
 * canonical sub-route, or fall through to /itineraries with state preserved.
 */
function subRouteFor(park: Park, days: number): string | null {
  if (park === 'DL' && days === 1) return '/itineraries/disneyland-1-day'
  if (park === 'DL' && days === 2) return '/itineraries/disneyland-2-day'
  if (park === 'DL' && days === 3) return '/itineraries/disneyland-3-day'
  if (park === 'DCA' && days === 1) return '/itineraries/dca-1-day'
  if (park === 'DCA' && days === 2) return '/itineraries/dca-2-day'
  if (park === 'HOPPER' && days === 2) return '/itineraries/park-hopper-2-day'
  if (park === 'HOPPER' && days === 3) return '/itineraries/park-hopper-3-day'
  return null
}

export default function ItineraryConfigurator({
  initialDayStates,
  allowDayCountChange = true,
}: ItineraryConfiguratorProps = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const usingInitialProps = initialDayStates !== undefined

  const [days, setDays] = useState<DayConfig[]>(() => {
    if (usingInitialProps && initialDayStates) return initialDayStates
    return parseQuery(searchParams.get('days'))
  })

  // Only sync to URL on the main /itineraries page (when no initialDayStates are passed)
  useEffect(() => {
    if (usingInitialProps) return
    const qs = serializeDays(days)
    router.replace(`?days=${qs}`, { scroll: false })
  }, [days, router, usingInitialProps])

  function setTripLength(target: number) {
    if (!allowDayCountChange) {
      // On sub-routes, redirect to matching sub-route or /itineraries with state preserved
      const primaryPark = days[0]?.park ?? 'DL'
      const subRoute = subRouteFor(primaryPark, target)
      if (subRoute) {
        router.push(subRoute)
      } else {
        // Build a state for the target length using the current first day's config
        const base = days[0] ?? DEFAULT_DAY
        const next = Array(target).fill(base)
        router.push(`/itineraries?days=${serializeDays(next)}`)
      }
      return
    }
    setDays((prev) => {
      if (target === prev.length) return prev
      if (target > prev.length) {
        return [...prev, ...Array(target - prev.length).fill(DEFAULT_DAY)]
      }
      return prev.slice(0, target)
    })
  }

  function updateDay(idx: number, patch: Partial<DayConfig>) {
    setDays((prev) =>
      prev.map((d, i) => {
        if (i !== idx) return d
        const next = { ...d, ...patch }
        // If pace flips to blitz, force nap off
        if (next.pace === 'blitz' && next.nap === true) {
          next.nap = false
        }
        return next
      })
    )
  }

  return (
    <>
      <div className="configurator-panel">
        <div className="configurator-row">
          <div className="configurator-label">Trip length</div>
          <div className="segmented" role="radiogroup" aria-label="Trip length">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={days.length === n}
                className={`segmented-btn ${days.length === n ? 'active' : ''}`}
                onClick={() => setTripLength(n)}
              >
                {n} {n === 1 ? 'day' : 'days'}
              </button>
            ))}
          </div>
        </div>

        {days.map((day, i) => (
          <div key={i} className="configurator-day">
            <div className="configurator-day-label">
              Day {i + 1}
              {days.length > 1 ? ` of ${days.length}` : ''}
            </div>
            <div className="configurator-day-grid">
              <label className="configurator-field">
                <span>Park</span>
                <select
                  value={day.park}
                  onChange={(e) => updateDay(i, { park: e.target.value as Park })}
                >
                  <option value="DL">Disneyland</option>
                  <option value="DCA">California Adventure</option>
                  <option value="HOPPER">Park Hopper</option>
                </select>
              </label>

              <div className="configurator-field">
                <span>Lightning Lane</span>
                <div className="segmented small" role="radiogroup" aria-label="Lightning Lane">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={day.lightningLane}
                    className={`segmented-btn ${day.lightningLane ? 'active' : ''}`}
                    onClick={() => updateDay(i, { lightningLane: true })}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={!day.lightningLane}
                    className={`segmented-btn ${!day.lightningLane ? 'active' : ''}`}
                    onClick={() => updateDay(i, { lightningLane: false })}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="configurator-field">
                <span>Nap break</span>
                <div className="segmented small" role="radiogroup" aria-label="Nap break">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={day.nap}
                    disabled={day.pace === 'blitz'}
                    className={`segmented-btn ${day.nap ? 'active' : ''}`}
                    onClick={() => updateDay(i, { nap: true })}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={!day.nap}
                    disabled={day.pace === 'blitz'}
                    className={`segmented-btn ${!day.nap ? 'active' : ''}`}
                    onClick={() => updateDay(i, { nap: false })}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="configurator-field">
                <span>Pace</span>
                <div className="segmented small" role="radiogroup" aria-label="Pace">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={day.pace === 'relaxed'}
                    className={`segmented-btn ${day.pace === 'relaxed' ? 'active' : ''}`}
                    onClick={() => updateDay(i, { pace: 'relaxed' })}
                  >
                    Relaxed
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={day.pace === 'blitz'}
                    className={`segmented-btn ${day.pace === 'blitz' ? 'active' : ''}`}
                    onClick={() => updateDay(i, { pace: 'blitz' })}
                  >
                    Blitz
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="plan-output">
        {days.map((day, i) => (
          <DayCard key={i} day={day} index={i} total={days.length} />
        ))}
      </div>
    </>
  )
}

function DayCard({ day, index, total }: { day: DayConfig; index: number; total: number }) {
  const phase = phaseFor(index, total)
  const result = useMemo(
    () =>
      findDayTemplate({
        park: day.park,
        lightningLane: day.lightningLane,
        nap: day.nap,
        pace: day.pace,
        phase,
      }),
    [day, phase]
  )

  if (!result) {
    return (
      <div className="day-card">
        <div className="day-card-header">
          <h3>
            Day {index + 1}
            {total > 1 ? ` of ${total}` : ''} — {PARK_LABEL[day.park]}
          </h3>
        </div>
        <div className="callout warning">
          <div className="callout-label">Doesn't really work</div>
          <p>
            {day.park === 'DCA'
              ? "DCA doesn't really fill 3 days. Consider a Park Hopper for Day 2, or swap to a Disneyland day."
              : "This combination doesn't have a template yet. Try switching the park, Lightning Lane, or pace toggle."}
          </p>
        </div>
      </div>
    )
  }

  const { template, degraded, degradationReason } = result

  return (
    <div className="day-card">
      <div className="day-card-header">
        <h3>{template.title}</h3>
        {template.oneSentenceSummary &&
          template.oneSentenceSummary !== 'TODO — populated in Session 2.' && (
            <p className="day-card-summary">{template.oneSentenceSummary}</p>
          )}
      </div>

      {degraded && degradationReason && (
        <div className="callout pro">
          <div className="callout-label">Pace note</div>
          <p>{degradationReason}</p>
        </div>
      )}

      {template.blocks.length === 0 ? (
        <div className="callout">
          <div className="callout-label">Coming soon</div>
          <p>Itinerary content for this combination lands in a later session.</p>
        </div>
      ) : (
        <Timeline blocks={template.blocks} />
      )}
    </div>
  )
}

function Timeline({ blocks }: { blocks: TimeBlock[] }) {
  return (
    <div className="plan-timeline">
      {blocks.map((b) => (
        <TimelineRow key={b.id} block={b} />
      ))}
    </div>
  )
}

function TimelineRow({ block }: { block: TimeBlock }) {
  const llRide = block.llRideId ? findRideById(block.llRideId) : undefined

  return (
    <div className="plan-timeline-row" data-type={block.type}>
      <div className="plan-timeline-time">{block.time}</div>
      <div className="plan-timeline-body">
        <div className="plan-timeline-title">
          <span aria-hidden="true">{BLOCK_ICON[block.type]}</span> {block.title}
        </div>
        <p className="plan-timeline-text">{block.body}</p>
        {llRide && (
          <div className="plan-timeline-ll">
            <span aria-hidden="true">📱</span> Book Lightning Lane: <strong>{llRide.name}</strong>
          </div>
        )}
      </div>
    </div>
  )
}
