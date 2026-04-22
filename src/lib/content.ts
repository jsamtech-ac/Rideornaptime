export type Verdict = 'must-do' | 'maybe' | 'skip'
export type LlType = 'MP' | 'SP' | 'standby'

export interface Ride {
  name: string
  land: string
  park: 'DL' | 'DCA'
  height: string
  closing?: string
  age2: Verdict
  age4: Verdict
  age6: Verdict
  age8: Verdict
  take: string
  llType?: LlType
}

export interface TimelineEvent {
  time: string
  title: string
  desc: string
  type: 'ride' | 'food' | 'break'
}

export interface FoodSpot {
  emoji: string
  name: string
  location: string
  desc: string
}

export interface PackingItem {
  item: string
  why: string
  affiliates?: { label: string; href: string }[]
  related?: { text: string; href: string }
}

export type EventSlug =
  | 'disneyland-70th'
  | 'lunar-new-year'
  | 'celebrate-gospel'
  | 'food-and-wine'
  | 'bluey'
  | 'after-dark'
  | 'halloween-time'
  | 'oogie-boogie-bash'
  | 'plaza-de-la-familia'
  | 'holidays'
  | 'festival-of-holidays'

export type FamilyVerdict = 'must-see' | 'worth-it' | 'bonus' | 'skip-with-littles'
export type EventTheme = 'coral' | 'sun' | 'castle' | 'sky' | 'mint'

export interface SeasonalEvent {
  slug: EventSlug
  name: string
  park: 'Disneyland' | 'DCA' | 'Both' | 'Downtown Disney'
  start: string
  end: string
  dateLabel: string
  ticketed: boolean
  priceHint?: string
  bookWhen?: string
  familyVerdict: FamilyVerdict
  theme: EventTheme
  whatItIs: string
  kidNotes: string
  ctaCampaign?: string
  ctaLabel?: string
}

export interface SeasonMonth {
  month: string
  verdict: 'go' | 'avoid' | 'maybe' | 'must-go'
  crowds: string
  weather: { highF: number; lowF: number; note: string }
  eventsActive: EventSlug[]
  avoidDates?: string
  bestWindow?: string
  desc: string
}

export interface NavItem {
  href: string
  label: string
  icon: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Plan',
    items: [
      { href: '/first-visit', label: 'First Visit', icon: '🏰' },
      { href: '/itineraries', label: 'Itineraries', icon: '🗓' },
      { href: '/seasonal', label: 'Seasonal', icon: '🌤' },
      { href: '/lightning-lane', label: 'Lightning Lane', icon: '⚡' },
      { href: '/saving-money', label: 'Save Money', icon: '💰' },
    ],
  },
  {
    label: 'Guides',
    items: [
      { href: '/rides', label: 'Rides', icon: '🎢' },
      { href: '/characters', label: 'Characters', icon: '🐭' },
      { href: '/food', label: 'Food', icon: '🍽' },
      { href: '/packing-list', label: 'Packing', icon: '🎒' },
    ],
  },
  {
    label: 'Tips & Gear',
    items: [
      { href: '/hidden-gems', label: 'Hidden Gems', icon: '✨' },
      { href: '/fireworks', label: 'Fireworks', icon: '🎆' },
      { href: '/best-strollers', label: 'Best Strollers', icon: '👶' },
    ],
  },
]

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items)

export const SITE_URL = 'https://rideornaptime.com'

