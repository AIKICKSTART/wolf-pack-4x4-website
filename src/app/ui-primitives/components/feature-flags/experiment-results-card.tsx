import styles from "./experiment-results-card.module.css"

export interface ExperimentVariantResult {
  id: string
  name: string
  conversionRate: number
  uplift: number
  pValue: number
  isControl?: boolean
  isWinner?: boolean
}

export interface ExperimentResultsCardProps {
  name: string
  description?: string
  sampleSize: number
  variants: ReadonlyArray<ExperimentVariantResult>
  /** P-value threshold below which a result is considered significant. */
  significanceThreshold?: number
  className?: string
}

function formatPercent(value: number, fractionDigits = 2): string {
  return `${value.toFixed(fractionDigits)}%`
}

function formatSigned(value: number): string {
  if (value > 0) return `+${value.toFixed(1)}%`
  if (value < 0) return `${value.toFixed(1)}%`
  return "0%"
}

function formatPValue(p: number): string {
  if (p < 0.001) return "<0.001"
  return p.toFixed(3)
}

function formatSampleSize(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`
  return count.toString()
}

export function ExperimentResultsCard({
  name,
  description,
  sampleSize,
  variants,
  significanceThreshold = 0.05,
  className,
}: ExperimentResultsCardProps) {
  const maxConversion = Math.max(...variants.map((v) => v.conversionRate), 0.0001)

  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label={`Experiment results for ${name}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Experiment</span>
          <h3 className={styles.name}>{name}</h3>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
        <div className={styles.sample}>
          <span className={styles.sampleLabel}>Sample</span>
          <span className={styles.sampleValue}>{formatSampleSize(sampleSize)}</span>
        </div>
      </header>

      <ul className={styles.variantList}>
        {variants.map((variant) => {
          const isSignificant = variant.pValue < significanceThreshold
          const fillPercent = (variant.conversionRate / maxConversion) * 100
          return (
            <li
              key={variant.id}
              className={[
                styles.variant,
                variant.isControl ? styles.control : "",
                variant.isWinner ? styles.winner : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.variantHeader}>
                <div className={styles.variantIdentity}>
                  <span className={styles.variantName}>{variant.name}</span>
                  {variant.isControl ? (
                    <span className={styles.controlChip}>Control</span>
                  ) : null}
                  {variant.isWinner ? (
                    <span className={styles.winnerBadge}>Winner</span>
                  ) : null}
                </div>
                <div className={styles.variantStats}>
                  <span className={styles.conversion}>
                    {formatPercent(variant.conversionRate)}
                  </span>
                  <span
                    className={[
                      styles.uplift,
                      variant.uplift > 0 ? styles.upliftUp : "",
                      variant.uplift < 0 ? styles.upliftDown : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {formatSigned(variant.uplift)}
                  </span>
                </div>
              </div>

              <div className={styles.significanceRow}>
                <div
                  className={styles.bar}
                  role="meter"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(fillPercent)}
                  aria-label={`${variant.name} conversion bar`}
                >
                  <span
                    className={styles.barFill}
                    style={{ width: `${fillPercent}%` }}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className={[
                    styles.pValueChip,
                    isSignificant ? styles.pValueOk : styles.pValueNo,
                  ].join(" ")}
                  aria-label={`p value ${formatPValue(variant.pValue)}`}
                >
                  p = {formatPValue(variant.pValue)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default ExperimentResultsCard
