import type { ReactNode } from "react"

import styles from "./state-empty-inbox.module.css"

export interface StateEmptyInboxStat {
  label: string
  value: string
}

export interface StateEmptyInboxProps {
  headline?: string
  message?: string
  stats?: ReadonlyArray<StateEmptyInboxStat>
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

const DEFAULT_STATS: ReadonlyArray<StateEmptyInboxStat> = [
  { label: "Cleared today", value: "14" },
  { label: "Avg response", value: "6m" },
  { label: "Open quotes", value: "0" },
]

export function StateEmptyInbox({
  headline = "All caught up",
  message = "Inbox is clear. Quote replies, supplier notes, and ADR confirmations have all been parked. Enjoy the lull — Bay 1 reopens at 8:30.",
  stats = DEFAULT_STATS,
  primaryAction,
  secondaryAction,
}: StateEmptyInboxProps) {
  return (
    <article
      className={styles.surface}
      role="status"
      aria-live="polite"
      aria-labelledby="state-empty-inbox-heading"
    >
      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 320 200"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="eiPaper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdfdfa" />
              <stop offset="100%" stopColor="#d5d1c4" />
            </linearGradient>
            <linearGradient id="eiEnvelope" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a414c" />
              <stop offset="100%" stopColor="#1a1d24" />
            </linearGradient>
          </defs>
          {/* Trail */}
          <path
            className={styles.trail}
            d="M 12 168 Q 80 158 124 134"
            stroke="var(--primitive-green)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />

          <g className={styles.lift}>
            {/* Letter peeking out */}
            <rect x="118" y="32" width="84" height="58" rx="4" fill="url(#eiPaper)" stroke="#0a0c10" strokeWidth="1.5" />
            <line x1="128" y1="46" x2="192" y2="46" stroke="#0a0c10" strokeWidth="0.8" opacity="0.4" />
            <line x1="128" y1="56" x2="186" y2="56" stroke="#0a0c10" strokeWidth="0.8" opacity="0.4" />
            <line x1="128" y1="66" x2="172" y2="66" stroke="#0a0c10" strokeWidth="0.8" opacity="0.4" />
            <line x1="128" y1="76" x2="178" y2="76" stroke="#0a0c10" strokeWidth="0.8" opacity="0.4" />

            {/* Envelope back */}
            <rect x="104" y="76" width="112" height="80" rx="6" fill="url(#eiEnvelope)" stroke="#0a0c10" strokeWidth="1.5" />
            {/* Envelope flap open upward */}
            <path
              d="M 104 76 L 160 116 L 216 76"
              stroke="#0a0c10"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 104 76 L 160 38 L 216 76 L 160 116 Z"
              fill="#0a0c10"
              opacity="0.85"
            />
            <path
              d="M 104 76 L 160 38 L 216 76"
              stroke="var(--primitive-text-strong)"
              strokeWidth="0.6"
              opacity="0.18"
            />
            {/* Side folds */}
            <path d="M 104 76 L 132 116 L 104 156 Z" fill="#0a0c10" opacity="0.6" />
            <path d="M 216 76 L 188 116 L 216 156 Z" fill="#0a0c10" opacity="0.6" />

            {/* Tick stamp */}
            <circle cx="160" cy="138" r="14" fill="var(--primitive-green)" opacity="0.92" />
            <path
              d="M 153 138 L 158 144 L 168 132"
              stroke="#06150d"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>

          {/* Settled sparkle dots */}
          <g fill="var(--primitive-green)" opacity="0.6">
            <circle cx="60" cy="44" r="1.4" />
            <circle cx="248" cy="58" r="1.6" />
            <circle cx="278" cy="92" r="1.4" />
            <circle cx="48" cy="98" r="1.4" />
          </g>
        </svg>
        <figcaption className={styles.caption}>Inbox queue · zero waiting</figcaption>
      </figure>

      <span className={styles.code}>STATUS · INBOX CLEAR</span>
      <h2 id="state-empty-inbox-heading" className={styles.headline}>
        {headline}
      </h2>
      <p className={styles.message}>{message}</p>

      {stats.length > 0 ? (
        <dl className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={`${stat.label}-${index}`} className={styles.statCell}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
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
    </article>
  )
}

export default StateEmptyInbox
