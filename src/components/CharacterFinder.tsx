'use client'

import { useMemo, useState } from 'react'
import {
  characters,
  type Character,
  type CharacterLocation,
  type CharacterPark,
  LINE_LABEL,
  RELIABILITY_LABEL,
  DL_LAND_ORDER,
  DCA_LAND_ORDER,
  DL_LAND_INTROS,
  DCA_LAND_INTROS,
} from '@/data/characters'

type AgeKey = 'all' | 'age2' | 'age4' | 'age6' | 'age8'
type ParkKey = 'all' | CharacterPark
type ViewMode = 'cards' | 'location'

const PARK_OPTIONS: { id: ParkKey; label: string }[] = [
  { id: 'all', label: 'Both Parks' },
  { id: 'DL', label: 'Disneyland' },
  { id: 'DCA', label: 'California Adventure' },
]

const AGE_OPTIONS: { id: AgeKey; label: string }[] = [
  { id: 'all', label: 'Any Age' },
  { id: 'age2', label: 'Age 2' },
  { id: 'age4', label: 'Age 4' },
  { id: 'age6', label: 'Age 6' },
  { id: 'age8', label: 'Age 8' },
]

const VIEW_OPTIONS: { id: ViewMode; label: string }[] = [
  { id: 'cards', label: 'Card grid' },
  { id: 'location', label: 'By location' },
]

const FRANCHISES = ['all', ...Array.from(new Set(characters.map((c) => c.franchise))).sort()]

function matchesQuery(c: Character, q: string): boolean {
  if (!q) return true
  const needle = q.toLowerCase().trim()
  if (!needle) return true
  if (c.name.toLowerCase().includes(needle)) return true
  if (c.franchise.toLowerCase().includes(needle)) return true
  for (const loc of c.locations) {
    if (loc.land.toLowerCase().includes(needle)) return true
    if (loc.spot.toLowerCase().includes(needle)) return true
  }
  return false
}

