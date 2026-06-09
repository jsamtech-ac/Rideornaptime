// Single source of truth for the /packing-list page.
// Edit items here — the page and checklist render from this file.
//
// AFFILIATE LINKS: every href below is the placeholder TODO_AMAZON_LINK.
// Amazon Associates tag is `rideornaptime-20` — append it to each real product
// URL when filling these in (e.g. https://www.amazon.com/dp/ASIN?tag=rideornaptime-20).
// Do NOT guess ASINs/URLs.

export type PackingTier = 'non-negotiable' | 'standard'

export type PackingCategory =
  | 'non-negotiable'
  | 'heat-sun'
  | 'hydration-food'
  | 'stroller'
  | 'meltdown-downtime'
  | 'health-hygiene'
  | 'logistics'

export interface PackingItem {
  id: string
  name: string
  category: PackingCategory
  tier: PackingTier
  /** Named product recommendation, e.g. "Anker 10,000mAh with built-in USB-C". */
  recommendedPick: string
  /** Real-parent voice — why this earns space in the bag. */
  why: string
  /** Key into AFFILIATE_LINKS. Omit for commodity items with no pick to link. */
  affiliateSlug?: string
  /** What the park charges vs. buying ahead — drives the "Buy Before You Go" box. */
  priceAnchor?: string
  /** What changes by kid age. */
  ageNotes?: Partial<Record<2 | 4 | 6 | 8, string>>
  /** Internal cross-link. */
  related?: { text: string; href: string }
}

export const PLACEHOLDER_AFFILIATE = 'TODO_AMAZON_LINK'

// slug -> Amazon URL. All placeholders for now; fill with real tagged URLs later.
export const AFFILIATE_LINKS: Record<string, string> = {
  'power-bank': PLACEHOLDER_AFFILIATE,
  'rain-ponchos': PLACEHOLDER_AFFILIATE,
  'stroller-fan': PLACEHOLDER_AFFILIATE,
  'water-bottles': PLACEHOLDER_AFFILIATE,
  'kid-id': PLACEHOLDER_AFFILIATE,
  sunscreen: PLACEHOLDER_AFFILIATE,
  'sun-hats': PLACEHOLDER_AFFILIATE,
  'muslin-cover': PLACEHOLDER_AFFILIATE,
  'cooling-towels': PLACEHOLDER_AFFILIATE,
  'cooler-bag': PLACEHOLDER_AFFILIATE,
  'snack-container': PLACEHOLDER_AFFILIATE,
  'squeeze-pouches': PLACEHOLDER_AFFILIATE,
  electrolytes: PLACEHOLDER_AFFILIATE,
  'stroller-hooks': PLACEHOLDER_AFFILIATE,
  'stroller-marker': PLACEHOLDER_AFFILIATE,
  'stroller-rain-cover': PLACEHOLDER_AFFILIATE,
  'glow-sticks': PLACEHOLDER_AFFILIATE,
  'queue-surprise': PLACEHOLDER_AFFILIATE,
  'kids-headphones': PLACEHOLDER_AFFILIATE,
  'autograph-book': PLACEHOLDER_AFFILIATE,
  'first-aid': PLACEHOLDER_AFFILIATE,
  'blister-care': PLACEHOLDER_AFFILIATE,
  'hand-sanitizer': PLACEHOLDER_AFFILIATE,
  'packable-jacket': PLACEHOLDER_AFFILIATE,
  'park-backpack': PLACEHOLDER_AFFILIATE,
  'dry-bag': PLACEHOLDER_AFFILIATE,
}

/** Returns the affiliate href for a slug, falling back to the placeholder. */
export function affiliateHref(slug?: string): string {
  if (!slug) return PLACEHOLDER_AFFILIATE
  return AFFILIATE_LINKS[slug] ?? PLACEHOLDER_AFFILIATE
}

