'use client'

import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  )
}
