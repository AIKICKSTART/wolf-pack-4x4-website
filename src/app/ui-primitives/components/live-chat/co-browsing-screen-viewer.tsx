"use client"

import { MousePointer2 } from "lucide-react"

import { Reveal } from "../motion/reveal"

import styles from "./co-browsing-screen-viewer.module.css"

interface CoBrowsingScreenViewerProps {
  /** Hostname segment of the URL bar. */
  hostname: string
  /** Path the visitor is on. */
  path: string
  /** Page title rendered above the canvas blocks. */
  pageTitle: string
  /** Pretty price string rendered inside the canvas (e.g. "$2,180 AUD"). */
  priceLabel: string
  /** Number of tabs the visitor has open. */
  tabCount: number
  /** Whether to show the visitor's pointer indicator. */
  showPointer?: boolean
  /** Triggered when "Request control" is clicked. */
  onRequestControl?: () => void
  className?: string
}

export function CoBrowsingScreenViewer({
  hostname,
  path,
  pageTitle,
  priceLabel,
  tabCount,
  showPointer = true,
  onRequestControl,
  className,
}: CoBrowsingScreenViewerProps) {
  const classes = [styles.viewer, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Co-browsing screen viewer"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Co-browsing</span>
        <h3 className={styles.title}>Visitor screen</h3>
      </header>

      <Reveal as="div" from="fade">
        <div className={styles.browser} aria-label="Mock browser frame">
          <div className={styles.chrome} aria-hidden="true">
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotAmber}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
            <div className={styles.urlBar}>
              <span className={styles.urlScheme}>https://</span>
              <span className={styles.urlPath}>
                {hostname}
                {path}
              </span>
            </div>
          </div>
          <div className={styles.tabRow} aria-hidden="true">
            <span>{pageTitle}</span>
            <span>{tabCount > 1 ? `+${tabCount - 1} other tabs` : "1 tab"}</span>
          </div>
          <div className={styles.canvas} aria-hidden="true">
            <div className={styles.heroBlock} />
            <div className={styles.row}>
              <div className={styles.skeleton} />
              <div className={styles.skeletonShort} />
            </div>
            <div className={styles.priceBlock}>
              <span>{priceLabel}</span>
            </div>
            <div className={styles.row}>
              <div className={styles.skeleton} />
              <div className={styles.skeleton} />
            </div>
            <div className={styles.ctaBlock} />

            {showPointer ? (
              <div className={styles.pointer}>
                <span className={styles.pointerRing} />
                <span className={styles.pointerCursor} />
                <span className={styles.pointerLabel}>Visitor</span>
              </div>
            ) : null}
          </div>
        </div>
      </Reveal>

      <footer className={styles.footer}>
        <span className={styles.status} aria-live="polite">
          <span className={styles.statusDot} aria-hidden="true" />
          <span>Read-only stream</span>
        </span>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={onRequestControl}
        >
          <MousePointer2 size={14} strokeWidth={2.2} aria-hidden="true" />
          <span>Request control</span>
        </button>
      </footer>
    </section>
  )
}

export default CoBrowsingScreenViewer
