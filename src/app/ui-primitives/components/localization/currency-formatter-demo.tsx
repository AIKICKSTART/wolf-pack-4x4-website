import styles from "./currency-formatter-demo.module.css"

export interface CurrencyEntry {
  /** ISO 4217 code, e.g. "AUD". */
  code: string
  /** BCP-47 locale, e.g. "en-AU". */
  locale: string
  /** Human-readable display name, e.g. "Australian Dollar". */
  label: string
}

export interface CurrencyFormatterDemoProps {
  /** Amount to format, in the source currency unit (major). */
  amount: number
  /** Source amount currency code, e.g. "AUD". */
  sourceCurrency: string
  /** Target currencies to render — same number formatted across each. */
  currencies: ReadonlyArray<CurrencyEntry>
}

function format(amount: number, locale: string, currency: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
    }).format(amount)
  } catch {
    return amount.toFixed(2)
  }
}

export function CurrencyFormatterDemo({
  amount,
  sourceCurrency,
  currencies,
}: CurrencyFormatterDemoProps) {
  return (
    <section className={styles.root} aria-label="Currency formatting demo">
      <header className={styles.head}>
        <span className={styles.kicker}>Intl.NumberFormat · currency</span>
        <h3 className={styles.title}>Same amount across markets</h3>
        <p className={styles.body}>
          {amount.toLocaleString("en-AU", { maximumFractionDigits: 2 })} {sourceCurrency} formatted
          for the locales the workshop accepts.
        </p>
      </header>

      <ol className={styles.list}>
        {currencies.map((currency) => (
          <li key={currency.code} className={styles.row}>
            <span className={styles.code}>{currency.code}</span>
            <span className={styles.value}>{format(amount, currency.locale, currency.code)}</span>
            <span className={styles.locale}>
              {currency.label} · {currency.locale}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default CurrencyFormatterDemo
