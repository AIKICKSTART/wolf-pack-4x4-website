import type { FunnelStage } from "./reports-deep-types"
import styles from "./funnel-comparison-card.module.css"

interface FunnelComparisonCardProps {
  readonly title: string
  readonly currentLabel: string
  readonly priorLabel: string
  readonly stages: ReadonlyArray<FunnelStage>
  readonly className?: string
}

function safeRatio(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0
  return Math.max(0, Math.min(1, numerator / denominator))
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(value)
}

function formatPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

function deltaTone(current: number, prior: number): "positive" | "negative" | "neutral" {
  if (current === prior) return "neutral"
  return current > prior ? "positive" : "negative"
}

function deltaLabel(current: number, prior: number): string {
  if (prior === 0) {
    return current === 0 ? "—" : "+∞"
  }
  const pct = ((current - prior) / prior) * 100
  const sign = pct > 0 ? "+" : ""
  return `${sign}${pct.toFixed(1)}%`
}

const TONE_CLASS: Record<"positive" | "negative" | "neutral", string> = {
  positive: styles.tonePositive,
  negative: styles.toneNegative,
  neutral: styles.toneNeutral,
}

export function FunnelComparisonCard({
  title,
  currentLabel,
  priorLabel,
  stages,
  className,
}: FunnelComparisonCardProps) {
  const topCurrent = stages[0]?.current ?? 0
  const topPrior = stages[0]?.prior ?? 0
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Funnel comparison: ${title}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Funnel · period over period</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.legend}>
          <span className={styles.legendCurrent}>{currentLabel}</span>
          <span className={styles.legendPrior}>{priorLabel}</span>
        </div>
      </header>

      <ol className={styles.stageList} aria-label="Funnel stages">
        {stages.map((stage, index) => {
          const ratioCurrent = safeRatio(stage.current, topCurrent)
          const ratioPrior = safeRatio(stage.prior, topPrior)
          const tone = deltaTone(stage.current, stage.prior)
          return (
            <li key={stage.id} className={styles.stage}>
              <div className={styles.stageHead}>
                <span className={styles.stageIndex}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.stageLabel}>{stage.label}</span>
                <span className={`${styles.stageDelta} ${TONE_CLASS[tone]}`}>
                  {deltaLabel(stage.current, stage.prior)}
                </span>
              </div>

              <div className={styles.barRow}>
                <span className={styles.barLabel}>{currentLabel}</span>
                <div className={styles.barTrack} aria-hidden="true">
                  <span
                    className={`${styles.barFill} ${styles.barCurrent}`}
                    style={{ width: `${(ratioCurrent * 100).toFixed(1)}%` }}
                  />
                </div>
                <span className={styles.barValue}>{formatCount(stage.current)}</span>
              </div>

              <div className={styles.barRow}>
                <span className={styles.barLabel}>{priorLabel}</span>
                <div className={styles.barTrack} aria-hidden="true">
                  <span
                    className={`${styles.barFill} ${styles.barPrior}`}
                    style={{ width: `${(ratioPrior * 100).toFixed(1)}%` }}
                  />
                </div>
                <span className={styles.barValue}>{formatCount(stage.prior)}</span>
              </div>

              <div className={styles.stageFoot}>
                <span>Conversion · current {formatPct(ratioCurrent)}</span>
                <span>Conversion · prior {formatPct(ratioPrior)}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export default FunnelComparisonCard
