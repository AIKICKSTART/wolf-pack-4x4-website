import type { ReactNode } from "react"

import styles from "./brand-do-dont-card.module.css"

export interface BrandDoDontCardProps {
  rule: string
  doLabel: string
  doDetail: string
  doVisual?: ReactNode
  dontLabel: string
  dontDetail: string
  dontVisual?: ReactNode
}

function TickIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M7.5 12.5 L10.5 15.5 L16.5 9"
        stroke="color-mix(in oklab, var(--primitive-green) 22%, var(--primitive-canvas))"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M8 8 L16 16 M16 8 L8 16"
        stroke="var(--primitive-text-on-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BrandDoDontCard({
  rule,
  doLabel,
  doDetail,
  doVisual,
  dontLabel,
  dontDetail,
  dontVisual,
}: BrandDoDontCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <span className={styles.kicker}>Brand rule</span>
        <p className={styles.rule}>{rule}</p>
      </header>
      <div className={styles.grid}>
        <div className={`${styles.col} ${styles.colDo}`}>
          <div className={`${styles.glyph} ${styles.glyphDo}`} aria-hidden="true">
            <TickIcon />
            <span>Do</span>
          </div>
          <div className={styles.visual} aria-hidden="true">
            {doVisual}
          </div>
          <strong className={styles.exampleTitle}>{doLabel}</strong>
          <p className={styles.exampleNote}>{doDetail}</p>
        </div>
        <div className={`${styles.col} ${styles.colDont}`}>
          <div className={`${styles.glyph} ${styles.glyphDont}`} aria-hidden="true">
            <CrossIcon />
            <span>Don&apos;t</span>
          </div>
          <div className={styles.visual} aria-hidden="true">
            {dontVisual}
          </div>
          <strong className={styles.exampleTitle}>{dontLabel}</strong>
          <p className={styles.exampleNote}>{dontDetail}</p>
        </div>
      </div>
    </article>
  )
}
