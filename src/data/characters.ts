export type CharacterPark = 'DL' | 'DCA'

export type Reliability = 'scheduled' | 'roaming' | 'rare'

export type LineExpectation = 'short' | 'medium' | 'long' | 'very-long'

export type KidVerdict = 'must-meet' | 'great' | 'maybe' | 'skip'

export interface CharacterLocation {
  park: CharacterPark
  land: string
  spot: string
  typicalTimes?: string
  reliability: Reliability
}

export interface CharacterKidAppeal {
  age2: KidVerdict
  age4: KidVerdict
  age6: KidVerdict
  age8: KidVerdict
}

export interface Character {
  id: string
  name: string
  franchise: string
  locations: CharacterLocation[]
  kidAppeal: CharacterKidAppeal
  expectedLine: LineExpectation
  notes?: string
}

export const LINE_LABEL: Record<LineExpectation, string> = {
  short: 'Short (under 15 min)',
  medium: 'Medium (15–30 min)',
  long: 'Long (30–60 min)',
  'very-long': 'Very long (60+ min)',
}

export const RELIABILITY_LABEL: Record<Reliability, string> = {
  scheduled: 'Scheduled in the Disneyland app',
  roaming: "Roaming — you'll find them by walking the land",
  rare: 'Rare — sporadic, no posted schedule',
}

export const VERDICT_LABEL: Record<KidVerdict, string> = {
  'must-meet': 'Must meet',
  great: 'Great',
  maybe: 'Maybe',
  skip: 'Skip',
}

export const DL_LAND_ORDER = [
  'Main Street, U.S.A.',
  'Fantasyland',
  'Fantasyland (Fantasy Faire)',
  'Adventureland',
  'Frontierland',
  'New Orleans Square',
  'Critter Country',
  "Star Wars: Galaxy's Edge",
  "Mickey's Toontown",
]

export const DCA_LAND_ORDER = [
  'Buena Vista Street',
  'Hollywood Land',
  'Avengers Campus',
  'Pixar Pier',
  'Paradise Gardens',
  'Cars Land',
]

export const DL_LAND_INTROS: Record<string, string> = {
  'Main Street, U.S.A.':
    'Town Square Theater is the headline Mickey meet — be in line by 9:05 AM or come back after 4 PM.',
  Fantasyland:
    'The roaming hotspot. Alice, Mad Hatter, Peter Pan, Captain Hook, Fairy Godmother — all walk-ups, no formal lines.',
  'Fantasyland (Fantasy Faire)':
    'Royal Hall rotates 3 princesses per visit. Ask the cast member at the door which 3 are inside before joining.',
  Adventureland:
    "Moana's spot is still settling in 2026. Tarzan and Indy moments are tied to the attractions, not formal meets.",
  Frontierland:
    'Big Thunder Trail is a quiet character corner — Woody, Jessie, Pocahontas all roam. El Zocalo Park hosts Miguel and Mirabel.',
  'New Orleans Square':
    "Tiana has a regular presence here since Tiana's Bayou Adventure replaced Splash Mountain. Easier walk-up than Royal Hall.",
  'Critter Country': 'Chip & Dale roam near Hungry Bear Restaurant. Usually a walk-up.',
  "Star Wars: Galaxy's Edge":
    "Moments and patrols, not photo lines. Walk the land and you'll cross paths with Rey, Chewbacca, Stormtroopers, and Mando & Grogu (live since May 22, 2026).",
  "Mickey's Toontown":
    "The single densest character zone in the resort. Mickey & Minnie's Runaway Railway is here, and the playground has one exit so kids can run while you regroup.",
}

export const DCA_LAND_INTROS: Record<string, string> = {
  'Buena Vista Street':
    'Mostly atmosphere characters and cavalcade appearances. Not a destination meet area on most days.',
  'Hollywood Land':
    'Anna & Elsa Royal Welcome is here — the most demanded meet at the resort. Mike & Sulley meet near the Monsters, Inc. attraction (closing 2027).',
  'Avengers Campus':
    "The Marvel lineup. Spider-Man's rooftop drop is the showstopper — set a reminder in the app and be in position 15 min early.",
  'Pixar Pier':
    'The roam-heaviest area in the resort. Buzz, Joy & Sadness, Incredibles, and the Toy Story crew all rotate here.',
  'Paradise Gardens':
    'Seasonal meets — Mulan during Lunar New Year (Jan 23 – Feb 22), Miguel & Dante during Plaza de la Familia (Aug 21 – Nov 2).',
  'Cars Land':
    'Mostly themed atmosphere — Lightning McQueen and Mater appear rarely. The land itself is the meet.',
}

