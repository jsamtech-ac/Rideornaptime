'use client'

import { useState, useEffect } from 'react'

// ===== DATA =====

const NAV_ITEMS = [
  { id: 'rides', label: 'Rides', icon: '🎢' },
  { id: 'itinerary', label: 'Itinerary', icon: '🗓' },
  { id: 'lightning', label: 'Lightning Lane', icon: '⚡' },
  { id: 'food', label: 'Food', icon: '🍽' },
  { id: 'packing', label: 'Packing', icon: '🎒' },
  { id: 'seasonal', label: 'Seasonal', icon: '🌤' },
  { id: 'money', label: 'Save Money', icon: '💰' },
]

type Verdict = 'must-do' | 'maybe' | 'skip'

interface Ride {
  name: string
  land: string
  park: 'DL' | 'DCA'
  age2: Verdict
  age4: Verdict
  age6: Verdict
  age8: Verdict
  take: string
}

const RIDES: Ride[] = [
  {
    name: 'Dumbo the Flying Elephant',
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    age2: 'must-do', age4: 'must-do', age6: 'maybe', age8: 'skip',
    take: 'Pure magic for toddlers. By age 8, they\'re over it. Ride early — the line gets absurd for a 90-second ride.',
  },
  {
    name: "It's a Small World",
    land: 'Fantasyland · Disneyland',
    park: 'DL',
    age2: 'must-do', age4: 'must-do', age6: 'must-do', age8: 'maybe',
    take: 'The ultimate toddler ride. Air-conditioned, 15 minutes long, and the line moves fast. Use it as a reset button when everyone\'s melting down.',
  },
  {
    name: 'Buzz Lightyear Astro Blasters',
    land: 'Tomorrowland · Disneyland',
    park: 'DL',
    age2: 'maybe', age4: 'must-do', age6: 'must-do', age8: 'must-do',
    take: 'Kids go nuts competing for high scores. Even a 2-year-old can spin the car and smash the trigger. The whole family will want to ride again.',
  },
  {
    name: 'Pirates of the Caribbean',
    land: 'New Orleans Square · Disneyland',
    park: 'DL',
    age2: 'maybe', age4: 'must-do', age6: 'must-do', age8: 'must-do',
    take: 'One small drop in the dark — some 2-year-olds cry, most love it. The queue itself is half the fun. Go after lunch when the line dips.',
  },
  {
    name: 'Haunted Mansion',
    land: 'New Orleans Square · Disneyland',
    park: 'DL',
    age2: 'skip', age4: 'maybe', age6: 'must-do', age8: 'must-do',
    take: 'Know your kid. If they handle mild spooky stuff, a brave 4-year-old will love it. If not, the stretching room alone will end your day.',
  },
  {
    name: 'Autopia',
    land: 'Tomorrowland · Disneyland',
    park: 'DL',
    age2: 'skip', age4: 'skip', age6: 'maybe', age8: 'maybe',
    take: 'The line is 40+ minutes for 4 minutes of driving a car that barely steers. Unless your kid is car-obsessed, skip it and spend that time on 3 better rides.',
  },
  {
    name: 'Big Thunder Mountain Railroad',
    land: 'Frontierland · Disneyland',
    park: 'DL',
    age2: 'skip', age4: 'skip', age6: 'must-do', age8: 'must-do',
    take: 'The perfect "first roller coaster." 40" height req. It\'s fast but not scary — more like a fun bumpy train. If they\'re tall enough, do it.',
  },
  {
    name: 'Jungle Cruise',
    land: 'Adventureland · Disneyland',
    park: 'DL',
    age2: 'maybe', age4: 'must-do', age6: 'must-do', age8: 'must-do',
    take: 'The dad jokes are the real ride. Little ones love the animals, bigger kids groan at the puns. Use Lightning Lane if the standby is over 30 min.',
  },
  {
    name: 'Finding Nemo Submarine Voyage',
    land: 'Tomorrowland · Disneyland',
    park: 'DL',
    age2: 'maybe', age4: 'must-do', age6: 'must-do', age8: 'maybe',
    take: 'Great for hot days — it\'s air-conditioned and easygoing. The submarine entrance is a tight spiral staircase with a stroller, so plan accordingly.',
  },
  {
    name: "Mickey & Minnie's Runaway Railway",
    land: 'Mickey\'s Toontown · Disneyland',
    park: 'DL',
    age2: 'must-do', age4: 'must-do', age6: 'must-do', age8: 'must-do',
    take: 'No height requirement, incredible visuals, and the whole family genuinely enjoys it. The trackless ride system surprises everyone. Lightning Lane this one.',
  },
  {
    name: 'Radiator Springs Racers',
    land: 'Cars Land · DCA',
    park: 'DCA',
    age2: 'skip', age4: 'maybe', age6: 'must-do', age8: 'must-do',
    take: 'The best ride at DCA. 40" height req. Rope-drop this or get Lightning Lane — the standby line hits 60-90 min by mid-morning.',
  },
  {
    name: 'Monsters, Inc.',
    land: 'Hollywood Land · DCA',
    park: 'DCA',
    age2: 'must-do', age4: 'must-do', age6: 'must-do', age8: 'maybe',
    take: 'No height requirement, gentle ride, and the Monsters characters are a hit. Great when you need a quick win between bigger attractions.',
  },
  {
    name: 'Inside Out Emotional Whirlwind',
    land: 'Pixar Pier · DCA',
    park: 'DCA',
    age2: 'must-do', age4: 'must-do', age6: 'maybe', age8: 'skip',
    take: 'Basically a rebranded tea cups. Toddlers love it, older kids find it boring. Keep it in your pocket for when the little one needs a win.',
  },
  {
    name: 'Incredicoaster',
    land: 'Pixar Pier · DCA',
    park: 'DCA',
    age2: 'skip', age4: 'skip', age6: 'skip', age8: 'must-do',
    take: '48" height req — most kids under 8 won\'t make it. If your 8-year-old is a thrill seeker, this is their moment. Use Rider Switch so both parents can ride.',
  },
  {
    name: 'The Little Mermaid',
    land: 'Hollywood Land · DCA',
    park: 'DCA',
    age2: 'must-do', age4: 'must-do', age6: 'maybe', age8: 'skip',
    take: 'Walk-on most of the day, air-conditioned, and the Ariel fans in your group will lose their minds. Perfect low-effort ride when energy is fading.',
  },
]