export const RIDES: Ride[] = [
  {
    name: 'Dumbo the Flying Elephant',
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'maybe',
    age8: 'skip',
    take: "Pure magic for toddlers. By age 8, they're over it. Ride early — the line gets absurd for a 90-second ride.",
    llType: 'standby',
  },
  {
    name: "It's a Small World",
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'maybe',
    take: "The ultimate toddler ride. Air-conditioned, 15 minutes long, and the line moves fast. Use it as a reset button when everyone's melting down.",
    llType: 'standby',
  },
  {
    name: 'King Arthur Carrousel',
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'maybe',
    age8: 'skip',
    take: 'Classic carousel right behind the castle. Toddlers love it, adults get a 2-minute sit-down. Short lines most of the day.',
    llType: 'standby',
  },
  {
    name: 'Mad Tea Party (Tea Cups)',
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'maybe',
    take: "The spinning cups never get old for little kids. Let them control the wheel — they'll giggle through the whole thing. Skip if anyone in your group gets motion sick.",
    llType: 'standby',
  },
  {
    name: "Peter Pan's Flight",
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'must-do',
    take: 'The crown jewel of Fantasyland. Ride early — the line gets to 60+ min by 10 AM and it never drops. Lightning Lane or rope-drop are your only options.',
    llType: 'MP',
  },
  {
    name: 'Alice in Wonderland',
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'maybe',
    take: 'Gentle outdoor-then-indoor dark ride. Great for little ones. Lines stay manageable most of the day.',
    llType: 'standby',
  },
  {
    name: 'Casey Jr. Circus Train',
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'maybe',
    age8: 'skip',
    take: 'Tiny train ride through miniature storybook scenes. Pair it with Storybook Land Canal Boats next door — same story, two angles.',
    llType: 'standby',
  },
  {
    name: 'Storybook Land Canal Boats',
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'maybe',
    age8: 'skip',
    take: 'A cast member narrates while you boat through miniature Disney villages. Quiet, slow, weirdly magical. Toddlers are mesmerized.',
    llType: 'standby',
  },
  {
    name: 'Buzz Lightyear Astro Blasters',
    land: 'Tomorrowland · Disneyland',
    park: 'DL',
    height: 'Any height',
    closing: 'Closing April 2026',
    age2: 'maybe',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'must-do',
    take: 'Kids go nuts competing for high scores. Even a 2-year-old can spin the car and smash the trigger. Ride it before it closes in April 2026.',
    llType: 'MP',
  },
  {
    name: 'Space Mountain',
    land: 'Tomorrowland · Disneyland',
    park: 'DL',
    height: '40" / 102 cm',
    age2: 'skip',
    age4: 'skip',
    age6: 'maybe',
    age8: 'must-do',
    take: "Indoor coaster in the dark — speed is moderate but pitch-black tunnels can terrify a nervous 6-year-old. If they've handled Big Thunder, they're ready.",
    llType: 'MP',
  },
  {
    name: 'Pirates of the Caribbean',
    land: 'New Orleans Square · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'maybe',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'must-do',
    take: 'One small drop in the dark — some 2-year-olds cry, most love it. The queue itself is half the fun. Go after lunch when the line dips.',
    llType: 'MP',
  },
  {
    name: 'Haunted Mansion',
    land: 'New Orleans Square · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'skip',
    age4: 'maybe',
    age6: 'must-do',
    age8: 'must-do',
    take: 'Know your kid. If they handle mild spooky stuff, a brave 4-year-old will love it. If not, the stretching room alone will end your day.',
    llType: 'MP',
  },
  {
    name: 'Autopia',
    land: 'Tomorrowland · Disneyland',
    park: 'DL',
    height: '32" with adult / 54" to drive alone',
    age2: 'skip',
    age4: 'skip',
    age6: 'maybe',
    age8: 'maybe',
    take: 'The line is 40+ minutes for 4 minutes of driving a car that barely steers. Unless your kid is car-obsessed, skip it and spend that time on 3 better rides.',
    llType: 'MP',
  },
  {
    name: 'Big Thunder Mountain Railroad',
    land: 'Frontierland · Disneyland',
    park: 'DL',
    height: '40" / 102 cm',
    age2: 'skip',
    age4: 'skip',
    age6: 'must-do',
    age8: 'must-do',
    take: 'The perfect "first roller coaster." Fast but not scary — more like a fun bumpy train. If they\'re tall enough, do it.',
    llType: 'MP',
  },
  {
    name: "Tiana's Bayou Adventure",
    land: 'Critter Country · Disneyland',
    park: 'DL',
    height: '40" / 102 cm',
    age2: 'skip',
    age4: 'skip',
    age6: 'must-do',
    age8: 'must-do',
    take: 'The reimagined Splash Mountain. Gorgeous music, beautiful New Orleans vibes, one big drop at the end. Use Rider Switch for kids under 40".',
    llType: 'MP',
  },
  {
    name: 'Jungle Cruise',
    land: 'Adventureland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'maybe',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'must-do',
    take: 'The dad jokes are the real ride. Little ones love the animals, bigger kids groan at the puns. Use Lightning Lane if the standby is over 30 min.',
    llType: 'MP',
  },
  {
    name: 'Finding Nemo Submarine Voyage',
    land: 'Tomorrowland · Disneyland',
    park: 'DL',
    height: 'Any height',
    age2: 'maybe',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'maybe',
    take: "Great for hot days — it's air-conditioned and easygoing. The submarine entrance is a tight spiral staircase with a stroller, so plan accordingly.",
    llType: 'MP',
  },
  {
    name: "Mickey & Minnie's Runaway Railway",
    land: "Mickey's Toontown · Disneyland",
    park: 'DL',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'must-do',
    take: 'Incredible visuals, and the whole family genuinely enjoys it. The trackless ride system surprises everyone. Lightning Lane this one.',
    llType: 'MP',
  },
  {
    name: 'Radiator Springs Racers',
    land: 'Cars Land · DCA',
    park: 'DCA',
    height: '40" / 102 cm',
    age2: 'skip',
    age4: 'maybe',
    age6: 'must-do',
    age8: 'must-do',
    take: 'The best ride at DCA. Rope-drop this or get Lightning Lane — the standby line hits 60-90 min by mid-morning.',
    llType: 'SP',
  },
  {
    name: 'Monsters, Inc.',
    land: 'Hollywood Land · DCA',
    park: 'DCA',
    height: 'Any height',
    closing: 'Closing sometime in 2027',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'must-do',
    age8: 'maybe',
    take: 'Gentle ride, Monsters characters are a hit. Closing in 2027, so ride it while you still can.',
    llType: 'MP',
  },
  {
    name: 'Inside Out Emotional Whirlwind',
    land: 'Pixar Pier · DCA',
    park: 'DCA',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'maybe',
    age8: 'skip',
    take: 'Basically a rebranded tea cups. Toddlers love it, older kids find it boring. Keep it in your pocket for when the little one needs a win.',
    llType: 'standby',
  },
  {
    name: 'Incredicoaster',
    land: 'Pixar Pier · DCA',
    park: 'DCA',
    height: '48" / 122 cm',
    age2: 'skip',
    age4: 'skip',
    age6: 'skip',
    age8: 'must-do',
    take: "Most kids under 8 won't make it. If your 8-year-old is a thrill seeker, this is their moment. Use Rider Switch so both parents can ride.",
    llType: 'standby',
  },
  {
    name: 'The Little Mermaid',
    land: 'Hollywood Land · DCA',
    park: 'DCA',
    height: 'Any height',
    age2: 'must-do',
    age4: 'must-do',
    age6: 'maybe',
    age8: 'skip',
    take: 'Walk-on most of the day, air-conditioned, and the Ariel fans in your group will lose their minds. Perfect low-effort ride when energy is fading.',
    llType: 'standby',
  },
]

