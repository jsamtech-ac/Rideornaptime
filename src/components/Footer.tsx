import Link from 'next/link'
import { NAV_GROUPS } from '@/lib/content'
import ContactForm from './ContactForm'

const FOOTER_LINKS = NAV_GROUPS.flatMap((g) => g.items)

export default function Footer() {
  return (
    <footer className="footer">
      <ContactForm />
      <div className="footer-brand">🎢 Ride or Naptime</div>
      <div className="footer-links">
        {FOOTER_LINKS.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="footer-disclaimer">
        This site is not affiliated with, endorsed by, or sponsored by The Walt Disney Company or
        Disneyland Resort. All Disney-related trademarks are property of The Walt Disney Company.
        This site contains affiliate links — we may earn a commission at no extra cost to you.
      </div>
    </footer>
  )
}