export const characters: Character[] = [
  // ─── CLASSIC FAB FIVE & FRIENDS ────────────────────────────────────────────
  {
    id: 'mickey-mouse',
    name: 'Mickey Mouse',
    franchise: 'Classic',
    locations: [
      {
        park: 'DL',
        land: 'Main Street, U.S.A.',
        spot: 'Town Square Theater',
        typicalTimes: 'All day, park open until 1 hour before close',
        reliability: 'scheduled',
      },
      {
        park: 'DL',
        land: "Mickey's Toontown",
        spot: "Mickey & Minnie's Runaway Railway exit area",
        typicalTimes: 'Intermittent throughout the day',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'very-long',
    notes:
      'If Mickey is the must-do, get in line at Town Square Theater by 9:05 AM. By 10 AM it balloons to 60 minutes and never recovers.',
  },
  {
    id: 'minnie-mouse',
    name: 'Minnie Mouse',
    franchise: 'Classic',
    locations: [
      {
        park: 'DL',
        land: "Mickey's Toontown",
        spot: "Minnie's House (when open) or roaming Toontown",
        typicalTimes: 'Most of operating day',
        reliability: 'scheduled',
      },
      {
        park: 'DL',
        land: 'Main Street, U.S.A.',
        spot: 'Town Square — alternating with Mickey',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'great', age8: 'great' },
    expectedLine: 'long',
    notes:
      "Toontown is usually shorter than Town Square for Minnie. Hit her there before 10 AM and you're in and out in 20 minutes.",
  },
  {
    id: 'donald-duck',
    name: 'Donald Duck',
    franchise: 'Classic',
    locations: [
      {
        park: 'DL',
        land: "Mickey's Toontown",
        spot: "Donald's Boat dock area, roaming",
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'great', age8: 'maybe' },
    expectedLine: 'medium',
    notes:
      'Donald is one of the funniest characters to meet — he mimes a tantrum if you ask for autographs in a bad order. Worth bringing a fat Sharpie for.',
  },
  {
    id: 'goofy',
    name: 'Goofy',
    franchise: 'Classic',
    locations: [
      {
        park: 'DL',
        land: "Mickey's Toontown",
        spot: "Goofy's How-To-Play Yard area, roaming",
        reliability: 'roaming',
      },
      {
        park: 'DL',
        land: 'Main Street, U.S.A.',
        spot: 'Occasional Main Street appearances',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      "Goofy hams it up for photos better than any other character. If your kid is shy, Goofy is the easiest first meet — he'll do the work.",
  },
  {
    id: 'pluto',
    name: 'Pluto',
    franchise: 'Classic',
    locations: [
      {
        park: 'DL',
        land: "Mickey's Toontown",
        spot: 'Roaming, usually near central plaza',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'great', age8: 'maybe' },
    expectedLine: 'short',
    notes:
      'Pluto is the friendliest big-costume character for nervous toddlers — he greets gently and lets kids pet him like a dog.',
  },
  {
    id: 'chip-and-dale',
    name: 'Chip & Dale',
    franchise: 'Classic',
    locations: [
      {
        park: 'DL',
        land: 'Critter Country',
        spot: 'Near Hungry Bear Restaurant, roaming',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'great', age8: 'maybe' },
    expectedLine: 'short',
    notes:
      'Easy walk-ups. Also a fixture at Storytellers Café character breakfast at the Grand Californian — if Chip & Dale are the bullseye, book that meal.',
  },

  // ─── PRINCESSES (DL) ──────────────────────────────────────────────────────
  {
    id: 'cinderella',
    name: 'Cinderella',
    franchise: 'Princesses',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland (Fantasy Faire)',
        spot: 'Royal Hall',
        typicalTimes: 'Park open until ~6 PM',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'great', age8: 'maybe' },
    expectedLine: 'long',
    notes:
      'Royal Hall rotates three princesses per visit, randomized. Ask the cast member at the door which three are inside before you join the line — if your kid only wants Cinderella, you can wait for the right rotation.',
  },
  {
    id: 'aurora',
    name: 'Aurora (Sleeping Beauty)',
    franchise: 'Princesses',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland (Fantasy Faire)',
        spot: 'Royal Hall',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'great', age8: 'maybe' },
    expectedLine: 'long',
    notes:
      "Aurora is one of the most consistently-present Royal Hall princesses. If you're flexible on which princess, you'll almost always catch her.",
  },
  {
    id: 'snow-white',
    name: 'Snow White',
    franchise: 'Princesses',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland (Fantasy Faire)',
        spot: 'Royal Hall',
        reliability: 'scheduled',
      },
      {
        park: 'DL',
        land: 'Fantasyland',
        spot: "Near Snow White's Wishing Well",
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'great', age8: 'maybe' },
    expectedLine: 'long',
    notes:
      'Snow White also wanders near the Wishing Well periodically — a quieter meet than Royal Hall if you happen to catch her there.',
  },
  {
    id: 'rapunzel',
    name: 'Rapunzel',
    franchise: 'Princesses',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland (Fantasy Faire)',
        spot: 'Royal Hall',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'long',
    notes:
      'Rapunzel is in the front of the rotation more often than not — she has wide appeal across ages because the Tangled fanbase spans 2 to 12.',
  },
  {
    id: 'mulan',
    name: 'Mulan',
    franchise: 'Princesses',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland (Fantasy Faire)',
        spot: 'Royal Hall (less frequent rotation)',
        reliability: 'rare',
      },
      {
        park: 'DCA',
        land: 'Paradise Gardens',
        spot: 'Lunar New Year Procession (seasonal)',
        typicalTimes: 'Jan 23 – Feb 22 only',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      'Mulan is rare year-round but reliable during Lunar New Year at DCA. If your kid is Mulan-obsessed, plan around January–February.',
  },
  {
    id: 'tiana',
    name: 'Tiana',
    franchise: 'Princesses',
    locations: [
      {
        park: 'DL',
        land: 'New Orleans Square',
        spot: "Near Tiana's Bayou Adventure / French Market",
        typicalTimes: 'Multiple slots throughout the day',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      "Since Tiana's Bayou Adventure replaced Splash Mountain, Tiana has a regular presence in New Orleans Square. Way easier walk-up than Royal Hall.",
  },
  {
    id: 'pocahontas',
    name: 'Pocahontas',
    franchise: 'Princesses',
    locations: [
      {
        park: 'DL',
        land: 'Frontierland',
        spot: 'Big Thunder Trail near the Rivers of America',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'maybe', age4: 'great', age6: 'great', age8: 'maybe' },
    expectedLine: 'short',
    notes:
      'Often a walk-up. Pair this with riding Big Thunder Mountain or hitting Woody & Jessie nearby — three meets and a coaster in one corner.',
  },
  {
    id: 'belle',
    name: 'Belle',
    franchise: 'Princesses',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland (Fantasy Faire)',
        spot: 'Royal Hall',
        reliability: 'scheduled',
      },
      {
        park: 'DL',
        land: 'Fantasyland',
        spot: 'Storytelling at the Royal Theatre (with Beast, occasional)',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'great', age8: 'maybe' },
    expectedLine: 'long',
    notes:
      "Belle also appears in Storytellers Café's character breakfast at the Grand Californian — easier interaction than the Royal Hall line.",
  },
  {
    id: 'moana',
    name: 'Moana',
    franchise: 'Princesses',
    locations: [
      {
        park: 'DL',
        land: 'Adventureland',
        spot: "Aladdin's Oasis area, roaming",
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      "Moana's permanent meet location is still settling. Check the Disneyland app on your visit day — she's added to the roster but rotation is inconsistent.",
  },

  // ─── FANTASYLAND CHARACTERS ───────────────────────────────────────────────
  {
    id: 'alice',
    name: 'Alice (in Wonderland)',
    franchise: 'Fantasyland',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland',
        spot: 'Near Mad Tea Party / Jolly Holiday Bakery',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'great', age8: 'maybe' },
    expectedLine: 'short',
    notes:
      "Alice is the easiest princess-adjacent meet — almost always a walk-up. Great consolation if Royal Hall's line is brutal.",
  },
  {
    id: 'mad-hatter',
    name: 'Mad Hatter',
    franchise: 'Fantasyland',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland',
        spot: 'Near Mad Tea Party',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'maybe', age4: 'great', age6: 'great', age8: 'great' },
    expectedLine: 'short',
    notes:
      "The Mad Hatter does some of the funniest improv at the resort. Worth a 10-minute walk-up — he's a character moment, not a photo line.",
  },
  {
    id: 'peter-pan',
    name: 'Peter Pan',
    franchise: 'Fantasyland',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland',
        spot: 'Castle Courtyard / Fantasyland Path',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      "Peter often appears with Wendy nearby. He's fantastic with kids — actually swordfights with them. Stake out the courtyard around 11 AM.",
  },
  {
    id: 'captain-hook',
    name: 'Captain Hook',
    franchise: 'Fantasyland',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland',
        spot: 'Castle Courtyard / Small World Promenade',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'great', age8: 'great' },
    expectedLine: 'short',
    notes:
      'Hook leans into the villain bit — booming voice, threats. Kids 6+ love it, toddlers melt down. Read your kid.',
  },
  {
    id: 'fairy-godmother',
    name: 'Fairy Godmother',
    franchise: 'Fantasyland',
    locations: [
      {
        park: 'DL',
        land: 'Fantasyland',
        spot: 'Castle Courtyard near Bibbidi Bobbidi Boutique',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'great', age8: 'maybe' },
    expectedLine: 'short',
    notes:
      "The gentlest big-character meet at the resort. If your toddler is scared of Mickey's size, start here.",
  },

  // ─── FROZEN (DCA) ─────────────────────────────────────────────────────────
  {
    id: 'anna-and-elsa',
    name: 'Anna & Elsa',
    franchise: 'Frozen',
    locations: [
      {
        park: 'DCA',
        land: 'Hollywood Land',
        spot: 'Disney Animation Building — Anna & Elsa Royal Welcome',
        typicalTimes: 'Park open until ~5 PM, varies',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'very-long',
    notes:
      'The most demanded character meet at the resort. Rope-drop DCA and go straight here — 20 min wait at 8:05 AM, 90 min by 10 AM. If you arrive mid-afternoon, abort and try after 4 PM when the line dips.',
  },

  // ─── PIXAR (mostly DCA) ───────────────────────────────────────────────────
  {
    id: 'woody',
    name: 'Woody',
    franchise: 'Pixar — Toy Story',
    locations: [
      {
        park: 'DL',
        land: 'Frontierland',
        spot: 'Big Thunder Trail',
        reliability: 'roaming',
      },
      {
        park: 'DCA',
        land: 'Pixar Pier',
        spot: 'Roaming the boardwalk',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'short',
    notes:
      'Woody appears in two parks — Big Thunder Trail (DL) is the shorter line if both parks have him out. Almost always a walk-up.',
  },
  {
    id: 'jessie',
    name: 'Jessie',
    franchise: 'Pixar — Toy Story',
    locations: [
      {
        park: 'DL',
        land: 'Frontierland',
        spot: 'Big Thunder Trail (with Woody)',
        reliability: 'roaming',
      },
      {
        park: 'DCA',
        land: 'Pixar Pier',
        spot: 'Roaming',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'short',
    notes: 'Usually paired with Woody. Easy double-meet — bring a Sharpie because both will sign.',
  },
  {
    id: 'buzz-lightyear',
    name: 'Buzz Lightyear',
    franchise: 'Pixar — Toy Story',
    locations: [
      {
        park: 'DCA',
        land: 'Pixar Pier',
        spot: 'Near Toy Story Midway Mania',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      'Buzz at Pixar Pier is way more reliable than the rare appearances at DL. The costume is enormous — toddlers either love it or freeze.',
  },
  {
    id: 'incredibles',
    name: 'The Incredibles (Mr. & Mrs. Incredible)',
    franchise: 'Pixar — Incredibles',
    locations: [
      {
        park: 'DCA',
        land: 'Pixar Pier',
        spot: 'Near Incredicoaster entrance',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'must-meet' },
    expectedLine: 'medium',
    notes:
      'Mr. & Mrs. Incredible meet together. Frozone shows up occasionally for the family photo. Older kids who watched Incredibles 2 are the target audience.',
  },
  {
    id: 'joy-and-sadness',
    name: 'Joy & Sadness',
    franchise: 'Pixar — Inside Out',
    locations: [
      {
        park: 'DCA',
        land: 'Pixar Pier',
        spot: 'Near Inside Out Emotional Whirlwind',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      'Joy and Sadness meet as a pair — short, sweet, perfect after riding Emotional Whirlwind. Inside Out 2 made this one of the highest-demand Pixar meets.',
  },
  {
    id: 'mike-and-sulley',
    name: 'Mike & Sulley',
    franchise: 'Pixar — Monsters Inc.',
    locations: [
      {
        park: 'DCA',
        land: 'Hollywood Land',
        spot: 'Near Monsters, Inc. attraction',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'maybe', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      "Sulley's costume is huge — some 2-year-olds love him as a giant teddy bear, others run. Pair with riding Monsters, Inc. which is closing in 2027.",
  },
  {
    id: 'russell-and-dug',
    name: 'Russell & Dug (Up)',
    franchise: 'Pixar — Up',
    locations: [
      {
        park: 'DCA',
        land: 'Pixar Pier',
        spot: 'Roaming, occasional',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'great', age6: 'great', age8: 'maybe' },
    expectedLine: 'short',
    notes:
      "When they're out, Dug is the highlight — the costume is incredible and he 'talks' through cast member voicing. Pure walk-up when you spot them.",
  },
  {
    id: 'miguel',
    name: 'Miguel (Coco)',
    franchise: 'Pixar — Coco',
    locations: [
      {
        park: 'DL',
        land: 'Frontierland',
        spot: 'El Zocalo Park (across from Big Thunder Mountain)',
        typicalTimes: 'Scheduled afternoon slots',
        reliability: 'scheduled',
      },
      {
        park: 'DCA',
        land: 'Paradise Gardens',
        spot: 'Plaza de la Familia (seasonal Aug–Nov)',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'great', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'short',
    notes:
      'Miguel at El Zocalo is a hidden gem — short line, beautiful little plaza, and the meet itself is unhurried. Dante appears with him during Plaza de la Familia.',
  },
  {
    id: 'mirabel',
    name: 'Mirabel (Encanto)',
    franchise: 'Disney Animation',
    locations: [
      {
        park: 'DL',
        land: 'Frontierland',
        spot: 'El Zocalo Park',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'must-meet', age4: 'must-meet', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      "Mirabel knows the words to Encanto songs — your kid will lose it if they sing 'We Don't Talk About Bruno' together. Worth the medium line.",
  },

  // ─── STAR WARS (Galaxy's Edge, DL) ────────────────────────────────────────
  {
    id: 'rey',
    name: 'Rey',
    franchise: 'Star Wars',
    locations: [
      {
        park: 'DL',
        land: "Star Wars: Galaxy's Edge",
        spot: 'Black Spire Outpost (Resistance side, near the X-Wing)',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'great', age8: 'must-meet' },
    expectedLine: 'medium',
    notes:
      "Rey does staged 'recruiting' scenes — more theatrical than a static meet. Best for kids 6+ who know the sequel trilogy.",
  },
  {
    id: 'chewbacca',
    name: 'Chewbacca',
    franchise: 'Star Wars',
    locations: [
      {
        park: 'DL',
        land: "Star Wars: Galaxy's Edge",
        spot: 'Black Spire Outpost near the Millennium Falcon',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'great', age8: 'must-meet' },
    expectedLine: 'medium',
    notes:
      'Chewie is enormous and growls — for a 4-year-old, this is either the coolest thing ever or instant tears. The wait alone is 20–40 min most of the day.',
  },
  {
    id: 'stormtroopers',
    name: 'First Order Stormtroopers',
    franchise: 'Star Wars',
    locations: [
      {
        park: 'DL',
        land: "Star Wars: Galaxy's Edge",
        spot: 'Patrol the First Order side of Black Spire',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'great', age8: 'great' },
    expectedLine: 'short',
    notes:
      "Stormtroopers don't pose for friendly photos — they interrogate you. Older kids love it. Don't put a 3-year-old in front of them.",
  },
  {
    id: 'kylo-ren',
    name: 'Kylo Ren',
    franchise: 'Star Wars',
    locations: [
      {
        park: 'DL',
        land: "Star Wars: Galaxy's Edge",
        spot: 'Sporadic dramatic encounters, First Order side',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'skip', age6: 'maybe', age8: 'great' },
    expectedLine: 'short',
    notes:
      'Kylo storms through, lightsaber drawn, sometimes chasing Stormtroopers. Not a photo line — a moment. Watch from a distance with younger kids.',
  },
  {
    id: 'mando-and-grogu',
    name: 'The Mandalorian & Grogu',
    franchise: 'Star Wars',
    locations: [
      {
        park: 'DL',
        land: "Star Wars: Galaxy's Edge",
        spot: 'Roaming, often near Smugglers Run (new overlay area)',
        reliability: 'roaming',
      },
    ],
    kidAppeal: { age2: 'maybe', age4: 'great', age6: 'must-meet', age8: 'must-meet' },
    expectedLine: 'long',
    notes:
      'Brand-new since the Smugglers Run Mandalorian overlay launched May 22, 2026. Location pattern is still settling — check the Disneyland app the morning of your visit. Grogu is the star of the meet; Mando does the talking.',
  },

  // ─── MARVEL (Avengers Campus, DCA) ────────────────────────────────────────
  {
    id: 'spider-man',
    name: 'Spider-Man',
    franchise: 'Marvel',
    locations: [
      {
        park: 'DCA',
        land: 'Avengers Campus',
        spot: 'Drops from the WEB Suppliers rooftop, then meets',
        typicalTimes: 'Scheduled drop times in the app, multiple per day',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'great', age6: 'must-meet', age8: 'must-meet' },
    expectedLine: 'long',
    notes:
      'Spider-Man literally flips off a rooftop — set a reminder for the next drop time shown in the app. Get into position 15 min before. The meet that follows has a 30–60 min line; the drop itself is free to watch.',
  },
  {
    id: 'doctor-strange',
    name: 'Doctor Strange',
    franchise: 'Marvel',
    locations: [
      {
        park: 'DCA',
        land: 'Avengers Campus',
        spot: 'Ancient Sanctum (themed area with mystic arts demos)',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'great', age8: 'must-meet' },
    expectedLine: 'medium',
    notes:
      'Strange does mystic arts demonstrations on a schedule — show + meet combo. Best for kids who actually know the character from the movies.',
  },
  {
    id: 'black-widow',
    name: 'Black Widow',
    franchise: 'Marvel',
    locations: [
      {
        park: 'DCA',
        land: 'Avengers Campus',
        spot: 'Character moments, scattered locations',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'great', age8: 'great' },
    expectedLine: 'short',
    notes:
      "Black Widow does brief tactical 'recruiting' moments rather than long meet lines. Catch her if you see her — don't wait.",
  },
  {
    id: 'captain-america',
    name: 'Captain America',
    franchise: 'Marvel',
    locations: [
      {
        park: 'DCA',
        land: 'Avengers Campus',
        spot: 'Avengers HQ courtyard',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'maybe', age4: 'great', age6: 'must-meet', age8: 'must-meet' },
    expectedLine: 'medium',
    notes:
      "Cap is the most kid-friendly Avenger — patient, gentle, great at posing with the shield. Sam Wilson's Cap shares the role with Steve Rogers' Cap depending on day.",
  },
  {
    id: 'black-panther',
    name: 'Black Panther',
    franchise: 'Marvel',
    locations: [
      {
        park: 'DCA',
        land: 'Avengers Campus',
        spot: 'Wakanda-themed encounter area',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'great', age6: 'must-meet', age8: 'must-meet' },
    expectedLine: 'medium',
    notes:
      'Black Panther meets are quick and theatrical — Wakandan salute, brief exchange, photo. Lines move faster than Spider-Man.',
  },
  {
    id: 'iron-man',
    name: 'Iron Man',
    franchise: 'Marvel',
    locations: [
      {
        park: 'DCA',
        land: 'Avengers Campus',
        spot: 'Character moments, often near WEB Suppliers',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'maybe', age4: 'great', age6: 'must-meet', age8: 'must-meet' },
    expectedLine: 'short',
    notes:
      "Iron Man doesn't do traditional meet lines — he appears in moments. If you spot the suit, grab the photo and move on.",
  },
  {
    id: 'loki',
    name: 'Loki',
    franchise: 'Marvel',
    locations: [
      {
        park: 'DCA',
        land: 'Avengers Campus',
        spot: 'Sporadic appearances, character moments',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'great', age8: 'must-meet' },
    expectedLine: 'short',
    notes:
      "Loki is theatrical and snarky — best moment when paired with Asgardian troublemaker bits. Kids who watched the Loki series light up; everyone else won't get it.",
  },
  {
    id: 'ant-man-and-wasp',
    name: 'Ant-Man & Wasp',
    franchise: 'Marvel',
    locations: [
      {
        park: 'DCA',
        land: 'Avengers Campus',
        spot: 'Pym Test Kitchen area',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'maybe', age4: 'great', age6: 'must-meet', age8: 'great' },
    expectedLine: 'medium',
    notes:
      'Pair the meet with eating at Pym Test Kitchen (the giant pretzel is genuinely good). The meet itself is short and easy.',
  },

  // ─── VILLAINS (rare, event-driven) ────────────────────────────────────────
  {
    id: 'maleficent',
    name: 'Maleficent',
    franchise: 'Villains',
    locations: [
      {
        park: 'DCA',
        land: 'Various (Oogie Boogie Bash)',
        spot: 'Frightfully Fun Parade + roaming',
        typicalTimes: 'Aug 18 – Oct 31 hard-ticket nights only',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'skip', age6: 'great', age8: 'must-meet' },
    expectedLine: 'long',
    notes:
      'Maleficent is an Oogie Boogie Bash exclusive at DCA — you need the separate-ticket Halloween party to meet her. Tickets sell out; book the day they drop.',
  },
  {
    id: 'cruella',
    name: 'Cruella de Vil',
    franchise: 'Villains',
    locations: [
      {
        park: 'DCA',
        land: 'Oogie Boogie Bash',
        spot: 'Themed trick-or-treat trail',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'great', age8: 'great' },
    expectedLine: 'medium',
    notes:
      'Cruella sometimes appears in Halloween Time cavalcades too, but Oogie Boogie Bash is the reliable bet. Bring kids who get the joke — too theatrical for toddlers.',
  },
  {
    id: 'evil-queen',
    name: 'Evil Queen (Snow White)',
    franchise: 'Villains',
    locations: [
      {
        park: 'DCA',
        land: 'Oogie Boogie Bash',
        spot: 'Villains trick-or-treat trail',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'skip', age6: 'great', age8: 'great' },
    expectedLine: 'medium',
    notes:
      'Genuinely menacing in character. 6+ only — younger kids will spend the rest of the trip nervous about her appearing.',
  },
  {
    id: 'jack-sparrow',
    name: 'Captain Jack Sparrow',
    franchise: 'Pirates',
    locations: [
      {
        park: 'DL',
        land: 'New Orleans Square',
        spot: 'Near Pirates of the Caribbean (event-driven)',
        reliability: 'rare',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'great', age8: 'must-meet' },
    expectedLine: 'long',
    notes:
      'Jack Sparrow appearances are rare and unpredictable — usually only during 70th finale events, after-dark parties, or special promos. Treat any sighting as a bonus.',
  },

  // ─── NIGHTMARE BEFORE CHRISTMAS (Halloween Time only) ──────────────────────
  {
    id: 'jack-and-sally',
    name: 'Jack Skellington & Sally',
    franchise: 'Nightmare Before Christmas',
    locations: [
      {
        park: 'DL',
        land: 'New Orleans Square',
        spot: 'Near Haunted Mansion Holiday',
        typicalTimes: 'Aug 21 – Oct 31 (Halloween Time) and select holiday dates',
        reliability: 'scheduled',
      },
    ],
    kidAppeal: { age2: 'skip', age4: 'maybe', age6: 'must-meet', age8: 'must-meet' },
    expectedLine: 'very-long',
    notes:
      'Jack and Sally only meet during Halloween Time (and briefly during the Haunted Mansion Holiday window that bleeds into early January). The line is 60–90 min routinely — line up at park open or skip.',
  },
]
