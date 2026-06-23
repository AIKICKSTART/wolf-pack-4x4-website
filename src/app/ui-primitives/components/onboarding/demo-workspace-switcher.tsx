"use client"

import { useState } from "react"

import styles from "./demo-workspace-switcher.module.css"

interface DemoWorkspaceSwitcherProps {
  /** Whether demo mode is initially active. */
  initialActive?: boolean
  /** Eyebrow kicker. */
  kicker?: string
  /** Headline text. */
  headline?: string
  /** Body / supporting copy. */
  body?: string
  /** Label rendered next to the toggle when demo is on. */
  onLabel?: string
  /** Label rendered next to the toggle when demo is off. */
  offLabel?: string
  /** Name of the demo workspace, e.g. "Oak Flats demo bay". */
  demoWorkspaceName?: string
  /** Name of the real workspace, e.g. "Mufflermen HQ". */
  realWorkspaceName?: string
  /** Called whenever the user toggles. */
  onToggle?: (nextActive: boolean) => void
  className?: string
}

export function DemoWorkspaceSwitcher({
  initialActive = false,
  kicker = "Demo workspace",
  headline = "Try the Oak Flats demo bay",
  body = "Swap into a pre-filled workspace with sample bookings, parts, and crew — switch back any time without losing your real data.",
  onLabel = "Demo workspace",
  offLabel = "Live workspace",
  demoWorkspaceName = "Oak Flats demo bay",
  realWorkspaceName = "Mufflermen HQ",
  onToggle,
  className,
}: DemoWorkspaceSwitcherProps) {
  const [active, setActive] = useState<boolean>(initialActive)

  const handleToggle = () => {
    const next = !active
    setActive(next)
    onToggle?.(next)
  }

  const classes = [styles.banner, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      data-active={active ? "true" : "false"}
      role="region"
      aria-label={headline}
    >
      <span className={styles.glyph} aria-hidden="true">
        {active ? "★" : "△"}
      </span>
      <div className={styles.copy}>
        <span className={styles.kicker}>{kicker}</span>
        <p className={styles.headline}>{headline}</p>
        <p className={styles.body}>{body}</p>
        <p className={styles.context}>
          <span className={styles.contextLabel}>Currently on</span>
          <strong className={styles.contextValue}>
            {active ? demoWorkspaceName : realWorkspaceName}
          </strong>
        </p>
      </div>
      <button
        type="button"
        className={styles.toggle}
        onClick={handleToggle}
        aria-pressed={active}
      >
        <span className={styles.toggleTrack} aria-hidden="true">
          <span className={styles.toggleThumb} />
        </span>
        <span className={styles.toggleLabel}>{active ? onLabel : offLabel}</span>
      </button>
    </aside>
  )
}

export default DemoWorkspaceSwitcher
