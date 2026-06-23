import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./pickwave-card.module.css"
import type { PickwaveStatus } from "./inventory-deep-types"

export interface PickwaveCardProps {
  /** Pickwave sequence number, e.g. 12. */
  sequence: number
  /** Pickwave label, e.g. "Wave 12 · Hilux N80". */
  label: string
  /** Picker assigned, e.g. "Brad". */
  picker: string
  /** Tote identifier, e.g. "TOTE-014". */
  tote: string
  /** Lines completed so far. */
  linesPicked: number
  /** Total lines in the wave. */
  totalLines: number
  /** Lifecycle status. */
  status: PickwaveStatus
  /** Optional zone constraint, e.g. "Aisle A1-A3". */
  zone?: string
  /** Optional release timestamp, e.g. "08:42". */
  releasedAt?: string
}

const STATUS_LABEL: Record<PickwaveStatus, string> = {
  released: "Released",
  "in-progress": "In progress",
  verifying: "Verifying",
  complete: "Complete",
}

const STATUS_TONE: Record<PickwaveStatus, "teal" | "amber" | "green" | "neutral"> = {
  released: "neutral",
  "in-progress": "amber",
  verifying: "teal",
  complete: "green",
}

export function PickwaveCard({
  sequence,
  label,
  picker,
  tote,
  linesPicked,
  totalLines,
  status,
  zone,
  releasedAt,
}: PickwaveCardProps) {
  const safeTotal = Math.max(totalLines, 1)
  const safePicked = Math.max(0, Math.min(linesPicked, safeTotal))
  const percent = Math.round((safePicked / safeTotal) * 100)
  const tone = STATUS_TONE[status]
  const progressTone =
    tone === "green" ? "green" : tone === "teal" ? "teal" : tone === "amber" ? "amber" : "teal"

  return (
    <article
      className={styles.wrap}
      aria-label={`Pickwave ${sequence} ${STATUS_LABEL[status]}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.sequence}>Wave #{sequence.toString().padStart(3, "0")}</span>
          <h3 className={styles.title}>{label}</h3>
          {zone ? <span className={styles.zone}>Zone · {zone}</span> : null}
        </div>
        <Chip label={STATUS_LABEL[status]} tone={tone} />
      </header>

      <ProgressLinear
        value={safePicked}
        max={safeTotal}
        tone={progressTone}
        variant="segmented"
        segments={Math.min(safeTotal, 16)}
        showLabel
        label={`${safePicked} of ${safeTotal} lines · ${percent}%`}
      />

      <dl className={styles.meta}>
        <div className={styles.metaCell}>
          <dt>Picker</dt>
          <dd>{picker}</dd>
        </div>
        <div className={styles.metaCell}>
          <dt>Tote</dt>
          <dd className={styles.tote}>{tote}</dd>
        </div>
        <div className={styles.metaCell}>
          <dt>Lines</dt>
          <dd>
            {safePicked}
            <span className={styles.total}>/{safeTotal}</span>
          </dd>
        </div>
        {releasedAt ? (
          <div className={styles.metaCell}>
            <dt>Released</dt>
            <dd className={styles.timeValue}>{releasedAt}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  )
}

export default PickwaveCard