interface TimelineEvent {
  time: string
  title: string
  desc: string
  type: 'ride' | 'food' | 'break'
}

const ITINERARIES: Record<string, { label: string; events: TimelineEvent[] }> = {
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

interface FoodSpot {
  emoji: string
  name: string
  location: string
  desc: string
}

const FOOD_SPOTS: FoodSpot[] = [
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

interface PackingItem {
  item: string
  why: string
  affiliate?: string
}

const PACKING_LIST: PackingItem[] = [
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

interface SeasonMonth {
  month: string
  verdict: 'go' | 'avoid' | 'maybe' | 'must-go'
  crowds: string
  desc: string
}

const SEASONS: SeasonMonth[] = [
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

// ===== COMPONENTS =====

function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const labels: Record<Verdict, string> = { 'must-do': '✓ Must-Do', 'maybe': '~ Maybe', 'skip': '✗ Skip' }
  return <span className={`ride-age ${verdict}`}>{labels[verdict]}</span>
}

function RideCard({ ride }: { ride: Ride }) {
  return (
    <div className="ride-card">
      <div className="ride-name">{ride.name}</div>
      <div className="ride-land">{ride.land}</div>
      <div className="ride-ages">
        {(['age2', 'age4', 'age6', 'age8'] as const).map((age) => (
          <div key={age} className={`ride-age ${ride[age]}`}>
            <span className="age-label">{age.replace('age', 'Age ')}</span>
            {ride[age] === 'must-do' ? '✓' : ride[age] === 'maybe' ? '~' : '✗'}
          </div>
        ))}
      </div>
      <div className="ride-take">💬 {ride.take}</div>
    </div>
  )
}

function ChecklistItem({ item }: { item: PackingItem }) {
  const [checked, setChecked] = useState(false)
  return (
    <div className={`checklist-item ${checked ? 'checked' : ''}`} onClick={() => setChecked(!checked)}>
      <div className="checklist-check">{checked ? '✓' : ''}</div>
      <div className="checklist-text">
        <strong>{item.item}</strong>
        <br />
        <span>{item.why}</span>
      </div>
    </div>
  )
}

// ===== MAIN PAGE =====

export default function Home() {
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeItinerary, setActiveItinerary] = useState('1day')
  const [rideFilter, setRideFilter] = useState<'all' | 'DL' | 'DCA'>('all')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowScrollTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeNav = () => setNavOpen(false)

  const filteredRides = rideFilter === 'all' ? RIDES : RIDES.filter(r => r.park === rideFilter)
  const currentItinerary = ITINERARIES[activeItinerary]

  return (
    <>
      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-brand">
            <a href="#" className="nav-logo">
              <span className="nav-logo-icon">🎢</span>
              Ride or Naptime
            </a>
            <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle navigation">
              {navOpen ? '✕' : '☰'}
            </button>
          </div>
          <div className={`nav-links ${navOpen ? 'open' : ''}`}>
            {NAV_ITEMS.map(item => (
              <a key={item.id} href={`#${item.id}`} onClick={closeNav}>
                {item.icon} {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-badge">🏰 Updated for 2026 Season</div>
        <h1>
          The Disneyland Guide for Families Who Don't Have Time for <span className="highlight">50 Blog Posts</span>
        </h1>
        <p className="hero-sub">
          One page. Every tip. Ride-by-ride ratings for ages 2–8, 
          hour-by-hour itineraries built around nap schedules, and food 
          strategy from a dad who's done this dozens of times.
        </p>
        <div className="hero-author">
          ✍️ Written by a real parent, not a Disney influencer
        </div>
      </header>

      {/* SECTION 1: RIDES */}
      <section id="rides" className="section">
        <div className="section-header">
          <span className="section-icon">🎢</span>
          <h2>Is Your Kid Ready? Age-Based Ride Ratings</h2>
          <p className="section-intro">
            Forget height requirements — here's whether each ride is actually worth your time 
            at ages 2, 4, 6, and 8. These are honest opinions from a parent, not a marketing team.
          </p>
        </div>

        <div className="itinerary-tabs" style={{ marginBottom: '1.5rem' }}>
          {(['all', 'DL', 'DCA'] as const).map(f => (
            <button
              key={f}
              className={`itinerary-tab ${rideFilter === f ? 'active' : ''}`}
              onClick={() => setRideFilter(f)}
            >
              {f === 'all' ? 'All Rides' : f === 'DL' ? 'Disneyland' : 'DCA'}
            </button>
          ))}
        </div>

        <div className="ride-matrix">
          {filteredRides.map((ride, i) => (
            <RideCard key={i} ride={ride} />
          ))}
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pro Tip</div>
          <p>Watch POV ride videos on YouTube with your kids before the trip. It helps them pick what they want to ride and cures fear for some kids who are nervous about the dark or loud noises.</p>
        </div>
      </section>

      {/* SECTION 2: ITINERARY */}
      <section id="itinerary" className="section">
        <div className="section-content">
          <div className="section-header">
            <span className="section-icon">🗓</span>
            <h2>Hour-by-Hour Itineraries</h2>
            <p className="section-intro">
              Three plans built around nap schedules and meltdown prevention. 
              The #1 mistake families make is trying to do everything — these plans 
              tell you exactly what to skip.
            </p>
          </div>

          <div className="itinerary-tabs">
            {Object.entries(ITINERARIES).map(([key, val]) => (
              <button
                key={key}
                className={`itinerary-tab ${activeItinerary === key ? 'active' : ''}`}
                onClick={() => setActiveItinerary(key)}
              >
                {val.label}
              </button>
            ))}
          </div>

          <div className="timeline">
            {currentItinerary.events.map((event, i) => (
              <div key={i} className={`timeline-item ${event.type}`}>
                <div className="timeline-time">{event.time}</div>
                <div className="timeline-title">{event.title}</div>
                <div className="timeline-desc">{event.desc}</div>
              </div>
            ))}
          </div>

          <div className="callout warning">
            <div className="callout-label">Real Talk</div>
            <p>Your plan will fall apart by 11 AM. That's fine. These itineraries give you a framework so you're not wandering aimlessly. The most important thing on here is the midday break — skip it and you'll pay for it at 4 PM.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: LIGHTNING LANE */}
      <section id="lightning" className="section">
        <div className="section-header">
          <span className="section-icon">⚡</span>
          <h2>Lightning Lane Strategy</h2>
          <p className="section-intro">
            Lightning Lane starts at $30/person/day at Disneyland and changes with demand. 
            Here's when it's worth it and when you should save your money.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🎯</div>
            <div>
              <h3>Book the second you walk through the gates</h3>
            </div>
          </div>
          <p>Open the Disneyland app the moment you enter the park and book your first Lightning Lane. You can book your next one after 2 hours OR immediately after you use your first reservation — whichever comes first.</p>
          <p>First booking priorities: Mickey & Minnie's Runaway Railway at DL, or Radiator Springs Racers at DCA.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">💡</div>
            <div>
              <h3>Family of 4 with kids under 6? Here's your decision tree</h3>
            </div>
          </div>
          <p><strong>Weekdays (low crowd):</strong> Buy Multi Pass. You'll get 6-8 Lightning Lane rides over the day, and the $30/person is worth it to avoid the 3 rides that always have 40+ min waits.</p>
          <p><strong>Weekends & holidays:</strong> Still worth it — prices go up to $35-40/person but wait times jump to 60+ min for everything. The math works out.</p>
          <p><strong>Skip Single Pass for the big headliners</strong> — your little kids probably can't ride them anyway (height requirements). Save that $15-25/person.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🌊</div>
            <div>
              <h3>World of Color — book early or miss it</h3>
            </div>
          </div>
          <p>The World of Color show at DCA is worth seeing, but the viewing area gets packed. Use a Lightning Lane pass for it. Book this early in the day — spots run out, especially during busy periods.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">📸</div>
            <div>
              <h3>Your Lightning Lane includes PhotoPass</h3>
            </div>
          </div>
          <p>This is an underrated perk. When you buy Lightning Lane Multi Pass, your on-ride photos and downloads from Disney photographers around the park are included. Look for PhotoPass photographers at the castle, near character meet-and-greets, and at ride exits — they'll scan your app and the photos show up automatically.</p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Waste Money On</div>
          <p>Lightning Lane Premier Pass ($150-400+/person). It's designed for adults doing a one-day sprint of every headliner. With young kids, you won't ride enough to justify it. Multi Pass is the sweet spot for families.</p>
        </div>
      </section>

      {/* SECTION 4: FOOD */}
      <section id="food" className="section">
        <div className="section-content">
          <div className="section-header">
            <span className="section-icon">🍽</span>
            <h2>Where to Eat (From a Dad Who's Tried Everything)</h2>
            <p className="section-intro">
              Mobile order everything. Seriously — open the Disneyland app 30 minutes before 
              you want to eat, order ahead, and skip the line. Here are the spots worth your time and money.
            </p>
          </div>

          <div>
            {FOOD_SPOTS.map((spot, i) => (
              <div key={i} className="food-spot">
                <div className="food-emoji">{spot.emoji}</div>
                <div className="food-info">
                  <h3>{spot.name}</h3>
                  <div className="food-location">{spot.location}</div>
                  <div className="food-desc">{spot.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="callout pro" style={{ marginTop: '1.5rem' }}>
            <div className="callout-label">Free Water</div>
            <p>Don't buy bottled water — it's $5+. There are free water refill stations throughout both parks. Ask any quick-service restaurant for a free cup of ice water too. Bring reusable bottles and save $30+ per day for a family of four.</p>
          </div>

          <div className="callout pro">
            <div className="callout-label">Character Dining</div>
            <p>If your kids want to meet characters, book a character breakfast at Plaza Inn or Storyteller Cafe (Grand Californian Hotel). You'll meet multiple characters during the meal without standing in separate 30-minute lines. Book in advance — but people cancel within 24 hours, so keep checking the app if nothing's available.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: PACKING */}
      <section id="packing" className="section">
        <div className="section-header">
          <span className="section-icon">🎒</span>
          <h2>What to Pack (The Stuff the Park Doesn't Sell)</h2>
          <p className="section-intro">
            Everything on this list costs under $15 and will save you money, 
            time, or tears. Tap items to check them off as you pack.
          </p>
        </div>

        <div className="checklist">
          {PACKING_LIST.map((item, i) => (
            <ChecklistItem key={i} item={item} />
          ))}
        </div>
      </section>

      {/* SECTION 6: SEASONAL */}
      <section id="seasonal" className="section">
        <div className="section-content">
          <div className="section-header">
            <span className="section-icon">🌤</span>
            <h2>When to Go: Month-by-Month Guide</h2>
            <p className="section-intro">
              Not all months are created equal. Here's the honest breakdown of 
              crowds, weather, and whether it's worth the trip.
            </p>
          </div>

          <div className="season-grid">
            {SEASONS.map((s, i) => (
              <div key={i} className="season-card">
                <div className="season-month">{s.month}</div>
                <div className={`season-verdict ${s.verdict === 'must-go' ? 'go' : s.verdict}`}>
                  {s.verdict === 'go' || s.verdict === 'must-go' ? '👍 ' : s.verdict === 'avoid' ? '👎 ' : '🤷 '}
                  {s.crowds} crowds
                </div>
                <div className="season-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: MONEY SAVING */}
      <section id="money" className="section">
        <div className="section-header">
          <span className="section-icon">💰</span>
          <h2>How to Save Real Money</h2>
          <p className="section-intro">
            Disneyland is expensive. These tips won't make it cheap, 
            but they'll keep you from bleeding money on things that don't matter.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🎟</div>
            <div>
              <h3>Buy tickets from authorized resellers, not Disney</h3>
            </div>
          </div>
          <p>Authorized Disney ticket sellers like Undercover Tourist and Get Away Today consistently beat Disney's direct prices, especially on multi-day tickets. California residents can get 3-day park hoppers for as low as $68/day through these sellers vs $85/day through Disney directly.</p>
          <p>Always check for current deals before buying direct from Disney — the savings add up fast for a family of four.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🏨</div>
            <div>
              <h3>Stay off-site within walking distance</h3>
            </div>
          </div>
          <p>The Disneyland Hotel and Grand Californian are beautiful but $400-700/night. Hotels on Harbor Blvd are a 10-minute walk to the gates and run $150-250/night. The money you save pays for an extra park day or Lightning Lane for the whole family.</p>
          <p>Key requirement: walkable distance so you can go back for naps without dealing with parking or shuttles.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🚗</div>
            <div>
              <h3>Parking hack: park at Downtown Disney</h3>
            </div>
          </div>
          <p>The official Disneyland parking garage is $35/day. Downtown Disney offers free parking for the first 3 hours (some restaurants validate for longer). If you're staying off-site, check if your hotel offers a shuttle or walkable access to skip parking costs entirely.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🍎</div>
            <div>
              <h3>Bring your own food and snacks</h3>
            </div>
          </div>
          <p>You're allowed to bring food into the parks (no glass, no alcohol, reasonable cooler size). Pack sandwiches, fruit, and snacks. A family eating 3 meals in the park spends $120-180/day on food. Bringing lunch and snacks cuts that to $40-60.</p>
          <p>Let the kids pick one "special" park meal per day — Plaza Inn fried chicken or Dole Whip — and pack the rest.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">🎂</div>
            <div>
              <h3>Free birthday and celebration buttons</h3>
            </div>
          </div>
          <p>Ask at City Hall (Disneyland) or Guest Relations (DCA) for free celebration buttons — birthday, first visit, anniversary. Cast members will give your kids extra attention and sometimes small perks throughout the day.</p>
        </div>
      </section>

      {/* HIDDEN GEMS CALLOUT */}
      <section className="section" style={{ background: 'var(--sky-light)', maxWidth: '100%', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span className="section-icon">✨</span>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-md)' }}>Parent Survival Tips</h2>
          
          <div className="tip-card" style={{ textAlign: 'left' }}>
            <p><strong>🎆 Fireworks from Star Wars: Galaxy's Edge.</strong> Everyone packs Main Street. Head to Galaxy's Edge instead — same fireworks, less crowded, and they play John Williams music. If you have 3 days, do Galaxy's Edge first, Main Street on day 3 for the projections.</p>
          </div>
          
          <div className="tip-card" style={{ textAlign: 'left' }}>
            <p><strong>🎨 DCA Hollywood Land Workshops.</strong> Free animation classes, drawing workshops, and the Sorcerer's Workshop run every 30 min. Air-conditioned, seating everywhere, no reservations needed. This is your secret afternoon reset — kids think they're doing something fun, parents get to sit in AC for an hour.</p>
          </div>

          <div className="tip-card" style={{ textAlign: 'left' }}>
            <p><strong>🏰 Toontown Playground.</strong> Only one exit. Let your toddler run wild, park yourself by the exit, and mentally check out for 20 minutes. You've earned it.</p>
          </div>

          <div className="tip-card" style={{ textAlign: 'left' }}>
            <p><strong>👸 Meet characters efficiently.</strong> Check the Disneyland app map for character locations and times. The princess meet-and-greet by the castle is the best single stop. Anna and Elsa have their own meet-and-greet at DCA. Toontown for Mickey and friends. Or just walk around — you'll bump into characters constantly.</p>
          </div>

          <div className="tip-card" style={{ textAlign: 'left' }}>
            <p><strong>🔄 Rider Switch is a game-changer.</strong> One parent rides while the other waits with the little one. Then you swap — the second parent skips the line entirely. Ask the ride attendant at the entrance. Works on any ride with a height requirement.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">🎢 Ride or Naptime</div>
        <p>Built by a dad with two little girls who's made every mistake so you don't have to.</p>
        <p>JSAM Tech LLC · © {new Date().getFullYear()}</p>
        <div className="footer-disclaimer">
          This site is not affiliated with, endorsed by, or sponsored by The Walt Disney Company or 
          Disneyland Resort. All Disney-related trademarks are property of The Walt Disney Company. 
          This site contains affiliate links — we may earn a commission at no extra cost to you.
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </>
  )
}
