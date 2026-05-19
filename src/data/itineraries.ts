export type Park = 'DL' | 'DCA' | 'HOPPER'
export type Pace = 'relaxed' | 'blitz'
export type Phase = 'first' | 'middle' | 'last' | 'only'

export type TimeBlockType =
  | 'rope-drop'
  | 'ride'
  | 'meal'
  | 'break'
  | 'll-booking'
  | 'show'
  | 'character'
  | 'travel'
  | 'tip'

export interface TimeBlock {
  id: string
  time: string
  durationMin: number
  type: TimeBlockType
  title: string
  body: string
  rideIds?: string[]
  llRideId?: string
}

export interface DayTemplate {
  id: string
  park: Park
  lightningLane: boolean
  nap: boolean
  pace: Pace
  phase: Phase
  title: string
  oneSentenceSummary: string
  blocks: TimeBlock[]
}

function stub(
  id: string,
  park: Park,
  lightningLane: boolean,
  nap: boolean,
  pace: Pace,
  phase: Phase,
  title: string
): DayTemplate {
  return {
    id,
    park,
    lightningLane,
    nap,
    pace,
    phase,
    title,
    oneSentenceSummary: 'TODO — populated in Session 2.',
    blocks: [],
  }
}

export const dayTemplates: DayTemplate[] = [
  // ===== Disneyland (15) =====
  stub(
    'dl-ll-nap-relaxed-first',
    'DL',
    true,
    true,
    'relaxed',
    'first',
    'Day 1 at Disneyland — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'dl-ll-nap-relaxed-middle',
    'DL',
    true,
    true,
    'relaxed',
    'middle',
    'Middle Day at Disneyland — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'dl-ll-nap-relaxed-last',
    'DL',
    true,
    true,
    'relaxed',
    'last',
    'Last Day at Disneyland — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'dl-ll-nap-relaxed-only',
    'DL',
    true,
    true,
    'relaxed',
    'only',
    'One Day at Disneyland — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'dl-ll-nonap-relaxed-first',
    'DL',
    true,
    false,
    'relaxed',
    'first',
    'Day 1 at Disneyland — Lightning Lane, No Nap, Relaxed Pace'
  ),
  stub(
    'dl-ll-nonap-relaxed-middle',
    'DL',
    true,
    false,
    'relaxed',
    'middle',
    'Middle Day at Disneyland — Lightning Lane, No Nap, Relaxed Pace'
  ),
  stub(
    'dl-ll-nonap-relaxed-last',
    'DL',
    true,
    false,
    'relaxed',
    'last',
    'Last Day at Disneyland — Lightning Lane, No Nap, Relaxed Pace'
  ),
  stub(
    'dl-ll-nonap-relaxed-only',
    'DL',
    true,
    false,
    'relaxed',
    'only',
    'One Day at Disneyland — Lightning Lane, No Nap, Relaxed Pace'
  ),
  stub(
    'dl-ll-nonap-blitz-only',
    'DL',
    true,
    false,
    'blitz',
    'only',
    'One Day at Disneyland — Lightning Lane, Blitz Pace'
  ),
  stub(
    'dl-ll-nonap-blitz-first',
    'DL',
    true,
    false,
    'blitz',
    'first',
    'Day 1 at Disneyland — Lightning Lane, Blitz Pace'
  ),
  stub(
    'dl-ll-nonap-blitz-last',
    'DL',
    true,
    false,
    'blitz',
    'last',
    'Last Day at Disneyland — Lightning Lane, Blitz Pace'
  ),
  stub(
    'dl-noll-nap-relaxed-only',
    'DL',
    false,
    true,
    'relaxed',
    'only',
    'One Day at Disneyland — No Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'dl-noll-nap-relaxed-first',
    'DL',
    false,
    true,
    'relaxed',
    'first',
    'Day 1 at Disneyland — No Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'dl-noll-nonap-relaxed-only',
    'DL',
    false,
    false,
    'relaxed',
    'only',
    'One Day at Disneyland — No Lightning Lane, No Nap, Relaxed Pace'
  ),
  stub(
    'dl-noll-nonap-relaxed-first',
    'DL',
    false,
    false,
    'relaxed',
    'first',
    'Day 1 at Disneyland — No Lightning Lane, No Nap, Relaxed Pace'
  ),

  // ===== DCA (6) =====
  stub(
    'dca-ll-nap-relaxed-only',
    'DCA',
    true,
    true,
    'relaxed',
    'only',
    'One Day at California Adventure — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'dca-ll-nap-relaxed-first',
    'DCA',
    true,
    true,
    'relaxed',
    'first',
    'Day 1 at California Adventure — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'dca-ll-nap-relaxed-last',
    'DCA',
    true,
    true,
    'relaxed',
    'last',
    'Last Day at California Adventure — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'dca-ll-nonap-blitz-only',
    'DCA',
    true,
    false,
    'blitz',
    'only',
    'One Day at California Adventure — Lightning Lane, Blitz Pace'
  ),
  stub(
    'dca-ll-nonap-blitz-first',
    'DCA',
    true,
    false,
    'blitz',
    'first',
    'Day 1 at California Adventure — Lightning Lane, Blitz Pace'
  ),
  stub(
    'dca-noll-nap-relaxed-only',
    'DCA',
    false,
    true,
    'relaxed',
    'only',
    'One Day at California Adventure — No Lightning Lane, Nap Break, Relaxed Pace'
  ),

  // ===== Park Hopper (4) =====
  stub(
    'hopper-ll-nap-relaxed-only',
    'HOPPER',
    true,
    true,
    'relaxed',
    'only',
    'Park Hopper Day — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'hopper-ll-nap-relaxed-first',
    'HOPPER',
    true,
    true,
    'relaxed',
    'first',
    'Park Hopper Day 1 — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'hopper-ll-nap-relaxed-last',
    'HOPPER',
    true,
    true,
    'relaxed',
    'last',
    'Park Hopper Last Day — Lightning Lane, Nap Break, Relaxed Pace'
  ),
  stub(
    'hopper-ll-nonap-blitz-only',
    'HOPPER',
    true,
    false,
    'blitz',
    'only',
    'Park Hopper Day — Lightning Lane, Blitz Pace'
  ),
]

