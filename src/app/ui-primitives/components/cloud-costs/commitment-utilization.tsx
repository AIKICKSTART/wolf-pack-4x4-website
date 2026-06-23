import { Chip } from "../primitives/chip"
import { RadialMeter, type RadialTone } from "../charts/radial-meter"

import {
  formatAud,
  formatAudCompact,
  formatDateAu,
  formatPctSigned,
  regionLabel,
  type AwsRegion,
  type CommitmentType,
} from "./cloud-costs-types"
import styles from "./commitment-utilization.module.css"

export interface CommitmentUtilizationProps {
  /** Identifier (for telemetry). */
  id: string
  /** Type of commitment. */
  commitmentType: CommitmentType
  /** Commitment label e.g. "1y All Upfront — m5.xlarge". */
  label: string
  /** Region the commitment applies to. */
  region: AwsRegion
  /** Term start ISO. */
  termStartISO: string
  /** Term end ISO. */
  termEndISO: string
  /** Total committed hours / dollars in AUD. */
  committedAud: number
  /** Actual covered AUD this period. */
  utilizedAud: number
  /** Previous-period coverage % for delta indicator. */
  previousUtilizationPct: number
  /** Savings vs on-demand in AUD for the period. */
  savingsAud: number
  className?: string
}

function commitmentTypeLabel(type: CommitmentType): string {
  switch (type) {
    case "reserved_instance":
      return "Reserved instance"
    case "savings_plan":
      return "Savings plan"
    case "spot_blocks":
      return "Spot blocks"
  }
}

function utilizationTone(pct: number): RadialTone {
  if (pct >= 90) {
    return "green"
  }
  if (pct >= 70) {
    return "teal"
  }
  if (pct >= 50) {
    return "amber"
  }
  return "red"
}

export function CommitmentUtilization({
  id,
  commitmentType,
  label,
  region,
  termStartISO,
  termEndISO,
  committedAud,
  utilizedAud,
  previousUtilizationPct,
  savingsAud,
  className,
}: CommitmentUtilizationProps) {
  const utilizationPct =
    committedAud > 0 ? Math.round((utilizedAud / committedAud) * 100) : 0
  const deltaPct = utilizationPct - previousUtilizationPct
  const tone = utilizationTone(utilizationPct)
  const wastedAud = Math.max(0, committedAud - utilizedAud)

  return (
    <article
      className={[styles.card, styles[`tone-${tone}`], className].filter(Boolean).join(" ")}
      role="region"
      aria-labelledby={`commit-${id}-title`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>{commitmentTypeLabel(commitmentType)}</span>
          <h3 id={`commit-${id}-title`} className={styles.title}>
            {label}
          </h3>
          <span className={styles.meta}>
            {regionLabel(region)} · {formatDateAu(termStartISO)} → {formatDateAu(termEndISO)}
          </span>
        </div>
        <Chip
          label={`${formatPctSigned(deltaPct)} vs prior`}
          tone={deltaPct >= 0 ? "green" : "amber"}
        />
      </header>

      <div className={styles.body}>
        <div className={styles.meterWrap}>
          <RadialMeter
            value={utilizationPct}
            max={100}
            tone={tone}
            label="Utilisation"
            caption={`${utilizationPct}% of cap`}
            ariaLabel={`Commitment utilization at ${utilizationPct} percent`}
            size={156}
          />
        </div>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Committed</dt>
            <dd>{formatAud(committedAud)}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Utilised</dt>
            <dd>{formatAud(utilizedAud)}</dd>
          </div>
          <div className={`${styles.stat} ${wastedAud > 0 ? styles.statWarn : ""}`}>
            <dt>Unused</dt>
            <dd>{formatAud(wastedAud)}</dd>
          </div>
          <div className={`${styles.stat} ${styles.statHero}`}>
            <dt>Savings vs on-demand</dt>
            <dd>{formatAudCompact(savingsAud)}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default CommitmentUtilization
