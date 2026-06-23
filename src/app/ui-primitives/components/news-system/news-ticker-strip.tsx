import { Megaphone } from "lucide-react"

import type { NewsTickerEntry, NewsTone } from "./news-types"

import styles from "./news-ticker-strip.module.css"

export interface NewsTickerStripProps {
  entries: ReadonlyArray<NewsTickerEntry>
  /** Heading shown in the fixed left cap. */
  title?: string
  className?: string
}

const TONE_CLASS: Record<NewsTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

export function NewsTickerStrip({ entries, title = "Newswire", className }: NewsTickerStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  function renderRun(keyPrefix: string) {
    return entries.map((entry) => (
      <span key={`${keyPrefix}-${entry.id}`} className={styles.item}>
        <span className={[styles.tag, TONE_CLASS[entry.tone]].join(" ")}>{entry.label}</span>
        <span className={styles.headline}>{entry.headline}</span>
        <span className={styles.sep} aria-hidden="true">
          {"//"}
        </span>
      </span>
    ))
  }

  return (
    <section className={classes} aria-label={title}>
      <span className={styles.cap}>
        <Megaphone size={14} strokeWidth={2.2} aria-hidden="true" />
        {title}
      </span>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {renderRun("a")}
          <span aria-hidden="true" className={styles.duplicate}>
            {renderRun("b")}
          </span>
        </div>
      </div>
    </section>
  )
}

export default NewsTickerStrip
