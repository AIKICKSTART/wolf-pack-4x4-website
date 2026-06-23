import type { ReactNode } from "react"

import styles from "./state-offline.module.css"

export interface StateOfflineProps {
  headline?: string
  message?: string
  retryCount?: number
  lastOnlineAt?: string
  cachedDataNote?: string
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

export function StateOffline({
  headline = "No signal to the mesh",
  message = "We have lost the link to the workshop services. Telemetry and live quotes are paused. We will keep retrying in the background.",
  retryCount,
  lastOnlineAt,
  cachedDataNote = "You can still view your last opened quote, ledger snapshot, and bay schedule from the local cache.",
  primaryAction,
  secondaryAction,
}: StateOfflineProps) {
  return (
    <article
      className={styles.surface}
      role="status"
      aria-live="polite"
      aria-labelledby="state-offline-heading"
    >
      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 320 240"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ofTower" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6f7783" />
              <stop offset="50%" stopColor="#3a414c" />
              <stop offset="100%" stopColor="#1a1d24" />
            </linearGradient>
            <linearGradient id="ofGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0a0c10" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="222" rx="120" ry="9" fill="#000" opacity="0.42" />

          {/* Signal waves */}
          <g fill="none" stroke="var(--primitive-teal)" strokeWidth="2.5" strokeLinecap="round">
            <path className={styles.wave1} d="M 116 80 Q 160 32 204 80" opacity="0.62" />
            <path className={styles.wave2} d="M 92 80 Q 160 8 228 80" opacity="0.42" />
            <path className={styles.wave3} d="M 68 80 Q 160 -16 252 80" opacity="0.22" />
          </g>

          {/* Tower body (lattice) */}
          <g stroke="#0a0c10" strokeWidth="1.5">
            {/* outer legs */}
            <path d="M 140 78 L 124 214" fill="url(#ofTower)" />
            <path d="M 180 78 L 196 214" fill="url(#ofTower)" />
            {/* horizontal crossbars */}
            <line x1="138" y1="100" x2="182" y2="100" stroke="#3a414c" strokeWidth="2" />
            <line x1="136" y1="124" x2="184" y2="124" stroke="#3a414c" strokeWidth="2" />
            <line x1="134" y1="148" x2="186" y2="148" stroke="#3a414c" strokeWidth="2" />
            <line x1="132" y1="172" x2="188" y2="172" stroke="#3a414c" strokeWidth="2" />
            <line x1="128" y1="196" x2="192" y2="196" stroke="#3a414c" strokeWidth="2" />
            {/* lattice X */}
            <g stroke="#3a414c" strokeWidth="1.2">
              <line x1="138" y1="100" x2="184" y2="124" />
              <line x1="182" y1="100" x2="136" y2="124" />
              <line x1="136" y1="124" x2="186" y2="148" />
              <line x1="184" y1="124" x2="134" y2="148" />
              <line x1="134" y1="148" x2="188" y2="172" />
              <line x1="186" y1="148" x2="132" y2="172" />
              <line x1="132" y1="172" x2="192" y2="196" />
              <line x1="188" y1="172" x2="128" y2="196" />
            </g>
            {/* base plate */}
            <rect x="118" y="208" width="84" height="8" rx="2" fill="url(#ofGround)" />
            {/* top spire */}
            <path d="M 156 80 L 160 50 L 164 80 Z" fill="url(#ofTower)" />
            <circle cx="160" cy="50" r="3" fill="var(--primitive-red)" />
          </g>

          {/* Big strike-through */}
          <g>
            <line
              x1="64"
              y1="60"
              x2="262"
              y2="200"
              stroke="#0a0c10"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.62"
            />
            <line
              x1="64"
              y1="60"
              x2="262"
              y2="200"
              stroke="var(--primitive-red)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <line
              x1="64"
              y1="60"
              x2="262"
              y2="200"
              stroke="var(--primitive-text-strong)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.32"
            />
          </g>
        </svg>
        <figcaption className={styles.caption}>Mesh ping · timed out</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>OFFLINE · CONNECTION LOST</span>
        <h2 id="state-offline-heading" className={styles.headline}>
          {headline}
        </h2>
        <p className={styles.message}>{message}</p>

        {(typeof retryCount === "number" || lastOnlineAt) && (
          <div className={styles.retryMeta}>
            {typeof retryCount === "number" ? (
              <dl className={styles.retryCount}>
                <dt>Retry attempts</dt>
                <dd>{retryCount}</dd>
              </dl>
            ) : null}
            {lastOnlineAt ? (
              <dl className={styles.retryCount}>
                <dt>Last seen online</dt>
                <dd>
                  <time dateTime={lastOnlineAt}>{lastOnlineAt}</time>
                </dd>
              </dl>
            ) : null}
          </div>
        )}

        {cachedDataNote ? (
          <aside className={styles.cacheNote}>
            <strong>Local cache available</strong>
            <span>{cachedDataNote}</span>
          </aside>
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

export default StateOffline
