"use client"

import { Chip } from "../primitives/chip"
import { CarSideIcon } from "../icons/car-side"
import { UteSideIcon } from "../icons/ute-side"
import { ShieldTickIcon } from "../icons/shield-tick"
import {
  SERVICE_DUE_LABEL,
  SERVICE_DUE_TONE,
  formatDaysFromNow,
  formatKm,
  portalToneToChip,
  type PortalVehicle,
} from "./customer-portal-types"

import styles from "./vehicle-garage-grid.module.css"

interface VehicleGarageGridProps {
  vehicles: ReadonlyArray<PortalVehicle>
  /** Currently-selected vehicle id (highlighted). */
  selectedVehicleId?: string
  /** When provided, vehicle tiles become buttons. */
  onSelectVehicle?: (id: string) => void
  className?: string
}

function isUteOrTruck(label: string): boolean {
  const lower = label.toLowerCase()
  return (
    lower.includes("hilux") ||
    lower.includes("ranger") ||
    lower.includes("bt-50") ||
    lower.includes("triton") ||
    lower.includes("amarok") ||
    lower.includes("falcon ute") ||
    lower.includes("ute")
  )
}

export function VehicleGarageGrid({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  className,
}: VehicleGarageGridProps) {
  const classes = [styles.grid, className].filter(Boolean).join(" ")

  if (vehicles.length === 0) {
    return (
      <section className={classes} aria-label="Vehicle garage">
        <p className={styles.empty}>
          No vehicles in your garage yet — add one to lock in service
          reminders.
        </p>
      </section>
    )
  }

  return (
    <section className={classes} aria-label="Vehicle garage">
      {vehicles.map((vehicle) => {
        const selected = vehicle.id === selectedVehicleId
        const dueLabel = SERVICE_DUE_LABEL[vehicle.serviceState]
        const dueTone = portalToneToChip(SERVICE_DUE_TONE[vehicle.serviceState])
        const interactive = Boolean(onSelectVehicle)
        const tileClass = [
          styles.tile,
          selected ? styles.tileSelected : "",
          interactive ? styles.tileButton : "",
        ]
          .filter(Boolean)
          .join(" ")

        const handleClick = () => {
          if (onSelectVehicle) {
            onSelectVehicle(vehicle.id)
          }
        }

        const VehicleGlyph = isUteOrTruck(vehicle.label)
          ? UteSideIcon
          : CarSideIcon

        const inner = (
          <>
            <header className={styles.head}>
              <span className={styles.glyph} aria-hidden="true">
                <VehicleGlyph size={28} tone="currentColor" motion="none" />
              </span>
              <div className={styles.headText}>
                <h3 className={styles.title}>
                  <span className={styles.year}>{vehicle.yearMade}</span>{" "}
                  {vehicle.label}
                </h3>
                <span className={styles.colour}>{vehicle.bodyColour}</span>
              </div>
              <span className={styles.rego}>{vehicle.rego}</span>
            </header>

            <dl className={styles.facts}>
              <div>
                <dt>Odometer</dt>
                <dd>{formatKm(vehicle.odometerKm)}</dd>
              </div>
              <div>
                <dt>Last service</dt>
                <dd>
                  <time>{vehicle.lastServiceAt}</time>
                </dd>
              </div>
              <div>
                <dt>Next service</dt>
                <dd>
                  <time>{vehicle.nextServiceDueAt}</time>
                  <span className={styles.dueDelta}>
                    {formatDaysFromNow(vehicle.daysUntilService)}
                  </span>
                </dd>
              </div>
            </dl>

            <footer className={styles.foot}>
              <Chip label={dueLabel} tone={dueTone} />
              {vehicle.roadworthyExpiresAt ? (
                <span className={styles.roadworthy}>
                  <ShieldTickIcon size={12} tone="currentColor" motion="none" />
                  RWC&nbsp;
                  <time>{vehicle.roadworthyExpiresAt}</time>
                </span>
              ) : null}
              {vehicle.hasActiveRecall ? (
                <Chip label="Recall open" tone="red" />
              ) : null}
            </footer>
          </>
        )

        if (interactive) {
          return (
            <button
              key={vehicle.id}
              type="button"
              className={tileClass}
              aria-pressed={selected}
              aria-label={`Select ${vehicle.yearMade} ${vehicle.label}, rego ${vehicle.rego}, service ${dueLabel}`}
              onClick={handleClick}
              data-vehicle={vehicle.id}
            >
              {inner}
            </button>
          )
        }

        return (
          <article
            key={vehicle.id}
            className={tileClass}
            data-vehicle={vehicle.id}
            aria-label={`${vehicle.yearMade} ${vehicle.label}, rego ${vehicle.rego}, service ${dueLabel}`}
          >
            {inner}
          </article>
        )
      })}
    </section>
  )
}

export default VehicleGarageGrid
