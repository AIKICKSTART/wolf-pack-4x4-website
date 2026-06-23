import styles from "./date-format-demo.module.css"
import { isRtlTag } from "./localization-types"

export interface DateLocaleEntry {
  /** BCP-47 locale, e.g. "en-AU". */
  locale: string
  /** Human-readable display name. */
  label: string
}

export interface DateFormatDemoProps {
  /** ISO 8601 timestamp used as the canonical reference. */
  isoDate: string
  /** Locales to render. */
  locales: ReadonlyArray<DateLocaleEntry>
}

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  hour12: undefined,
}

function safeFormat(date: Date, locale: string, options: Intl.DateTimeFormatOptions): string {
  try {
    return new Intl.DateTimeFormat(locale, options).format(date)
  } catch {
    return date.toISOString()
  }
}

export function DateFormatDemo({ isoDate, locales }: DateFormatDemoProps) {
  const date = new Date(isoDate)
  const valid = !Number.isNaN(date.getTime())

  return (
    <section className={styles.root} aria-label="Date formatting demo">
      <header className={styles.head}>
        <span className={styles.kicker}>Intl.DateTimeFormat</span>
        <h3 className={styles.title}>Same instant across locales</h3>
        <p className={styles.body}>
          Reference instant: <code className={styles.code}>{isoDate}</code>
        </p>
      </header>

      <ol className={styles.list}>
        {locales.map((entry) => {
          const rtl = isRtlTag(entry.locale)
          return (
            <li key={entry.locale} className={styles.row} dir={rtl ? "rtl" : "ltr"}>
              <span className={styles.localeTag}>{entry.locale}</span>
              <span className={styles.localeLabel}>{entry.label}</span>
              <span className={styles.dateValue}>
                {valid ? safeFormat(date, entry.locale, DATE_OPTIONS) : "Invalid date"}
              </span>
              <span className={styles.timeValue}>
                {valid ? safeFormat(date, entry.locale, TIME_OPTIONS) : ""}
              </span>
              {rtl ? <span className={styles.rtlTag}>RTL</span> : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default DateFormatDemo
