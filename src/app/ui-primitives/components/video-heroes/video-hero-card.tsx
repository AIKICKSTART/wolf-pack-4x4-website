import type { ReactNode } from "react"

import styles from "./video-hero-card.module.css"

export type VideoHeroCardTone = "ember" | "abyss" | "iron" | "amber" | "green"

export interface VideoHeroCardProps {
  variantName: string
  toneLabel: string
  tone?: VideoHeroCardTone
  notes?: string
  children: ReactNode
}

const TONE_CLASS: Record<VideoHeroCardTone, string> = {
  ember: styles.toneEmber,
  abyss: styles.toneAbyss,
  iron: styles.toneIron,
  amber: styles.toneAmber,
  green: styles.toneGreen,
}

export function VideoHeroCard({
  variantName,
  toneLabel,
  tone = "iron",
  notes,
  children,
}: VideoHeroCardProps) {
  return (
    <article className={[styles.card, TONE_CLASS[tone]].join(" ")}>
      <header className={styles.head}>
        <span className={styles.toneChip} aria-label={`${toneLabel} tone`}>
          <i aria-hidden="true" />
          {toneLabel}
        </span>
        <h3 className={styles.title}>{variantName}</h3>
        <button
          type="button"
          className={styles.expand}
          aria-label="Open in fullscreen preview"
          tabIndex={-1}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M1 6V1h5M15 6V1h-5M1 10v5h5M15 10v5h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </header>

      <div className={styles.frame}>
        <div className={styles.frameInner}>{children}</div>
      </div>

      {notes ? <footer className={styles.notes}>{notes}</footer> : null}
    </article>
  )
}
