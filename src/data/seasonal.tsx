import type { ReactNode } from 'react'

/**
 * Date-driven seasonal content for /characters.
 *
 * Everything here is keyed off real dates rather than a hand-flipped flag, so
 * the page tells the truth on any given day without a code change: the Lunar
 * New Year block stops reading as current once February ends, and the Halloween
 * blocks stop being "coming up" on Aug 21 and "current" on Nov 1 by themselves.
 *
 * Dates are the volatile part, so they live at the top of each entry — editing
 * one is a one-line change, not a prose rewrite.
 */

export type SeasonalStatus = 'upcoming' | 'active' | 'ended'

/** Park time. Matches the timezone the news ticker already formats in. */
export function parkToday(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' })
}

export interface SeasonalEvent {
  id: string
  emoji: string
  title: string
  /** YYYY-MM-DD, inclusive. */
  startDate: string
  /** YYYY-MM-DD, inclusive. */
  endDate: string
  /** Human-readable date range shown on the card. */
  dateLabel: string
  cost: string
  body: ReactNode
}

/**
 * A note that is only true for a window — a refurb, a paused offering. Renders
 * only while today falls inside it, then disappears with no cleanup edit.
 */
export interface DatedNote {
  id: string
  startDate: string
  endDate: string
  label: string
  text: ReactNode
}

export function statusFor(
  event: Pick<SeasonalEvent, 'startDate' | 'endDate'>,
  today = parkToday()
): SeasonalStatus {
  if (today < event.startDate) return 'upcoming'
  if (today > event.endDate) return 'ended'
  return 'active'
}

export const STATUS_LABEL: Record<SeasonalStatus, string> = {
  upcoming: 'Coming up',
  active: 'On now',
  ended: 'Ended for 2026',
}

/** True while today is inside the note's window. */
export function noteIsCurrent(note: DatedNote, today = parkToday()): boolean {
  return today >= note.startDate && today <= note.endDate
}

export function currentNote(id: string, today = parkToday()): DatedNote | null {
  const note = DATED_NOTES.find((n) => n.id === id)
  return note && noteIsCurrent(note, today) ? note : null
}

export const DATED_NOTES: DatedNote[] = [
  {
    id: 'haunted-mansion-conversion',
    startDate: '2026-08-08',
    endDate: '2026-08-20',
    label: 'Closed right now',
    text: (
      <>
        <strong>Haunted Mansion is closed Aug 8–20, 2026</strong> while it converts to Haunted
        Mansion Holiday. If you are visiting this week, the ride Jack &amp; Sally are themed around
        is behind a wall — plan the New Orleans Square stretch around that and come back after the
        21st.
      </>
    ),
  },
  {
    id: 'plaza-inn-pause',
    startDate: '2026-08-17',
    endDate: '2026-09-30',
    label: 'Paused right now',
    text: (
      <>
        <strong>Minnie &amp; Friends at Plaza Inn is paused as of Aug 17, 2026</strong>, expected
        back late September — Disney has not published an exact return date. Book one of the three
        hotel character meals instead; none of them need a park ticket.
      </>
    ),
  },
]

export const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: 'lunar-new-year',
    emoji: '🐉',
    title: 'Lunar New Year at DCA',
    startDate: '2026-01-23',
    endDate: '2026-02-22',
    dateLabel: 'Jan 23 – Feb 22, 2026',
    cost: 'Included with park admission',
    body: (
      <>
        <strong>Mulan</strong> anchors the Paradise Gardens procession with <strong>Mushu</strong>.
        The one consistent window to meet Mulan, who&rsquo;s rare in Royal Hall the rest of the
        year.
      </>
    ),
  },
  {
    id: 'oogie-boogie-bash',
    emoji: '👻',
    title: 'Oogie Boogie Bash at DCA',
    startDate: '2026-08-18',
    endDate: '2026-10-31',
    dateLabel: 'Aug 18 – Oct 31, 33 select nights',
    cost: 'Separate ticket — ~$139–$199',
    body: (
      <>
        The only reliable way to meet{' '}
        <strong>Maleficent, Cruella, the Evil Queen, Oogie Boogie</strong>, and other rare villains.
        33 nights in 2026 — a record — and they are actively selling out, October first.
        <br />
        <br />
        The value argument nobody makes: your party ticket gets you into DCA at{' '}
        <strong>3 PM for a party that runs 6–11 PM</strong>, so you are really buying eight hours,
        not five. Against that: <strong>no Lightning Lane of any kind</strong> — Multi Pass, Premier
        Pass and Single Pass are all off during the party — and{' '}
        <strong>parking is not included</strong> ($40 unless you hold a parking pass).
      </>
    ),
  },
  {
    id: 'halloween-time',
    emoji: '🎃',
    title: 'Halloween Time at Disneyland',
    startDate: '2026-08-21',
    endDate: '2026-10-31',
    dateLabel: 'Aug 21 – Oct 31, 2026',
    cost: 'Included with park admission',
    body: (
      <>
        Fab Five in Halloween costumes all day, and this is the stretch where{' '}
        <strong>villains actually turn up in Fantasyland on a regular park ticket</strong> — the one
        time of year that is true. The standout meet:{' '}
        <strong>Jack &amp; Sally in New Orleans Square near the Royal Street Veranda</strong>, their
        only regular-park appearance of the year.
        <br />
        <br />
        Do not rope-drop them. They typically come out around{' '}
        <strong>11 AM and stay through the afternoon</strong>, so an 8 AM sprint buys you nothing.
        Jack was redesigned in 2025 — rounder head, much closer to the film.
      </>
    ),
  },
  {
    id: 'plaza-de-la-familia',
    emoji: '💀',
    title: 'Plaza de la Familia at DCA',
    startDate: '2026-08-21',
    endDate: '2026-11-02',
    dateLabel: 'Aug 21 – Nov 2, 2026',
    cost: 'Included with park admission',
    body: (
      <>
        <strong>Miguel and Dante</strong> (from Coco) meet near Paradise Gardens during the Día de
        los Muertos celebration. Beautiful 25-minute musical storytelling set — kids who love Coco
        will sit through the whole thing.
      </>
    ),
  },
  {
    id: 'holidays',
    emoji: '🎄',
    title: 'Holidays at the Disneyland Resort',
    startDate: '2026-11-18',
    endDate: '2027-01-06',
    dateLabel: 'Nov 18, 2026 – early Jan 2027',
    cost: 'Included with park admission',
    body: (
      <>
        Santa Goofy in Toontown, toy soldiers on Main Street, Fab Five in holiday attire at Town
        Square. The <strong>¡Viva Navidad! street party</strong> in DCA&rsquo;s Paradise Gardens
        with Donald, Daisy, Panchito, and José is one of the best character experiences of the year
        — no line required.
      </>
    ),
  },
]

/** Chronological within status: on now, then coming up, then ended. */
export function sortedSeasonalEvents(today = parkToday()): SeasonalEvent[] {
  const rank: Record<SeasonalStatus, number> = { active: 0, upcoming: 1, ended: 2 }
  return [...SEASONAL_EVENTS].sort((a, b) => {
    const byStatus = rank[statusFor(a, today)] - rank[statusFor(b, today)]
    return byStatus !== 0 ? byStatus : a.startDate.localeCompare(b.startDate)
  })
}
