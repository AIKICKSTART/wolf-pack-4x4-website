import type { ReactNode } from "react"

import { CountUpWatcher } from "../motion/count-up-watcher"

import styles from "./stat-counter-row.module.css"

export type StatTone = "red" | "amber" | "teal" | "green"

export interface StatCounterEntry {
  id: string
  /** Display label below the count. */
  label: string
  /** Final value to count to. */
  value: number
  /** Decimal places. */
  decimals?: number
  /** Prefix string (e.g. `$`). */
  prefix?: string
  /** Suffix string (e.g. `km`, `%`). */
  suffix?: string
  /** Supporting body copy below the label. */
  body?: ReactNode
  /** Accent tone. */
  tone?: StatTone
}

export interface StatCounterRowProps {
  kicker?: string
  heading?: string
  body?: string
  entries: ReadonlyArray<StatCounterEntry>
  className?: string
}

const TONE_CLASS: Record<StatTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

export function StatCounterRow({
  kicker,
  heading,
  body,
  entries,
  className,
}: StatCounterRowProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading ?? "Workshop stats"}>
      {(kicker || heading || body) && (
        <header className={styles.header}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>
      )}

      <ul className={styles.row}>
        {entries.map((entry) => {
          const tone = entry.tone ?? "amber"
          return (
            <li key={entry.id} className={`${styles.cell} ${TONE_CLASS[tone]}`}>
              <div className={styles.value} role="status" aria-live="polite">
                <CountUpWatcher
                  to={entry.value}
                  decimals={entry.decimals}
                  prefix={entry.prefix}
                  suffix={entry.suffix}
                  duration={1600}
                />
              </div>
              <span className={styles.label}>{entry.label}</span>
              {entry.body ? <p className={styles.body}>{entry.body}</p> : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default StatCounterRow
