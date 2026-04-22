'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NAV_GROUPS, type NavGroup } from '@/lib/content'

function isGroupActive(group: NavGroup, pathname: string) {
  return group.items.some((item) => item.href === pathname)
}

function DesktopGroup({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = isGroupActive(group, pathname)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div
      className="nav-group"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`nav-group-button ${active ? 'active' : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {group.label}{' '}
        <span className="nav-group-caret" aria-hidden="true">
          ▾
        </span>
      </button>
      <div className={`nav-dropdown-panel ${open ? 'open' : ''}`} role="menu">
        {group.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className={pathname === item.href ? 'active' : ''}
          >
            <span className="nav-item-icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

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
            aria-expanded={navOpen}
          >
            {navOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className="nav-desktop">
          <div className="nav-group">
            <Link href="/" className={`nav-group-button ${pathname === '/' ? 'active' : ''}`}>
              <span aria-hidden="true" style={{ marginRight: '4px' }}>
                🏠
              </span>
              Home
            </Link>
          </div>
          {NAV_GROUPS.map((group) => (
            <DesktopGroup key={group.label} group={group} pathname={pathname} />
          ))}
          <a
            href="https://www.getawaytoday.com?referrerid=9474&utm_source=rideornaptime&utm_medium=affiliate&utm_campaign=navbar"
            target="_blank"
            rel="sponsored noopener"
            className="nav-cta"
          >
            Buy Cheap Tix
          </a>
        </div>

        <div className={`nav-mobile ${navOpen ? 'open' : ''}`}>
          <section className="nav-mobile-group">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              <span className="nav-item-icon" aria-hidden="true">
                🏠
              </span>
              Home
            </Link>
          </section>
          {NAV_GROUPS.map((group) => (
            <section key={group.label} className="nav-mobile-group">
              <h3 className="nav-group-label">{group.label}</h3>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href ? 'active' : ''}
                >
                  <span className="nav-item-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </section>
          ))}
          <section className="nav-mobile-group">
            <a
              href="https://www.getawaytoday.com?referrerid=9474&utm_source=rideornaptime&utm_medium=affiliate&utm_campaign=navbar"
              target="_blank"
              rel="sponsored noopener"
              className="nav-cta nav-cta-mobile"
            >
              Buy Cheap Tix
            </a>
          </section>
        </div>
      </div>
    </nav>
  )
}
