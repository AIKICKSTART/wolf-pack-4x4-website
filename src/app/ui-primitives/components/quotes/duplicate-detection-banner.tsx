"use client"

import { AlertTriangle } from "lucide-react"

import { formatCurrency } from "./quote-types"
import styles from "./duplicate-detection-banner.module.css"

export interface DuplicateQuoteSummary {
  quoteNumber: string
  customer: string
  vehicle: string
  total: number
  createdAt: string
  similarity: number
}

interface DuplicateDetectionBannerProps {
  similar: DuplicateQuoteSummary
  currency?: string
  onOpenExisting?: () => void
  onCreateNewAnyway?: () => void
}

export function DuplicateDetectionBanner({
  similar,
  currency = "AUD",
  onOpenExisting,
  onCreateNewAnyway,
}: DuplicateDetectionBannerProps) {
  return (
    <aside
      className={styles.banner}
      role="alert"
      aria-labelledby="duplicate-banner-title"
    >
      <div className={styles.icon} aria-hidden="true">
        <AlertTriangle size={20} strokeWidth={1.6} />
      </div>
      <div className={styles.body}>
        <h3 id="duplicate-banner-title" className={styles.title}>
          Possible duplicate quote — {Math.round(similar.similarity)}% match
        </h3>
        <p className={styles.summary}>
          <strong>{similar.quoteNumber}</strong> for <strong>{similar.customer}</strong> on the same
          vehicle (<em>{similar.vehicle}</em>) was created {similar.createdAt}. Total of{" "}
          <strong>{formatCurrency(similar.total, currency)}</strong>.
        </p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.openCta} onClick={onOpenExisting}>
          Open existing
        </button>
        <button type="button" className={styles.newCta} onClick={onCreateNewAnyway}>
          Create new anyway
        </button>
      </div>
    </aside>
  )
}

export default DuplicateDetectionBanner
