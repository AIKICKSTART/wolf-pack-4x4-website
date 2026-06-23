/**
 * Co-located composition pieces for the Workshop operations board.
 *
 * Thin presentational wrappers that arrange EXISTING primitives plus a small
 * amount of bespoke brand chrome (the Torque command band, the floor KPI
 * strip, the live-bay grid). No primitive is modified here.
 *
 * Dev-only note: the assistant brand surfaced to the owner is always "Torque".
 */

import { BayLiveStatusCard } from "../../components/workshop-floor-live/bay-live-status-card"

import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  FLOOR_KPIS,
  LIVE_BAYS,
  TODAY_LABEL,
  type FloorKpi,
  type LiveBay,
} from "./_demo-data"
import styles from "./workshop-ops.module.css"

const KPI_TONE_CLASS: Record<FloorKpi["tone"], string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

/** Placeholder circular Torque avatar — brand-red gradient, initial "T".
 *  Real mascot art lands later. */
export function TorqueAvatar() {
  return (
    <span
      className={styles.torqueAvatar}
      role="img"
      aria-label="Torque, your Mufflermen business assistant"
    >
      <span aria-hidden="true">T</span>
    </span>
  )
}

/** Hero command band: Torque avatar + shop-floor briefing + live meta. */
export function CommandBand() {
  return (
    <section className={styles.command} aria-labelledby="ops-command-title">
      <div className={styles.commandHead}>
        <TorqueAvatar />
        <span className={styles.torqueId}>
          <span className={styles.torqueName}>Torque</span>
          <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
        </span>
      </div>
      <h1 id="ops-command-title" className={styles.commandTitle}>
        The floor at <em>{BUSINESS_NAME}</em>, right now.
      </h1>
      <p className={styles.commandCopy}>
        Three bays under the gun, one cooling off for the 10:30 Ranger, and the quote board is
        moving. I&apos;ve sent the Colorado cat-back quote, booked the Ranger turbo-back into Bay 4,
        and SMS&apos;d Priya that her i30 N is washed and ready. Watching parts on the BT-50.
      </p>
      <p className={styles.commandMeta}>
        <span className={styles.metaDot}>Workshop open · 7:30am–5pm</span>
        <span>{TODAY_LABEL}</span>
        <span>{BUSINESS_REGION}</span>
      </p>
    </section>
  )
}

/** Floor KPI strip — bespoke tiles, figures rendered with tabular-nums. */
export function FloorKpiStrip() {
  return (
    <section className={styles.kpiStrip} aria-label="Shop-floor key numbers">
      {FLOOR_KPIS.map((kpi) => (
        <article key={kpi.id} className={`${styles.kpiTile} ${KPI_TONE_CLASS[kpi.tone]}`}>
          <span className={styles.kpiLabel}>{kpi.label}</span>
          <strong className={styles.kpiValue}>{kpi.value}</strong>
          <span className={styles.kpiHint}>{kpi.hint}</span>
        </article>
      ))}
    </section>
  )
}

interface LiveBayGridProps {
  bays?: ReadonlyArray<LiveBay>
}

/** Grid of live bay-status cards (workshop-floor-live primitive per bay). */
export function LiveBayGrid({ bays = LIVE_BAYS }: LiveBayGridProps) {
  return (
    <div className={styles.bayGrid} role="list" aria-label="Live bay status">
      {bays.map((bay) => (
        <div key={bay.bay} role="listitem" className={styles.bayCell}>
          <BayLiveStatusCard
            bay={bay.bay}
            state={bay.state}
            vehicle={bay.vehicle}
            customer={bay.customer}
            technician={bay.technician}
            jobNumber={bay.jobNumber}
            elapsedMinutes={bay.elapsedMinutes}
            etaHandover={bay.etaHandover}
            progressPercent={bay.progressPercent}
          />
        </div>
      ))}
    </div>
  )
}
