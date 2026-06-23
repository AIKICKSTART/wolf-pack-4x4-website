"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import { Chip } from "../primitives/chip"

import styles from "./barcode-scanner-card.module.css"

type ScannerStatus = "idle" | "active" | "error"

interface BarcodeScannerCardProps {
  /** Header kicker. */
  kicker?: string
  /** Header title. */
  title?: string
  /** Whether the camera viewport is active. */
  status?: ScannerStatus
  /** Helper / status message under the viewport. */
  message?: string
  /** Recent scans, newest first. */
  recentSkus?: ReadonlyArray<string>
  /** Fires when an operator submits a manual SKU. */
  onManualScan?: (sku: string) => void
}

const STATUS_LABEL: Record<ScannerStatus, string> = {
  idle: "Camera idle",
  active: "Scanning",
  error: "Read failed",
}

const STATUS_TONE: Record<ScannerStatus, "neutral" | "teal" | "red"> = {
  idle: "neutral",
  active: "teal",
  error: "red",
}

const STATUS_CLASS: Record<ScannerStatus, string> = {
  idle: styles.statusIdle,
  active: styles.statusActive,
  error: styles.statusError,
}

export function BarcodeScannerCard({
  kicker = "Scanner · Bay 1",
  title = "Scan or key SKU",
  status = "active",
  message,
  recentSkus,
  onManualScan,
}: BarcodeScannerCardProps) {
  const [draft, setDraft] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed) return
    onManualScan?.(trimmed.toUpperCase())
    setDraft("")
  }

  const isError = status === "error"

  return (
    <section className={styles.card} aria-label="Barcode scanner">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
      </header>

      <div
        className={`${styles.viewport} ${STATUS_CLASS[status]}`}
        role="img"
        aria-label={`Camera viewport · ${STATUS_LABEL[status]}`}
      >
        <span className={styles.viewportLabel}>CAM · 1080p · auto</span>
        <span className={styles.crosshair} aria-hidden="true" />
        {status === "active" && <span className={styles.scanline} aria-hidden="true" />}
      </div>

      {message && (
        <p className={`${styles.message}${isError ? ` ${styles.messageError}` : ""}`}>
          {message}
        </p>
      )}

      <div className={styles.fallback}>
        <span className={styles.fallbackLabel}>Manual SKU fallback</span>
        <form className={styles.fallbackForm} onSubmit={handleSubmit}>
          <label htmlFor="pos-manual-sku" className={styles.fallbackLabel} hidden>
            SKU
          </label>
          <input
            id="pos-manual-sku"
            className={styles.input}
            type="text"
            autoComplete="off"
            placeholder="MANTA-CB-25"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Manual SKU entry"
          />
          <button type="submit" className={styles.cta} disabled={draft.trim().length === 0}>
            Add
          </button>
        </form>
      </div>

      {recentSkus && recentSkus.length > 0 && (
        <div className={styles.recent}>
          <span className={styles.recentLabel}>Last scans</span>
          <ul className={styles.recentList} role="list">
            {recentSkus.slice(0, 4).map((sku) => (
              <li key={sku}>{sku}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default BarcodeScannerCard
