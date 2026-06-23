/**
 * Preview frame + live theme toggle for the Operations section showcase.
 *
 * - `PreviewFrame` renders a section inside a labelled viewport (mobile /
 *   tablet / desktop) at a fixed pixel width so the responsive behaviour is
 *   visible on one page.
 * - `ThemeToggle` flips the document-root `data-primitive-theme` (the same key
 *   the ui-primitives layout bootstrap uses), so the whole page — and every
 *   frame — re-themes live through the central --primitive-* tokens. Both light
 *   and dark are exercised without redeclaring a single token value.
 *
 * Token-driven only; all styling lives in sections-ops.module.css.
 */

"use client"

import { useCallback, useSyncExternalStore } from "react"
import type { ReactNode } from "react"

import styles from "./sections-ops.module.css"

const THEME_STORAGE_KEY = "ofm-primitives-theme"

export type PreviewViewport = "mobile" | "tablet" | "desktop"

const VIEWPORT_META: Record<PreviewViewport, { label: string; dims: string; canvasClass: string }> = {
  mobile: { label: "Mobile", dims: "320px", canvasClass: styles.canvasMobile },
  tablet: { label: "Tablet", dims: "768px", canvasClass: styles.canvasTablet },
  desktop: { label: "Desktop", dims: "1280px", canvasClass: styles.canvasDesktop },
}

export interface PreviewFrameProps {
  /** DOM id so the viewport toolbar can deep-link to the frame. */
  id: string
  viewport: PreviewViewport
  children: ReactNode
}

export function PreviewFrame({ id, viewport, children }: PreviewFrameProps) {
  const meta = VIEWPORT_META[viewport]
  return (
    <figure id={id} className={styles.frame}>
      <figcaption className={styles.frameBar}>
        <span className={styles.frameBarLeft}>{meta.label}</span>
        <span className={styles.frameDims}>{meta.dims}</span>
      </figcaption>
      <div className={styles.viewport}>
        <div className={`${styles.canvas} ${meta.canvasClass}`}>{children}</div>
      </div>
    </figure>
  )
}

type ResolvedTheme = "light" | "dark"

function getThemeSnapshot(): ResolvedTheme {
  return document.documentElement.dataset.primitiveTheme === "light" ? "light" : "dark"
}

function getServerThemeSnapshot(): ResolvedTheme {
  return "dark"
}

function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-primitive-theme"],
  })
  return () => observer.disconnect()
}

/**
 * Live light/dark toggle. Reflects + drives the document-root theme so every
 * section frame on the page re-themes through the central tokens. The current
 * theme is read from the DOM via `useSyncExternalStore`, so the buttons stay in
 * sync with any other theme switcher on the page.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  )

  const apply = useCallback((next: ResolvedTheme) => {
    const root = document.documentElement
    root.dataset.primitiveTheme = next
    root.dataset.primitiveThemeChoice = next
    root.style.colorScheme = next
    root.classList.toggle("dark", next === "dark")
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* storage unavailable — theme still applies for the session */
    }
  }, [])

  return (
    <div className={styles.viewportToolbar} role="group" aria-label="Preview theme">
      <button
        type="button"
        className={styles.viewportLink}
        aria-pressed={theme === "dark"}
        onClick={() => apply("dark")}
      >
        Dark
      </button>
      <button
        type="button"
        className={styles.viewportLink}
        aria-pressed={theme === "light"}
        onClick={() => apply("light")}
      >
        Light
      </button>
    </div>
  )
}
