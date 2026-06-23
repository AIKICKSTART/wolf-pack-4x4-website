import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import {
  RENEWAL_STAGE_LABEL,
  RENEWAL_STAGE_TONE,
  formatAud,
  type CsTone,
  type RenewalStageKey,
} from "./cs-types"
import styles from "./renewal-pipeline-stage.module.css"

interface RenewalPipelineStageProps {
  customerName: string
  stage: RenewalStageKey
  /** Expected close date as ISO. */
  expectedCloseIso: string
  /** Annual contract value AUD. */
  acvAud: number
  /** Likelihood percentage 0..100. */
  likelihood: number
  /** Optional next step description. */
  nextStep?: string
  className?: string
}

const TONE_PROGRESS: Record<CsTone, "red" | "amber" | "teal" | "green"> = {
  neutral: "teal",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

const TONE_CHIP: Record<CsTone, "neutral" | "red" | "amber" | "teal" | "green"> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

function formatDate(iso: string): string {
  try {
    const date = new Date(iso)
    return new Intl.DateTimeFormat("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  } catch {
    return iso
  }
}

export function RenewalPipelineStage({
  customerName,
  stage,
  expectedCloseIso,
  acvAud,
  likelihood,
  nextStep,
  className,
}: RenewalPipelineStageProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const safeLikelihood = Math.max(0, Math.min(100, Math.round(likelihood)))
  const tone = RENEWAL_STAGE_TONE[stage]
  const expectedClose = formatDate(expectedCloseIso)
  const weightedValue = Math.round(acvAud * (safeLikelihood / 100))

  return (
    <section
      className={classes}
      aria-label={`Renewal pipeline for ${customerName} — stage ${RENEWAL_STAGE_LABEL[stage]}, ACV ${formatAud(acvAud)}, ${safeLikelihood}% likelihood, expected close ${expectedClose}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Renewal · {customerName}</span>
          <Chip label={RENEWAL_STAGE_LABEL[stage]} tone={TONE_CHIP[tone]} />
        </div>
        <span className={styles.close}>
          Close target<br />
          <strong>{expectedClose}</strong>
        </span>
      </header>

      <div className={styles.grid}>
        <div className={styles.tile}>
          <span className={styles.tileLabel}>ACV</span>
          <span className={styles.tileValue}>{formatAud(acvAud)}</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.tileLabel}>Weighted</span>
          <span className={styles.tileValue}>{formatAud(weightedValue)}</span>
        </div>
        <div className={styles.tile}>
          <span className={styles.tileLabel}>Likelihood</span>
          <span className={styles.tileValue}>{safeLikelihood}%</span>
        </div>
      </div>

      <ProgressLinear
        value={safeLikelihood}
        max={100}
        tone={TONE_PROGRESS[tone]}
        label="Probability"
        showLabel
      />

      {nextStep ? (
        <div className={styles.next}>
          <span className={styles.nextLabel}>Next step</span>
          <p className={styles.nextBody}>{nextStep}</p>
        </div>
      ) : null}
    </section>
  )
}

export default RenewalPipelineStage
