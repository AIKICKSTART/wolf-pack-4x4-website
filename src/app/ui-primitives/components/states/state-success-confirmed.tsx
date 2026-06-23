"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { ConfettiBurst, type ConfettiBurstHandle } from "../primitives/confetti-burst"
import styles from "./state-success-confirmed.module.css"

export interface StateSuccessConfirmedSummaryRow {
  label: string
  value: string
  /** Render the value in monospace amber (e.g. reference IDs). */
  emphasizeRef?: boolean
}

export interface StateSuccessConfirmedProps {
  headline?: string
  message?: string
  summary?: ReadonlyArray<StateSuccessConfirmedSummaryRow>
  /** Fire the celebratory confetti burst on mount. */
  celebrate?: boolean
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

const DEFAULT_SUMMARY: ReadonlyArray<StateSuccessConfirmedSummaryRow> = [
  { label: "Reference", value: "Q-2841 / Oak Flats", emphasizeRef: true },
  { label: "Booked bay", value: "Bay 2 · 09:30 Thu" },
  { label: "Total", value: "A$1,184 paid" },
]

export function StateSuccessConfirmed({
  headline = "Locked in — see you in the workshop",
  message = "Your quote is paid and the fitment slot is reserved. We have texted the workshop manager so Bay 2 will be on the lift when you roll up.",
  summary = DEFAULT_SUMMARY,
  celebrate = false,
  primaryAction,
  secondaryAction,
}: StateSuccessConfirmedProps) {
  const burstRef = useRef<ConfettiBurstHandle | null>(null)
  const hasFiredRef = useRef<boolean>(false)

  useEffect(() => {
    if (!celebrate) {
      hasFiredRef.current = false
      return
    }
    if (hasFiredRef.current) {
      return
    }
    const handle = burstRef.current
    if (!handle) {
      return
    }
    handle.cannon()
    hasFiredRef.current = true
  }, [celebrate])

  return (
    <article
      className={styles.surface}
      role="status"
      aria-live="polite"
      aria-labelledby="state-success-confirmed-heading"
    >
      <span className={styles.confettiSlot} aria-hidden="true">
        <ConfettiBurst ref={burstRef} ariaLabel="Success celebration" />
      </span>

      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 320 240"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="scTickRing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primitive-green)" />
              <stop offset="100%" stopColor="#1a8a4a" />
            </linearGradient>
            <pattern id="scCheck" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#fdfdfa" />
              <rect width="10" height="10" fill="#0a0c10" />
              <rect x="10" y="10" width="10" height="10" fill="#0a0c10" />
            </pattern>
          </defs>
          <ellipse cx="160" cy="222" rx="110" ry="8" fill="#000" opacity="0.42" />

          {/* Flag pole */}
          <line x1="56" y1="20" x2="56" y2="216" stroke="#3a414c" strokeWidth="4" strokeLinecap="round" />
          <circle cx="56" cy="20" r="5" fill="var(--primitive-amber)" />

          {/* Chequered flag */}
          <g className={styles.flag}>
            <path
              d="M 60 26 L 168 22 Q 184 36 168 52 L 60 56 Z"
              fill="url(#scCheck)"
              stroke="#0a0c10"
              strokeWidth="1.5"
            />
          </g>

          {/* Tick circle */}
          <g transform="translate(208 124)">
            <circle cx="0" cy="0" r="62" fill="url(#scTickRing)" stroke="#0a0c10" strokeWidth="2" />
            <circle cx="0" cy="0" r="62" fill="none" stroke="var(--primitive-text-strong)" strokeWidth="1.4" opacity="0.42" />
            {/* tick */}
            <path
              className={styles.tick}
              d="M -22 0 L -6 18 L 24 -18"
              stroke="#06150d"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>

          {/* Confetti specks (static, decorative) */}
          <g>
            <rect x="100" y="86" width="4" height="10" fill="var(--primitive-red)" transform="rotate(20 102 91)" />
            <rect x="142" y="68" width="4" height="10" fill="var(--primitive-amber)" transform="rotate(-12 144 73)" />
            <rect x="270" y="60" width="4" height="10" fill="var(--primitive-teal)" transform="rotate(38 272 65)" />
            <rect x="280" y="186" width="4" height="10" fill="var(--primitive-green)" transform="rotate(-22 282 191)" />
            <rect x="120" y="180" width="4" height="10" fill="var(--primitive-amber)" transform="rotate(12 122 185)" />
            <circle cx="190" cy="64" r="2.4" fill="var(--primitive-text-strong)" />
            <circle cx="80" cy="140" r="2" fill="var(--primitive-red)" />
            <circle cx="296" cy="124" r="2.2" fill="var(--primitive-teal)" />
          </g>
        </svg>
        <figcaption className={styles.caption}>Workshop · job confirmed</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>SUCCESS · CONFIRMED</span>
        <h2 id="state-success-confirmed-heading" className={styles.headline}>
          {headline}
        </h2>
        <p className={styles.message}>{message}</p>

        {summary.length > 0 ? (
          <dl className={styles.summary}>
            {summary.map((row, index) => (
              <div
                key={`${row.label}-${index}`}
                className={`${styles.summaryRow} ${row.emphasizeRef ? styles.refRow : ""}`}
              >
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </article>
  )
}

export default StateSuccessConfirmed