export const CATEGORY_ORDER: PackingCategory[] = [
  'non-negotiable',
  'heat-sun',
  'hydration-food',
  'stroller',
  'meltdown-downtime',
  'health-hygiene',
  'logistics',
]

export const CATEGORY_META: Record<
  PackingCategory,
  { label: string; icon: string; intro: string }
> = {
  'non-negotiable': {
    label: 'The Non-Negotiables',
    icon: '⭐',
    intro:
      'Forget everything else and these five still go in the bag. Each one prevents a specific, predictable disaster.',
  },
  'heat-sun': {
    label: 'Heat & Sun Kit',
    icon: '☀️',
    intro:
      'SoCal sun is brutal even in January. Shade and reapplication beat sunburned, melting kids by noon.',
  },
  'hydration-food': {
    label: 'Hydration & Food',
    icon: '🥤',
    intro:
      'Disney lets you bring outside food in — in-park snacks and drinks are the biggest avoidable line item of the day.',
  },
  stroller: {
    label: 'Stroller Setup',
    icon: '🛺',
    intro: 'Three cheap add-ons that make the stroller actually work as your basecamp on wheels.',
  },
  'meltdown-downtime': {
    label: 'Meltdown & Downtime',
    icon: '🫧',
    intro: 'The day is long. These buy you a few minutes of calm exactly when you need them.',
  },
  'health-hygiene': {
    label: 'Health, Hygiene & Comfort',
    icon: '🩹',
    intro:
      'Small stuff that turns a trip-ruiner into a non-event. The blister rule alone is worth the page.',
  },
  logistics: {
    label: 'Logistics',
    icon: '🎒',
    intro: 'How you carry it all without it becoming its own problem at the ride lockers.',
  },
}

