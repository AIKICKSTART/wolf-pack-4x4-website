import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { StatusTone } from "../status-page/status-types"

import {
  SYNTHETIC_OUTCOME_LABEL,
  SYNTHETIC_OUTCOME_TONE,
  type SyntheticOutcome,
} from "./observability-types"
import styles from "./synthetic-test-row.module.css"

export interface SyntheticTestRowProps {
  /** Test name, e.g. "GET /api/quotes". */
  name: string
  /** Test type — Browser, API, ICMP, etc. */
  kind: string
  /** Region of the test runner. */
  region: string
  /** Most recent outcome. */
  lastOutcome: SyntheticOutcome
  /** Latency in ms of last run. */
  latencyMs: number
  /** Optional pre-formatted "last run" time, e.g. "2m ago". */
  lastRun?: string
  /** Optional uptime percentage, 0..100. */
  uptime?: number
  className?: string
}

const TONE_CHIP: Record<StatusTone, ChipTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
  violet: "teal",
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

function latencyTone(ms: number): StatusTone {
  if (ms >= 1500) return "red"
  if (ms >= 600) return "amber"
  if (ms >= 200) return "teal"
  return "green"
}

export function SyntheticTestRow({
  name,
  kind,
  region,
  lastOutcome,
  latencyMs,
  lastRun,
  uptime,
  className,
}: SyntheticTestRowProps) {
  const outcomeTone: StatusTone = SYNTHETIC_OUTCOME_TONE[lastOutcome]
  const latTone: StatusTone = latencyTone(latencyMs)
  const classes = [styles.row, TONE_CLASS[outcomeTone], className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Synthetic test ${name} in ${region}: ${SYNTHETIC_OUTCOME_LABEL[lastOutcome]}, ${latencyMs}ms`}
    >
      <div className={styles.identity}>
        <span className={styles.kind}>{kind}</span>
        <h3 className={styles.name}>{name}</h3>
      </div>
      <div className={styles.regionCell}>
        <span className={styles.regionLabel}>Region</span>
        <span className={styles.regionValue}>{region}</span>
      </div>
      <div className={styles.statusCell}>
        <Chip label={SYNTHETIC_OUTCOME_LABEL[lastOutcome]} tone={TONE_CHIP[outcomeTone]} selected />
        {lastRun ? <span className={styles.lastRun}>{lastRun}</span> : null}
      </div>
      <div className={styles.latCell}>
        <span className={[styles.latChip, TONE_CLASS[latTone]].join(" ")}>
          {latencyMs}
          <em className={styles.latUnit}>ms</em>
        </span>
        {uptime !== undefined ? (
          <span className={styles.uptime}>{uptime.toFixed(2)}% uptime</span>
        ) : null}
      </div>
    </article>
  )
}

export default SyntheticTestRow
