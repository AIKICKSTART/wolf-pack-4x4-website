import type { FunnelStage, FunnelStageDatum } from "./forms-platform-types"
import styles from "./analytics-funnel-tile.module.css"

interface AnalyticsFunnelTileProps {
  /** Tile title — e.g. "Quote intake funnel". */
  title: string
  /** Stage data ordered from started → submitted / abandoned. */
  stages: ReadonlyArray<FunnelStageDatum>
  /** Optional period caption surfaced at the bottom. */
  periodLabel?: string
  /** Conversion percent from started to submitted. */
  conversionPct?: number
  className?: string
}

const STAGE_BAR_CLASS: Record<FunnelStage, string> = {
  started: styles.stageBarStarted,
  halfway: styles.stageBarHalfway,
  submitted: styles.stageBarSubmitted,
  abandoned: styles.stageBarAbandoned,
}

const ROW_FORMATTER = new Intl.NumberFormat("en-AU")

export function AnalyticsFunnelTile({
  title,
  stages,
  periodLabel,
  conversionPct,
  className,
}: AnalyticsFunnelTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")
  const startedCount =
    stages.find((stage) => stage.stage === "started")?.count ?? 0

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Funnel</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.startedTotal}>
          <span className={styles.startedValue}>
            {ROW_FORMATTER.format(startedCount)}
          </span>
          <span className={styles.startedLabel}>Started</span>
        </div>
      </header>

      <ol className={styles.stages}>
        {stages.map((stage) => {
          const retention = Math.max(0, Math.min(100, stage.retentionPct))
          return (
            <li key={stage.stage} className={styles.stageRow}>
              <span className={styles.stageLabel}>{stage.label}</span>
              <span
                className={styles.stageBarWrap}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={retention}
                aria-label={`${stage.label} retention`}
              >
                <span
                  className={`${styles.stageBar} ${STAGE_BAR_CLASS[stage.stage]}`}
                  style={{ width: `${retention}%` }}
                />
              </span>
              <span className={styles.stageCount}>
                {ROW_FORMATTER.format(stage.count)}
              </span>
              <span className={styles.stagePct}>{retention}%</span>
            </li>
          )
        })}
      </ol>

      <footer className={styles.footer}>
        <span>{periodLabel ?? "Last 28 days"}</span>
        {conversionPct !== undefined ? (
          <span>
            Conversion{" "}
            <span className={styles.footerStrong}>{conversionPct}%</span>
          </span>
        ) : null}
      </footer>
    </section>
  )
}
