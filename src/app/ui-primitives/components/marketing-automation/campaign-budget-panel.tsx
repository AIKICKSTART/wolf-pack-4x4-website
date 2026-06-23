import styles from "./campaign-budget-panel.module.css"
import {
  PACING_LABEL,
  PACING_TONE,
  type CampaignBudgetPacing,
} from "./marketing-automation-types"

interface CampaignBudgetPanelProps {
  /** Campaign name. */
  campaignName: string
  /** Daily budget AUD. */
  dailyBudget: number
  /** Spent today AUD. */
  spentToday: number
  /** Projected total spend AUD. */
  projectedSpend: number
  /** Pacing status. */
  pacing: CampaignBudgetPacing
  /** Cumulative actual-spend points (per hour). */
  actualPoints: ReadonlyArray<number>
  /** Cumulative ideal-spend points (per hour, same length). */
  idealPoints: ReadonlyArray<number>
  className?: string
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value)
}

function buildPath(points: ReadonlyArray<number>, w: number, h: number, max: number): string {
  if (points.length === 0) return ""
  const step = points.length > 1 ? w / (points.length - 1) : 0
  return points
    .map((value, idx) => {
      const x = idx * step
      const y = h - (value / max) * h
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}

export function CampaignBudgetPanel({
  campaignName,
  dailyBudget,
  spentToday,
  projectedSpend,
  pacing,
  actualPoints,
  idealPoints,
  className,
}: CampaignBudgetPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")
  const tone = PACING_TONE[pacing]

  const innerW = 640
  const innerH = 160
  const pad = { l: 36, t: 12, r: 12, b: 22 }
  const drawW = innerW - pad.l - pad.r
  const drawH = innerH - pad.t - pad.b
  const max = Math.max(dailyBudget, ...actualPoints, ...idealPoints) * 1.05
  const actualPath = buildPath(actualPoints, drawW, drawH, max || 1)
  const idealPath = buildPath(idealPoints, drawW, drawH, max || 1)
  const areaPath =
    actualPoints.length > 0
      ? `${actualPath} L ${(actualPoints.length - 1) * (drawW / Math.max(1, actualPoints.length - 1))} ${drawH} L 0 ${drawH} Z`
      : ""

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Budget panel · ${campaignName}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Budget · today</span>
          <h3 className={styles.title}>{campaignName}</h3>
        </div>
        <span className={styles.pacing} data-tone={tone}>
          {PACING_LABEL[pacing]}
        </span>
      </header>

      <div className={styles.totals}>
        <div className={styles.totalCell}>
          <span className={styles.totalLabel}>Daily budget</span>
          <span className={styles.totalValue}>{formatAud(dailyBudget)}</span>
          <span className={styles.totalDelta}>Reset 12:00 AEST</span>
        </div>
        <div className={styles.totalCell}>
          <span className={styles.totalLabel}>Spent today</span>
          <span className={styles.totalValue}>{formatAud(spentToday)}</span>
          <span className={styles.totalDelta}>
            {dailyBudget > 0
              ? `${((spentToday / dailyBudget) * 100).toFixed(0)}% of budget`
              : "—"}
          </span>
        </div>
        <div className={styles.totalCell}>
          <span className={styles.totalLabel}>Projected end-of-day</span>
          <span className={styles.totalValue}>{formatAud(projectedSpend)}</span>
          <span className={styles.totalDelta}>Based on current pace</span>
        </div>
      </div>

      <div className={styles.curve}>
        <span className={styles.curveLabel}>
          <span>Spend curve · cumulative</span>
          <span>Vs ideal pace</span>
        </span>
        <svg
          className={styles.curveCanvas}
          viewBox={`0 0 ${innerW} ${innerH}`}
          role="img"
          aria-label={`Cumulative spend curve, projecting ${formatAud(projectedSpend)} by end of day vs daily budget ${formatAud(dailyBudget)}.`}
          preserveAspectRatio="none"
        >
          <title>{`Spend curve for ${campaignName}`}</title>
          <g transform={`translate(${pad.l} ${pad.t})`}>
            <text x={-30} y={10} className={styles.axisLabel}>
              {formatAud(max)}
            </text>
            <text x={-30} y={drawH} className={styles.axisLabel}>
              $0
            </text>
            <text x={0} y={drawH + 16} className={styles.axisLabel}>
              00:00
            </text>
            <text x={drawW - 36} y={drawH + 16} className={styles.axisLabel}>
              23:59
            </text>
            <path d={areaPath} className={styles.actualArea} />
            <path d={idealPath} className={styles.idealLine} />
            <path d={actualPath} className={styles.actualLine} />
          </g>
        </svg>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={[styles.legendSwatch, styles.legendSwatchActual].join(" ")} />
            Actual spend
          </span>
          <span className={styles.legendItem}>
            <span className={[styles.legendSwatch, styles.legendSwatchIdeal].join(" ")} />
            Ideal pace
          </span>
        </div>
      </div>
    </section>
  )
}

export default CampaignBudgetPanel