export const ITINERARIES: Record<string, { label: string; events: TimelineEvent[] }> = {
  '1day': {
    label: '1-Day Blitz',
    events: [
      {
        time: '7:30 AM',
        title: 'Arrive before gates open',
        desc: 'Be in line 30 min before official opening. Have breakfast before you arrive — eating at the park eats into prime low-wait time.',
        type: 'ride',
      },
      {
        time: '8:00 AM',
        title: 'Rope-drop: Toontown or Fantasyland',
        desc: "Head straight to Mickey & Minnie's Runaway Railway or hit Dumbo, Small World, and Peter Pan back-to-back while lines are short.",
        type: 'ride',
      },
      {
        time: '9:30 AM',
        title: 'Adventureland loop',
        desc: 'Jungle Cruise, Pirates of the Caribbean, and grab a Dole Whip at the Tiki Juice Bar. Use mobile order to skip the Dole Whip line.',
        type: 'ride',
      },
      {
        time: '11:00 AM',
        title: 'Tomorrowland',
        desc: 'Buzz Lightyear and Finding Nemo submarine. Both are great for cooling down. Book your next Lightning Lane from the app while in line.',
        type: 'ride',
      },
      {
        time: '12:00 PM',
        title: 'Lunch: Jolly Holiday or Plaza Inn',
        desc: 'Mobile order 30 min before you want to eat. Jolly Holiday has a great kids menu. Plaza Inn fried chicken is the best meal in the park.',
        type: 'food',
      },
      {
        time: '12:45 PM',
        title: 'NAP / BREAK TIME',
        desc: 'This is non-negotiable. Go back to the hotel, find a quiet bench, or use the Baby Care Center. A 60-90 min reset prevents the 3pm meltdown.',
        type: 'break',
      },
      {
        time: '2:30 PM',
        title: 'Return — Frontierland & New Orleans Sq',
        desc: "Big Thunder Mountain (if tall enough), Haunted Mansion. Crowds thin during the afternoon parade — ride during the parade if your kids don't care about it.",
        type: 'ride',
      },
      {
        time: '4:00 PM',
        title: 'Snack break',
        desc: 'Cheesy garlic pretzel by the castle, churros from any cart. Let the kids run at the Toontown playground — only one exit so you can zone out for 20 min.',
        type: 'food',
      },
      {
        time: '5:00 PM',
        title: 'Re-ride favorites or explore',
        desc: 'Hit anything you missed or re-ride the favorites. Wait times drop in the early evening between dinner and fireworks.',
        type: 'ride',
      },
      {
        time: '6:30 PM',
        title: 'Dinner',
        desc: 'Bengal BBQ for something quick in Adventureland, or beignets and a Mint Julep in New Orleans Square. Mobile order is your friend.',
        type: 'food',
      },
      {
        time: '8:00 PM',
        title: "Fireworks from Star Wars: Galaxy's Edge",
        desc: "Skip the Main Street crush. Watch from Galaxy's Edge — same fireworks, but they play John Williams music. Way less crowded and honestly better.",
        type: 'ride',
      },
    ],
  },
  '2day': {
    label: '2-Day Relaxed',
    events: [
      {
        time: 'Day 1 AM',
        title: 'Disneyland — morning focus',
        desc: 'Rope-drop Fantasyland + Toontown. Hit Small World, Dumbo, Runaway Railway, Peter Pan. Move to Adventureland by 10 AM for Pirates and Jungle Cruise.',
        type: 'ride',
      },
      {
        time: 'Day 1 Lunch',
        title: 'Plaza Inn or Jolly Holiday',
        desc: 'Mobile order at 11:30. Eat by noon. No rush — you have two days.',
        type: 'food',
      },
      {
        time: 'Day 1 PM',
        title: 'Long break — hotel pool or nap',
        desc: 'Leave the park from 12:30–3:30 PM. This is the magic of a 2-day plan. Your kids come back fresh while everyone else is hitting the wall.',
        type: 'break',
      },
      {
        time: 'Day 1 Eve',
        title: 'Return for Tomorrowland + fireworks',
        desc: "Buzz Lightyear, Space Mountain (if tall enough), then fireworks from Galaxy's Edge. Grab dinner from Bengal BBQ or beignets.",
        type: 'ride',
      },
      {
        time: 'Day 2 AM',
        title: 'DCA — morning focus',
        desc: 'Rope-drop Radiator Springs Racers (or Lightning Lane it). Then Monsters Inc, Little Mermaid, and the Pixar Pier area.',
        type: 'ride',
      },
      {
        time: 'Day 2 Lunch',
        title: 'San Fransokyo or Lamplight Lounge',
        desc: 'Birria tacos and street corn at San Fransokyo are incredible. Lamplight Lounge on Pixar Pier is a great sit-down if you want to linger.',
        type: 'food',
      },
      {
        time: 'Day 2 PM',
        title: 'DCA workshops + rest',
        desc: "Head to Hollywood Land for the free animation workshops, drawing classes, and Sorcerer's Workshop. Air-conditioned, free, and runs every 30 min. Best-kept secret for an afternoon reset.",
        type: 'break',
      },
      {
        time: 'Day 2 Eve',
        title: 'World of Color + wrap up',
        desc: "Book World of Color Lightning Lane early in the day — spots run out. Grab Ronto Wraps at Galaxy's Edge for dinner if you park-hop back to Disneyland.",
        type: 'ride',
      },
    ],
  },
  '3day': {
    label: '3-Day Complete',
    events: [
      {
        time: 'Day 1',
        title: 'Disneyland — Greatest Hits',
        desc: "All the must-dos: Runaway Railway, Small World, Pirates, Jungle Cruise, Buzz Lightyear. Long midday break. Return for evening rides + fireworks from Galaxy's Edge.",
        type: 'ride',
      },
      {
        time: 'Day 2',
        title: 'DCA — Full Day',
        desc: 'Radiator Springs Racers at rope-drop. Pixar Pier, Hollywood Land workshops in the afternoon. San Fransokyo for lunch. World of Color in the evening.',
        type: 'ride',
      },
      {
        time: 'Day 3',
        title: 'Flex Day — Re-rides & What You Missed',
        desc: 'This is the luxury day. Re-ride favorites, catch character meet-and-greets you missed, try restaurants you skipped. No pressure, no schedule. Watch the fireworks from Main Street this time for the full projection show.',
        type: 'break',
      },
      {
        time: 'Day 3 Tip',
        title: 'Character breakfast on Day 3',
        desc: 'Book Plaza Inn character breakfast or Storyteller Cafe (at Grand Californian). Meet princesses, Goofy, and more all in one spot without standing in separate lines.',
        type: 'food',
      },
    ],
  },
}

