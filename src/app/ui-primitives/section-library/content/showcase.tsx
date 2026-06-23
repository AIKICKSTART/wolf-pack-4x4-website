"use client"

/**
 * Section-library content showcase (client).
 *
 * Renders every content section inside a device frame at a chosen viewport
 * (mobile 320 / tablet 768 / desktop 1440) so the responsive behaviour is
 * visible without resizing the window, plus a light/dark toggle.
 *
 * Light/dark is driven the canonical way: the primitives' light palette is
 * keyed on `html[data-primitive-theme="light"]`, so the toggle flips that
 * document attribute and restores the prior value on unmount — it never
 * strands the document in the wrong scheme.
 */

import { useCallback, useEffect, useState } from "react"
import { Monitor, MoonStar, Smartphone, Sun, Tablet } from "lucide-react"

import { CONTENT_SECTIONS } from "./index"
import styles from "./showcase.module.css"

type Viewport = "mobile" | "tablet" | "desktop"
type Scheme = "light" | "dark"

const VIEWPORTS: ReadonlyArray<{ id: Viewport; label: string; width: string }> = [
  { id: "mobile", label: "Mobile", width: "320px" },
  { id: "tablet", label: "Tablet", width: "768px" },
  { id: "desktop", label: "Desktop", width: "1440px" },
]

const VIEWPORT_CLASS: Readonly<Record<Viewport, string>> = {
  mobile: styles.mobile,
  tablet: styles.tablet,
  desktop: styles.desktop,
}

const THEME_ATTR = "data-primitive-theme"

function readScheme(): Scheme {
  if (typeof document === "undefined") {
    return "dark"
  }
  return document.documentElement.getAttribute(THEME_ATTR) === "light"
    ? "light"
    : "dark"
}

export function SectionLibraryShowcase() {
  const [viewport, setViewport] = useState<Viewport>("desktop")
  // Lazily seed from the document's current scheme (set pre-hydration by the
  // layout bootstrap script), so the toggle starts in sync with no mount-time
  // setState. Falls back to the SSR default ("dark") when there is no document.
  const [scheme, setScheme] = useState<Scheme>(readScheme)

  // Drive the document scheme so the primitives CSS swaps its palette. Restore
  // the prior value when the showcase unmounts so it never strands the
  // document in the wrong scheme.
  useEffect(() => {
    const root = document.documentElement
    const previous = root.getAttribute(THEME_ATTR)
    root.setAttribute(THEME_ATTR, scheme)
    root.style.colorScheme = scheme
    return () => {
      if (previous === null) {
        root.removeAttribute(THEME_ATTR)
      } else {
        root.setAttribute(THEME_ATTR, previous)
        root.style.colorScheme = previous
      }
    }
  }, [scheme])

  const toggleScheme = useCallback(() => {
    setScheme((current) => (current === "light" ? "dark" : "light"))
  }, [])

  const activeWidth =
    VIEWPORTS.find((entry) => entry.id === viewport)?.width ?? "1440px"

  return (
    <div className={styles.showcase}>
      <div className={styles.toolbar} role="toolbar" aria-label="Preview controls">
        <div className={styles.toolbarGroup}>
          <span className={styles.toolbarLabel} id="viewport-label">
            Viewport
          </span>
          <div
            className={styles.segmented}
            role="group"
            aria-labelledby="viewport-label"
          >
            {VIEWPORTS.map((entry) => {
              const Icon =
                entry.id === "mobile"
                  ? Smartphone
                  : entry.id === "tablet"
                    ? Tablet
                    : Monitor
              const active = entry.id === viewport
              return (
                <button
                  key={entry.id}
                  type="button"
                  className={`${styles.segment} ${active ? styles.segmentActive : ""}`}
                  aria-pressed={active}
                  onClick={() => setViewport(entry.id)}
                >
                  <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
                  {entry.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.toolbarGroup}>
          <span className={styles.toolbarLabel}>Theme</span>
          <button
            type="button"
            className={styles.segment}
            onClick={toggleScheme}
            aria-pressed={scheme === "light"}
            aria-label={`Switch to ${scheme === "light" ? "dark" : "light"} theme`}
          >
            {scheme === "light" ? (
              <Sun size={14} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <MoonStar size={14} strokeWidth={1.75} aria-hidden="true" />
            )}
            {scheme === "light" ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {CONTENT_SECTIONS.map((entry) => {
        const Section = entry.component
        return (
          <section
            key={entry.key}
            id={entry.key.replace(/\//g, "-")}
            className={styles.entry}
            aria-label={entry.label}
          >
            <header className={styles.entryHead}>
              <div className={styles.entryTitleRow}>
                <h3 className={styles.entryTitle}>{entry.label}</h3>
                <code className={styles.entryKey}>{entry.key}</code>
              </div>
              <p className={styles.entryDesc}>{entry.description}</p>
            </header>

            <div className={styles.stage}>
              <div className={`${styles.deviceFrame} ${VIEWPORT_CLASS[viewport]}`}>
                <div className={styles.deviceBar} aria-hidden="true">
                  <span className={styles.deviceDot} />
                  <span className={styles.deviceDot} />
                  <span className={styles.deviceDot} />
                  <span className={styles.deviceSize}>{activeWidth}</span>
                </div>
                <div className={styles.deviceBody}>
                  <Section />
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
