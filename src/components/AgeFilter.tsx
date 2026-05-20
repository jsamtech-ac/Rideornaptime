'use client'

export type AgeBracket = 2 | 4 | 6 | 8

const ALL_AGES: AgeBracket[] = [2, 4, 6, 8]

export interface AgeFilterProps {
  selectedAges: AgeBracket[]
  onChange: (ages: AgeBracket[]) => void
  /** When true, the "Show all rides" toggle is rendered. */
  showAllToggle: boolean
  /** Current state of the "Show all rides" toggle (highlight mode). */
  showAll: boolean
  onShowAllToggle: (showAll: boolean) => void
  /** Optional counts for the status line. Omit to hide the status line. */
  matchCount?: number
  totalCount?: number
}

function formatAgeList(ages: AgeBracket[]): string {
  if (ages.length === 0) return ''
  if (ages.length === 1) return `age ${ages[0]}`
  if (ages.length === 2) return `ages ${ages[0]} and ${ages[1]}`
  const last = ages[ages.length - 1]
  const head = ages.slice(0, -1).join(', ')
  return `ages ${head}, and ${last}`
}

export default function AgeFilter({
  selectedAges,
  onChange,
  showAllToggle,
  showAll,
  onShowAllToggle,
  matchCount,
  totalCount,
}: AgeFilterProps) {
  const sorted = [...selectedAges].sort((a, b) => a - b)
  const hasFilter = sorted.length > 0

  function togglePill(age: AgeBracket) {
    if (selectedAges.includes(age)) {
      onChange(selectedAges.filter((a) => a !== age))
    } else {
      onChange([...selectedAges, age].sort((a, b) => a - b))
    }
  }

  function clear() {
    onChange([])
  }

  const showStatus = hasFilter && typeof matchCount === 'number' && typeof totalCount === 'number'

  return (
    <div className="age-filter">
      <div className="age-filter-label">Filter by age group</div>
      <div className="age-filter-pills" role="group" aria-label="Filter rides by age">
        {ALL_AGES.map((age) => {
          const active = selectedAges.includes(age)
          return (
            <button
              key={age}
              type="button"
              className={`age-filter-pill ${active ? 'active' : ''}`}
              aria-pressed={active}
              onClick={() => togglePill(age)}
            >
              Age {age}
            </button>
          )
        })}
        {hasFilter && (
          <button
            type="button"
            className="age-filter-clear"
            onClick={clear}
            aria-label="Clear age filter"
          >
            Clear filters
          </button>
        )}
      </div>

      {showAllToggle && (
        <label className="age-filter-show-all">
          <input
            type="checkbox"
            checked={showAll}
            onChange={(e) => onShowAllToggle(e.target.checked)}
          />
          <span>Show all rides (highlight matches, dim the rest)</span>
        </label>
      )}

      {showStatus && (
        <div className="age-filter-status" aria-live="polite">
          Showing {matchCount} of {totalCount} rides for {formatAgeList(sorted)}
        </div>
      )}
    </div>
  )
}
