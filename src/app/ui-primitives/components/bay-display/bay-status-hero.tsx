import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"
import { BAY_LABEL } from "../roster/roster-types"
import {
  BAY_STATUS_LABEL,
  BAY_STATUS_TONE,
  type BayDisplayStatus,
  type BayId,
} from "./bay-display-types"
import styles from "./bay-status-hero.module.css"

export interface BayStatusHeroProps {
  bay: BayId
  status: BayDisplayStatus
  /** Vehicle currently in the bay — "Hilux N80 · BTR-882". */
  vehicle?: string
  /** Customer surname strap. */
  customer?: string
  /** Technician working it. */
  mechanic?: string
  /** ETA to handover formatted "12:40 pm" or "2:05 pm". */
  eta?: string
  /** Whether the status pulse animates. */
  pulse?: boolean
  className?: string
}

export function BayStatusHero({
  bay,
  status,
  vehicle,
  customer,
  mechanic,
  eta,
  pulse = true,
  className,
}: BayStatusHeroProps) {
  const tone = BAY_STATUS_TONE[status]
  const label = BAY_STATUS_LABEL[status]
  const clear = status === "clear"
  const classes = [styles.hero, className].filter(Boolean).join(" ")
  const accentColor = `var(--primitive-${tone === "neutral" ? "teal" : tone})`

  return (
    <article
      className={classes}
      data-status={status}
      data-pulse={pulse ? "on" : "off"}
      style={{ "--bay-display-accent": accentColor } as CSSProperties}
      aria-label={`${BAY_LABEL[bay]} display hero — ${label}`}
    >
      <span className={styles.accent} aria-hidden="true" />
      <header className={styles.head}>
        <span className={styles.bayId}>
          <em>Bay</em>
          <strong>{bay.replace("bay-", "")}</strong>
        </span>
        <span className={styles.pulse} aria-hidden="true" />
        <Chip
          label={label}
          tone={tone === "neutral" ? "neutral" : tone}
          className={styles.chip}
        />
      </header>

      {clear ? (
        <p className={styles.clearMsg}>Bay clear — bring her in.</p>
      ) : (
        <>
          <div className={styles.vehicleBlock}>
            <strong className={styles.vehicle}>{vehicle ?? "—"}</strong>
            {customer && <span className={styles.customer}>{customer}</span>}
          </div>

          <footer className={styles.foot}>
            {mechanic && (
              <div className={styles.cell}>
                <em>Mechanic</em>
                <strong>{mechanic}</strong>
              </div>
            )}
            {eta && (
              <div className={styles.cell}>
                <em>ETA handover</em>
                <strong className={styles.tabular}>{eta}</strong>
              </div>
            )}
          </footer>
        </>
      )}
    </article>
  )
}

export default BayStatusHero
