"use client"

import { useState } from "react"

import styles from "./sample-data-banner.module.css"

interface SampleDataBannerProps {
  /** Whether sample data mode is initially active. */
  initialActive?: boolean
  /** Eyebrow label, e.g. "Sample data". */
  kicker?: string
  /** Headline copy. */
  headline?: string
  /** Body / explanation copy. */
  body?: string
  /** Label for the inline toggle when on. */
  toggleOnLabel?: string
  /** Label for the inline toggle when off. */
  toggleOffLabel?: string
  /** Called whenever the toggle changes. */
  onToggle?: (nextActive: boolean) => void
  /** Called when the banner is dismissed. */
  onDismiss?: () => void
}

export function SampleDataBanner({
  initialActive = true,
  kicker = "Sample data",
  headline = "You're viewing sample data",
  body = "Switch to your live Oak Flats workspace whenever you're ready — your real bookings and parts catalogue are waiting.",
  toggleOnLabel = "Sample · ON",
  toggleOffLabel = "Live workspace",
  onToggle,
  onDismiss,
}: SampleDataBannerProps) {
  const [active, setActive] = useState<boolean>(initialActive)
  const [dismissed, setDismissed] = useState<boolean>(false)

  const handleToggle = () => {
    const next = !active
    setActive(next)
    onToggle?.(next)
  }

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  if (dismissed) {
    return null
  }

  return (
    <aside
      className={styles.banner}
      data-active={active ? "true" : "false"}
      role="status"
    >
      <span className={styles.bolt} aria-hidden="true">
        ⚠
      </span>
      <div className={styles.copy}>
        <span className={styles.kicker}>{kicker}</span>
        <p className={styles.headline}>{headline}</p>
        <p className={styles.body}>{body}</p>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.toggle}
          onClick={handleToggle}
          aria-pressed={active}
        >
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>
            {active ? toggleOnLabel : toggleOffLabel}
          </span>
        </button>
        <button
          type="button"
          className={styles.dismiss}
          onClick={handleDismiss}
          aria-label="Dismiss sample data banner"
        >
          ×
        </button>
      </div>
    </aside>
  )
}

export default SampleDataBanner