export const FOOD_SPOTS: FoodSpot[] = [
  {
    emoji: '🍗',
    name: 'Plaza Inn Fried Chicken',
    location: 'Main Street · Disneyland',
    desc: 'The best meal in the park. Seriously. The fried chicken is crispy, juicy, and comes with real sides. Also does a character breakfast — book in advance.',
  },
  {
    emoji: '🍦',
    name: 'Dole Whip',
    location: 'Adventureland · Disneyland',
    desc: 'Non-negotiable. Get it at the Tiki Juice Bar. Pro tip: use the back line through the Tiki Room alcove — always shorter. Or mobile order and skip the line entirely.',
  },
  {
    emoji: '🌮',
    name: 'Birria Tacos & Street Corn',
    location: 'San Fransokyo · DCA',
    desc: 'The birria tacos are legit — not theme park food, actually great food. The street corn is a perfect snack. Anything from Cocina Cucamonga is solid.',
  },
  {
    emoji: '🥐',
    name: 'Jolly Holiday Bakery Cafe',
    location: 'Main Street · Disneyland',
    desc: 'Great kids menu, solid sandwiches, and the raspberry rose macaron is worth the hype. Central location makes it an easy stop.',
  },
  {
    emoji: '🍖',
    name: 'Bengal BBQ',
    location: 'Adventureland · Disneyland',
    desc: 'Quick BBQ skewers right in Adventureland. Perfect for grabbing something fast between rides without a full sit-down meal.',
  },
  {
    emoji: '🦐',
    name: 'Lamplight Lounge',
    location: 'Pixar Pier · DCA',
    desc: "Best sit-down at DCA. Great lobster nachos, waterfront views. Book a reservation or expect a wait — but it's worth it for a real meal.",
  },
  {
    emoji: '🌯',
    name: 'Ronto Wraps',
    location: "Galaxy's Edge · Disneyland",
    desc: 'The Ronto Wrap (grilled sausage + slaw in pita) is a top-5 park food. They also have a "Rontoless" veggie version that\'s surprisingly good.',
  },
  {
    emoji: '🍩',
    name: 'Beignets & Mint Julep',
    location: 'New Orleans Square · Disneyland',
    desc: "6 beignets for $5. Seasonal flavors at Halloween and Christmas. Mobile order to skip the line. Pair with a Mint Julep — it's non-alcoholic and refreshing.",
  },
  {
    emoji: '🥨',
    name: 'Cheesy Garlic Pretzel',
    location: 'Near Castle · Disneyland',
    desc: 'Giant soft pretzel stuffed with cheese. The kids will devour it. Great shareable snack between rides.',
  },
]