export interface FindDayTemplateCriteria {
  park: Park
  lightningLane: boolean
  nap: boolean
  pace: Pace
  phase: Phase
}

export interface FindDayTemplateResult {
  template: DayTemplate
  degraded: boolean
  degradationReason?: string
}

/**
 * Look up a day template that matches the configurator criteria.
 *
 * Graceful degradation:
 * - If the exact combination doesn't exist AND the request is `blitz + nap`,
 *   the function returns the equivalent `relaxed` template instead, with
 *   `degraded: true` and a reason. Callers should surface that note in the UI
 *   so users understand the pace fell back.
 * - If no degradation path applies (e.g. DCA `phase: 'middle'`, since DCA
 *   intentionally has no 3-day middle-day template), the function returns
 *   `undefined`. Callers should render a friendly "this combo doesn't really
 *   work" message rather than treating it as an error.
 */
export function findDayTemplate(
  criteria: FindDayTemplateCriteria
): FindDayTemplateResult | undefined {
  const exact = dayTemplates.find(
    (t) =>
      t.park === criteria.park &&
      t.lightningLane === criteria.lightningLane &&
      t.nap === criteria.nap &&
      t.pace === criteria.pace &&
      t.phase === criteria.phase
  )
  if (exact) {
    return { template: exact, degraded: false }
  }

  // Blitz + nap → fall back to relaxed equivalent
  if (criteria.pace === 'blitz' && criteria.nap === true) {
    const relaxed = dayTemplates.find(
      (t) =>
        t.park === criteria.park &&
        t.lightningLane === criteria.lightningLane &&
        t.nap === criteria.nap &&
        t.pace === 'relaxed' &&
        t.phase === criteria.phase
    )
    if (relaxed) {
      return {
        template: relaxed,
        degraded: true,
        degradationReason:
          "Blitz pace + nap break don't really go together. We've planned a relaxed day for you instead. Toggle pace off blitz if you want.",
      }
    }
  }

  return undefined
}
