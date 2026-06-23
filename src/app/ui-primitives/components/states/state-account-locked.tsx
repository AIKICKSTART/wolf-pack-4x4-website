import type { ReactNode } from "react"

import styles from "./state-account-locked.module.css"

export interface StateAccountLockedProps {
  headline?: string
  message?: string
  accountRef?: string
  lockedAt?: string
  reasons?: ReadonlyArray<string>
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

const DEFAULT_REASONS: ReadonlyArray<string> = [
  "Five failed sign-in attempts inside ten minutes.",
  "Sign-in from an unfamiliar IP range was rejected.",
  "Verification step skipped on the last booking confirmation.",
]

export function StateAccountLocked({
  headline = "Bay closed — account on hold",
  message = "We have parked your account until we can confirm it is really you. Tap unlock to send a fresh verification, or call the workshop desk during opening hours.",
  accountRef,
  lockedAt,
  reasons = DEFAULT_REASONS,
  primaryAction,
  secondaryAction,
}: StateAccountLockedProps) {
  return (
    <article
      className={styles.surface}
      role="alert"
      aria-labelledby="state-account-locked-heading"
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
            <linearGradient id="alBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a414c" />
              <stop offset="48%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0a0c10" />
            </linearGradient>
            <linearGradient id="alShackle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0f4f8" />
              <stop offset="60%" stopColor="#6f7783" />
              <stop offset="100%" stopColor="#1d222b" />
            </linearGradient>
          </defs>
          {/* Ground shadow */}
          <ellipse cx="160" cy="222" rx="100" ry="8" fill="#000" opacity="0.42" />

          {/* Brake rotor backplate */}
          <g className={styles.rotorRing}>
            <circle cx="160" cy="154" r="68" fill="#0a0c10" stroke="#3a414c" strokeWidth="2" />
            <circle cx="160" cy="154" r="68" fill="none" stroke="#3a414c" strokeWidth="1" strokeDasharray="3 7" opacity="0.62" />
            {/* drilled holes */}
            <g fill="#000">
              <circle cx="160" cy="100" r="4" />
              <circle cx="202" cy="124" r="4" />
              <circle cx="214" cy="170" r="4" />
              <circle cx="184" cy="206" r="4" />
              <circle cx="136" cy="206" r="4" />
              <circle cx="106" cy="170" r="4" />
              <circle cx="118" cy="124" r="4" />
            </g>
            {/* hub */}
            <circle cx="160" cy="154" r="16" fill="#1a1d24" stroke="#3a414c" strokeWidth="2" />
          </g>

          {/* Lock shackle */}
          <g className={styles.lockShackle}>
            <path
              d="M 132 96 L 132 70 Q 132 38 160 38 Q 188 38 188 70 L 188 96"
              stroke="url(#alShackle)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 132 96 L 132 70 Q 132 38 160 38 Q 188 38 188 70 L 188 96"
              stroke="var(--primitive-text-strong)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.28"
            />
          </g>

          {/* Lock body */}
          <g>
            <rect x="118" y="92" width="84" height="74" rx="10" fill="url(#alBody)" stroke="#0a0c10" strokeWidth="2" />
            <rect x="118" y="92" width="84" height="20" rx="10" fill="var(--primitive-text-strong)" opacity="0.1" />
            {/* keyhole */}
            <circle cx="160" cy="120" r="8" fill="#0a0c10" stroke="var(--primitive-red)" strokeWidth="2" />
            <path d="M 160 124 L 160 142" stroke="var(--primitive-red)" strokeWidth="3" strokeLinecap="round" />
            {/* brand badge */}
            <rect x="138" y="148" width="44" height="8" rx="2" fill="#3a414c" />
          </g>
        </svg>
        <figcaption className={styles.caption}>Security gate — engaged</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>ACCOUNT LOCKED · CODE 423</span>
        <h1 id="state-account-locked-heading" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.message}>{message}</p>
        {(accountRef || lockedAt) && (
          <p className={styles.message} style={{ color: "var(--primitive-muted)" }}>
            {accountRef ? (
              <>
                <strong style={{ color: "var(--primitive-amber)" }}>Account:</strong>{" "}
                <code style={{ color: "var(--primitive-amber)", fontFamily: "var(--primitive-font-mono)" }}>{accountRef}</code>
                {lockedAt ? " · " : null}
              </>
            ) : null}
            {lockedAt ? (
              <>
                <strong style={{ color: "var(--primitive-amber)" }}>Held since:</strong>{" "}
                <time dateTime={lockedAt} style={{ fontFamily: "var(--primitive-font-mono)" }}>{lockedAt}</time>
              </>
            ) : null}
          </p>
        )}
        {reasons.length > 0 ? (
          <ul className={styles.reasonsList} aria-label="Reasons for the hold">
            {reasons.map((reason, index) => (
              <li key={`${reason.slice(0, 12)}-${index}`}>
                <span aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
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

export default StateAccountLocked