export const PACKING_LIST: PackingItem[] = [
  {
    item: 'Portable phone charger (10,000+ mAh)',
    why: "You'll use the Disneyland app constantly — Lightning Lane, mobile orders, maps, wait times. Your phone will die by 2pm without this.",
    affiliates: [
      { label: 'Anker 10,000mAh Power Bank (USB-C built in)', href: 'https://amzn.to/4mzwCPZ' },
    ],
  },
  {
    item: 'Stroller fan (clip-on)',
    why: 'Attaches to the stroller canopy. A lifesaver in summer when the pavement radiates heat.',
    affiliates: [
      { label: 'AMACOOL Battery Stroller Fan (flexible tripod)', href: 'https://amzn.to/41xSIJd' },
    ],
    related: { text: 'See our top 6 stroller picks →', href: '/best-strollers' },
  },
  {
    item: 'Reusable water bottles (one per person)',
    why: 'Water is $5+ in the park. Free water refill stations are everywhere. Bring bottles and save $30+ per day.',
    affiliates: [
      {
        label: 'Simple Modern Kids Water Bottle (insulated, leak-proof)',
        href: 'https://amzn.to/4mzMNwX',
      },
    ],
  },
  {
    item: 'Snack container + pre-packed snacks',
    why: "Goldfish, fruit pouches, granola bars. You're allowed to bring food in. A hangry toddler in a 45-min line is a disaster you can prevent.",
    affiliates: [
      { label: 'Bentgo Kids Snack Container (leak-proof)', href: 'https://amzn.to/3QobLTK' },
    ],
    related: { text: 'See our full park food strategy →', href: '/food' },
  },
  {
    item: 'Sunscreen (SPF 50+, stick format)',
    why: 'Stick format so you can reapply without washing hands. You will forget to reapply — set a phone alarm for every 2 hours.',
    affiliates: [
      {
        label: 'Neutrogena Sheer Zinc Kids Sunscreen Stick SPF 50',
        href: 'https://amzn.to/4vwmtaL',
      },
    ],
  },
  {
    item: 'Rain ponchos (disposable)',
    why: 'Park ponchos cost $15 each. Pack $1 ponchos from Amazon. Also useful for water rides at DCA.',
    affiliates: [
      { label: 'SWOGAA Disposable Rain Ponchos — Family 6 Pack', href: 'https://amzn.to/4vyHn9q' },
    ],
    related: { text: 'More ways to dodge the $15 park markup →', href: '/saving-money' },
  },
  {
    item: 'Ziploc bags (gallon size)',
    why: 'Wet clothes, half-eaten snacks, phone protection on water rides. The most versatile item on this list.',
  },
  {
    item: 'Lightweight blanket or jacket layers',
    why: 'Mornings and evenings get cold, even in summer. AC in rides and restaurants can chill sweaty kids fast.',
  },
  {
    item: 'Change of clothes (one per kid)',
    why: 'Water rides, spills, blowouts. Keep a change in a dry bag under the stroller.',
  },
  {
    item: 'Portable first-aid basics',
    why: "Band-aids, children's Tylenol, anti-chafe stick. The Baby Care Center has supplies but the line isn't worth it for a Band-Aid.",
    affiliates: [
      {
        label: 'Johnson & Johnson All-Purpose Travel First Aid Kit',
        href: 'https://amzn.to/4tP2a6O',
      },
    ],
  },
  {
    item: "Moleskin or comfy shoes you've broken in",
    why: 'You will walk 8-12 miles. New shoes = blisters by noon. This is the #1 mistake families make.',
    affiliates: [
      { label: "Dr. Scholl's Moleskin Plus Padding Roll", href: 'https://amzn.to/4vxBZmQ' },
    ],
  },
  {
    item: 'Autograph book + thick marker',
    why: "Characters in gloves can't grip a pen. Bring a fat Sharpie. Or skip the book and use the Disneyland app's PhotoPass — photos are included with Lightning Lane.",
    affiliates: [
      { label: 'Disney Official Autograph Book', href: 'https://amzn.to/41xcjcq' },
      { label: 'Sharpie Chisel Tip Permanent Markers', href: 'https://amzn.to/3QbHhnX' },
    ],
  },
]

export const SEASONAL_LAST_REVIEWED = '2026-04-21'

