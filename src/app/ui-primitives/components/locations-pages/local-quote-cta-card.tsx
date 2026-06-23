"use client"

import { useState, type ReactNode } from "react"

import { Chip } from "../primitives/chip"
import { GlassSurface } from "../surfaces/glass-surface"

import type { LocalQuoteMode } from "./locations-pages-types"

import styles from "./local-quote-cta-card.module.css"

export interface LocalQuoteCtaCardProps {
  suburbName: string
  /** Workshop phone number in display form. */
  phoneDisplay: string
  /** tel: href value — usually `tel:+61...`. */
  phoneHref: string
  /** Book-online action href. */
  bookHref: string
  /** Default fulfilment mode. */
  defaultMode?: LocalQuoteMode
  /** Optional supporting copy below the heading. */
  body?: ReactNode
  /** Fires when the toggle changes. */
  onModeChange?: (mode: LocalQuoteMode) => void
  className?: string
}

const MODE_COPY: Record<LocalQuoteMode, { label: string; helper: string }> = {
  "drop-off": {
    label: "Drop-off",
    helper: "Book a bay at the Albion Park Rail workshop near Oak Flats.",
  },
  "mobile-fit": {
    label: "Mobile fit",
    helper: "Mufflermen ute attends — bay-side TIG welds done at your address.",
  },
}

const MODE_KEYS = Object.keys(MODE_COPY) as ReadonlyArray<LocalQuoteMode>

/**
 * Local quote CTA card — adapter that wraps `surfaces/GlassSurface`
 * around a phone chip, book-online button, and a mode toggle built
 * from `primitives/Chip` (`selected` state drives the active mode).
 */
export function LocalQuoteCtaCard({
  suburbName,
  phoneDisplay,
  phoneHref,
  bookHref,
  defaultMode = "drop-off",
  body,
  onModeChange,
  className,
}: LocalQuoteCtaCardProps) {
  const [mode, setMode] = useState<LocalQuoteMode>(defaultMode)
  const helper = MODE_COPY[mode].helper

  const update = (next: LocalQuoteMode) => {
    setMode(next)
    onModeChange?.(next)
  }

  const wrapClasses = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <GlassSurface tone="amber" intensity="high" className={wrapClasses}>
      <section className={styles.card} aria-labelledby="local-quote-heading">
        <header className={styles.head}>
          <span className={styles.kicker}>Local quote</span>
          <h2 id="local-quote-heading" className={styles.heading}>
            Get a quote for {suburbName}
          </h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>

        <ul
          className={styles.toggleGroup}
          role="radiogroup"
          aria-label="Fulfilment mode"
        >
          {MODE_KEYS.map((key) => {
            const selected = mode === key
            return (
              <li key={key} role="radio" aria-checked={selected}>
                <Chip
                  label={MODE_COPY[key].label}
                  tone={selected ? "red" : "neutral"}
                  selected={selected}
                  onSelect={() => update(key)}
                />
              </li>
            )
          })}
        </ul>

        <p className={styles.helper} aria-live="polite">
          {helper}
        </p>

        <div className={styles.actions}>
          <a className={styles.phone} href={phoneHref}>
            <span className={styles.phoneLabel}>Call workshop</span>
            <span className={styles.phoneValue}>{phoneDisplay}</span>
          </a>
          <a className={styles.book} href={bookHref}>
            Book online
          </a>
        </div>
      </section>
    </GlassSurface>
  )
}

export default LocalQuoteCtaCard
