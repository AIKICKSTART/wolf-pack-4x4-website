import type { CSSProperties } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import { BAY_LABEL } from "../roster/roster-types"
import {
  BAY_LIVE_STATE_LABEL,
  BAY_LIVE_STATE_TONE,
  formatElapsed,
  type BayId,
  type BayLiveState,
} from "./workshop-floor-types"
import styles from "./bay-live-status-card.module.css"

export interface BayLiveStatusCardProps {
  bay: BayId
  state: BayLiveState
  /** Vehicle currently in the bay (year/make/model + rego). */
  vehicle?: string
  /** Customer surname, used in the header strap. */
  customer?: string
  /** Technician identity assigned to this bay. */
  technician: {
    name: string
    role: string
    avatarSrc?: string
  }
  /** Job ticket id like "WS-2604-12". */
  jobNumber?: string
  /** Elapsed minutes since job started in this bay. */
  elapsedMinutes: number
  /** ETA to handover, formatted like "12:40 pm". */
  etaHandover?: string
  /** Progress percentage 0–100. */
  progressPercent: number
  className?: string
}

export function BayLiveStatusCard({
  bay,
  state,
  vehicle,
  customer,
  technician,
  jobNumber,
  elapsedMinutes,
  etaHandover,
  progressPercent,
  className,
}: BayLiveStatusCardProps) {
  const tone = BAY_LIVE_STATE_TONE[state]
  const stateLabel = BAY_LIVE_STATE_LABEL[state]
  const idle = state === "idle"
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const progressTone =
    tone === "neutral" ? "teal" : tone === "red" ? "red" : tone

  return (
    <article
      className={classes}
      data-state={state}
      style={{ "--bay-accent": `var(--primitive-${progressTone})` } as CSSProperties}
      aria-label={`${BAY_LABEL[bay]} live status — ${stateLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.bay}>{BAY_LABEL[bay]}</span>
          <span className={styles.dot} aria-hidden="true" />
          <Chip label={stateLabel} tone={tone === "neutral" ? "neutral" : tone} />
        </div>
        {jobNumber && <span className={styles.jobNo}>{jobNumber}</span>}
      </header>

      {idle ? (
        <p className={styles.idleMsg}>Bay clear — ready for the next intake.</p>
      ) : (
        <>
          <div className={styles.body}>
            <strong className={styles.vehicle}>{vehicle ?? "—"}</strong>
            {customer && <span className={styles.customer}>{customer}</span>}
          </div>

          <div className={styles.tech}>
            <Avatar name={technician.name} src={technician.avatarSrc} size="sm" tone="red" />
            <span className={styles.techMeta}>
              <strong>{technician.name}</strong>
              <em>{technician.role}</em>
            </span>
          </div>

          <ProgressLinear
            value={progressPercent}
            tone={progressTone}
            variant="striped"
          />

          <footer className={styles.foot}>
            <span>
              <em>Elapsed</em>
              <strong>{formatElapsed(elapsedMinutes)}</strong>
            </span>
            <span>
              <em>ETA handover</em>
              <strong>{etaHandover ?? "—"}</strong>
            </span>
          </footer>
        </>
      )}
    </article>
  )
}

export default BayLiveStatusCard
