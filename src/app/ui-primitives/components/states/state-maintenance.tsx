import type { ReactNode } from "react"

import styles from "./state-maintenance.module.css"

export interface StateMaintenanceProps {
  headline?: string
  message?: string
  startsAt?: string
  endsAt?: string
  affectedSurface?: string
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

export function StateMaintenance({
  headline = "We are on the tools",
  message = "The booking surface is offline for scheduled maintenance. Quotes, invoices, and the workshop dashboard are unavailable while we tighten a few bolts.",
  startsAt,
  endsAt,
  affectedSurface,
  primaryAction,
  secondaryAction,
}: StateMaintenanceProps) {
  return (
    <article
      className={styles.surface}
      role="status"
      aria-live="polite"
      aria-labelledby="state-maintenance-heading"
    >
      <span className={styles.hazardBand} aria-hidden="true" />

      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 320 240"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mtChrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0f4f8" />
              <stop offset="48%" stopColor="#6a727e" />
              <stop offset="100%" stopColor="#1d222b" />
            </linearGradient>
            <radialGradient id="mtRotor" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#3a414c" />
              <stop offset="62%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0a0c10" />
            </radialGradient>
          </defs>
          {/* Ground shadow */}
          <ellipse cx="160" cy="216" rx="118" ry="9" fill="#000" opacity="0.42" />

          {/* Brake rotor backplate spinning */}
          <g className={styles.rotor}>
            <circle cx="160" cy="124" r="86" fill="url(#mtRotor)" stroke="#0a0c10" strokeWidth="2" />
            <circle cx="160" cy="124" r="86" fill="none" stroke="#3a414c" strokeWidth="1" opacity="0.62" strokeDasharray="2 6" />
            {/* drilled holes */}
            <g fill="#0a0c10">
              <circle cx="160" cy="60" r="5" />
              <circle cx="218" cy="92" r="5" />
              <circle cx="218" cy="156" r="5" />
              <circle cx="160" cy="188" r="5" />
              <circle cx="102" cy="156" r="5" />
              <circle cx="102" cy="92" r="5" />
            </g>
            {/* hub */}
            <circle cx="160" cy="124" r="20" fill="#0a0c10" stroke="#3a414c" strokeWidth="2" />
            <circle cx="160" cy="124" r="8" fill="#3a414c" />
          </g>

          {/* Crossed wrenches in front */}
          <g transform="translate(160 124)">
            {/* wrench 1 */}
            <g transform="rotate(35)">
              <rect x="-58" y="-6" width="120" height="12" rx="6" fill="url(#mtChrome)" stroke="#0a0c10" strokeWidth="2" />
              <rect x="-58" y="-6" width="120" height="3" rx="6" fill="var(--primitive-text-strong)" opacity="0.32" />
              {/* head 1 */}
              <path
                d="M -58 -6 L -76 -16 L -82 -10 L -86 0 L -82 10 L -76 16 L -58 6 Z"
                fill="url(#mtChrome)"
                stroke="#0a0c10"
                strokeWidth="2"
              />
              <circle cx="-72" cy="0" r="6" fill="#0a0c10" />
              {/* head 2 */}
              <path
                d="M 62 -6 L 80 -14 L 88 -8 L 92 0 L 88 8 L 80 14 L 62 6 Z"
                fill="url(#mtChrome)"
                stroke="#0a0c10"
                strokeWidth="2"
              />
              <circle cx="78" cy="0" r="6" fill="#0a0c10" />
            </g>
            {/* wrench 2 */}
            <g transform="rotate(-35)">
              <rect x="-58" y="-6" width="120" height="12" rx="6" fill="url(#mtChrome)" stroke="#0a0c10" strokeWidth="2" />
              <rect x="-58" y="-6" width="120" height="3" rx="6" fill="var(--primitive-text-strong)" opacity="0.32" />
              <path
                d="M -58 -6 L -76 -16 L -82 -10 L -86 0 L -82 10 L -76 16 L -58 6 Z"
                fill="url(#mtChrome)"
                stroke="#0a0c10"
                strokeWidth="2"
              />
              <circle cx="-72" cy="0" r="6" fill="#0a0c10" />
              <path
                d="M 62 -6 L 80 -14 L 88 -8 L 92 0 L 88 8 L 80 14 L 62 6 Z"
                fill="url(#mtChrome)"
                stroke="#0a0c10"
                strokeWidth="2"
              />
              <circle cx="78" cy="0" r="6" fill="#0a0c10" />
            </g>
            {/* center pin */}
            <circle r="9" fill="var(--primitive-amber)" stroke="#7c4513" strokeWidth="2" />
            <circle r="3" fill="#7c4513" />
          </g>
        </svg>
        <figcaption className={styles.caption}>Workshop offline — pit crew engaged</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>{affectedSurface ? `MAINT · ${affectedSurface}` : "SCHEDULED MAINTENANCE"}</span>
        <h1 id="state-maintenance-heading" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.message}>{message}</p>
        {(startsAt || endsAt) && (
          <dl className={styles.window}>
            {startsAt ? (
              <div className={styles.windowCell}>
                <dt>Window opens</dt>
                <dd>
                  <time dateTime={startsAt}>{startsAt}</time>
                </dd>
              </div>
            ) : null}
            {endsAt ? (
              <div className={styles.windowCell}>
                <dt>Service back</dt>
                <dd>
                  <time dateTime={endsAt}>{endsAt}</time>
                </dd>
              </div>
            ) : null}
          </dl>
        )}
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

export default StateMaintenance
