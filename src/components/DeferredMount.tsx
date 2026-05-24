'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (handle: number) => void
}

interface Props {
  children: ReactNode
  /** Reserved height while the child is unmounted, prevents CLS. */
  minHeight?: CSSProperties['minHeight']
  /** Also mount as soon as the placeholder scrolls into view. */
  mountOnVisible?: boolean
}

/**
 * Mounts children after the browser has gone idle (or when the placeholder
 * scrolls into view, whichever comes first). Used to keep large interactive
 * islands off the initial hydration path so first paint isn't competing
 * with React rendering 100+ cards.
 */
export default function DeferredMount({ children, minHeight, mountOnVisible = true }: Props) {
  const [mounted, setMounted] = useState(false)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mounted) return
    const w = window as IdleWindow
    let idleHandle: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let observer: IntersectionObserver | undefined

    const mount = () => setMounted(true)

    if (typeof w.requestIdleCallback === 'function') {
      idleHandle = w.requestIdleCallback(mount, { timeout: 2000 })
    } else {
      timeoutId = setTimeout(mount, 300)
    }

    if (mountOnVisible && placeholderRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              mount()
              observer?.disconnect()
              break
            }
          }
        },
        { rootMargin: '200px' }
      )
      observer.observe(placeholderRef.current)
    }

    return () => {
      if (idleHandle !== undefined && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleHandle)
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      observer?.disconnect()
    }
  }, [mounted, mountOnVisible])

  if (mounted) return <>{children}</>
  return <div ref={placeholderRef} style={{ minHeight }} aria-hidden="true" />
}
