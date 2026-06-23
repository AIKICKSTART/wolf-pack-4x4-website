import styles from "./number-format-demo.module.css"

export interface NumberLocaleEntry {
  locale: string
  label: string
}

export interface NumberFormatDemoProps {
  /** Raw number to format — e.g. 1234567.89. */
  amount: number
  /** Distance value in kilometres to demo unit formatting. */
  distanceKm: number
  /** Weight value in kilograms. */
  weightKg: number
  /** Temperature in Celsius. */
  temperatureC: number
  locales: ReadonlyArray<NumberLocaleEntry>
}

function safeNumber(value: number, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value)
  } catch {
    return value.toString()
  }
}

function safeUnit(
  value: number,
  locale: string,
  unit: string,
  display: "short" | "long" = "short",
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "unit",
      unit,
      unitDisplay: display,
      maximumFractionDigits: 1,
    }).format(value)
  } catch {
    return `${value} ${unit}`
  }
}

export function NumberFormatDemo({
  amount,
  distanceKm,
  weightKg,
  temperatureC,
  locales,
}: NumberFormatDemoProps) {
  return (
    <section className={styles.root} aria-label="Number formatting demo">
      <header className={styles.head}>
        <span className={styles.kicker}>Intl.NumberFormat · units</span>
        <h3 className={styles.title}>Separators, units, locale rules</h3>
        <p className={styles.body}>
          One workshop quote rendered with each locale&rsquo;s grouping separator, decimal mark, and
          unit display.
        </p>
      </header>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Locale</th>
              <th scope="col" className={styles.num}>
                Amount
              </th>
              <th scope="col" className={styles.num}>
                Distance
              </th>
              <th scope="col" className={styles.num}>
                Weight
              </th>
              <th scope="col" className={styles.num}>
                Temp
              </th>
            </tr>
          </thead>
          <tbody>
            {locales.map((entry) => (
              <tr key={entry.locale}>
                <th scope="row">
                  <span className={styles.localeTag}>{entry.locale}</span>
                  <span className={styles.localeLabel}>{entry.label}</span>
                </th>
                <td className={styles.num}>{safeNumber(amount, entry.locale)}</td>
                <td className={styles.num}>{safeUnit(distanceKm, entry.locale, "kilometer")}</td>
                <td className={styles.num}>{safeUnit(weightKg, entry.locale, "kilogram")}</td>
                <td className={styles.num}>{safeUnit(temperatureC, entry.locale, "celsius")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default NumberFormatDemo
