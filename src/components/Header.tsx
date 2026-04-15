'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_ITEMS } from '@/lib/content'

export default function Header() {
  const pathname = usePathname()
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setNavOpen(false)
  }, [pathname])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-brand">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-icon">🎢</span>
            Ride or Naptime
          </Link>
          <button
            className="nav-toggle"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            {navOpen ? '✕' : '☰'}
          </button>
        </div>
        <div className={`nav-links ${navOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