export const EVENTS_2026: SeasonalEvent[] = [
  {
    slug: 'disneyland-70th',
    name: 'Disneyland 70th Celebration (Finale)',
    park: 'Both',
    start: '2026-01-01',
    end: '2026-08-09',
    dateLabel: 'Jan 1 – Aug 9, 2026',
    ticketed: false,
    familyVerdict: 'must-see',
    theme: 'sky',
    whatItIs:
      'The final months of the 70th anniversary: Tapestry of Happiness projections on "it\'s a small world," Paint the Night parade, World of Color — Happiness, and the Celebrate Happy Cavalcade.',
    kidNotes:
      "Kids love Paint the Night — it's floats, lights, and music in one. Stake out a Main Street curb spot 45 minutes before showtime. Tapestry of Happiness runs multiple times nightly, so you can catch it after the parade without rushing.",
    ctaCampaign: 'event_70th',
    ctaLabel: 'Book a 70th finale trip',
  },
  {
    slug: 'lunar-new-year',
    name: 'Lunar New Year at Disney California Adventure',
    park: 'DCA',
    start: '2026-01-23',
    end: '2026-02-22',
    dateLabel: 'Jan 23 – Feb 22, 2026',
    ticketed: false,
    familyVerdict: 'worth-it',
    theme: 'coral',
    whatItIs:
      "Year of the Horse. Mulan's Lunar New Year Procession, Asian-inspired food marketplaces around Paradise Gardens, and character meet-and-greets with Mulan, Mushu, and friends.",
    kidNotes:
      "Stroller-friendly and low-crowd — January and early February are the calmest months of the year. Kids who've watched Mulan will flip for the procession. Food booths are small-plate style, great for sharing.",
    ctaCampaign: 'event_lunar',
    ctaLabel: 'Plan a Lunar New Year trip',
  },
  {
    slug: 'celebrate-gospel',
    name: 'Celebrate Gospel',
    park: 'Downtown Disney',
    start: '2026-02-20',
    end: '2026-02-28',
    dateLabel: 'Feb 20–21 & 27–28, 2026',
    ticketed: false,
    familyVerdict: 'bonus',
    theme: 'castle',
    whatItIs:
      'Gospel music performances in Downtown Disney — community choirs and headlining artists across two weekends. Free to attend (no park admission needed).',
    kidNotes:
      "Open-air and family-friendly. A nice 30-minute add-on if you're already at the resort — not worth building a trip around with small kids.",
  },
  {
    slug: 'food-and-wine',
    name: 'Disney California Adventure Food & Wine Festival',
    park: 'DCA',
    start: '2026-03-06',
    end: '2026-04-27',
    dateLabel: 'Mar 6 – Apr 27, 2026',
    ticketed: false,
    familyVerdict: 'worth-it',
    theme: 'sun',
    whatItIs:
      'Walk-around food marketplaces lining DCA with small plates and sips from California cuisine, plus culinary demos and live music. Included with park admission; food is à la carte ($7–$12 per plate).',
    kidNotes:
      'There\'s a kid-focused "Jr. Chef" booth every year with simple bites. The pacing is slower than a ride-heavy day — build in a stroller nap between marketplaces. Overlaps with spring break mid-March to mid-April; aim for the first week of March or the last week of April for lower crowds.',
    ctaCampaign: 'event_foodwine',
    ctaLabel: 'Book a Food & Wine trip',
  },
  {
    slug: 'bluey',
    name: "Bluey's Best Day Ever!",
    park: 'Disneyland',
    start: '2026-03-22',
    end: '2026-12-31',
    dateLabel: 'Debuts Mar 22, 2026',
    ticketed: false,
    familyVerdict: 'must-see',
    theme: 'mint',
    whatItIs:
      "Fantasyland Theatre transforms into Bluey's school — live stage show with Bluey and Bingo, musical segments, Keepy Uppy, and a walk-through Gnome Village and Fairy Garden play space.",
    kidNotes:
      'Absolute must for ages 2–6 who watch the show. The new kids meal combo is $5.99 at Troubadour Tavern. Show runs multiple times daily — check the app the morning-of and queue 20 minutes early for a front seat.',
    ctaCampaign: 'event_bluey',
    ctaLabel: 'Plan a Bluey trip',
  },
  {
    slug: 'after-dark',
    name: 'Disneyland After Dark Nights',
    park: 'Disneyland',
    start: '2026-01-02',
    end: '2026-06-30',
    dateLabel: 'Jan – Jun 2026 (select nights)',
    ticketed: true,
    priceHint: '~$139–$179 per ticket',
    bookWhen: 'Tickets usually drop 8–10 weeks before each event',
    familyVerdict: 'skip-with-littles',
    theme: 'castle',
    whatItIs:
      "Separately-ticketed after-hours parties (9pm–1am) with themed entertainment: Sweethearts' Nite, 70 Years of Favorites, Disney Channel Nite, Star Wars Nite, Pride Nite.",
    kidNotes:
      'Starts at 9pm and runs past midnight — not a toddler event. Best if your kids are 10+ and can handle a late night. Disney Channel Nite is the most kid-leaning of the lineup.',
  },
  {
    slug: 'halloween-time',
    name: 'Halloween Time',
    park: 'Both',
    start: '2026-08-21',
    end: '2026-10-31',
    dateLabel: 'Aug 21 – Oct 31, 2026',
    ticketed: false,
    familyVerdict: 'must-see',
    theme: 'coral',
    whatItIs:
      "Included with park admission. Haunted Mansion Holiday overlay (Nightmare Before Christmas takeover), the giant Mickey jack-o'-lantern on Main Street, Cars Land Haul-O-Ween, pumpkin beignets, Space Mountain Ghost Galaxy.",
    kidNotes:
      'Not scary — decorations are festive, not creepy. Haunted Mansion Holiday is the single best ride overlay Disney does. Weekdays in September and early October are the sweet spot: full Halloween vibes, manageable crowds.',
    ctaCampaign: 'event_halloween',
    ctaLabel: 'Book a Halloween Time trip',
  },
  {
    slug: 'oogie-boogie-bash',
    name: 'Oogie Boogie Bash – A Disney Halloween Party',
    park: 'DCA',
    start: '2026-08-18',
    end: '2026-10-31',
    dateLabel: '33 select nights, Aug 18 – Oct 31, 2026',
    ticketed: true,
    priceHint: '~$139–$199 per ticket (based on 2025 pricing)',
    bookWhen: 'Tickets typically drop late June; Magic Key pre-sale first',
    familyVerdict: 'worth-it',
    theme: 'castle',
    whatItIs:
      'Separately-ticketed hard-ticket Halloween party at DCA, 6pm–11pm. Trick-or-treat trails, villains cavalcade, rare character meets (Oogie Boogie himself, villains you never see in the regular park), and the Frightfully Fun Parade.',
    kidNotes:
      'Best for ages 5+. Costumes are encouraged — kids can wear them inside the park (adults have rules, check the app). Expect to walk 3–5 miles in 5 hours; bring snacks for early-evening hunger before the candy stations open. Sells out early — book day-one of the on-sale window.',
    ctaCampaign: 'event_oogieboogie',
    ctaLabel: 'Plan an Oogie Boogie Bash trip',
  },
  {
    slug: 'plaza-de-la-familia',
    name: 'Plaza de la Familia (Día de los Muertos)',
    park: 'DCA',
    start: '2026-08-21',
    end: '2026-11-02',
    dateLabel: 'Aug 21 – Nov 2, 2026',
    ticketed: false,
    familyVerdict: 'bonus',
    theme: 'sun',
    whatItIs:
      'Coco-inspired music, storytelling, and crafts near Paradise Gardens. Free Miguel & Dante meet-and-greet. Runs simultaneously with Halloween Time.',
    kidNotes:
      'A beautiful, calm corner of the park — great for a midday reset. Kids who love Coco will want to sit through the full musical storytelling set (about 25 minutes).',
  },
  {
    slug: 'holidays',
    name: 'Holidays at the Disneyland Resort',
    park: 'Both',
    start: '2026-11-18',
    end: '2027-01-06',
    dateLabel: 'Nov 18, 2026 – early Jan 2027',
    ticketed: false,
    familyVerdict: 'must-see',
    theme: 'castle',
    whatItIs:
      'Holiday overlays on it\'s a small world and Haunted Mansion, Sleeping Beauty Castle snowfall, "A Christmas Fantasy" parade, Believe... in Holiday Magic fireworks, and Santa meet-and-greets.',
    kidNotes:
      'Magical but crowded. Go Mon–Thu between Nov 18 and Dec 18 — those are the best-value holiday weeks. Avoid Dec 20 – Jan 1: the parks routinely hit capacity and phase-close entry. Note: the 2026 holiday window is about 4 days shorter than the 2024 and 2025 windows.',
    ctaCampaign: 'event_holidays',
    ctaLabel: 'Book a Holidays trip',
  },
  {
    slug: 'festival-of-holidays',
    name: 'Disney Festival of Holidays',
    park: 'DCA',
    start: '2026-11-18',
    end: '2027-01-06',
    dateLabel: 'Concurrent with Holidays',
    ticketed: false,
    familyVerdict: 'worth-it',
    theme: 'mint',
    whatItIs:
      '¡Viva Navidad!, Hanukkah and Kwanzaa celebrations, and food marketplaces around DCA similar to Food & Wine. Included with admission; food is à la carte.',
    kidNotes:
      "The ¡Viva Navidad! street party is one of the best kid experiences at the resort — Donald, Daisy, Panchito, and José dance with families in Paradise Gardens. Don't miss it.",
  },
]

