"use client"

import { useState, type ReactNode } from "react"

import styles from "./cookie-banner.module.css"

export interface CookieBannerProps {
  /** Optional kicker label shown above the heading. */
  kicker?: string
  heading: string
  body: ReactNode
  acceptLabel?: string
  manageLabel?: string
  onAccept?: () => void
  onManage?: () => void
  className?: string
}

export function CookieBanner({
  kicker,
  heading,
  body,
  acceptLabel = "Accept all",
  manageLabel = "Manage choices",
  onAccept,
  onManage,
  className,
}: CookieBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return null
  }

  const handleAccept = () => {
    onAccept?.()
    setDismissed(true)
  }

  const handleManage = () => {
    onManage?.()
  }

  const classes = [styles.banner, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-heading"
    >
      <div className={styles.shell}>
        <div className={styles.copy}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          <h3 id="cookie-banner-heading" className={styles.heading}>
            {heading}
          </h3>
          <p className={styles.body}>{body}</p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.manage}
            onClick={handleManage}
          >
            {manageLabel}
          </button>
          <button
            type="button"
            className={styles.accept}
            onClick={handleAccept}
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default CookieBanner
