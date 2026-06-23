import { Users, AlertTriangle, Gauge, MapPin } from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"
import { Kbd } from "../primitives/kbd"

import {
  formatIsoDate,
  formatKm,
  padVin,
} from "./vehicle-data-types"
import styles from "./vin-history-card.module.css"

export type VinHistoryFlag = "clean" | "minor" | "moderate" | "write-off"

export interface VinHistoryEvent {
  id: string
  /** Event date ISO. */
  isoDate: string
  /** Short headline ("Sold at auction", "Accident reported"). */
  headline: string
  /** Optional state, city, or workshop. */
  location?: string
  /** Optional flag affecting overall card tone. */
  flag?: VinHistoryFlag
  /** Optional odometer reading captured at the event. */
  odometerKm?: number
}

interface VinHistoryCardProps {
  vin: string
  /** Resolved make + model label for the header. */
  vehicleLabel: string
  ownersCount: number
  accidentsCount: number
  totalKm: number
  /** Two-letter state code list this VIN has been registered in. */
  stateHistory: ReadonlyArray<string>
  /** Optional overall risk flag rendered as a chip. */
  riskFlag?: VinHistoryFlag
  events: ReadonlyArray<VinHistoryEvent>
  className?: string
}

interface StatProps {
  icon: ReactNode
  label: string
  value: string
}

function Stat({ icon, label, value }: StatProps) {
  return (
    <li className={styles.stat}>
      <span className={styles.statIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </li>
  )
}

const RISK_TONE = {
  clean: { label: "Clean record", tone: "green" as const },
  minor: { label: "Minor incident", tone: "amber" as const },
  moderate: { label: "Moderate incident", tone: "amber" as const },
  "write-off": { label: "Repairable write-off", tone: "red" as const },
}

export function VinHistoryCard({
  vin,
  vehicleLabel,
  ownersCount,
  accidentsCount,
  totalKm,
  stateHistory,
  riskFlag = "clean",
  events,
  className,
}: VinHistoryCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const display = padVin(vin)
  const risk = RISK_TONE[riskFlag]

  return (
    <section className={classes} aria-label="VIN history card">
      <header className={styles.head}>
        <div className={styles.headCopy}>
          <span className={styles.kicker}>VIN history · PPSR + REVS</span>
          <h2 className={styles.title}>{vehicleLabel}</h2>
        </div>
        <Chip label={risk.label} tone={risk.tone} />
      </header>

      <ol className={styles.code} aria-label="VIN characters">
        {display.split("").map((char, index) => (
          <li key={`${char}-${index}`} className={styles.codeCell}>
            <Kbd size="sm">{char}</Kbd>
          </li>
        ))}
      </ol>

      <ul className={styles.stats}>
        <Stat
          icon={<Users size={14} strokeWidth={2.2} />}
          label="Owners"
          value={`${ownersCount}`}
        />
        <Stat
          icon={<AlertTriangle size={14} strokeWidth={2.2} />}
          label="Accidents"
          value={`${accidentsCount}`}
        />
        <Stat
          icon={<Gauge size={14} strokeWidth={2.2} />}
          label="Lifetime"
          value={formatKm(totalKm)}
        />
        <Stat
          icon={<MapPin size={14} strokeWidth={2.2} />}
          label="States"
          value={stateHistory.join(" → ")}
        />
      </ul>

      <ol className={styles.events}>
        {events.map((event) => (
          <li
            key={event.id}
            className={styles.event}
            data-flag={event.flag ?? "clean"}
          >
            <span className={styles.eventMarker} aria-hidden="true" />
            <div className={styles.eventBody}>
              <span className={styles.eventDate}>{formatIsoDate(event.isoDate)}</span>
              <strong className={styles.eventHeadline}>{event.headline}</strong>
              <span className={styles.eventMeta}>
                {event.location ? <span>{event.location}</span> : null}
                {event.odometerKm != null ? (
                  <span>{formatKm(event.odometerKm)}</span>
                ) : null}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default VinHistoryCard
