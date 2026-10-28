import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import AffiliateCTA from '@/components/AffiliateCTA'
import UpdatedBadge from '@/components/UpdatedBadge'
import { SITE_URL } from '@/lib/content'

const BLUEY_PUBLISHED = '2026-10-28'
const BLUEY_LAST_REVIEWED = '2026-10-28'

const TITLE = 'Bluey at Disneyland: The Complete Family Guide (2026)'
const DESCRIPTION =
  "Bluey's Best Day Ever at Fantasyland Theatre: show times, the Thursday-through-Monday schedule, how to catch it with young kids, and whether the Bluey Playhouse is worth $89.99. From a real parent."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/bluey-at-disneyland` },
  openGraph: {
    url: `${SITE_URL}/bluey-at-disneyland`,
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    siteName: 'Ride or Naptime',
    locale: 'en_US',
    publishedTime: `${BLUEY_PUBLISHED}T00:00:00.000Z`,
    modifiedTime: `${BLUEY_LAST_REVIEWED}T00:00:00.000Z`,
    authors: ['Ride or Naptime'],
  },
}

// ─── FAQs: feed FAQPage JSON-LD and the accordion at the bottom ───
const faqs = [
  {
    q: 'Where is Bluey at Disneyland?',
    a: "Bluey is at the Fantasyland Theatre in Disneyland Park, across from \"it's a small world\" next to the Toontown train station. That's where Bluey's Best Day Ever! runs, along with the Gnome Village and Fairy Garden play areas around it. Bluey isn't at Disney California Adventure.",
  },
  {
    q: "What time is Bluey's Best Day Ever?",
    a: 'The current daily show times are 11:00 AM, 12:20 PM, 1:40 PM, 3:20 PM, and 4:40 PM on show days. Times can shift for special events, so confirm in the Disneyland app the morning of your visit.',
  },
  {
    q: 'Can you meet Bluey and Bingo at Disneyland?',
    a: "Not at a traditional meet-and-greet. Bluey and Bingo appear in the show, walk down the ramps toward the audience at the end, and stay on stage for about 20 minutes afterward for closer photos. Sit near the front and don't leave when the music stops. That's your meet.",
  },
  {
    q: 'How long is the Bluey show at Disneyland?',
    a: "Bluey's Best Day Ever! runs about 30 to 35 minutes. Add roughly 20 minutes if you stay for Bluey and Bingo's post-show time on stage, plus 20 to 30 minutes of line time before.",
  },
  {
    q: "Is Bluey's Best Day Ever free?",
    a: "Yes. It's included with Disneyland Park admission, with no extra ticket and no Lightning Lane cost. There's no height requirement either.",
  },
  {
    q: "What days is Bluey's show at Disneyland?",
    a: 'Thursday through Monday. The show is dark on Tuesdays and Wednesdays. It opened March 22, 2026 running Friday through Sunday, added Mondays on September 28 and Thursdays on October 1, so it now runs five days a week.',
  },
  {
    q: 'Is the Bluey show good for toddlers?',
    a: "Yes, it's one of the best things in the park for ages 2 to 5. The one catch is volume: the opening numbers are loud. If your toddler is noise-sensitive, start toward the back, bring ear protection, and move up once they settle in.",
  },
  {
    q: 'How early should you line up for Bluey?',
    a: 'Arrive 20 to 30 minutes before showtime. The theatre seats about 1,800, so capacity rarely runs out, but arriving early gets you a center seat. Early shows (11:00 AM or 12:20 PM) have the shortest lines.',
  },
  {
    q: 'Is there a Lightning Lane for Bluey?',
    a: "No. Bluey's Best Day Ever! is all standby with no Lightning Lane, so everyone lines up the same way. Save your Multi Pass selections for rides.",
  },
  {
    q: "What age is Bluey's Best Day Ever good for?",
    a: "The sweet spot is ages 2 to 6, which is exactly the age that watches Bluey at home. Kids 7 and 8 who still love the show will enjoy it, but older kids who've moved on will be bored. Parents who watch Bluey with their kids tend to have a great time too.",
  },
  {
    q: 'How much is the Bluey Playhouse at Disneyland?',
    a: "The Bluey Playhouse at Downtown Disney is $89.99. Comparable Bluey playsets on Amazon run $45 to $65 with similar or better quality, and the Downtown Disney version has no exclusive features. We'd skip it and buy from Amazon when you get home.",
  },
  {
    q: 'Where can you buy Bluey merchandise at Disneyland?',
    a: 'Bluey merch is sold near the Fantasyland Theatre, in the larger shops on Main Street, U.S.A., and in Downtown Disney (home of the $89.99 Bluey Playhouse). The Disneyland-exclusive Bluey ears headband is the one item worth buying in the park. For plush and figures, Amazon is usually 40 to 60 percent cheaper.',
  },
  {
    q: 'Is there a Bluey character dining at Disneyland?',
    a: "No, there's no Bluey character dining at Disneyland Resort as of our latest check. Bluey and Bingo only appear at Bluey's Best Day Ever! at the Fantasyland Theatre. For a character meal, see our character dining picks on the characters page.",
  },
  {
    q: 'When does the Bluey Movie come out?',
    a: 'The Bluey Movie opens in theaters August 6, 2027. Expect the Fantasyland Theatre show and Bluey merch to lean into the movie around then. July and August 2027 should be peak Bluey season at the park.',
  },
]

export default function BlueyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Characters', path: '/characters' },
          { name: 'Bluey at Disneyland', path: '/bluey-at-disneyland' },
        ]}
      />
      <ArticleJsonLd
        path="/bluey-at-disneyland"
        headline={TITLE}
        description={DESCRIPTION}
        datePublished={BLUEY_PUBLISHED}
        dateModified={BLUEY_LAST_REVIEWED}
      />
      <FaqJsonLd items={faqs} />

      <header className="hero hero--home">
        <Image
          src="/bluey-at-disneyland.jpg"
          alt="Bluey and Bingo on stage at Fantasyland Theatre for Bluey's Best Day Ever! at Disneyland Park"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <small className="hero-credit">Photo: Disneyland Resort / Disney Parks Blog</small>
        <div className="hero-content">
          <div className="hero-badge">🐶 Bluey at Disneyland</div>
          <h1>Bluey at Disneyland: The Complete Family Guide (2026)</h1>
          <p className="hero-sub">
            Everything about Bluey&apos;s Best Day Ever! at the Fantasyland Theatre — show times,
            the Thursday-through-Monday schedule, how to get a good seat with a toddler, how to
            actually get close to Bluey and Bingo, and which Bluey merch is worth the park markup.
          </p>
          <UpdatedBadge date={BLUEY_LAST_REVIEWED} label="Show details checked" />
        </div>
      </header>

      <nav aria-label="On this page" className="jump-nav">
        <span className="jump-nav-label">Jump to</span>
        <a className="jump-nav-chip" href="#the-show">
          🎪 The show
        </a>
        <a className="jump-nav-chip" href="#show-times">
          📅 Show times
        </a>
        <a className="jump-nav-chip" href="#strategy">
          📱 Strategy
        </a>
        <a className="jump-nav-chip" href="#play-areas">
          🏡 Play areas
        </a>
        <a className="jump-nav-chip" href="#meet-bluey">
          🤔 Meeting Bluey
        </a>
        <a className="jump-nav-chip" href="#merch">
          🛍 Merch
        </a>
        <a className="jump-nav-chip" href="#snacks">
          🍿 Snacks
        </a>
        <a className="jump-nav-chip" href="#real-talk">
          😅 Real-talk tips
        </a>
        <a className="jump-nav-chip" href="#whats-coming">
          🎬 What&apos;s coming
        </a>
        <a className="jump-nav-chip" href="#faq">
          ❓ FAQ
        </a>
      </nav>

      {/* ────────────── SECTION 1: The show ────────────── */}
      <section className="section" id="the-show">
        <div className="section-header">
          <span className="section-icon">🎪</span>
          <h2>What Bluey&apos;s Best Day Ever Actually Is</h2>
          <p className="section-intro">
            A live stage show with Bluey and Bingo, plus a play space around the theatre. The basics
            before you build it into your day:
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🎢</div>
            <div>
              <h3>Where it lives</h3>
            </div>
          </div>
          <p>
            <strong>Fantasyland Theatre</strong> at Disneyland Park, across from &quot;it&apos;s a
            small world&quot; and next to the Toontown train station entrance. If you&apos;re
            walking from Small World toward Toontown, you&apos;ll walk right past it.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🎟</div>
            <div>
              <h3>What it costs and who can go</h3>
            </div>
          </div>
          <p>
            <strong>Free with park admission.</strong> No separate ticket, no Lightning Lane, no
            height requirement. If your kid can sit in a theatre seat (or on your lap), they can see
            it.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">⏱</div>
            <div>
              <h3>30 to 35 minutes — two rotating versions</h3>
            </div>
          </div>
          <p>
            The show runs <strong>30 to 35 minutes</strong>, about the limit for most 3-year-olds.
            There are <strong>two rotating versions</strong>, so a second showing on a multi-day
            trip isn&apos;t a rerun. Bluey-obsessed kids will want to see both.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 2: Show times & dark days ────────────── */}
      <section className="section" id="show-times">
        <div className="section-header">
          <span className="section-icon">📅</span>
          <h2>Show Times and the Dark Days</h2>
          <p className="section-intro">
            The show runs <strong>Thursday through Monday</strong>. It&apos;s dark on Tuesdays and
            Wednesdays.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🕚</div>
            <div>
              <h3>Daily show times (Thursday–Monday)</h3>
            </div>
          </div>
          <ul className="lookup-list">
            <li>
              <strong>11:00 AM</strong> — best pick for toddlers, shortest line
            </li>
            <li>
              <strong>12:20 PM</strong> — still a good line, works before an early nap
            </li>
            <li>
              <strong>1:40 PM</strong> — midday crowd peak
            </li>
            <li>
              <strong>3:20 PM</strong> — busiest line; can wrap toward the train station
            </li>
            <li>
              <strong>4:40 PM</strong> — last show, good for kids who napped
            </li>
          </ul>
        </div>

        <h3 className="subsection-title">How the schedule got here</h3>

        <div className="seasonal-list">
          <article className="seasonal-row">
            <div className="seasonal-row-meta">
              <span className="seasonal-row-dates">March 22, 2026</span>
              <span className="seasonal-row-cost">3 days a week</span>
            </div>
            <h3 className="seasonal-row-title">🎉 Opening</h3>
            <p>
              Bluey&apos;s Best Day Ever! opens at the Fantasyland Theatre on a three-day schedule.
            </p>
          </article>

          <article className="seasonal-row">
            <div className="seasonal-row-meta">
              <span className="seasonal-row-dates">September 28, 2026</span>
              <span className="seasonal-row-cost">4 days a week</span>
            </div>
            <h3 className="seasonal-row-title">➕ Mondays added</h3>
            <p>Mondays join the schedule.</p>
          </article>

          <article className="seasonal-row">
            <div className="seasonal-row-meta">
              <span className="seasonal-row-dates">October 1, 2026</span>
              <span className="seasonal-row-cost">5 days a week</span>
            </div>
            <h3 className="seasonal-row-title">➕ Thursdays added</h3>
            <p>Thursdays join too, giving the current Thursday-through-Monday run.</p>
          </article>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">This is an expansion, not a cut</div>
          <p>
            &quot;Dark Tuesdays and Wednesdays&quot; is easy to read as the show being scaled back.
            It&apos;s the opposite: Bluey went from <strong>3 days a week to 5</strong>. The catch:
            if you picked a Tuesday or Wednesday for the low crowds,{' '}
            <strong>Bluey won&apos;t be running</strong>. If the show is a must for your kid, plan
            your Disneyland Park day for Thursday through Monday.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 3: Strategy ────────────── */}
      <section className="section" id="strategy">
        <div className="section-header">
          <span className="section-icon">📱</span>
          <h2>How to Actually Catch It</h2>
          <p className="section-intro">
            No Lightning Lane, no reservations — just a standby line. Four things decide how it
            goes.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">1</div>
            <div>
              <h3>Know where the line forms</h3>
            </div>
          </div>
          <p>
            The line forms <strong>across from &quot;it&apos;s a small world,&quot;</strong> next to
            the Toontown train station. At peak hours it can wrap around toward the train station
            itself. It&apos;s <strong>all standby</strong> — there&apos;s no Lightning Lane for
            Bluey, so save your <Link href="/lightning-lane">Multi Pass</Link> picks for rides.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">2</div>
            <div>
              <h3>Pick an early show</h3>
            </div>
          </div>
          <p>
            <strong>11:00 AM or 12:20 PM</strong> is the move. Lines are shorter, toddlers are
            fresher, and you&apos;re done before the afternoon crowd and the nap crash. The 3:20 PM
            show draws the longest line of the day.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">3</div>
            <div>
              <h3>Arrive 20 to 30 minutes before showtime</h3>
            </div>
          </div>
          <p>
            The Fantasyland Theatre is outdoors and seats about <strong>1,800</strong>, so capacity
            rarely runs out. Arriving 20–30 minutes early isn&apos;t about getting in — it&apos;s
            about getting a good center seat instead of the far edges.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">4</div>
            <div>
              <h3>Don&apos;t bolt when the music ends</h3>
            </div>
          </div>
          <p>
            Bluey and Bingo <strong>stay on stage about 20 minutes after the show</strong> for
            closer photos. Half the audience heads for the exits during the finale, which is exactly
            when you should stay put. This is the closest thing to a Bluey meet in the park.
          </p>
        </div>

        <TicketsCTA location="bluey_mid" />
      </section>

      {/* ────────────── SECTION 4: Interactive areas ────────────── */}
      <section className="section" id="play-areas">
        <div className="section-header">
          <span className="section-icon">🏡</span>
          <h2>The Interactive Areas (Not Just a Show)</h2>
          <p className="section-intro">
            The Fantasyland Theatre complex is a hangout space between shows, not just a theatre.
          </p>
        </div>

        <div className="tip-card">
          <p>
            Around the theatre you&apos;ll find a life-sized <strong>Gnome Village</strong>, a{' '}
            <strong>Fairy Garden</strong>, interactive games, and Bluey photo ops. It&apos;s built
            for toddlers who want to explore at their own pace rather than sit still, so it works
            whether or not you catch a show.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Hidden gem</div>
          <p>
            This is one of the <strong>best shaded spots in Fantasyland</strong> for a nap-break
            pause with young kids. Fantasyland is short on calm places to sit; this area gives you
            shade, room to roam, and a break from ride lines. More spots like this in our{' '}
            <Link href="/hidden-gems">hidden gems guide</Link>.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 5: Meeting Bluey ────────────── */}
      <section className="section" id="meet-bluey">
        <div className="section-header">
          <span className="section-icon">🤔</span>
          <h2>Can You Actually Meet Bluey and Bingo?</h2>
          <p className="section-intro">
            The honest answer: <strong>no, not at a dedicated meet-and-greet.</strong>
          </p>
        </div>

        <div className="tip-card">
          <p>
            Bluey and Bingo appear during the show, then <strong>walk down the ramps</strong> at the
            end to get closer to the audience. They stay on stage for about{' '}
            <strong>20 minutes after the show</strong>. That&apos;s it — there&apos;s no separate
            photo line and no Bluey stop in the{' '}
            <Link href="/characters">character meet lineup</Link>.
          </p>
          <p>
            If a photo with Bluey is non-negotiable: see the show (either version),{' '}
            <strong>sit close to the front</strong>, and <strong>stay after</strong>.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Set expectations early</div>
          <p>
            If your kid is Bluey-obsessed and expecting a Mickey-style meet, tell them at the hotel,
            not at the theatre: &quot;We&apos;re going to see Bluey&apos;s show, and after, Bluey
            and Bingo come say hi from the stage.&quot;
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 6: Merch ────────────── */}
      <section className="section" id="merch">
        <div className="section-header">
          <span className="section-icon">🛍</span>
          <h2>Bluey Merch Worth Buying (And What to Skip)</h2>
          <p className="section-intro">
            Bluey merch is everywhere near the theatre and in Downtown Disney. Most of it is cheaper
            online.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🏠</div>
            <div>
              <h3>Skip: the Bluey Playhouse ($89.99)</h3>
            </div>
          </div>
          <p>
            The Bluey Playhouse at Downtown Disney is <strong>$89.99</strong>. Comparable Bluey
            playsets on Amazon run <strong>$45 to $65</strong> for similar or better quality, and
            the Downtown Disney version has no exclusive features. If your kid asks, the line is:
            &quot;We&apos;ll check Amazon when we get home.&quot;
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🎀</div>
            <div>
              <h3>Buy: the Bluey ears headband (~$35)</h3>
            </div>
          </div>
          <p>
            One of the few <strong>Disneyland-exclusive</strong> Bluey items, and the one actually
            worth the markup. Your kid wears it all day, it shows up in every photo, and you
            can&apos;t get it online.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🧸</div>
            <div>
              <h3>Probably skip: plush and apparel</h3>
            </div>
          </div>
          <p>
            In-park <strong>Bluey plush runs $25 to $40</strong> and{' '}
            <strong>apparel $25 to $55</strong>. Amazon has solid Bluey plush and figures at{' '}
            <strong>40 to 60 percent</strong> of park prices. Buy one souvenir in the park if it
            matters to your kid, then do the rest from home.
          </p>
        </div>

        <AffiliateCTA
          partner="amazon"
          headline="Bluey plush, figures, and playsets on Amazon"
          body="Usually 40 to 60 percent of park prices, and you don't have to carry it around Fantasyland all day."
          cta="Shop Bluey on Amazon →"
        />
      </section>

      {/* ────────────── SECTION 7: Snacks ────────────── */}
      <section className="section" id="snacks">
        <div className="section-header">
          <span className="section-icon">🍿</span>
          <h2>Bluey Snacks and Food</h2>
        </div>

        <div className="tip-card">
          <p>
            Bluey-themed treats come and go. In the past these have included a Bluey cupcake and a
            Bluey churro. <strong>Check the Disneyland app&apos;s food listings</strong> before you
            go to see what&apos;s available now. These treats aren&apos;t required eating — most
            families should <strong>prioritize the show</strong> over hunting down a themed snack.
            See our <Link href="/food">food strategy</Link> for where to actually eat.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 8: Real-talk tips ────────────── */}
      <section className="section" id="real-talk">
        <div className="section-header">
          <span className="section-icon">😅</span>
          <h2>Real-Talk Tips from a Dad</h2>
          <p className="section-intro">
            What actually goes sideways at the Bluey show, and how to head it off.
          </p>
        </div>

        <div className="tip-card">
          <h3>The 3-year-old who gets overwhelmed by the music</h3>
          <p>
            The opening numbers are <strong>loud</strong>. If your kid is sensitive, start in the
            back and move forward once they&apos;re comfortable. Kids who make it through the first
            five minutes usually settle in for the rest.
          </p>
        </div>

        <div className="tip-card">
          <h3>The post-show meltdown</h3>
          <p>
            Kids who were hyped to see Bluey often <strong>crash about 15 minutes after</strong> it
            ends. Plan a low-stim follow-up: <strong>Casey Jr.</strong>,{' '}
            <strong>Storybook Land</strong>, or a snack on a shady bench. Don&apos;t go straight
            into a 45-minute ride line.
          </p>
        </div>

        <div className="tip-card">
          <h3>The &quot;I wanted to meet Bluey, not watch a show&quot; tears</h3>
          <p>
            Handle this one at the hotel. <strong>The show is the meet</strong> — Bluey and Bingo
            come down the ramps and stay on stage afterward. Tell your kid that before you go and
            you&apos;ll avoid tears in the theatre.
          </p>
        </div>

        <div className="tip-card">
          <h3>The volume is higher than most Disneyland shows</h3>
          <p>
            For sensory-sensitive kids, consider kids&apos; noise-reducing earplugs like Loop (about{' '}
            <strong>$20 on Amazon</strong>). They&apos;re small enough to keep in a stroller pocket
            and useful at fireworks too. More ideas on our{' '}
            <Link href="/packing-list">packing list</Link>.
          </p>
        </div>

        <div className="tip-card">
          <h3>Where to sit</h3>
          <p>
            <strong>Center section, rows 10 to 15</strong>, is the sweet spot. Front rows are hit
            hardest by the speakers; back rows lose the character detail. If you want Bluey and
            Bingo up close after the show, slide forward once the crowd clears.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 9: What's coming ────────────── */}
      <section className="section" id="whats-coming">
        <div className="section-header">
          <span className="section-icon">🎬</span>
          <h2>What&apos;s Coming</h2>
        </div>

        <div className="tip-card">
          <p>
            <strong>The Bluey Movie opens August 6, 2027.</strong> Expect the Fantasyland Theatre
            show to add movie tie-ins around that date. Merch and show demand should keep climbing
            through mid-2027 as the hype builds.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Planning a 2027 trip?</div>
          <p>
            If you have a Bluey kid, <strong>July and August 2027</strong> will be peak Bluey season
            at the park. Expect bigger show lines and fast-moving merch, and pick an early show.
            Check our <Link href="/seasonal">month-by-month guide</Link> for what else is running
            then.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 10: FAQ ────────────── */}
      <section className="section" id="faq">
        <div className="section-header">
          <span className="section-icon">❓</span>
          <h2>Bluey at Disneyland FAQ</h2>
          <p className="section-intro">
            The most common Bluey questions from parents planning a Disneyland trip. Tap any
            question to expand.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Next steps</div>
          <p>
            See every other character worth meeting in the{' '}
            <Link href="/characters">full character guide</Link>. Build the Bluey show into a real
            day with the <Link href="/itineraries">hour-by-hour itineraries</Link>. Pair it with
            nearby Fantasyland rides using the <Link href="/rides">ride-by-ride guide</Link>. Get
            your first-trip basics in the <Link href="/first-visit">first-visit guide</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="bluey" />
    </>
  )
}
