"use client"

import { useId, useState, type FormEvent, type ReactNode } from "react"

import styles from "./state-coming-soon.module.css"

export interface StateComingSoonCountdownPart {
  label: string
  value: string
}

export interface StateComingSoonProps {
  headline?: string
  message?: string
  launchAt?: string
  countdownParts?: ReadonlyArray<StateComingSoonCountdownPart>
  waitlistLabel?: string
  emailPlaceholder?: string
  onWaitlistSubmit?: (email: string) => void
  submitLabel?: string
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

const DEFAULT_COUNTDOWN: ReadonlyArray<StateComingSoonCountdownPart> = [
  { label: "Days", value: "12" },
  { label: "Hours", value: "08" },
  { label: "Mins", value: "42" },
  { label: "Secs", value: "16" },
]

export function StateComingSoon({
  headline = "Polishing the launch line",
  message = "The new Mufflermen booking surface is two weeks out from rollout. Tap the waitlist and we will text you when bookings open for the Albion Park Rail run.",
  launchAt,
  countdownParts = DEFAULT_COUNTDOWN,
  waitlistLabel = "Join the workshop waitlist",
  emailPlaceholder = "you@oakflats.com.au",
  onWaitlistSubmit,
  submitLabel = "Join",
  primaryAction,
  secondaryAction,
}: StateComingSoonProps) {
  const inputId = useId()
  const [email, setEmail] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!onWaitlistSubmit) {
      return
    }
    const trimmed = email.trim()
    if (trimmed.length === 0) {
      return
    }
    onWaitlistSubmit(trimmed)
    setEmail("")
  }

  return (
    <article
      className={styles.surface}
      role="status"
      aria-live="polite"
      aria-labelledby="state-coming-soon-heading"
    >
      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 340 220"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="csCover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a414c" />
              <stop offset="50%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0a0c10" />
            </linearGradient>
            <linearGradient id="csFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0c10" />
              <stop offset="100%" stopColor="#040508" />
            </linearGradient>
          </defs>

          {/* Workshop floor strip */}
          <rect x="0" y="184" width="340" height="36" fill="url(#csFloor)" />
          <line x1="0" y1="184" x2="340" y2="184" stroke="#3a414c" strokeWidth="1" opacity="0.62" />

          {/* Hazard stripe under the car */}
          <rect
            x="40"
            y="178"
            width="260"
            height="4"
            fill="url(#csCover)"
            opacity="0.5"
          />
          <g opacity="0.3">
            <rect x="40" y="178" width="20" height="4" fill="var(--primitive-amber)" />
            <rect x="80" y="178" width="20" height="4" fill="var(--primitive-amber)" />
            <rect x="120" y="178" width="20" height="4" fill="var(--primitive-amber)" />
            <rect x="160" y="178" width="20" height="4" fill="var(--primitive-amber)" />
            <rect x="200" y="178" width="20" height="4" fill="var(--primitive-amber)" />
            <rect x="240" y="178" width="20" height="4" fill="var(--primitive-amber)" />
            <rect x="280" y="178" width="20" height="4" fill="var(--primitive-amber)" />
          </g>

          {/* Covered car */}
          <g className={styles.cover}>
            {/* Cover drape silhouette */}
            <path
              d="M 50 178 Q 56 120 110 96 Q 156 78 198 92 Q 244 108 286 130 Q 296 138 296 178 Z"
              fill="url(#csCover)"
              stroke="#0a0c10"
              strokeWidth="2"
            />
            {/* Cover highlights */}
            <path
              d="M 78 156 Q 110 116 152 102 Q 198 90 232 106"
              stroke="var(--primitive-text-strong)"
              strokeWidth="1.4"
              fill="none"
              opacity="0.18"
            />
            {/* Subtle fabric crinkle */}
            <path
              d="M 100 168 Q 138 148 178 144"
              stroke="var(--primitive-text-strong)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.16"
            />
            <path
              d="M 150 174 Q 200 156 256 156"
              stroke="var(--primitive-text-strong)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.14"
            />
            {/* Tied corners */}
            <circle cx="60" cy="172" r="3.5" fill="#3a414c" stroke="#0a0c10" strokeWidth="1" />
            <circle cx="288" cy="172" r="3.5" fill="#3a414c" stroke="#0a0c10" strokeWidth="1" />
          </g>

          {/* Tyres peeking out */}
          <g>
            <circle cx="98" cy="180" r="14" fill="#0a0c10" stroke="#3a414c" strokeWidth="1.5" />
            <circle cx="98" cy="180" r="6" fill="#1a1d24" stroke="#5b6470" strokeWidth="1" />
            <circle cx="244" cy="180" r="14" fill="#0a0c10" stroke="#3a414c" strokeWidth="1.5" />
            <circle cx="244" cy="180" r="6" fill="#1a1d24" stroke="#5b6470" strokeWidth="1" />
          </g>

          {/* Glimmer star */}
          <g className={styles.glimmer}>
            <path
              d="M 244 56 L 247 64 L 255 67 L 247 70 L 244 78 L 241 70 L 233 67 L 241 64 Z"
              fill="var(--primitive-amber)"
            />
          </g>
          <circle cx="62" cy="50" r="2" fill="var(--primitive-teal)" opacity="0.7" />
          <circle cx="292" cy="36" r="2.4" fill="var(--primitive-teal)" opacity="0.6" />
        </svg>
        <figcaption className={styles.caption}>Showroom · curtain up soon</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>{launchAt ? `LAUNCH · ${launchAt}` : "PRELAUNCH"}</span>
        <h2 id="state-coming-soon-heading" className={styles.headline}>
          {headline}
        </h2>
        <p className={styles.message}>{message}</p>

        {countdownParts.length > 0 ? (
          <dl
            className={styles.countdown}
            aria-label={launchAt ? `Countdown to ${launchAt}` : "Countdown to launch"}
          >
            {countdownParts.map((part, index) => (
              <div key={`${part.label}-${index}`} className={styles.countdownCell}>
                <dt>{part.label}</dt>
                <dd>{part.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <form className={styles.waitlist} onSubmit={handleSubmit}>
          <label className={styles.waitlistLabel} htmlFor={inputId}>
            {waitlistLabel}
          </label>
          <div className={styles.waitlistRow}>
            <input
              id={inputId}
              className={styles.waitlistInput}
              type="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
            {primaryAction ?? (
              <button
                type="submit"
                className={styles.submitFallback}
                style={{
                  height: 44,
                  padding: "0 var(--primitive-space-4)",
                  border: 0,
                  borderRadius: "var(--primitive-btn-radius)",
                  color: "var(--primitive-btn-primary-fg)",
                  fontFamily: "var(--primitive-font-mono)",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "var(--primitive-tracking-wide)",
                  textTransform: "uppercase",
                  background: "var(--primitive-btn-primary-bg)",
                  boxShadow: "var(--primitive-btn-primary-shadow)",
                  cursor: "pointer",
                }}
              >
                {submitLabel}
              </button>
            )}
          </div>
        </form>

        {secondaryAction ? <div className={styles.actions}>{secondaryAction}</div> : null}
      </div>
    </article>
  )
}

export default StateComingSoon
