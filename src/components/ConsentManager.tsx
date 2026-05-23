'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'ror_consent'

type Decision = 'granted' | 'denied'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function updateConsent(decision: Decision) {
  const value = decision === 'granted' ? 'granted' : 'denied'
  const payload = {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  }
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer ?? []
    if (window.gtag) {
      window.gtag('consent', 'update', payload)
    } else {
      window.dataLayer.push(['consent', 'update', payload])
    }
  }
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (handle: number) => void
}

export default function ConsentManager() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let idleHandle: number | undefined

    const check = () => {
      if (cancelled) return
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY)
        if (saved !== 'granted' && saved !== 'denied') {
          setVisible(true)
        }
      } catch {
        setVisible(true)
      }
    }

    const idleWindow = window as IdleWindow
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleHandle = idleWindow.requestIdleCallback(check, { timeout: 1000 })
    } else {
      timeoutId = setTimeout(check, 500)
    }

    return () => {
      cancelled = true
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      if (idleHandle !== undefined && typeof idleWindow.cancelIdleCallback === 'function') {
        idleWindow.cancelIdleCallback(idleHandle)
      }
    }
  }, [])

  function decide(choice: Decision) {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice)
    } catch {}
    updateConsent(choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="consent-banner" role="region" aria-label="Cookie consent">
      <p className="consent-banner-text">
        We use cookies for analytics (Google Analytics + Google Tag Manager) to understand which
        guides actually help families. Choose what you&apos;re comfortable with — we don&apos;t sell
        data.{' '}
        <Link href="/privacy" className="consent-banner-link">
          See our privacy policy
        </Link>
        .
      </p>
      <div className="consent-banner-actions">
        <button
          type="button"
          className="consent-banner-btn secondary"
          onClick={() => decide('denied')}
        >
          Reject all
        </button>
        <button
          type="button"
          className="consent-banner-btn primary"
          onClick={() => decide('granted')}
        >
          Accept all
        </button>
      </div>
    </div>
  )
}
