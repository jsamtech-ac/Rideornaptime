export type Verdict = 'must-do' | 'maybe' | 'skip'

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
}

export interface SeasonMonth {
  month: string
  verdict: 'go' | 'avoid' | 'maybe' | 'must-go'
  crowds: string
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

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap(g => g.items)

export const SITE_URL = 'https://rideornaptime.com'

export const RIDES: Ride[] = [
  { name: 'Dumbo the Flying Elephant', land: 'Fantasyland · Disneyland', park: 'DL', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'maybe', age8: 'skip', take: 'Pure magic for toddlers. By age 8, they\'re over it. Ride early — the line gets absurd for a 90-second ride.' },
  { name: "It's a Small World", land: 'Fantasyland · Disneyland', park: 'DL', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'must-do', age8: 'maybe', take: 'The ultimate toddler ride. Air-conditioned, 15 minutes long, and the line moves fast. Use it as a reset button when everyone\'s melting down.' },
  { name: 'King Arthur Carrousel', land: 'Fantasyland · Disneyland', park: 'DL', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'maybe', age8: 'skip', take: 'Classic carousel right behind the castle. Toddlers love it, adults get a 2-minute sit-down. Short lines most of the day.' },
  { name: 'Mad Tea Party (Tea Cups)', land: 'Fantasyland · Disneyland', park: 'DL', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'must-do', age8: 'maybe', take: 'The spinning cups never get old for little kids. Let them control the wheel — they\'ll giggle through the whole thing. Skip if anyone in your group gets motion sick.' },
  { name: "Peter Pan's Flight", land: 'Fantasyland · Disneyland', park: 'DL', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'must-do', age8: 'must-do', take: 'The crown jewel of Fantasyland. Ride early — the line gets to 60+ min by 10 AM and it never drops. Lightning Lane or rope-drop are your only options.' },
  { name: 'Alice in Wonderland', land: 'Fantasyland · Disneyland', park: 'DL', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'must-do', age8: 'maybe', take: 'Gentle outdoor-then-indoor dark ride. Great for little ones. Lines stay manageable most of the day.' },
  { name: 'Casey Jr. Circus Train', land: 'Fantasyland · Disneyland', park: 'DL', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'maybe', age8: 'skip', take: 'Tiny train ride through miniature storybook scenes. Pair it with Storybook Land Canal Boats next door — same story, two angles.' },
  { name: 'Storybook Land Canal Boats', land: 'Fantasyland · Disneyland', park: 'DL', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'maybe', age8: 'skip', take: 'A cast member narrates while you boat through miniature Disney villages. Quiet, slow, weirdly magical. Toddlers are mesmerized.' },
  { name: 'Buzz Lightyear Astro Blasters', land: 'Tomorrowland · Disneyland', park: 'DL', height: 'Any height', closing: 'Closing April 2026', age2: 'maybe', age4: 'must-do', age6: 'must-do', age8: 'must-do', take: 'Kids go nuts competing for high scores. Even a 2-year-old can spin the car and smash the trigger. Ride it before it closes in April 2026.' },
  { name: 'Space Mountain', land: 'Tomorrowland · Disneyland', park: 'DL', height: '40" / 102 cm', age2: 'skip', age4: 'skip', age6: 'maybe', age8: 'must-do', take: 'Indoor coaster in the dark — speed is moderate but pitch-black tunnels can terrify a nervous 6-year-old. If they\'ve handled Big Thunder, they\'re ready.' },
  { name: 'Pirates of the Caribbean', land: 'New Orleans Square · Disneyland', park: 'DL', height: 'Any height', age2: 'maybe', age4: 'must-do', age6: 'must-do', age8: 'must-do', take: 'One small drop in the dark — some 2-year-olds cry, most love it. The queue itself is half the fun. Go after lunch when the line dips.' },
  { name: 'Haunted Mansion', land: 'New Orleans Square · Disneyland', park: 'DL', height: 'Any height', age2: 'skip', age4: 'maybe', age6: 'must-do', age8: 'must-do', take: 'Know your kid. If they handle mild spooky stuff, a brave 4-year-old will love it. If not, the stretching room alone will end your day.' },
  { name: 'Autopia', land: 'Tomorrowland · Disneyland', park: 'DL', height: '32" with adult / 54" to drive alone', age2: 'skip', age4: 'skip', age6: 'maybe', age8: 'maybe', take: 'The line is 40+ minutes for 4 minutes of driving a car that barely steers. Unless your kid is car-obsessed, skip it and spend that time on 3 better rides.' },
  { name: 'Big Thunder Mountain Railroad', land: 'Frontierland · Disneyland', park: 'DL', height: '40" / 102 cm', age2: 'skip', age4: 'skip', age6: 'must-do', age8: 'must-do', take: 'The perfect "first roller coaster." Fast but not scary — more like a fun bumpy train. If they\'re tall enough, do it.' },
  { name: "Tiana's Bayou Adventure", land: 'Critter Country · Disneyland', park: 'DL', height: '40" / 102 cm', age2: 'skip', age4: 'skip', age6: 'must-do', age8: 'must-do', take: 'The reimagined Splash Mountain. Gorgeous music, beautiful New Orleans vibes, one big drop at the end. Use Rider Switch for kids under 40".' },
  { name: 'Jungle Cruise', land: 'Adventureland · Disneyland', park: 'DL', height: 'Any height', age2: 'maybe', age4: 'must-do', age6: 'must-do', age8: 'must-do', take: 'The dad jokes are the real ride. Little ones love the animals, bigger kids groan at the puns. Use Lightning Lane if the standby is over 30 min.' },
  { name: 'Finding Nemo Submarine Voyage', land: 'Tomorrowland · Disneyland', park: 'DL', height: 'Any height', age2: 'maybe', age4: 'must-do', age6: 'must-do', age8: 'maybe', take: 'Great for hot days — it\'s air-conditioned and easygoing. The submarine entrance is a tight spiral staircase with a stroller, so plan accordingly.' },
  { name: "Mickey & Minnie's Runaway Railway", land: 'Mickey\'s Toontown · Disneyland', park: 'DL', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'must-do', age8: 'must-do', take: 'Incredible visuals, and the whole family genuinely enjoys it. The trackless ride system surprises everyone. Lightning Lane this one.' },
  { name: 'Radiator Springs Racers', land: 'Cars Land · DCA', park: 'DCA', height: '40" / 102 cm', age2: 'skip', age4: 'maybe', age6: 'must-do', age8: 'must-do', take: 'The best ride at DCA. Rope-drop this or get Lightning Lane — the standby line hits 60-90 min by mid-morning.' },
  { name: 'Monsters, Inc.', land: 'Hollywood Land · DCA', park: 'DCA', height: 'Any height', closing: 'Closing sometime in 2027', age2: 'must-do', age4: 'must-do', age6: 'must-do', age8: 'maybe', take: 'Gentle ride, Monsters characters are a hit. Closing in 2027, so ride it while you still can.' },
  { name: 'Inside Out Emotional Whirlwind', land: 'Pixar Pier · DCA', park: 'DCA', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'maybe', age8: 'skip', take: 'Basically a rebranded tea cups. Toddlers love it, older kids find it boring. Keep it in your pocket for when the little one needs a win.' },
  { name: 'Incredicoaster', land: 'Pixar Pier · DCA', park: 'DCA', height: '48" / 122 cm', age2: 'skip', age4: 'skip', age6: 'skip', age8: 'must-do', take: 'Most kids under 8 won\'t make it. If your 8-year-old is a thrill seeker, this is their moment. Use Rider Switch so both parents can ride.' },
  { name: 'The Little Mermaid', land: 'Hollywood Land · DCA', park: 'DCA', height: 'Any height', age2: 'must-do', age4: 'must-do', age6: 'maybe', age8: 'skip', take: 'Walk-on most of the day, air-conditioned, and the Ariel fans in your group will lose their minds. Perfect low-effort ride when energy is fading.' },
]

export const ITINERARIES: Record<string, { label: string; events: TimelineEvent[] }> = {
  '1day': {
    label: '1-Day Blitz',
    events: [
      { time: '7:30 AM', title: 'Arrive before gates open', desc: 'Be in line 30 min before official opening. Have breakfast before you arrive — eating at the park eats into prime low-wait time.', type: 'ride' },
      { time: '8:00 AM', title: 'Rope-drop: Toontown or Fantasyland', desc: 'Head straight to Mickey & Minnie\'s Runaway Railway or hit Dumbo, Small World, and Peter Pan back-to-back while lines are short.', type: 'ride' },
      { time: '9:30 AM', title: 'Adventureland loop', desc: 'Jungle Cruise, Pirates of the Caribbean, and grab a Dole Whip at the Tiki Juice Bar. Use mobile order to skip the Dole Whip line.', type: 'ride' },
      { time: '11:00 AM', title: 'Tomorrowland', desc: 'Buzz Lightyear and Finding Nemo submarine. Both are great for cooling down. Book your next Lightning Lane from the app while in line.', type: 'ride' },
      { time: '12:00 PM', title: 'Lunch: Jolly Holiday or Plaza Inn', desc: 'Mobile order 30 min before you want to eat. Jolly Holiday has a great kids menu. Plaza Inn fried chicken is the best meal in the park.', type: 'food' },
      { time: '12:45 PM', title: 'NAP / BREAK TIME', desc: 'This is non-negotiable. Go back to the hotel, find a quiet bench, or use the Baby Care Center. A 60-90 min reset prevents the 3pm meltdown.', type: 'break' },
      { time: '2:30 PM', title: 'Return — Frontierland & New Orleans Sq', desc: 'Big Thunder Mountain (if tall enough), Haunted Mansion. Crowds thin during the afternoon parade — ride during the parade if your kids don\'t care about it.', type: 'ride' },
      { time: '4:00 PM', title: 'Snack break', desc: 'Cheesy garlic pretzel by the castle, churros from any cart. Let the kids run at the Toontown playground — only one exit so you can zone out for 20 min.', type: 'food' },
      { time: '5:00 PM', title: 'Re-ride favorites or explore', desc: 'Hit anything you missed or re-ride the favorites. Wait times drop in the early evening between dinner and fireworks.', type: 'ride' },
      { time: '6:30 PM', title: 'Dinner', desc: 'Bengal BBQ for something quick in Adventureland, or beignets and a Mint Julep in New Orleans Square. Mobile order is your friend.', type: 'food' },
      { time: '8:00 PM', title: 'Fireworks from Star Wars: Galaxy\'s Edge', desc: 'Skip the Main Street crush. Watch from Galaxy\'s Edge — same fireworks, but they play John Williams music. Way less crowded and honestly better.', type: 'ride' },
    ],
  },
  '2day': {
    label: '2-Day Relaxed',
    events: [
      { time: 'Day 1 AM', title: 'Disneyland — morning focus', desc: 'Rope-drop Fantasyland + Toontown. Hit Small World, Dumbo, Runaway Railway, Peter Pan. Move to Adventureland by 10 AM for Pirates and Jungle Cruise.', type: 'ride' },
      { time: 'Day 1 Lunch', title: 'Plaza Inn or Jolly Holiday', desc: 'Mobile order at 11:30. Eat by noon. No rush — you have two days.', type: 'food' },
      { time: 'Day 1 PM', title: 'Long break — hotel pool or nap', desc: 'Leave the park from 12:30–3:30 PM. This is the magic of a 2-day plan. Your kids come back fresh while everyone else is hitting the wall.', type: 'break' },
      { time: 'Day 1 Eve', title: 'Return for Tomorrowland + fireworks', desc: 'Buzz Lightyear, Space Mountain (if tall enough), then fireworks from Galaxy\'s Edge. Grab dinner from Bengal BBQ or beignets.', type: 'ride' },
      { time: 'Day 2 AM', title: 'DCA — morning focus', desc: 'Rope-drop Radiator Springs Racers (or Lightning Lane it). Then Monsters Inc, Little Mermaid, and the Pixar Pier area.', type: 'ride' },
      { time: 'Day 2 Lunch', title: 'San Fransokyo or Lamplight Lounge', desc: 'Birria tacos and street corn at San Fransokyo are incredible. Lamplight Lounge on Pixar Pier is a great sit-down if you want to linger.', type: 'food' },
      { time: 'Day 2 PM', title: 'DCA workshops + rest', desc: 'Head to Hollywood Land for the free animation workshops, drawing classes, and Sorcerer\'s Workshop. Air-conditioned, free, and runs every 30 min. Best-kept secret for an afternoon reset.', type: 'break' },
      { time: 'Day 2 Eve', title: 'World of Color + wrap up', desc: 'Book World of Color Lightning Lane early in the day — spots run out. Grab Ronto Wraps at Galaxy\'s Edge for dinner if you park-hop back to Disneyland.', type: 'ride' },
    ],
  },
  '3day': {
    label: '3-Day Complete',
    events: [
      { time: 'Day 1', title: 'Disneyland — Greatest Hits', desc: 'All the must-dos: Runaway Railway, Small World, Pirates, Jungle Cruise, Buzz Lightyear. Long midday break. Return for evening rides + fireworks from Galaxy\'s Edge.', type: 'ride' },
      { time: 'Day 2', title: 'DCA — Full Day', desc: 'Radiator Springs Racers at rope-drop. Pixar Pier, Hollywood Land workshops in the afternoon. San Fransokyo for lunch. World of Color in the evening.', type: 'ride' },
      { time: 'Day 3', title: 'Flex Day — Re-rides & What You Missed', desc: 'This is the luxury day. Re-ride favorites, catch character meet-and-greets you missed, try restaurants you skipped. No pressure, no schedule. Watch the fireworks from Main Street this time for the full projection show.', type: 'break' },
      { time: 'Day 3 Tip', title: 'Character breakfast on Day 3', desc: 'Book Plaza Inn character breakfast or Storyteller Cafe (at Grand Californian). Meet princesses, Goofy, and more all in one spot without standing in separate lines.', type: 'food' },
    ],
  },
}

export const FOOD_SPOTS: FoodSpot[] = [
  { emoji: '🍗', name: 'Plaza Inn Fried Chicken', location: 'Main Street · Disneyland', desc: 'The best meal in the park. Seriously. The fried chicken is crispy, juicy, and comes with real sides. Also does a character breakfast — book in advance.' },
  { emoji: '🍦', name: 'Dole Whip', location: 'Adventureland · Disneyland', desc: 'Non-negotiable. Get it at the Tiki Juice Bar. Pro tip: use the back line through the Tiki Room alcove — always shorter. Or mobile order and skip the line entirely.' },
  { emoji: '🌮', name: 'Birria Tacos & Street Corn', location: 'San Fransokyo · DCA', desc: 'The birria tacos are legit — not theme park food, actually great food. The street corn is a perfect snack. Anything from Cocina Cucamonga is solid.' },
  { emoji: '🥐', name: 'Jolly Holiday Bakery Cafe', location: 'Main Street · Disneyland', desc: 'Great kids menu, solid sandwiches, and the raspberry rose macaron is worth the hype. Central location makes it an easy stop.' },
  { emoji: '🍖', name: 'Bengal BBQ', location: 'Adventureland · Disneyland', desc: 'Quick BBQ skewers right in Adventureland. Perfect for grabbing something fast between rides without a full sit-down meal.' },
  { emoji: '🦐', name: 'Lamplight Lounge', location: 'Pixar Pier · DCA', desc: 'Best sit-down at DCA. Great lobster nachos, waterfront views. Book a reservation or expect a wait — but it\'s worth it for a real meal.' },
  { emoji: '🌯', name: 'Ronto Wraps', location: 'Galaxy\'s Edge · Disneyland', desc: 'The Ronto Wrap (grilled sausage + slaw in pita) is a top-5 park food. They also have a "Rontoless" veggie version that\'s surprisingly good.' },
  { emoji: '🍩', name: 'Beignets & Mint Julep', location: 'New Orleans Square · Disneyland', desc: '6 beignets for $5. Seasonal flavors at Halloween and Christmas. Mobile order to skip the line. Pair with a Mint Julep — it\'s non-alcoholic and refreshing.' },
  { emoji: '🥨', name: 'Cheesy Garlic Pretzel', location: 'Near Castle · Disneyland', desc: 'Giant soft pretzel stuffed with cheese. The kids will devour it. Great shareable snack between rides.' },
]

export const PACKING_LIST: PackingItem[] = [
  { item: 'Portable phone charger (10,000+ mAh)', why: 'You\'ll use the Disneyland app constantly — Lightning Lane, mobile orders, maps, wait times. Your phone will die by 2pm without this.' },
  { item: 'Stroller fan (clip-on)', why: 'Attaches to the stroller canopy. A lifesaver in summer when the pavement radiates heat.' },
  { item: 'Reusable water bottles (one per person)', why: 'Water is $5+ in the park. Free water refill stations are everywhere. Bring bottles and save $30+ per day.' },
  { item: 'Snack container + pre-packed snacks', why: 'Goldfish, fruit pouches, granola bars. You\'re allowed to bring food in. A hangry toddler in a 45-min line is a disaster you can prevent.' },
  { item: 'Sunscreen (SPF 50+, stick format)', why: 'Stick format so you can reapply without washing hands. You will forget to reapply — set a phone alarm for every 2 hours.' },
  { item: 'Rain ponchos (disposable)', why: 'Park ponchos cost $15 each. Pack $1 ponchos from Amazon. Also useful for water rides at DCA.' },
  { item: 'Ziploc bags (gallon size)', why: 'Wet clothes, half-eaten snacks, phone protection on water rides. The most versatile item on this list.' },
  { item: 'Lightweight blanket or jacket layers', why: 'Mornings and evenings get cold, even in summer. AC in rides and restaurants can chill sweaty kids fast.' },
  { item: 'Change of clothes (one per kid)', why: 'Water rides, spills, blowouts. Keep a change in a dry bag under the stroller.' },
  { item: 'Portable first-aid basics', why: 'Band-aids, children\'s Tylenol, anti-chafe stick. The Baby Care Center has supplies but the line isn\'t worth it for a Band-Aid.' },
  { item: 'Moleskin or comfy shoes you\'ve broken in', why: 'You will walk 8-12 miles. New shoes = blisters by noon. This is the #1 mistake families make.' },
  { item: 'Autograph book + thick marker', why: 'Characters in gloves can\'t grip a pen. Bring a fat Sharpie. Or skip the book and use the Disneyland app\'s PhotoPass — photos are included with Lightning Lane.' },
]

export const SEASONS: SeasonMonth[] = [
  { month: 'January', verdict: 'go', crowds: 'Low', desc: 'Post-holiday lull. Short lines, cool weather. Best value month of the year.' },
  { month: 'February', verdict: 'maybe', crowds: 'Low–Med', desc: 'Great until Presidents\' Day week. Avoid that week specifically — it\'s a zoo.' },
  { month: 'March', verdict: 'avoid', crowds: 'High', desc: 'Spring break. All of it. Prices spike, lines are brutal, Lightning Lane sells out.' },
  { month: 'April', verdict: 'maybe', crowds: 'Med–High', desc: 'First two weeks are still spring break overflow. Late April is solid — crowds thin and weather is perfect.' },
  { month: 'May', verdict: 'go', crowds: 'Low–Med', desc: 'Sweet spot. School\'s still in, weather is warm but not brutal. Weekdays are golden.' },
  { month: 'June', verdict: 'maybe', crowds: 'High', desc: 'Summer kicks in hard. Hot, crowded, expensive. Go early in the month if you must.' },
  { month: 'July', verdict: 'avoid', crowds: 'Very High', desc: 'Peak everything. 100°F days, 60+ min lines for everything, cranky toddlers everywhere (including yours).' },
  { month: 'August', verdict: 'avoid', crowds: 'High', desc: 'Still summer crowds plus the heat. Late August eases slightly as schools restart.' },
  { month: 'September', verdict: 'go', crowds: 'Low', desc: 'Best-kept secret. Schools are back, Halloween decorations go up mid-month. Low crowds + festive vibes.' },
  { month: 'October', verdict: 'must-go', crowds: 'Med', desc: 'Halloween at Disneyland is magical. Haunted Mansion overlay, pumpkin beignets, special parades. Weekdays are manageable.' },
  { month: 'November', verdict: 'maybe', crowds: 'Med–High', desc: 'Great before Thanksgiving. Holiday decorations go up mid-month. Thanksgiving week itself is packed.' },
  { month: 'December', verdict: 'maybe', crowds: 'Med–Very High', desc: 'First two weeks are decent. Christmas decorations are incredible. Avoid Dec 20–Jan 1 — it hits capacity.' },
]