export const PACKING_LIST: PackingItem[] = [
  // ===== NON-NEGOTIABLES =====
  {
    id: 'power-bank',
    name: 'Portable power bank (10,000mAh, built-in cable)',
    category: 'non-negotiable',
    tier: 'non-negotiable',
    recommendedPick: 'Anker-class 10,000mAh with a built-in USB-C cable',
    why: "Your phone runs the entire day — Lightning Lane, mobile order, PhotoPass, the park map, wait times. It will die by 2pm. Get one with the cable built in so you don't have to remember a separate cord.",
    affiliateSlug: 'power-bank',
    related: { text: 'Why the phone never gets a break →', href: '/lightning-lane' },
  },
  {
    id: 'rain-ponchos',
    name: 'Rain ponchos (5-pack)',
    category: 'non-negotiable',
    tier: 'non-negotiable',
    recommendedPick: 'Disposable family 5-pack',
    why: "Doubles as water-ride gear for Grizzly River Run and Tiana's Bayou Adventure. SoCal also gets surprise rain. Buy the pack at home; the park version is highway robbery.",
    affiliateSlug: 'rain-ponchos',
    priceAnchor: 'Park poncho ~$13 each → a 5-pack online costs less than one.',
    related: { text: 'More ways to dodge the park markup →', href: '/saving-money' },
  },
  {
    id: 'stroller-fan',
    name: 'Clip-on rechargeable stroller fan',
    category: 'non-negotiable',
    tier: 'non-negotiable',
    recommendedPick: 'Rechargeable clip fan with a bendable tripod base',
    why: 'Clips to the stroller canopy or a backpack strap. The pavement radiates heat all afternoon and a hot, miserable kid is a meltdown waiting to happen.',
    affiliateSlug: 'stroller-fan',
    related: { text: 'Our ranked stroller picks →', href: '/best-strollers' },
  },
  {
    id: 'water-bottles',
    name: 'Refillable water bottles (one per person)',
    category: 'non-negotiable',
    tier: 'non-negotiable',
    recommendedPick: 'Insulated or collapsible bottle per person',
    why: 'Every quick-service counter gives out free cups of ice water — just ask. Fill your own bottles and you stay hydrated without hunting for a fountain.',
    affiliateSlug: 'water-bottles',
    priceAnchor: 'Bottled water is $5+ in-park → free refills save a family $30+ a day.',
  },
  {
    id: 'kid-id',
    name: 'Kid ID wristband with your phone number',
    category: 'non-negotiable',
    tier: 'non-negotiable',
    recommendedPick: 'Write-on reusable wristbands or temporary tattoos',
    why: 'Costs pennies, buys enormous peace of mind. If a kid wanders off in a crowd of 50,000, a cast member can read your number off their wrist in seconds.',
    affiliateSlug: 'kid-id',
    ageNotes: {
      2: "Most critical here — a 2-year-old can't recite your number.",
      4: 'Still essential; rehearse "find a cast member" with them too.',
    },
  },

  // ===== HEAT & SUN KIT =====
  {
    id: 'sunscreen',
    name: 'Mineral sunscreen — stick + spray',
    category: 'heat-sun',
    tier: 'standard',
    recommendedPick: 'SPF 50+ mineral stick for faces, spray for everything else',
    why: 'The stick lets you redo faces and ears without washing your hands; the spray handles arms and legs fast. Set a phone alarm for every two hours — you will forget otherwise.',
    affiliateSlug: 'sunscreen',
  },
  {
    id: 'sun-hats',
    name: "Kids' sun hats — with a chin strap",
    category: 'heat-sun',
    tier: 'standard',
    recommendedPick: 'Wide-brim UPF hat with an adjustable chin strap',
    why: 'The strap is the whole point. Strapless hats get pulled off and lost by 10am, usually on a ride you can never retrieve them from.',
    affiliateSlug: 'sun-hats',
  },
  {
    id: 'muslin-cover',
    name: 'Muslin blanket / UV stroller cover',
    category: 'heat-sun',
    tier: 'standard',
    recommendedPick: 'Breathable muslin blanket or a clip-on UV cover',
    why: 'Triple duty: shade over the stroller, a nap-darkening cover, and a layer for chilly evenings. Breathable so you are not trapping heat over a sleeping kid.',
    affiliateSlug: 'muslin-cover',
    ageNotes: { 2: 'Turns the stroller into a usable dark cave for midday naps.' },
  },
  {
    id: 'cooling-towels',
    name: 'Evaporative cooling towels',
    category: 'heat-sun',
    tier: 'standard',
    recommendedPick: 'Snap-to-activate cooling towels, one per kid',
    why: 'Soak one at a water-bottle fill station, snap it, and drape it around a hot neck. Cheap, reusable, and instantly resets an overheated kid.',
    affiliateSlug: 'cooling-towels',
  },

  // ===== HYDRATION & FOOD =====
  {
    id: 'cooler-bag',
    name: 'Insulated soft cooler bag',
    category: 'hydration-food',
    tier: 'standard',
    recommendedPick: 'Soft-sided insulated bag that fits your stroller basket',
    why: 'Disney explicitly allows outside food. In-park food is the single biggest spend you can cut. Soft-sided so it packs down and clears the size rules.',
    affiliateSlug: 'cooler-bag',
    priceAnchor: 'A quick-service kids meal is ~$10+ → packed lunches save a family $40+ a day.',
    related: { text: 'When to actually buy in-park food →', href: '/food' },
  },
  {
    id: 'snack-container',
    name: 'Leak-proof snack container',
    category: 'hydration-food',
    tier: 'standard',
    recommendedPick: 'Compartment snack box (Bentgo-style)',
    why: 'Pre-pack the goldfish, grapes, and crackers before you leave the hotel. A hangry toddler in a 45-minute line is a disaster you can prevent for $12.',
    affiliateSlug: 'snack-container',
    related: { text: 'Full park food strategy →', href: '/food' },
  },
  {
    id: 'squeeze-pouches',
    name: 'Reusable squeeze pouches',
    category: 'hydration-food',
    tier: 'standard',
    recommendedPick: 'Refillable silicone food pouches',
    why: 'Fill with applesauce or yogurt at home — cheaper than store-bought pouches, far less messy than a spoon in a stroller, and easy to hand back over your shoulder.',
    affiliateSlug: 'squeeze-pouches',
    ageNotes: { 2: 'The mess-free way to feed a toddler mid-line.' },
  },
  {
    id: 'electrolytes',
    name: "Low-sugar kids' electrolyte packets",
    category: 'hydration-food',
    tier: 'standard',
    recommendedPick: 'Single-serve low-sugar electrolyte packets',
    why: 'Heat plus 12 miles of walking drains kids fast. A packet in a refilled water bottle heads off the headachey, weepy 3pm crash better than plain water.',
    affiliateSlug: 'electrolytes',
  },

  // ===== STROLLER SETUP =====
  {
    id: 'stroller-hooks',
    name: 'Stroller hooks / carabiners',
    category: 'stroller',
    tier: 'standard',
    recommendedPick: 'Lockable stroller hooks rated for bags',
    why: 'Hang the cooler, the backpack, the shopping. Frees your hands and your back. Get the locking kind so they do not bounce off over a curb.',
    affiliateSlug: 'stroller-hooks',
    related: { text: 'Strollers that handle the parks →', href: '/best-strollers' },
  },
  {
    id: 'stroller-marker',
    name: 'Bright ribbon or luggage tag for the frame',
    category: 'stroller',
    tier: 'standard',
    recommendedPick: 'A loud ribbon, scrunchie, or tag tied to the handle',
    why: 'Cast members move parked strollers constantly, and in a sea of identical black strollers yours is invisible. A bright marker turns a 10-minute hunt into a 10-second one. Costs nothing.',
  },
  {
    id: 'stroller-rain-cover',
    name: 'Clear stroller rain & wind cover',
    category: 'stroller',
    tier: 'standard',
    recommendedPick: 'Universal-fit clear plastic stroller cover',
    why: 'Keeps a napping kid dry in surprise rain and blocks the cold evening wind. Third use: pull it over the muslin cover to fully darken the stroller for a nap.',
    affiliateSlug: 'stroller-rain-cover',
  },

  // ===== MELTDOWN & DOWNTIME =====
  {
    id: 'glow-sticks',
    name: 'Glow sticks (bulk pack)',
    category: 'meltdown-downtime',
    tier: 'standard',
    recommendedPick: 'Bulk pack of bracelet/necklace glow sticks',
    why: 'Hand them out right before the fireworks and you look like a hero. The park sells light-up toys for the price of a meal; a bulk pack is a few dollars for dozens.',
    affiliateSlug: 'glow-sticks',
    priceAnchor: 'Park light-up toys run $20+ each → a bulk pack is pennies per glow stick.',
  },
  {
    id: 'queue-surprise',
    name: 'A "queue surprise" held in reserve',
    category: 'meltdown-downtime',
    tier: 'standard',
    recommendedPick: 'One cheap new fidget or mini toy they have never seen',
    why: 'Keep it hidden until the exact moment a line goes sideways. Novelty buys you ten quiet minutes — the difference between riding and bailing.',
    affiliateSlug: 'queue-surprise',
    ageNotes: {
      2: 'Your single best meltdown defense at this age.',
      4: 'Still works wonders mid-afternoon.',
    },
  },
  {
    id: 'kids-headphones',
    name: "Volume-limiting kids' headphones",
    category: 'meltdown-downtime',
    tier: 'standard',
    recommendedPick: 'Volume-capped kids headphones + a loaded tablet',
    why: 'For the drive in, the hotel decompress, and the rare moment you need a kid parked and quiet. Volume-limiting protects little ears.',
    affiliateSlug: 'kids-headphones',
  },
  {
    id: 'autograph-book',
    name: 'Autograph book + fat marker',
    category: 'meltdown-downtime',
    tier: 'standard',
    recommendedPick: 'Autograph book and a chisel-tip Sharpie',
    why: "Characters wear gloves and can't grip a skinny pen — a fat marker is the trick. Or skip the book entirely and lean on PhotoPass, which comes with Lightning Lane.",
    affiliateSlug: 'autograph-book',
    priceAnchor: 'Park autograph books run ~$15 → bring your own for a few dollars.',
    ageNotes: {
      6: 'This is the sweet spot — they can read names and collect with purpose.',
      8: 'May prefer selfies to signatures; ask before you commit to the book.',
    },
  },

  // ===== HEALTH, HYGIENE & COMFORT =====
  {
    id: 'first-aid',
    name: 'Mini first-aid kit',
    category: 'health-hygiene',
    tier: 'standard',
    recommendedPick: "Compact kit + kids' Tylenol/Motrin and tweezers",
    why: "Band-aids, kids' pain reliever, and tweezers for the splinter off a wooden railing. First Aid stations exist, but you do not want to cross the park for a scraped knee.",
    affiliateSlug: 'first-aid',
  },
  {
    id: 'blister-care',
    name: 'Blister & chafe care',
    category: 'health-hygiene',
    tier: 'standard',
    recommendedPick: 'Moleskin and an anti-chafe stick',
    why: "Tape a hot spot the second you feel it, not after it blisters. Hard rule that goes with this: do NOT buy new shoes for this trip — wear what's already broken in.",
    affiliateSlug: 'blister-care',
  },
  {
    id: 'hand-sanitizer',
    name: 'Hand sanitizer + wipes',
    category: 'health-hygiene',
    tier: 'standard',
    recommendedPick: 'Clip-on sanitizer and a travel pack of wipes',
    why: 'You eat with your hands all day after touching every railing in the park. Wipes also handle sticky churro faces and the inevitable spill.',
    affiliateSlug: 'hand-sanitizer',
  },
  {
    id: 'packable-jacket',
    name: 'Light packable jacket (per kid)',
    category: 'health-hygiene',
    tier: 'standard',
    recommendedPick: 'Packable windbreaker that stuffs into its own pocket',
    why: 'Evenings get genuinely cold, even in summer, and fireworks crowds wait around for an hour. A jacket that crushes into a stroller pocket beats a shivering kid.',
    affiliateSlug: 'packable-jacket',
  },

  // ===== LOGISTICS =====
  {
    id: 'park-backpack',
    name: 'Right-sized park backpack',
    category: 'logistics',
    tier: 'standard',
    recommendedPick: 'Mid-size backpack that fits a ride lap, not a hiking pack',
    why: 'Big enough for the day, small enough to keep on your lap or in a locker without a fight. Oversized bags slow you down at every security check.',
    affiliateSlug: 'park-backpack',
  },
  {
    id: 'change-of-clothes',
    name: 'Change of clothes per young kid (in a gallon ziploc)',
    category: 'logistics',
    tier: 'standard',
    recommendedPick: 'One full outfit per kid, sealed in a gallon bag',
    why: 'Water rides, spills, and blowouts happen. Seal the spare outfit in a gallon ziploc — then the same bag holds the wet clothes on the way home.',
    ageNotes: { 2: 'Non-optional at this age; pack two if you are potty-training.' },
  },
  {
    id: 'dry-bag',
    name: 'Dry bag / phone sleeve for water rides',
    category: 'logistics',
    tier: 'standard',
    recommendedPick: 'Small waterproof pouch or zip dry bag',
    why: 'Splash Mountain-style soakings kill phones. Drop electronics in a dry sleeve before you board and stop white-knuckling your camera through the drop.',
    affiliateSlug: 'dry-bag',
  },
  {
    id: 'ziploc-bags',
    name: 'Gallon Ziploc bags (a handful)',
    category: 'logistics',
    tier: 'standard',
    recommendedPick: 'A few gallon-size zip bags tucked in the backpack',
    why: 'The most versatile thing in the bag: wet clothes, half-eaten snacks, phone protection on water rides, soggy ponchos. Bring more than you think you need.',
  },
]