export const SEASONS: SeasonMonth[] = [
  {
    month: 'January',
    verdict: 'go',
    crowds: 'Low',
    weather: { highF: 68, lowF: 48, note: 'Cool, occasionally rainy — layers + poncho' },
    eventsActive: ['disneyland-70th', 'lunar-new-year', 'after-dark'],
    bestWindow: "Jan 5 – Jan 20 (after New Year's crash, before Lunar New Year opens)",
    desc: 'Post-holiday lull. Short lines, cool weather. Best value month of the year. Lunar New Year opens Jan 23 at DCA.',
  },
  {
    month: 'February',
    verdict: 'maybe',
    crowds: 'Low–Med',
    weather: { highF: 70, lowF: 50, note: 'Cool but sunny — light jacket weather' },
    eventsActive: ['disneyland-70th', 'lunar-new-year', 'celebrate-gospel', 'after-dark'],
    avoidDates: "Feb 14–16 (Presidents' Day weekend) — Valentine's + holiday combine",
    bestWindow: 'Feb 2 – Feb 13, then Feb 18 – Feb 22',
    desc: "Great until Presidents' Day week. Lunar New Year runs all month — weekdays in early Feb are low-crowd with festive food at DCA.",
  },
  {
    month: 'March',
    verdict: 'avoid',
    crowds: 'High',
    weather: { highF: 72, lowF: 53, note: 'Mild and sunny — ideal weather, brutal crowds' },
    eventsActive: ['disneyland-70th', 'food-and-wine', 'bluey', 'after-dark'],
    avoidDates: 'All of March (rolling spring break across US school districts)',
    desc: "Spring break. All of it. Prices spike, lines are brutal, Lightning Lane sells out. Bluey's Best Day Ever debuts Mar 22 — if you can tolerate crowds, this is the newest draw at the resort.",
  },
  {
    month: 'April',
    verdict: 'maybe',
    crowds: 'Med–High',
    weather: { highF: 75, lowF: 55, note: 'Warm days, cool evenings — perfect park weather' },
    eventsActive: ['disneyland-70th', 'food-and-wine', 'bluey', 'after-dark'],
    avoidDates: 'Apr 1 – Apr 12 (Easter + spring break overflow)',
    bestWindow: 'Apr 20 – Apr 30 (crowds thin, Food & Wine + Bluey still running)',
    desc: 'First two weeks are still spring break overflow. Late April is golden — Food & Wine in full swing, crowds thin, weather peaks.',
  },
  {
    month: 'May',
    verdict: 'go',
    crowds: 'Low–Med',
    weather: { highF: 78, lowF: 58, note: 'Warm but not hot — peak springtime' },
    eventsActive: ['disneyland-70th', 'bluey', 'after-dark'],
    bestWindow: 'May 4 – May 22 (weekdays especially) — skip Memorial Day weekend',
    avoidDates: 'May 23 – May 25 (Memorial Day weekend)',
    desc: "Sweet spot. School's still in, weather is warm but not brutal. Weekdays are golden. Bluey running daily + 70th nighttime shows at peak production.",
  },
  {
    month: 'June',
    verdict: 'maybe',
    crowds: 'High',
    weather: { highF: 82, lowF: 62, note: '"June Gloom" mornings, hot afternoons' },
    eventsActive: ['disneyland-70th', 'bluey'],
    bestWindow: 'Jun 1 – Jun 12 (before most schools release)',
    desc: 'Summer kicks in hard. Hot, crowded, expensive. Go early in the month if you must — last chance to catch the 70th nighttime shows before they retire Aug 9.',
  },
  {
    month: 'July',
    verdict: 'avoid',
    crowds: 'Very High',
    weather: { highF: 92, lowF: 66, note: 'Hot — 90s most days, occasional 100°F+ inland' },
    eventsActive: ['disneyland-70th', 'bluey'],
    avoidDates: 'Jul 1 – Jul 7 (Independence Day week)',
    desc: 'Peak everything. High-90s heat, 60+ min lines for everything, cranky toddlers everywhere (including yours).',
  },
  {
    month: 'August',
    verdict: 'maybe',
    crowds: 'Med–High',
    weather: { highF: 88, lowF: 65, note: 'Hot; heat peaks early-to-mid month' },
    eventsActive: [
      'disneyland-70th',
      'bluey',
      'halloween-time',
      'oogie-boogie-bash',
      'plaza-de-la-familia',
    ],
    bestWindow: 'Aug 24 – Aug 31 (school-restart lull, Halloween Time already up)',
    desc: 'Late August is surprisingly good. Halloween Time opens Aug 21, Oogie Boogie Bash begins Aug 18, and schools restart in most districts — the last week is the under-rated sweet spot. Avoid early August heat if you can.',
  },
  {
    month: 'September',
    verdict: 'must-go',
    crowds: 'Low',
    weather: { highF: 86, lowF: 63, note: 'Warm but cooling — best weather of fall' },
    eventsActive: ['bluey', 'halloween-time', 'oogie-boogie-bash', 'plaza-de-la-familia'],
    bestWindow: 'Mid-Sep to late Sep (Tue–Thu are lightest)',
    desc: 'Best-kept secret. Schools are back, full Halloween Time decor up, Oogie Boogie Bash running select nights. The lowest-crowd month outside of January with the best vibes of the year.',
  },
  {
    month: 'October',
    verdict: 'must-go',
    crowds: 'Med',
    weather: { highF: 80, lowF: 58, note: 'Ideal — warm days, cool evenings, dry' },
    eventsActive: ['bluey', 'halloween-time', 'oogie-boogie-bash', 'plaza-de-la-familia'],
    avoidDates: 'Oct 30 – Oct 31 (Halloween weekend peak)',
    bestWindow: 'Oct 5 – Oct 22 (weekdays, especially Tue–Wed)',
    desc: 'Halloween at Disneyland is magical. Haunted Mansion Holiday in full effect, pumpkin beignets everywhere, Oogie Boogie Bash nights. Weekdays are manageable; weekends crowd hard.',
  },
  {
    month: 'November',
    verdict: 'maybe',
    crowds: 'Med–High',
    weather: { highF: 74, lowF: 52, note: 'Cool, layered clothing weather' },
    eventsActive: ['bluey', 'plaza-de-la-familia', 'holidays', 'festival-of-holidays'],
    avoidDates: 'Nov 23 – Nov 29 (Thanksgiving week)',
    bestWindow: 'Nov 18 – Nov 22 (holiday decor up, pre-Thanksgiving low crowds)',
    desc: 'Holidays at the Resort begin Nov 18 with fresh decor + Festival of Holidays marketplaces at DCA. The five days before Thanksgiving are the secret window — holiday magic without Thanksgiving crowds.',
  },
  {
    month: 'December',
    verdict: 'maybe',
    crowds: 'Med–Very High',
    weather: { highF: 68, lowF: 48, note: 'Cool, possible rain — bring layers + poncho' },
    eventsActive: ['bluey', 'holidays', 'festival-of-holidays'],
    avoidDates: 'Dec 20 – Jan 1 (parks regularly hit capacity and phase-close)',
    bestWindow: 'Dec 1 – Dec 18 (Mon–Thu are the holy grail of holiday visits)',
    desc: "First three weeks are decent with full holiday decor. Haunted Mansion Holiday and it's a small world Holiday are spectacular. Avoid Dec 20 – Jan 1 at all costs — the parks literally stop letting people in.",
  },
]