export default function CharacterFinder() {
  const [query, setQuery] = useState('')
  const [park, setPark] = useState<ParkKey>('all')
  const [age, setAge] = useState<AgeKey>('all')
  const [franchise, setFranchise] = useState<string>('all')
  const [view, setView] = useState<ViewMode>('cards')

  const hasActiveFilters =
    query.trim().length > 0 || park !== 'all' || age !== 'all' || franchise !== 'all'

  const filtered = useMemo(() => {
    return characters.filter((c) => {
      if (!matchesQuery(c, query)) return false
      if (park !== 'all' && !c.locations.some((l) => l.park === park)) return false
      if (franchise !== 'all' && c.franchise !== franchise) return false
      if (age !== 'all') {
        const v = c.kidAppeal[age]
        if (v === 'skip') return false
      }
      return true
    })
  }, [query, park, age, franchise])

  function clearAll() {
    setQuery('')
    setPark('all')
    setAge('all')
    setFranchise('all')
  }

  return (
    <div className="character-finder">
      <div className="character-finder-search-wrap">
        <span className="character-finder-search-icon" aria-hidden="true">
          🔍
        </span>
        <label htmlFor="character-search" style={visuallyHidden}>
          Search characters by name, franchise, land, or spot
        </label>
        <input
          id="character-search"
          type="search"
          inputMode="search"
          autoComplete="off"
          placeholder="Search a character (Mickey, Elsa, Spider-Man, Tiana…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="character-finder-search"
        />
      </div>

      <div className="character-finder-filters" role="group" aria-label="Filters">
        <div className="character-finder-filter-row">
          <span className="character-finder-filter-label">Park</span>
          {PARK_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className="character-finder-chip"
              aria-pressed={park === opt.id}
              onClick={() => setPark(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="character-finder-filter-row">
          <span className="character-finder-filter-label">Best for</span>
          {AGE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className="character-finder-chip"
              aria-pressed={age === opt.id}
              onClick={() => setAge(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="character-finder-filter-row">
          <label
            htmlFor="character-franchise"
            className="character-finder-filter-label"
            style={{ marginRight: 0 }}
          >
            Franchise
          </label>
          <select
            id="character-franchise"
            className="character-finder-select"
            value={franchise}
            onChange={(e) => setFranchise(e.target.value)}
          >
            {FRANCHISES.map((f) => (
              <option key={f} value={f}>
                {f === 'all' ? 'All franchises' : f}
              </option>
            ))}
          </select>
        </div>

        <div className="character-finder-filter-row">
          <span className="character-finder-filter-label">View</span>
          {VIEW_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className="character-finder-chip"
              aria-pressed={view === opt.id}
              onClick={() => setView(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="character-finder-meta" aria-live="polite">
        <span>
          Showing <strong>{filtered.length}</strong> of {characters.length} characters
        </span>
        {hasActiveFilters && (
          <button type="button" className="character-finder-clear" onClick={clearAll}>
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="character-finder-empty">
          No characters match those filters. Try clearing one — or search a different name.
        </p>
      ) : view === 'cards' ? (
        <div className="character-finder-results">
          {filtered.map((c) => (
            <CharacterCard key={c.id} character={c} parkFilter={park} />
          ))}
        </div>
      ) : (
        <LocationView characters={filtered} parkFilter={park} />
      )}
    </div>
  )
}

function CharacterCard({
  character,
  parkFilter,
}: {
  character: Character
  parkFilter: ParkKey
}) {
  const lineClass = `line-${character.expectedLine}`
  const locations =
    parkFilter === 'all'
      ? character.locations
      : character.locations.filter((l) => l.park === parkFilter)
  return (
    <article className="character-finder-card">
      <header>
        <h3 className="character-finder-card-name">{character.name}</h3>
        <div className="character-finder-card-franchise">{character.franchise}</div>
      </header>

      <div className="character-finder-card-tags">
        <span className={`character-finder-card-tag ${lineClass}`}>
          {LINE_LABEL[character.expectedLine]}
        </span>
      </div>

      {locations.map((loc, i) => (
        <div key={`${loc.park}-${loc.land}-${i}`} className="character-finder-card-location">
          <span
            className={`character-finder-card-park ${loc.park === 'DL' ? 'dl' : 'dca'}`}
            aria-label={loc.park === 'DL' ? 'Disneyland Park' : 'California Adventure'}
          >
            {loc.park === 'DL' ? 'DL' : 'DCA'}
          </span>
          <strong>{loc.spot}</strong>
          <div className="character-finder-card-meta">
            {loc.land} · {RELIABILITY_LABEL[loc.reliability]}
            {loc.typicalTimes ? ` · ${loc.typicalTimes}` : ''}
          </div>
        </div>
      ))}

      {character.notes && <p className="character-finder-card-note">{character.notes}</p>}
    </article>
  )
}

// ─── By-Location view ────────────────────────────────────────────────────────

interface RowEntry {
  character: Character
  location: CharacterLocation
}

function groupRowsByLand(
  chars: Character[],
  park: CharacterPark,
  landOrder: string[],
): { land: string; entries: RowEntry[] }[] {
  const byLand: Record<string, RowEntry[]> = {}
  for (const c of chars) {
    for (const loc of c.locations) {
      if (loc.park !== park) continue
      ;(byLand[loc.land] ||= []).push({ character: c, location: loc })
    }
  }
  const orderedKeys = [
    ...landOrder.filter((l) => byLand[l]),
    ...Object.keys(byLand)
      .filter((l) => !landOrder.includes(l))
      .sort(),
  ]
  return orderedKeys.map((land) => ({ land, entries: byLand[land] }))
}

function LocationView({
  characters: chars,
  parkFilter,
}: {
  characters: Character[]
  parkFilter: ParkKey
}) {
  const showDL = parkFilter === 'all' || parkFilter === 'DL'
  const showDCA = parkFilter === 'all' || parkFilter === 'DCA'

  const dlGroups = showDL ? groupRowsByLand(chars, 'DL', DL_LAND_ORDER) : []
  const dcaGroups = showDCA ? groupRowsByLand(chars, 'DCA', DCA_LAND_ORDER) : []

  const dlCount = dlGroups.reduce((n, g) => n + g.entries.length, 0)
  const dcaCount = dcaGroups.reduce((n, g) => n + g.entries.length, 0)

  return (
    <div className="character-finder-location-view">
      {showDL && dlCount > 0 && (
        <ParkBlock
          parkLabel="Disneyland Park"
          parkBadge="DL"
          parkClass="dl"
          groups={dlGroups}
          intros={DL_LAND_INTROS}
        />
      )}
      {showDCA && dcaCount > 0 && (
        <ParkBlock
          parkLabel="Disney California Adventure"
          parkBadge="DCA"
          parkClass="dca"
          groups={dcaGroups}
          intros={DCA_LAND_INTROS}
        />
      )}
    </div>
  )
}

function ParkBlock({
  parkLabel,
  parkBadge,
  parkClass,
  groups,
  intros,
}: {
  parkLabel: string
  parkBadge: string
  parkClass: 'dl' | 'dca'
  groups: { land: string; entries: RowEntry[] }[]
  intros: Record<string, string>
}) {
  return (
    <div className="park-block">
      <h3 className="park-block-title">
        <span className={`park-block-badge ${parkClass}`} aria-hidden="true">
          {parkBadge}
        </span>
        {parkLabel}
      </h3>
      {groups.map(({ land, entries }) => (
        <div key={land} className="land-group">
          <h4 className="land-group-title">{land}</h4>
          {intros[land] && <p className="land-group-intro">{intros[land]}</p>}
          <ul className="land-group-list">
            {entries.map((r) => (
              <li
                key={`${r.character.id}-${r.location.spot}`}
                className="land-group-row"
              >
                <div className="land-group-row-head">
                  <strong className="land-group-row-name">{r.character.name}</strong>
                  <span className={`character-finder-card-tag line-${r.character.expectedLine}`}>
                    {LINE_LABEL[r.character.expectedLine]}
                  </span>
                </div>
                <div className="land-group-row-where">
                  {r.location.spot}
                  {r.location.typicalTimes ? ` · ${r.location.typicalTimes}` : ''}
                </div>
                <div className="land-group-row-meta">
                  {RELIABILITY_LABEL[r.location.reliability]}
                </div>
                {r.character.notes && (
                  <p className="land-group-row-note">{r.character.notes}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
}
