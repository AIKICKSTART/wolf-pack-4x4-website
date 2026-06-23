import { Chip, type ChipTone } from "../primitives/chip"

import styles from "./points-earning-row.module.css"

export type PointsEarningKind = "earn" | "redeem" | "bonus" | "adjust"

interface PointsEarningRowProps {
  /** ISO timestamp for the activity. */
  timestamp: string
  /** Short headline e.g. "Job completed Bay 2". */
  action: string
  /** Optional supporting detail (job number, ticket id). */
  detail?: string
  /** Points delta — positive for earn/bonus, negative for redeem. */
  points: number
  /** Kind of activity. Drives tone. */
  kind?: PointsEarningKind
  className?: string
}

const KIND_TONE: Record<PointsEarningKind, ChipTone> = {
  earn: "green",
  bonus: "amber",
  redeem: "red",
  adjust: "neutral",
}

const KIND_PREFIX: Record<PointsEarningKind, string> = {
  earn: "+",
  bonus: "+",
  redeem: "−",
  adjust: "±",
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function PointsEarningRow({
  timestamp,
  action,
  detail,
  points,
  kind = "earn",
  className,
}: PointsEarningRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const amount = Math.abs(points).toLocaleString("en-AU")
  const chipLabel = `${KIND_PREFIX[kind]}${amount} pts`

  return (
    <li className={classes} data-kind={kind}>
      <span className={styles.dot} aria-hidden="true" />
      <div className={styles.body}>
        <time className={styles.time} dateTime={timestamp}>
          {formatTimestamp(timestamp)}
        </time>
        <p className={styles.action}>{action}</p>
        {detail ? <p className={styles.detail}>{detail}</p> : null}
      </div>
      <Chip label={chipLabel} tone={KIND_TONE[kind]} className={styles.chip} />
    </li>
  )
}

export default PointsEarningRow
