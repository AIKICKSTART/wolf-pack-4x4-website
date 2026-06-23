"use client"

import { useEffect, useRef } from "react"

import {
  ConfettiBurst,
  type ConfettiBurstHandle,
} from "../primitives/confetti-burst"
import styles from "./kyc-success-state.module.css"

export interface SuccessCta {
  /** Short label, e.g. "Connect Stripe payouts". */
  label: string
  /** Secondary line beneath the label. */
  description: string
  /** Optional href. */
  href?: string
  /** Single-character glyph alongside the label. */
  glyph: string
  /** Optional click handler used when href is omitted. */
  onClick?: () => void
}

export interface KycSuccessStateProps {
  /** Eyebrow kicker, e.g. "KYC complete". */
  kicker: string
  /** Big headline, e.g. "All set! Your workshop is verified". */
  headline: string
  /** Supporting body. */
  body: string
  /** Stack of follow-up CTAs. */
  ctas: ReadonlyArray<SuccessCta>
  /** Whether to fire confetti on mount. */
  confettiOnAppear?: boolean
  className?: string
}

export function KycSuccessState({
  kicker,
  headline,
  body,
  ctas,
  confettiOnAppear = true,
  className,
}: KycSuccessStateProps) {
  const confettiRef = useRef<ConfettiBurstHandle | null>(null)

  useEffect(() => {
    if (!confettiOnAppear) return
    confettiRef.current?.fire({
      particleCount: 110,
      spread: 75,
      startVelocity: 35,
      scalar: 1,
    })
  }, [confettiOnAppear])

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-labelledby="kyc-success-headline">
      <span className={styles.confettiHost} aria-hidden="true">
        <ConfettiBurst ref={confettiRef} ariaLabel="KYC success confetti" />
      </span>

      <span className={styles.checkMark} aria-hidden="true">
        <svg viewBox="0 0 80 80" width="80" height="80">
          <defs>
            <linearGradient id="kycSuccessGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primitive-green)" />
              <stop offset="100%" stopColor="color-mix(in oklab, var(--primitive-green) 62%, black)" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="38" fill="color-mix(in oklab, var(--primitive-green) 12%, transparent)" />
          <circle cx="40" cy="40" r="28" fill="url(#kycSuccessGrad)" />
          <path
            d="M 24 41 L 36 53 L 56 30"
            stroke="var(--primitive-canvas)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 id="kyc-success-headline" className={styles.headline}>
          {headline}
        </h2>
        <p className={styles.body}>{body}</p>
      </header>

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
    </section>
  )
}

export default KycSuccessState
