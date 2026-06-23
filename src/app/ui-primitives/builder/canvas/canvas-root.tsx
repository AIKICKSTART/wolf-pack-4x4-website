"use client"

import { useMemo, useSyncExternalStore } from "react"

import { BuilderCanvas } from "./builder-canvas"
import { DEMO_MANIFESTS } from "./demo-manifests"
import { loadDraft } from "./storage"
import { createStarterPage } from "./use-builder"

/** A no-op external store used purely to detect post-hydration on the client. */
const emptySubscribe = (): (() => void) => () => {}
const getClientSnapshot = (): boolean => true
const getServerSnapshot = (): boolean => false

/**
 * Client entry for the builder canvas showcase.
 *
 * `useSyncExternalStore` reports `false` during SSR and the first client render,
 * then `true` once hydrated — the React-blessed way to branch on the client
 * without a setState-in-effect. Only after hydration do we read any persisted
 * localStorage draft, so server and client markup match and there is no flash of
 * mismatched content.
 */
export function CanvasRoot() {
  const hydrated = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot)

  const page = useMemo(
    () => (hydrated ? (loadDraft() ?? createStarterPage()) : createStarterPage()),
    [hydrated],
  )

  return <BuilderCanvas key={page.id} manifests={DEMO_MANIFESTS} initialPage={page} />
}
