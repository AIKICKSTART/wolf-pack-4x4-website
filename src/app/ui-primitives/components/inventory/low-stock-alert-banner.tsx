"use client"

import { useState } from "react"
import Link from "next/link"

import { StickyCtaBar } from "../marketing/sticky-cta-bar"

import styles from "./low-stock-alert-banner.module.css"

export interface LowStockAlertBannerProps {
  /** Number of SKUs currently below their reorder point. */
  belowReorderCount: number
  /** Href for the "view low-stock list" CTA. */
  href: string
  /** Optional href for "raise PO" secondary CTA. */
  raisePoHref?: string
  /** Optional sub-text describing the next supplier action. */
  body?: string
  /** Hours to suppress when the operator clicks Suppress. Defaults to 4. */
  suppressHours?: number
}

export function LowStockAlertBanner({
  belowReorderCount,
  href,
  raisePoHref,
  body,
  suppressHours = 4,
}: LowStockAlertBannerProps) {
  const [suppressed, setSuppressed] = useState(false)

  if (suppressed) {
    return (
      <aside className={styles.suppressed} role="status">
        <span>
          Low-stock alert suppressed for {suppressHours}h. <Link href={href}>Restore</Link>
        </span>
        <button
          type="button"
          className={styles.restoreBtn}
          onClick={() => setSuppressed(false)}
        >
          Restore alert
        </button>
      </aside>
    )
  }

  return (
    <div className={styles.frame} role="alert" aria-live="assertive">
      <StickyCtaBar
        position="top"
        threshold={0}
        badge="Low stock"
        message={`${belowReorderCount} SKU${belowReorderCount === 1 ? "" : "s"} below reorder point${
          body ? ` · ${body}` : ""
        }`}
        primaryAction={{ label: "Review list", href }}
        secondaryAction={
          raisePoHref ? { label: "Raise PO", href: raisePoHref } : undefined
        }
        className={styles.bar}
      />
      <button
        type="button"
        className={styles.suppress}
        onClick={() => setSuppressed(true)}
        aria-label={`Suppress low-stock alert for ${suppressHours} hours`}
      >
        Suppress {suppressHours}h
      </button>
    </div>
  )
}

export default LowStockAlertBanner
