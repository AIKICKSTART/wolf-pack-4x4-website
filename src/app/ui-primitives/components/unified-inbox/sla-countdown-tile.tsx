import {
  bucketForRemainingMinutes,
  SLA_BUCKET_LABEL,
  SLA_BUCKET_TONE,
  type SlaBucket,
  type SupportTone,
} from "../support/support-types"

import {
  formatSlaRemaining,
} from "./unified-inbox-types"
import styles from "./sla-countdown-tile.module.css"

type SlaScope = "first-response" | "resolution" | "next-update"

interface SlaCountdownTileProps {
  /** Remaining minutes until breach. Negative numbers indicate a breach. */
  remainingMinutes: number
  /** Target SLA in minutes, used to compute the progress arc. */
  targetMinutes: number
  /** SLA scope, drives the title label. */
  scope?: SlaScope
  /** Override the auto-derived bucket. */
  bucket?: SlaBucket
  /** Optional context, e.g. "Hot lead · Karen W". */
  context?: string
  /** Hide the breach alert badge even when breached. */
  hideAlert?: boolean
  className?: string
}

const SCOPE_LABEL: Record<SlaScope, string> = {
  "first-response": "First response",
  resolution: "Resolution",
  "next-update": "Next update",
}

const TONE_CLASS: Record<SupportTone, string> = {
  red: "tone_red",
  amber: "tone_amber",
  teal: "tone_teal",
  green: "tone_green",
  neutral: "tone_neutral",
  violet: "tone_violet",
}

export function SlaCountdownTile({
  remainingMinutes,
  targetMinutes,
  scope = "first-response",
  bucket,
  context,
  hideAlert = false,
  className,
}: SlaCountdownTileProps) {
  const resolvedBucket = bucket ?? bucketForRemainingMinutes(remainingMinutes)
  const tone = SLA_BUCKET_TONE[resolvedBucket]
  const safeTarget = Math.max(1, targetMinutes)
  const ratioUsed =
    remainingMinutes <= 0
      ? 1
      : Math.min(1, Math.max(0, 1 - remainingMinutes / safeTarget))
  const percentRemaining = Math.round((1 - ratioUsed) * 100)
  const remainingText = formatSlaRemaining(remainingMinutes)
  const isBreached = resolvedBucket === "breached"
  const announcement = `${SCOPE_LABEL[scope]} SLA ${SLA_BUCKET_LABEL[resolvedBucket]}, ${remainingText}.`
  const toneClass = styles[TONE_CLASS[tone]] ?? ""

  const classes = [styles.tile, toneClass, className]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={announcement}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{SCOPE_LABEL[scope]} SLA</span>
        {context ? <span className={styles.context}>{context}</span> : null}
      </header>

      <div className={styles.body}>
        <div className={styles.timer}>
          <span className={styles.timerValue}>{remainingText}</span>
          <span className={styles.timerTarget}>
            target {formatSlaRemaining(targetMinutes)}
          </span>
        </div>
        <div
          className={styles.bar}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.max(0, Math.min(100, percentRemaining))}
        >
          <span
            className={styles.barFill}
            style={{ width: `${Math.max(2, Math.min(100, percentRemaining))}%` }}
          />
        </div>
      </div>

      {isBreached && !hideAlert ? (
        <div className={styles.alert} role="alert">
          <span className={styles.alertGlyph} aria-hidden="true">
            !
          </span>
          <span>Breach alert — escalate to the next operator.</span>
        </div>
      ) : null}
    </section>
  )
}

export default SlaCountdownTile
