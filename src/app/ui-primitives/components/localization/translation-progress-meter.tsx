import styles from "./translation-progress-meter.module.css"
import { isRtlTag } from "./localization-types"

export interface TranslationProgressEntry {
  locale: string
  label: string
  /** Translated count for the locale. */
  translated: number
  /** Total keys for the project. */
  total: number
}

export interface TranslationProgressMeterProps {
  entries: ReadonlyArray<TranslationProgressEntry>
  /** Optional eyebrow title. */
  title?: string
}

type Tone = "red" | "amber" | "green"

function toneFor(percent: number): Tone {
  if (percent < 50) return "red"
  if (percent < 90) return "amber"
  return "green"
}

function clampPct(translated: number, total: number): number {
  if (total <= 0) return 0
  const pct = Math.round((translated / total) * 100)
  if (pct < 0) return 0
  if (pct > 100) return 100
  return pct
}

export function TranslationProgressMeter({
  entries,
  title = "Translation coverage",
}: TranslationProgressMeterProps) {
  return (
    <section className={styles.root} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.kicker}>{title}</span>
        <span className={styles.helper}>{entries.length} locales tracked</span>
      </header>

      <ol className={styles.list} role="status" aria-live="polite">
        {entries.map((entry) => {
          const pct = clampPct(entry.translated, entry.total)
          const tone = toneFor(pct)
          const rtl = isRtlTag(entry.locale)
          return (
            <li key={entry.locale} className={styles.row}>
              <div className={styles.meta}>
                <span className={styles.localeTag}>{entry.locale}</span>
                <span className={styles.localeLabel} dir={rtl ? "rtl" : "ltr"}>
                  {entry.label}
                </span>
                <span className={styles.pct} data-tone={tone}>
                  {pct}%
                </span>
                <span className={styles.count}>
                  {entry.translated.toLocaleString("en-AU")} / {entry.total.toLocaleString("en-AU")}
                </span>
              </div>
              <div
                className={styles.track}
                role="meter"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${entry.label} coverage`}
                data-tone={tone}
              >
                <span className={styles.fill} style={{ width: `${pct}%` }} />
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default TranslationProgressMeter
