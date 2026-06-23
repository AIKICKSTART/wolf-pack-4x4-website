"use client"

import { AlertTriangle, Monitor, Smartphone, Tablet } from "lucide-react"
import { useState, type CSSProperties, type ReactNode } from "react"

import {
  VIEWPORT_HEIGHT,
  VIEWPORT_LABEL,
  VIEWPORT_WIDTH,
  type ViewportPreset,
} from "./cms-types"

import styles from "./responsive-toolbar.module.css"

export interface ResponsiveToolbarProps {
  defaultViewport?: ViewportPreset
  /** Optional override widths in px. Defaults to standard sizes. */
  widths?: Partial<Record<ViewportPreset, number>>
  /** Optional preview node rendered inside the simulated viewport. */
  preview?: ReactNode
  error?: string
  onChange?: (viewport: ViewportPreset) => void
  className?: string
}

const ICONS: Record<ViewportPreset, ReactNode> = {
  desktop: <Monitor size={14} strokeWidth={2.2} aria-hidden="true" />,
  tablet: <Tablet size={14} strokeWidth={2.2} aria-hidden="true" />,
  mobile: <Smartphone size={14} strokeWidth={2.2} aria-hidden="true" />,
}

const VIEWPORTS: ReadonlyArray<ViewportPreset> = ["desktop", "tablet", "mobile"]

export function ResponsiveToolbar({
  defaultViewport = "desktop",
  widths,
  preview,
  error,
  onChange,
  className,
}: ResponsiveToolbarProps) {
  const [active, setActive] = useState<ViewportPreset>(defaultViewport)
  const widthMap: Record<ViewportPreset, number> = {
    desktop: widths?.desktop ?? VIEWPORT_WIDTH.desktop,
    tablet: widths?.tablet ?? VIEWPORT_WIDTH.tablet,
    mobile: widths?.mobile ?? VIEWPORT_WIDTH.mobile,
  }
  const heightMap: Record<ViewportPreset, number> = VIEWPORT_HEIGHT

  const select = (viewport: ViewportPreset) => {
    setActive(viewport)
    onChange?.(viewport)
  }

  const width = widthMap[active]
  const height = heightMap[active]

  const classes = [styles.toolbar, className].filter(Boolean).join(" ")

  const tickPositions = [0, 320, 480, 640, 768, 1024, 1280, 1440]

  return (
    <section className={classes} aria-label="Responsive preview toolbar">
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={styles.kicker}>Responsive preview</span>
          <span className={styles.heading}>{VIEWPORT_LABEL[active]} · {width}×{height}px</span>
        </div>
        <div className={styles.switcher} role="tablist" aria-label="Viewport switcher">
          {VIEWPORTS.map((viewport) => (
            <button
              key={viewport}
              type="button"
              className={styles.switchBtn}
              role="tab"
              aria-selected={active === viewport}
              aria-label={VIEWPORT_LABEL[viewport]}
              onClick={() => select(viewport)}
              data-active={active === viewport ? "true" : undefined}
            >
              {ICONS[viewport]}
              {VIEWPORT_LABEL[viewport]}
            </button>
          ))}
        </div>
      </header>

      {error ? (
        <div className={styles.error} role="alert">
          <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
          <strong>Preview unavailable</strong>
          <span>{error}</span>
        </div>
      ) : (
        <div className={styles.viewport}>
          <div className={styles.ruler} aria-hidden="true">
            {tickPositions.map((px) => (
              <span
                key={px}
                className={styles.rulerLabel}
                style={{ left: `${(px / widthMap.desktop) * 100}%` }}
              >
                {px}
              </span>
            ))}
          </div>
          <div
            className={styles.frame}
            style={{ width: `min(${width}px, 100%)` } as CSSProperties}
            role="img"
            aria-label={`${VIEWPORT_LABEL[active]} viewport`}
          >
            {preview ?? (
              <div className={styles.frameInner}>
                <span className={styles.dimensions}>
                  {width}
                  <span aria-hidden="true">×</span>
                  {height}
                </span>
                <span>{VIEWPORT_LABEL[active]} preview</span>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <span>Breakpoints · 0 / 768 / 1024 / 1440px</span>
        <span>Active · {VIEWPORT_LABEL[active].toUpperCase()}</span>
      </footer>
    </section>
  )
}

export default ResponsiveToolbar
