import { Gauge } from "lucide-react"

import { DashboardCard } from "../data-display/dashboard-card"
import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"

import {
  FUEL_LABEL,
  VEHICLE_STATUS_LABEL,
  VEHICLE_STATUS_TONE,
  formatOdometer,
  formatRego,
  type FuelType,
  type VehicleStatus,
} from "./vehicles-types"

import styles from "./vehicle-card-fleet.module.css"

interface VehicleCardFleetProps {
  rego: string
  year: number
  make: string
  model: string
  status: VehicleStatus
  odometerKm: number
  fuelType: FuelType
  /** Driver currently assigned to the vehicle. */
  driverName: string
  driverAvatarSrc?: string
  /** Optional vehicle hero photo. */
  photoSrc?: string
  /** Click target — usually links to the full-vehicle-detail surface. */
  href?: string
  className?: string
}

const TONE_TO_CHIP: Record<ReturnType<typeof statusTone>, "neutral" | "red" | "amber" | "teal" | "green"> = {
  green: "green",
  amber: "amber",
  red: "red",
  teal: "teal",
  neutral: "neutral",
}

function statusTone(status: VehicleStatus) {
  return VEHICLE_STATUS_TONE[status]
}

export function VehicleCardFleet({
  rego,
  year,
  make,
  model,
  status,
  odometerKm,
  fuelType,
  driverName,
  driverAvatarSrc,
  photoSrc,
  href,
  className,
}: VehicleCardFleetProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const statusLabel = VEHICLE_STATUS_LABEL[status]
  const tone = TONE_TO_CHIP[statusTone(status)]

  return (
    <article className={classes} aria-label={`${formatRego(rego)} ${year} ${make} ${model}`}>
      <div className={styles.photo} aria-hidden="true">
        {photoSrc ? (
          // The vehicle hero is decorative — captioning is handled by the
          // card text below for screen reader users.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoSrc} alt="" className={styles.photoImg} loading="lazy" />
        ) : (
          <span className={styles.photoGlyph}>{make[0]}{model[0]}</span>
        )}
        <span className={styles.regoPlate}>{formatRego(rego)}</span>
      </div>

      <div className={styles.body}>
        <header className={styles.head}>
          <div>
            <span className={styles.year}>{year}</span>
            <h3 className={styles.title}>
              {make} {model}
            </h3>
          </div>
          <Chip label={statusLabel} tone={tone} />
        </header>

        <DashboardCard
          label="Odometer"
          value={formatOdometer(odometerKm)}
          surface="material"
          icon={<Gauge size={14} strokeWidth={2.2} aria-hidden="true" />}
          meta={FUEL_LABEL[fuelType]}
          footer={href ? { label: "Open detail", href } : undefined}
          className={styles.metric}
        />

        <footer className={styles.driverRow}>
          <Avatar
            name={driverName}
            src={driverAvatarSrc}
            size="sm"
            tone="obsidian"
            status={status === "in-service" ? "online" : "offline"}
          />
          <div className={styles.driverMeta}>
            <span className={styles.driverLabel}>Driver</span>
            <strong className={styles.driverName}>{driverName}</strong>
          </div>
        </footer>
      </div>
    </article>
  )
}

export default VehicleCardFleet
