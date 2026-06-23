"use client"

import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(notify: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {}
  }
  const mql = window.matchMedia(QUERY)
  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", notify)
    return () => mql.removeEventListener("change", notify)
  }
  mql.addListener(notify)
  return () => mql.removeListener(notify)
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false
  }
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot(): boolean {
  return false
}

/**
 * Hook that reads the `(prefers-reduced-motion: reduce)` media query and
 * returns true when the user has requested reduced motion. SSR-safe via
 * `useSyncExternalStore`.
 */
export function useReducedMotion3D(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
