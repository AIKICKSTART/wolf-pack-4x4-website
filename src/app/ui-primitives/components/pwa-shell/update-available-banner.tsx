"use client"

import { RefreshCw, Sparkles, X } from "lucide-react"

import styles from "./update-available-banner.module.css"

interface UpdateAvailableBannerProps {
  newVersion: string
  releasedAt?: string
  changelog?: ReadonlyArray<string>
  onReload?: () => void
  onSnooze?: () => void
  className?: string
}

export function UpdateAvailableBanner({
  newVersion,
  releasedAt = "12 min ago",
  changelog,
  onReload,
  onSnooze,
  className,
}: UpdateAvailableBannerProps) {
  const classes = [styles.root, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={`App update ${newVersion} available`}
    >
      <span className={styles.icon} aria-hidden="true">
        <Sparkles size={18} strokeWidth={2.2} />
      </span>
      <div className={styles.content}>
        <h2 className={styles.title}>Update ready</h2>
        <span className={styles.meta}>
          {newVersion} · released {releasedAt}
        </span>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.reloadBtn}
          onClick={onReload}
          aria-label={`Reload to apply ${newVersion}`}
        >
          <RefreshCw size={13} strokeWidth={2.4} aria-hidden="true" />
          Reload
        </button>
        {onSnooze && (
          <button
            type="button"
            className={styles.snoozeBtn}
            onClick={onSnooze}
            aria-label="Snooze update"
          >
            <X size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
        )}
      </div>
      {changelog && changelog.length > 0 && (
        <ul className={styles.changelog}>
          {changelog.map((entry, index) => (
            <li key={index} className={styles.changelogItem}>
              <span>{entry}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default UpdateAvailableBanner
