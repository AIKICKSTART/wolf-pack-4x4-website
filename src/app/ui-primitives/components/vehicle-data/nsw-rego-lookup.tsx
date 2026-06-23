import { ShieldCheck, ShieldAlert, ShieldX, ShieldOff } from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"

import {
  REGO_STATUS_LABEL,
  REGO_STATUS_TONE,
  daysBetween,
  formatIsoDate,
  type RegoStatus,
} from "./vehicle-data-types"
import styles from "./nsw-rego-lookup.module.css"

interface NswRegoLookupProps {
  /** NSW plate (e.g. "KFK-23M"). */
  rego: string
  /** Year + make + model summary. */
  vehicleLabel: string
  /** ISO date the rego expires. */
  expiryISO: string
  status: RegoStatus
  /** PPSR encumbrance flag (under finance). */
  encumbered: boolean
  /** REVS / NEVDIS written-off flag. */
  writtenOff: boolean
  /** Compulsory third party insurer (NSW only). */
  ctpInsurer?: string
  /** Optional reference date for the countdown (defaults to today). */
  now?: Date
  className?: string
}

const STATUS_ICON: Record<RegoStatus, ReactNode> = {
  active: <ShieldCheck size={18} strokeWidth={2.2} aria-hidden="true" />,
  expired: <ShieldX size={18} strokeWidth={2.2} aria-hidden="true" />,
  suspended: <ShieldX size={18} strokeWidth={2.2} aria-hidden="true" />,
  "written-off": <ShieldOff size={18} strokeWidth={2.2} aria-hidden="true" />,
  encumbered: <ShieldAlert size={18} strokeWidth={2.2} aria-hidden="true" />,
}

function countdownLabel(days: number): string {
  if (days < 0) {
    return `${Math.abs(days)} d ago`
  }
  if (days === 0) {
    return "today"
  }
  return `in ${days} d`
}

export function NswRegoLookup({
  rego,
  vehicleLabel,
  expiryISO,
  status,
  encumbered,
  writtenOff,
  ctpInsurer,
  now,
  className,
}: NswRegoLookupProps) {
  const classes = [styles.card, styles[`status-${status}`], className]
    .filter(Boolean)
    .join(" ")
  const referenceNow = now ?? new Date()
  const days = daysBetween(expiryISO, referenceNow)

  return (
    <section className={classes} aria-label="NSW rego lookup">
      <header className={styles.head}>
        <span className={styles.kicker}>Transport for NSW · DRIVES</span>
        <h2 className={styles.title}>{vehicleLabel}</h2>
      </header>

      <div className={styles.plate} aria-label={`NSW rego plate ${rego}`}>
        <span className={styles.plateState}>NSW</span>
        <span className={styles.plateNumber}>{rego}</span>
      </div>

      <div className={styles.statusStrip}>
        <span className={styles.statusGlyph} aria-hidden="true">
          {STATUS_ICON[status]}
        </span>
        <div className={styles.statusCopy}>
          <span className={styles.statusKicker}>Rego status</span>
          <Chip
            label={REGO_STATUS_LABEL[status]}
            tone={REGO_STATUS_TONE[status]}
          />
        </div>
      </div>

      <dl className={styles.facts}>
        <div>
          <dt>Expires</dt>
          <dd>{formatIsoDate(expiryISO)}</dd>
        </div>
        <div>
          <dt>Countdown</dt>
          <dd>{countdownLabel(days)}</dd>
        </div>
        <div>
          <dt>Encumbrance</dt>
          <dd>
            <Chip
              label={encumbered ? "Under finance" : "Clear"}
              tone={encumbered ? "amber" : "green"}
            />
          </dd>
        </div>
        <div>
          <dt>Written-off</dt>
          <dd>
            <Chip
              label={writtenOff ? "WOVR flagged" : "No WOVR record"}
              tone={writtenOff ? "red" : "green"}
            />
          </dd>
        </div>
        {ctpInsurer ? (
          <div>
            <dt>CTP green slip</dt>
            <dd>{ctpInsurer}</dd>
          </div>
        ) : null}
      </dl>
    </section>
  )
}

export default NswRegoLookup
