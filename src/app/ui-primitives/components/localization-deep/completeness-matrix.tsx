import styles from "./completeness-matrix.module.css"

export interface CompletenessCell {
  /** Locale tag for this column, e.g. "zh-CN". */
  locale: string
  /** Completion ratio 0–1 for this namespace × locale. */
  ratio: number
  /** Number of translated keys (display only). */
  translated: number
  /** Total key count in the namespace. */
  total: number
}

export interface CompletenessNamespace {
  /** Namespace key, e.g. "checkout". */
  namespace: string
  /** Optional friendly label for the namespace. */
  label?: string
  /** One cell per locale column. */
  cells: ReadonlyArray<CompletenessCell>
}

export interface CompletenessMatrixProps {
  /** Locale column headers in display order. */
  locales: ReadonlyArray<string>
  /** Namespace rows. Cells must align with locales by index. */
  namespaces: ReadonlyArray<CompletenessNamespace>
}

function toneFor(ratio: number): "red" | "amber" | "teal" | "green" {
  if (ratio >= 0.95) return "green"
  if (ratio >= 0.75) return "teal"
  if (ratio >= 0.4) return "amber"
  return "red"
}

function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`
}

export function CompletenessMatrix({
  locales,
  namespaces,
}: CompletenessMatrixProps) {
  return (
    <figure className={styles.wrap} aria-label="Translation completeness heat grid">
      <figcaption className={styles.caption}>
        <span className={styles.kicker}>Completeness</span>
        <span className={styles.subtitle}>
          {namespaces.length} namespaces × {locales.length} locales
        </span>
      </figcaption>

      <div className={styles.scroller}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.corner}>
                <span className={styles.cornerKicker}>Namespace</span>
              </th>
              {locales.map((locale) => (
                <th key={locale} scope="col" className={styles.localeCell}>
                  {locale}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {namespaces.map((row) => (
              <tr key={row.namespace}>
                <th scope="row" className={styles.nsCell}>
                  <span className={styles.nsName}>{row.namespace}</span>
                  {row.label ? (
                    <span className={styles.nsLabel}>{row.label}</span>
                  ) : null}
                </th>
                {locales.map((locale, index) => {
                  const cell = row.cells[index]
                  if (!cell) {
                    return (
                      <td key={locale} className={styles.dataCell}>
                        <span className={styles.empty}>—</span>
                      </td>
                    )
                  }
                  const tone = toneFor(cell.ratio)
                  return (
                    <td
                      key={cell.locale}
                      className={styles.dataCell}
                      data-tone={tone}
                      title={`${cell.translated}/${cell.total} keys (${formatPercent(cell.ratio)})`}
                    >
                      <span
                        className={styles.fill}
                        style={{ "--fill": `${Math.round(cell.ratio * 100)}%` } as React.CSSProperties}
                        aria-hidden="true"
                      />
                      <span className={styles.value}>{formatPercent(cell.ratio)}</span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className={styles.legend} aria-label="Heat grid legend">
        <li className={styles.legendItem} data-tone="red">
          <span className={styles.legendSwatch} aria-hidden="true" /> &lt; 40%
        </li>
        <li className={styles.legendItem} data-tone="amber">
          <span className={styles.legendSwatch} aria-hidden="true" /> 40–74%
        </li>
        <li className={styles.legendItem} data-tone="teal">
          <span className={styles.legendSwatch} aria-hidden="true" /> 75–94%
        </li>
        <li className={styles.legendItem} data-tone="green">
          <span className={styles.legendSwatch} aria-hidden="true" /> 95%+
        </li>
      </ul>
    </figure>
  )
}

export default CompletenessMatrix
