"use client"

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react"

import styles from "./preview-frame.module.css"

type Viewport = "mobile" | "tablet" | "desktop"
type ThemePreview = "match" | "light" | "dark"

const VIEWPORTS: ReadonlyArray<{ id: Viewport; label: string }> = [
  { id: "mobile", label: "Mobile · 360" },
  { id: "tablet", label: "Tablet · 768" },
  { id: "desktop", label: "Desktop · 1440" },
]

const THEMES: ReadonlyArray<{ id: ThemePreview; label: string }> = [
  { id: "match", label: "Match page" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
]

const VIEWPORT_WIDTH: Record<Viewport, string> = {
  mobile: "360px",
  tablet: "768px",
  desktop: "100%",
}

const VIEWPORT_CLASS: Record<Viewport, string> = {
  mobile: styles.vpMobile,
  tablet: styles.vpTablet,
  desktop: styles.vpDesktop,
}

const THEME_ATTR = "data-primitive-theme"

export interface PreviewFrameProps {
  /** Section number, e.g. "01". */
  index: string
  title: string
  blockType: string
  summary: string
  /** The composed section to preview. */
  children: ReactNode
}

/**
 * A single section preview frame with a mobile/tablet/desktop viewport switcher
 * and a light/dark/match theme switcher. The theme switcher drives the real
 * document-level `data-primitive-theme` attribute — the system's genuine
 * theming mechanism — so the preview is accurate and uses zero hardcoded
 * colours. Width frames are pure CSS, independent of theme. Restores the page
 * theme on "Match page" or when the frame unmounts.
 */
export function PreviewFrame({
  index,
  title,
  blockType,
  summary,
  children,
}: PreviewFrameProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop")
  const [theme, setTheme] = useState<ThemePreview>("match")
  const groupId = useId()
  const pageThemeRef = useRef<string | null>(null)

  const restorePageTheme = useCallback(() => {
    const root = document.documentElement
    const original = pageThemeRef.current
    if (original) {
      root.setAttribute(THEME_ATTR, original)
    }
    pageThemeRef.current = null
  }, [])

  const applyTheme = useCallback(
    (next: ThemePreview) => {
      const root = document.documentElement
      if (next === "match") {
        restorePageTheme()
        return
      }
      if (pageThemeRef.current === null) {
        pageThemeRef.current = root.getAttribute(THEME_ATTR) ?? "dark"
      }
      root.setAttribute(THEME_ATTR, next)
    },
    [restorePageTheme],
  )

  const handleThemeChange = useCallback(
    (next: ThemePreview) => {
      setTheme(next)
      applyTheme(next)
    },
    [applyTheme],
  )

  // Always restore the page theme when this frame unmounts.
  useEffect(() => restorePageTheme, [restorePageTheme])

  return (
    <article className={styles.frame} aria-labelledby={`${groupId}-title`}>
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.index}>{index}</span>
          <h2 id={`${groupId}-title`} className={styles.title}>
            {title}
          </h2>
          <code className={styles.type}>{blockType}</code>
          <p className={styles.summary}>{summary}</p>
        </div>

        <div className={styles.controls}>
          <fieldset className={styles.switcher}>
            <legend className={styles.switcherLabel}>Viewport</legend>
            {VIEWPORTS.map((vp) => (
              <button
                key={vp.id}
                type="button"
                className={`${styles.chip} ${viewport === vp.id ? styles.chipActive : ""}`}
                aria-pressed={viewport === vp.id}
                onClick={() => setViewport(vp.id)}
              >
                {vp.label}
              </button>
            ))}
          </fieldset>

          <fieldset className={styles.switcher}>
            <legend className={styles.switcherLabel}>Theme</legend>
            {THEMES.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`${styles.chip} ${theme === option.id ? styles.chipActive : ""}`}
                aria-pressed={theme === option.id}
                onClick={() => handleThemeChange(option.id)}
              >
                {option.label}
              </button>
            ))}
          </fieldset>
        </div>
      </header>

      <div className={`${styles.stage} ${VIEWPORT_CLASS[viewport]}`}>
        <div className={styles.canvas} style={{ width: VIEWPORT_WIDTH[viewport] }}>
          {children}
        </div>
      </div>
    </article>
  )
}

export default PreviewFrame
