"use client"

import { useCallback, useEffect, useId, useRef } from "react"

import styles from "./welcome-modal.module.css"

export interface WelcomeModalCta {
  /** Short label, e.g. "Add your first vehicle". */
  label: string
  /** Sub-line beneath the label, e.g. "Capture a rego and you're rolling". */
  description: string
  /** Optional href — if omitted, falls back to onClick handler. */
  href?: string
  /** Single character / very short glyph to pair with the label. */
  glyph: string
  /** Optional click handler used when href is omitted. */
  onClick?: () => void
}

interface WelcomeModalProps {
  open: boolean
  /** Top eyebrow label, e.g. "Welcome aboard". */
  kicker: string
  /** Big primary headline, e.g. "G'day Daniel — let's open the bay doors". */
  headline: string
  /** Supporting paragraph below the headline. */
  body: string
  /** 3 next-step CTAs rendered in a vertical stack. */
  ctas: ReadonlyArray<WelcomeModalCta>
  /** Label for the "skip for now" link. */
  skipLabel?: string
  /** Called when the modal closes (skip or close button). */
  onClose: () => void
}

export function WelcomeModal({
  open,
  kicker,
  headline,
  body,
  ctas,
  skipLabel = "Skip for now",
  onClose,
}: WelcomeModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const headingId = useId()
  const bodyId = useId()

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) {
      return
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, handleKey])

  if (!open) {
    return null
  }

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={bodyId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.head}>
          <span className={styles.kicker}>{kicker}</span>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close welcome"
          >
            ×
          </button>
        </header>

        <div className={styles.body}>
          <figure className={styles.illustration} aria-hidden="true">
            <svg viewBox="0 0 220 160" width="100%" height="100%" role="presentation">
              <defs>
                <linearGradient id="garageDoor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1c1f29" />
                  <stop offset="100%" stopColor="#0c0d13" />
                </linearGradient>
                <linearGradient id="opening" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255, 193, 79, 0.65)" />
                  <stop offset="100%" stopColor="rgba(230, 32, 40, 0.18)" />
                </linearGradient>
              </defs>
              <rect x="10" y="120" width="200" height="6" fill="#0a0b10" />
              <rect x="20" y="40" width="180" height="80" fill="url(#garageDoor)" stroke="#2a2d3a" />
              <rect x="20" y="40" width="180" height="50" fill="url(#opening)" />
              <line x1="20" y1="60" x2="200" y2="60" stroke="#3a3d4a" />
              <line x1="20" y1="80" x2="200" y2="80" stroke="#3a3d4a" />
              <line x1="20" y1="100" x2="200" y2="100" stroke="#3a3d4a" />
              <path
                d="M 30 38 L 110 18 L 190 38"
                stroke="#e62028"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="110" cy="62" r="14" fill="rgba(255, 255, 255, 0.94)" />
              <text
                x="110"
                y="68"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fontWeight="700"
                fill="#0c0d13"
              >
                OFM
              </text>
              <circle cx="44" cy="118" r="6" fill="#1c1f29" stroke="#3a3d4a" />
              <circle cx="176" cy="118" r="6" fill="#1c1f29" stroke="#3a3d4a" />
            </svg>
          </figure>

          <div className={styles.copy}>
            <div className={styles.headlineLabel}>
              <h2 id={headingId} className={styles.headline}>{headline}</h2>
            </div>
            <p id={bodyId} className={styles.text}>
              {body}
            </p>
          </div>
        </div>

        <ul className={styles.ctas}>
          {ctas.map((cta) => {
            const inner = (
              <>
                <span className={styles.ctaGlyph} aria-hidden="true">
                  {cta.glyph}
                </span>
                <span className={styles.ctaCopy}>
                  <span className={styles.ctaLabel}>{cta.label}</span>
                  <span className={styles.ctaDescription}>{cta.description}</span>
                </span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </>
            )
            return (
              <li key={cta.label} className={styles.ctaItem}>
                {cta.href ? (
                  <a className={styles.cta} href={cta.href}>
                    {inner}
                  </a>
                ) : (
                  <button type="button" className={styles.cta} onClick={cta.onClick}>
                    {inner}
                  </button>
                )}
              </li>
            )
          })}
        </ul>

        <footer className={styles.foot}>
          <button type="button" className={styles.skip} onClick={onClose}>
            {skipLabel}
          </button>
        </footer>
      </div>
    </div>
  )
}

export default WelcomeModal
