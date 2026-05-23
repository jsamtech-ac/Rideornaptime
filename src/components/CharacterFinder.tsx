'use client'

import { useMemo, useState } from 'react'
import {
  characters,
  type Character,
  type CharacterPark,
  LINE_LABEL,
  RELIABILITY_LABEL,
} from '@/data/characters'

type AgeKey = 'all' | 'age2' | 'age4' | 'age6' | 'age8'
type ParkKey = 'all' | CharacterPark

const PARK_OPTIONS: { id: ParkKey; label: string }[] = [
  { id: 'all', label: 'Both Parks' },
  { id: 'DL', label: 'Disneyland Park' },
  { id: 'DCA', label: 'California Adventure' },
]

const AGE_OPTIONS: { id: AgeKey; label: string }[] = [
  { id: 'all', label: 'Any Age' },
  { id: 'age2', label: 'Age 2' },
  { id: 'age4', label: 'Age 4' },
  { id: 'age6', label: 'Age 6' },
  { id: 'age8', label: 'Age 8' },
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
        <label htmlFor="character-search" className="visually-hidden" style={visuallyHidden}>
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

      <div className="character-finder-results">
        {filtered.length === 0 ? (
          <p className="character-finder-empty">
            No characters match those filters. Try clearing one — or search a different name.
          </p>
        ) : (
          filtered.map((c) => <CharacterCard key={c.id} character={c} />)
        )}
      </div>
    </div>
  )
}

function CharacterCard({ character }: { character: Character }) {
  const lineClass = `line-${character.expectedLine}`
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

      {character.locations.map((loc, i) => (
        <div key={`${loc.park}-${loc.land}-${i}`} className="character-finder-card-location">
          <span
            className={`character-finder-card-park ${loc.park === 'DL' ? 'dl' : 'dca'}`}
            aria-label={loc.park === 'DL' ? 'Disneyland Park' : 'California Adventure'}
          >
            {loc.park === 'DL' ? 'DL' : 'DCA'}
          </span>
          <strong>{loc.spot}</strong>
          <div style={{ marginTop: '0.2rem', fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
            {loc.land} · {RELIABILITY_LABEL[loc.reliability]}
            {loc.typicalTimes ? ` · ${loc.typicalTimes}` : ''}
          </div>
        </div>
      ))}

      {character.notes && <p className="character-finder-card-note">{character.notes}</p>}
    </article>
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
