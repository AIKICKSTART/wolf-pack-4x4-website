import { STAGE_LABEL, STAGE_PROBABILITY, type DealStage } from "./crm-types"
import styles from "./stage-probability-bar.module.css"

interface StageProbabilityBarProps {
  value: number
  currentStage?: DealStage
  showTicks?: boolean
  className?: string
}

const STAGE_ORDER: ReadonlyArray<DealStage> = [
  "new",
  "qualified",
  "quoted",
  "verbal",
  "won",
]

export function StageProbabilityBar({
  value,
  currentStage,
  showTicks = true,
  className,
}: StageProbabilityBarProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const safeValue = Math.max(0, Math.min(100, Math.round(value)))

  return (
    <div
      className={classes}
      role="meter"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={
        currentStage
          ? `${STAGE_LABEL[currentStage]} stage probability: ${safeValue}%`
          : `Probability: ${safeValue}%`
      }
    >
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${safeValue}%` }}
          aria-hidden="true"
        />
        {showTicks
          ? STAGE_ORDER.map((stage) => {
              const tickProb = STAGE_PROBABILITY[stage]
              const isCurrent = currentStage === stage
              return (
                <span
                  key={stage}
                  className={styles.tick}
                  data-stage={stage}
                  data-current={isCurrent ? "true" : "false"}
                  style={{ left: `${tickProb}%` }}
                  aria-hidden="true"
                />
              )
            })
          : null}
      </div>

      {showTicks ? (
        <ol className={styles.legend}>
          {STAGE_ORDER.map((stage) => {
            const isCurrent = currentStage === stage
            return (
              <li
                key={stage}
                className={styles.legendItem}
                data-current={isCurrent ? "true" : "false"}
                style={{ left: `${STAGE_PROBABILITY[stage]}%` }}
              >
                <span className={styles.legendStage}>{STAGE_LABEL[stage]}</span>
                <span className={styles.legendValue}>{STAGE_PROBABILITY[stage]}%</span>
              </li>
            )
          })}
        </ol>
      ) : null}
    </div>
  )
}

export default StageProbabilityBar
