"use client"

import { useId, useState } from "react"

import styles from "./selfie-capture-card.module.css"

type CaptureState = "idle" | "preview"

export interface SelfieCaptureCardProps {
  /** Eyebrow label, e.g. "Step 02 / Selfie". */
  kicker: string
  /** Big headline, e.g. "Take a quick selfie". */
  title: string
  /** Body copy paragraph. */
  body: string
  /** Bullet list of capture instructions. */
  instructions: ReadonlyArray<string>
  /** Initial state — useful for SSR-rendered preview. */
  initialState?: CaptureState
  className?: string
}

export function SelfieCaptureCard({
  kicker,
  title,
  body,
  instructions,
  initialState = "idle",
  className,
}: SelfieCaptureCardProps) {
  const headingId = useId()
  const [state, setState] = useState<CaptureState>(initialState)

  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleCapture = () => setState("preview")
  const handleRetake = () => setState("idle")

  return (
    <section
      className={classes}
      aria-labelledby={headingId}
      data-state={state}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 id={headingId} className={styles.title}>
          {title}
        </h3>
        <p className={styles.body}>{body}</p>
      </header>

      <div className={styles.stage}>
        <div className={styles.frame} aria-hidden="true">
          <svg viewBox="0 0 220 220" width="100%" height="100%">
            <defs>
              <radialGradient id="kycSelfieGlow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="color-mix(in oklab, var(--primitive-amber) 32%, transparent)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--primitive-teal) 0%, transparent)" />
              </radialGradient>
            </defs>
            <circle cx="110" cy="110" r="100" fill="var(--primitive-recessed)" />
            <circle
              cx="110"
              cy="110"
              r="98"
              fill="none"
              stroke="color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)"
              strokeDasharray="3 5"
            />
            <circle cx="110" cy="110" r="92" fill="url(#kycSelfieGlow)" />
            {state === "preview" ? (
              <g>
                <circle cx="110" cy="90" r="28" fill="color-mix(in oklab, var(--primitive-text-strong) 86%, transparent)" />
                <path
                  d="M 60 180 Q 110 130 160 180"
                  stroke="color-mix(in oklab, var(--primitive-text-strong) 86%, transparent)"
                  strokeWidth="32"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <g>
                <circle
                  cx="110"
                  cy="92"
                  r="26"
                  fill="none"
                  stroke="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)"
                  strokeDasharray="2 4"
                />
                <path
                  d="M 64 178 Q 110 134 156 178"
                  stroke="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)"
                  strokeDasharray="2 4"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            )}
            <line x1="110" y1="2" x2="110" y2="22" stroke="var(--primitive-amber)" strokeWidth="2" />
            <line x1="110" y1="218" x2="110" y2="198" stroke="var(--primitive-amber)" strokeWidth="2" />
            <line x1="2" y1="110" x2="22" y2="110" stroke="var(--primitive-amber)" strokeWidth="2" />
            <line x1="218" y1="110" x2="198" y2="110" stroke="var(--primitive-amber)" strokeWidth="2" />
          </svg>
        </div>
        {state === "idle" ? (
          <button type="button" className={styles.captureCta} onClick={handleCapture}>
            <span aria-hidden="true">◉</span>
            Tap to take selfie
          </button>
        ) : (
          <button type="button" className={styles.retakeCta} onClick={handleRetake}>
            <span aria-hidden="true">↻</span>
            Retake
          </button>
        )}
      </div>

      <ul className={styles.instructions}>
        {instructions.map((instruction) => (
          <li key={instruction} className={styles.instructionItem}>
            <span className={styles.bullet} aria-hidden="true">
              ✓
            </span>
            {instruction}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SelfieCaptureCard
