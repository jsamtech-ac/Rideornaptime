'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Reads `window.location.search` exactly once, after mount.
 *
 * Deliberately NOT `useSearchParams()`: on a statically prerendered route Next
 * 14 opts the enclosing Suspense subtree out of prerendering entirely
 * (`BAILOUT_TO_CLIENT_SIDE_RENDERING`) and ships the fallback instead of the
 * content — even if the value is never read. That silently emptied the ride
 * matrix and all eight itinerary pages out of the server-rendered HTML.
 *
 * Contract: the first render — server AND first client render — sees no URL
 * state, so hydration matches. `apply` then runs in a passive effect, and its
 * updates are batched with `setHydrated(true)`.
 *
 * The returned flag is STATE, not a ref, and that matters. An outbound
 * "state -> URL" effect must gate on it. A ref would be set synchronously, so a
 * sync effect in the same commit would see `true` alongside pre-URL default
 * state and `router.replace` would wipe the incoming query string. Because this
 * is state, the gate opens only on the next render — which makes correctness
 * independent of the order the two effects happen to be declared in.
 */
export function useUrlStateOnMount(apply: (params: URLSearchParams) => void): boolean {
  // Hold `apply` in a ref so the effect can keep `[]` deps without an
  // exhaustive-deps disable (refs and setState are stable identities).
  const applyRef = useRef(apply)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    applyRef.current(new URLSearchParams(window.location.search))
    setHydrated(true)
  }, [])

  return hydrated
}
