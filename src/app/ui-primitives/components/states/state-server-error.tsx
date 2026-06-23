import type { ReactNode } from "react"

import styles from "./state-server-error.module.css"

export interface StateServerErrorProps {
  headline?: string
  message?: string
  errorCode?: string
  incidentId?: string
  occurredAt?: string
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

export function StateServerError({
  headline = "Something blew a gasket",
  message = "Our backend just dropped its midpipe. The team has been paged and is already crawling under it. Retrying usually fixes it, otherwise check the status page.",
  errorCode = "500 · INTERNAL FAULT",
  incidentId,
  occurredAt,
  primaryAction,
  secondaryAction,
}: StateServerErrorProps) {
  return (
    <article className={styles.surface} role="alert" aria-labelledby="state-server-error-heading">
      <span className={styles.alertStrip} aria-hidden="true" />

      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 340 240"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="seChrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0f4f8" />
              <stop offset="42%" stopColor="#6f7783" />
              <stop offset="100%" stopColor="#1d222b" />
            </linearGradient>
            <radialGradient id="seBlast" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="var(--primitive-text-strong)" />
              <stop offset="30%" stopColor="var(--primitive-amber)" />
              <stop offset="70%" stopColor="var(--primitive-red)" />
              <stop offset="100%" stopColor="#3a0407" />
            </radialGradient>
          </defs>
          {/* Ground shadow */}
          <ellipse cx="170" cy="216" rx="130" ry="9" fill="#000" opacity="0.42" />

          {/* Left pipe segment */}
          <g>
            <path
              d="M 14 116 L 138 116 L 148 128 L 148 142 L 138 154 L 14 154 Z"
              fill="url(#seChrome)"
              stroke="#0a0c10"
              strokeWidth="2"
            />
            <path
              d="M 14 116 L 138 116 L 148 128 L 14 128 Z"
              fill="var(--primitive-text-strong)"
              opacity="0.18"
            />
            {/* jagged tear edge */}
            <path
              d="M 148 128 L 144 132 L 150 138 L 144 143 L 148 142"
              fill="#0a0c10"
              stroke="var(--primitive-red)"
              strokeWidth="1.4"
            />
          </g>

          {/* Right pipe segment — knocked askew */}
          <g transform="translate(176 124) rotate(11 78 14)">
            <path
              d="M 0 0 L 124 0 L 134 12 L 134 26 L 124 38 L 0 38 Z"
              fill="url(#seChrome)"
              stroke="#0a0c10"
              strokeWidth="2"
            />
            <path d="M 0 0 L 124 0 L 134 12 L 0 12 Z" fill="var(--primitive-text-strong)" opacity="0.18" />
            {/* tip */}
            <ellipse cx="138" cy="19" rx="5" ry="14" fill="#0c0a08" />
            {/* tear edge */}
            <path
              d="M 0 0 L 4 4 L -2 10 L 4 16 L 0 18"
              fill="#0a0c10"
              stroke="var(--primitive-red)"
              strokeWidth="1.4"
            />
          </g>

          {/* Central blast */}
          <g>
            <circle cx="162" cy="135" r="34" fill="url(#seBlast)" />
            <path
              d="M 162 96 L 168 124 L 198 118 L 174 134 L 200 152 L 168 144 L 162 174 L 156 144 L 124 152 L 150 134 L 124 118 L 156 124 Z"
              fill="var(--primitive-amber)"
              opacity="0.85"
            />
          </g>

          {/* Sparks */}
          <g className={styles.sparkA} fill="var(--primitive-amber)">
            <circle cx="92" cy="84" r="2.4" />
            <circle cx="116" cy="68" r="1.6" />
            <circle cx="208" cy="78" r="2" />
          </g>
          <g className={styles.sparkB} fill="var(--primitive-teal)">
            <circle cx="60" cy="100" r="1.8" />
            <circle cx="240" cy="98" r="2" />
            <circle cx="184" cy="60" r="1.6" />
          </g>
          <g className={styles.sparkC} fill="var(--primitive-text-strong)">
            <circle cx="142" cy="68" r="2" />
            <circle cx="220" cy="116" r="1.6" />
            <circle cx="82" cy="178" r="1.8" />
          </g>

          {/* Smoke wisp */}
          <path
            d="M 152 90 Q 160 60 178 56 Q 196 52 200 30"
            stroke="#5b6470"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="3 5"
            opacity="0.55"
          />
        </svg>
        <figcaption className={styles.caption}>Telemetry mesh — fault registered</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>{errorCode}</span>
        <h1 id="state-server-error-heading" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.message}>{message}</p>
        {(incidentId || occurredAt) && (
          <dl className={styles.refLine}>
            {incidentId ? (
              <>
                <dt>Incident</dt>
                <dd>{incidentId}</dd>
              </>
            ) : null}
            {occurredAt ? (
              <>
                <dt>First observed</dt>
                <dd>{occurredAt}</dd>
              </>
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

export default StateServerError
