import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'
import { lastUpdatedFor } from '@/lib/pages'

const UPDATED = lastUpdatedFor('/characters/bluey-disneyland')

const META_TITLE = "Bluey at Disneyland 2026: Best Day Ever Show & Why There's No Meet and Greet"
const META_DESCRIPTION =
  "Bluey's Best Day Ever at Disneyland's Fantasyland Theatre — showtimes, what happens, the Troubadour Tavern food, and the thing nobody tells parents: there is no formal Bluey meet and greet."

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/characters/bluey-disneyland` },
  openGraph: {
    url: `${SITE_URL}/characters/bluey-disneyland`,
    title: META_TITLE,
    description: META_DESCRIPTION,
    type: 'article',
    siteName: 'Ride or Naptime',
    locale: 'en_US',
    publishedTime: '2026-08-18T00:00:00.000Z',
    modifiedTime: UPDATED.iso,
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'Is there a Bluey meet and greet at Disneyland?',
    a: "No. There is no formal meet and greet, no queue and no photo line for Bluey and Bingo at Disneyland. They appear inside Bluey's Best Day Ever at the Fantasyland Theatre and come down closer to the audience during parts of the show, which is where photos come from. Sit close and on an aisle if a photo matters to your kid.",
  },
  {
    q: "Where is Bluey's Best Day Ever at Disneyland?",
    a: "The Fantasyland Theatre in Disneyland Park, which has been transformed into Bluey's school for the show. It is included with regular park admission — no separate ticket and no Lightning Lane.",
  },
  {
    q: "When did Bluey's Best Day Ever open at Disneyland?",
    a: 'It opened on March 22, 2026 and runs through the year at the Fantasyland Theatre in Disneyland Park. Showtimes are posted daily in the Disneyland app.',
  },
  {
    q: "What happens in Bluey's Best Day Ever?",
    a: 'Bluey and Bingo lead a school-day story with live segments, The Grannies appear, and there is dancing with Chattermax. Bluey-inspired food is served next door at Troubadour Tavern. The whole thing is pitched squarely at the 2-6 age range.',
  },
  {
    q: 'Is Bluey worth it for a 2-year-old at Disneyland?',
    a: 'Yes, if they watch the show at home — it is one of the few things at Disneyland aimed directly at that age. It is seated, indoors and short, which is exactly what a 2-year-old can handle. Just set expectations first: there is no hug-in-a-line moment, so a toddler expecting one will be disappointed no matter how good the show is.',
  },
  {
    q: 'Do you need a reservation or Lightning Lane for Bluey at Disneyland?',
    a: 'No. It is included with park admission and there is no Lightning Lane or virtual queue. Arrive early enough to get a seat close to the front, which matters far more than any booking would.',
  },
]

export default function BlueyDisneylandPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Characters', path: '/characters' },
          { name: 'Bluey at Disneyland', path: '/characters/bluey-disneyland' },
        ]}
      />
      <ArticleJsonLd
        path="/characters/bluey-disneyland"
        headline={META_TITLE}
        description={META_DESCRIPTION}
        datePublished="2026-08-18"
        dateModified={UPDATED.date}
      />
      <FaqJsonLd items={faqs} />

      <header className="hero">
        <div className="hero-badge">🐶 Bluey&rsquo;s Best Day Ever</div>
        <h1>Bluey at Disneyland: The Show, and Why There&rsquo;s No Meet and Greet</h1>
        <p className="hero-sub">
          Everything a parent of a 2–6 year old needs before promising their kid they&rsquo;ll meet
          Bluey — including the part Disney doesn&rsquo;t spell out anywhere.
        </p>
        <p className="hero-verified">
          Last verified <time dateTime={UPDATED.date}>{UPDATED.long}</time>
        </p>
      </header>

      <section className="section">
        <div className="callout warning">
          <div className="callout-label">Start here: there is no formal meet</div>
          <p>
            There is <strong>no Bluey meet and greet</strong> at Disneyland. No queue, no photo
            line, no character spot on the app map. Bluey and Bingo appear{' '}
            <strong>inside the show</strong> and come down closer to the audience during parts of
            it, and that&rsquo;s where every photo you&rsquo;ve seen comes from. This is the single
            most misunderstood thing about Bluey at the park, and it is worth explaining to your kid
            before you leave the hotel.
          </p>
        </div>

        <div className="section-header">
          <span className="section-icon">🎭</span>
          <h2>What the show is</h2>
        </div>

        <div className="tip-card">
          <p>
            <strong>Bluey&rsquo;s Best Day Ever</strong> opened <strong>March 22, 2026</strong> and
            runs through the year at the <strong>Fantasyland Theatre</strong> in Disneyland Park.
            The theatre has been transformed into <strong>Bluey&rsquo;s school</strong>, which lands
            well with kids who know the series.
          </p>
          <p>
            <strong>What you get:</strong> a live school-day story with Bluey and Bingo,{' '}
            <strong>The Grannies</strong>, and <strong>dancing with Chattermax</strong>.
            Bluey-inspired food is served next door at <strong>Troubadour Tavern</strong>. It is
            included with park admission — no separate ticket, no Lightning Lane, no virtual queue.
          </p>
        </div>

        <div className="section-header">
          <span className="section-icon">🎟</span>
          <h2>How to actually get the photo</h2>
        </div>

        <div className="tip-card">
          <h3>Seating is the whole strategy</h3>
          <p>
            Since there&rsquo;s no line to stand in, the only lever you have is{' '}
            <strong>where you sit</strong>. Arrive early enough to get close, and take an{' '}
            <strong>aisle seat</strong> if you can — that&rsquo;s where the characters pass nearest
            the audience. Have the camera out and unlocked <em>before</em> the show starts; the
            close-up moments are short and you will not get a second run at them.
          </p>
        </div>

        <div className="tip-card">
          <h3>Set expectations at the hotel, not the theatre</h3>
          <p>
            A 3-year-old who has been told they&rsquo;re going to hug Bluey will be upset when there
            is no line to join, and the theatre doors are the worst possible place to have that
            conversation. Frame it as{' '}
            <em>
              &ldquo;we&rsquo;re going to Bluey&rsquo;s school and she might come say hi&rdquo;
            </em>{' '}
            and the whole thing lands as a bonus instead of a letdown. Same principle as the{' '}
            <Link href="/characters">character-meet expectation management</Link> that applies
            everywhere else at the park.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Worth it for a 2-year-old?</div>
          <p>
            Yes, more than almost anything else at Disneyland for that age. It&rsquo;s seated,
            indoors, air-conditioned and short — which is the entire list of things a 2-year-old can
            actually cope with mid-afternoon. Pair it with a{' '}
            <Link href="/itineraries">midday-break itinerary</Link> and it becomes the calm block in
            your day rather than another queue.
          </p>
        </div>

        <div className="section-header">
          <span className="section-icon">❓</span>
          <h2>Bluey at Disneyland FAQ</h2>
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
            Back to the full{' '}
            <Link href="/characters">Disneyland character meet-and-greet guide</Link> for every
            other character, where they meet and how long the lines run. Then build the day around
            it with the <Link href="/itineraries">hour-by-hour itineraries</Link>, and cross-check
            rides for your kid&rsquo;s age in the <Link href="/rides">ride-by-ride guide</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="characters_bluey" />
    </>
  )
}
