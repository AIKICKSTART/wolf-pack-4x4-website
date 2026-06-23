import type { ReactNode } from "react"

import styles from "./logo-lockup.module.css"

export type LogoLockupVariant = "stacked" | "horizontal" | "mark-only" | "wordmark-only"

export interface LogoLockupProps {
  variant: LogoLockupVariant
  wordmark?: string
  tagline?: string
  caption?: string
}

function MufflerMark({ title }: { title: string }): ReactNode {
  return (
    <svg
      viewBox="0 0 64 64"
      className={styles.mark}
      role="img"
      aria-label={title}
      focusable="false"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="lockup-mark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primitive-red)" />
          <stop offset="1" stopColor="var(--primitive-red-dark)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#lockup-mark)" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" strokeWidth="1.5" />
      <path
        d="M14 36 L24 24 L30 32 L38 22 L46 30 L52 24"
        fill="none"
        stroke="var(--primitive-text-on-accent)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="44" r="2.4" fill="var(--primitive-text-on-accent)" />
    </svg>
  )
}

export function LogoLockup({
  variant,
  wordmark = "Oak Flats Mufflermen",
  tagline = "Workshop · Exhaust · Tuning",
  caption,
}: LogoLockupProps) {
  const variantLabel = caption ?? VARIANT_LABEL[variant]

  return (
    <article className={[styles.card, styles[`variant-${variant}`]].join(" ")}>
      <span className={styles.kicker}>{variantLabel}</span>
      <div className={styles.lockup}>
        {variant !== "wordmark-only" ? <MufflerMark title={`${wordmark} mark`} /> : null}
        {variant !== "mark-only" ? (
          <div className={styles.wordstack}>
            <strong className={styles.wordmark}>{wordmark}</strong>
            <span className={styles.tagline}>{tagline}</span>
          </div>
        ) : null}
      </div>
      <dl className={styles.spec}>
        <div>
          <dt>Use</dt>
          <dd>{VARIANT_USE[variant]}</dd>
        </div>
        <div>
          <dt>Min size</dt>
          <dd>{VARIANT_MIN[variant]}</dd>
        </div>
      </dl>
    </article>
  )
}

const VARIANT_LABEL: Record<LogoLockupVariant, string> = {
  stacked: "Stacked",
  horizontal: "Horizontal",
  "mark-only": "Mark only",
  "wordmark-only": "Wordmark only",
}

const VARIANT_USE: Record<LogoLockupVariant, string> = {
  stacked: "Window decals · social",
  horizontal: "Letterhead · web nav",
  "mark-only": "Favicon · stencils",
  "wordmark-only": "Invoices · vehicle livery",
}

const VARIANT_MIN: Record<LogoLockupVariant, string> = {
  stacked: "120px wide",
  horizontal: "160px wide",
  "mark-only": "24px wide",
  "wordmark-only": "120px wide",
}
