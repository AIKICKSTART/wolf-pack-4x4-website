import styles from "./locale-coverage-matrix.module.css"

export type CoverageState = "translated" | "partial" | "missing" | "na"

export interface FeatureRow {
  /** Unique feature identifier. */
  id: string
  /** Display label, e.g. "Checkout". */
  label: string
  /** Coverage state per locale tag. Locales not in the map render as "missing". */
  coverage: Readonly<Record<string, CoverageState>>
}

export interface LocaleCoverageMatrixProps {
  /** Locales rendered as columns, in order. */
  locales: ReadonlyArray<string>
  /** Feature rows. */
  features: ReadonlyArray<FeatureRow>
  /** Optional title. */
  title?: string
}

const STATE_LABEL: Record<CoverageState, string> = {
  translated: "Translated",
  partial: "Partial",
  missing: "Missing",
  na: "N/A",
}

const STATE_GLYPH: Record<CoverageState, string> = {
  translated: "●",
  partial: "◐",
  missing: "○",
  na: "—",
}

export function LocaleCoverageMatrix({
  locales,
  features,
  title = "Feature × locale coverage",
}: LocaleCoverageMatrixProps) {
  return (
    <section className={styles.root} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.kicker}>{title}</span>
        <ul className={styles.legend}>
          {(Object.keys(STATE_LABEL) as CoverageState[]).map((state) => (
            <li key={state} className={styles.legendItem}>
              <span className={styles.legendDot} data-state={state} aria-hidden="true">
                {STATE_GLYPH[state]}
              </span>
              <span>{STATE_LABEL[state]}</span>
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.featureCol}>
                Feature
              </th>
              {locales.map((locale) => (
                <th key={locale} scope="col">
                  {locale}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.id}>
                <th scope="row" className={styles.featureCell}>
                  {feature.label}
                </th>
                {locales.map((locale) => {
                  const state = feature.coverage[locale] ?? "missing"
                  return (
                    <td key={locale} data-state={state}>
                      <span
                        className={styles.cell}
                        data-state={state}
                        title={`${feature.label} · ${locale} · ${STATE_LABEL[state]}`}
                        aria-label={`${feature.label} ${locale} ${STATE_LABEL[state]}`}
                      >
                        {STATE_GLYPH[state]}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default LocaleCoverageMatrix
