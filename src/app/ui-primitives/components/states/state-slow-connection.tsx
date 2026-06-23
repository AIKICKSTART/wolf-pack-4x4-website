import type { ReactNode } from "react"

import styles from "./state-slow-connection.module.css"

export interface StateSlowConnectionProps {
  headline?: string
  message?: string
  pingLabel?: string
  throughputLabel?: string
  liteAction?: ReactNode
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

export function StateSlowConnection({
  headline = "Connection rolling on cold tyres",
  message = "We are still talking to the workshop services, but the pipe is slow. Switch to lite mode to keep things responsive while we wait it out.",
  pingLabel = "412 ms",
  throughputLabel = "82 kbps",
  liteAction,
  primaryAction,
  secondaryAction,
}: StateSlowConnectionProps) {
  return (
    <article
      className={styles.surface}
      role="status"
      aria-live="polite"
      aria-labelledby="state-slow-connection-heading"
    >
      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 240 240"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="slShell" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b6470" />
              <stop offset="50%" stopColor="#3a414c" />
              <stop offset="100%" stopColor="#1a1d24" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="216" rx="86" ry="7" fill="#000" opacity="0.42" />

          {/* Buffering ring (dashed) */}
          <g className={styles.ring}>
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="#1a1d24"
              strokeWidth="14"
              opacity="0.7"
            />
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="var(--primitive-amber)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="22 280"
            />
          </g>

          {/* Tortoise inside */}
          <g className={styles.tortoise}>
            {/* shell */}
            <path
              d="M 80 152 Q 120 100 160 152 Q 156 168 120 168 Q 84 168 80 152 Z"
              fill="url(#slShell)"
              stroke="#0a0c10"
              strokeWidth="2"
            />
            {/* shell highlight */}
            <path
              d="M 90 148 Q 120 116 150 148"
              stroke="var(--primitive-text-strong)"
              strokeWidth="1.4"
              fill="none"
              opacity="0.32"
            />
            {/* hex pattern */}
            <g stroke="#0a0c10" strokeWidth="1" opacity="0.7" fill="none">
              <path d="M 102 144 L 108 138 L 114 144 L 114 152 L 108 158 L 102 152 Z" />
              <path d="M 120 132 L 126 126 L 132 132 L 132 140 L 126 146 L 120 140 Z" />
              <path d="M 120 152 L 126 146 L 132 152 L 132 160 L 126 166 L 120 160 Z" />
              <path d="M 138 144 L 144 138 L 150 144 L 150 152 L 144 158 L 138 152 Z" />
            </g>
            {/* head */}
            <ellipse cx="166" cy="158" rx="10" ry="8" fill="url(#slShell)" stroke="#0a0c10" strokeWidth="2" />
            <circle cx="170" cy="154" r="1.6" fill="var(--primitive-text-strong)" />
            {/* legs */}
            <ellipse cx="92" cy="172" rx="8" ry="5" fill="url(#slShell)" stroke="#0a0c10" strokeWidth="1.5" />
            <ellipse cx="148" cy="172" rx="8" ry="5" fill="url(#slShell)" stroke="#0a0c10" strokeWidth="1.5" />
            {/* tail */}
            <path d="M 76 156 L 68 162" stroke="#0a0c10" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Status dot top */}
          <circle cx="120" cy="34" r="6" fill="var(--primitive-amber)" />
          <circle cx="120" cy="34" r="10" fill="var(--primitive-amber)" opacity="0.18" />
        </svg>
        <figcaption className={styles.caption}>Throughput · degraded</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>NETWORK · SLOW LINK</span>
        <h2 id="state-slow-connection-heading" className={styles.headline}>
          {headline}
        </h2>
        <p className={styles.message}>{message}</p>

        <dl className={styles.meterRow}>
          <div className={`${styles.meterCell} ${styles.warn}`}>
            <dt>Ping</dt>
            <dd>{pingLabel}</dd>
          </div>
          <div className={`${styles.meterCell} ${styles.warn}`}>
            <dt>Throughput</dt>
            <dd>{throughputLabel}</dd>
          </div>
          <div className={styles.meterCell}>
            <dt>Mode</dt>
            <dd>Full</dd>
          </div>
        </dl>

        <dl className={styles.liteToggle}>
          <div>
            <dt>Lite mode</dt>
            <dd>Drop telemetry, defer images, keep quotes + invoices live.</dd>
          </div>
          {liteAction}
        </dl>

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

export default StateSlowConnection
