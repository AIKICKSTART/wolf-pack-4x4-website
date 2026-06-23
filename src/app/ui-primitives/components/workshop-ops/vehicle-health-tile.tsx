import { ProgressRadial } from "../primitives/progress-radial"
import { OilCanIcon } from "../icons/oil-can"
import { BrakePadIcon } from "../icons/brake-pad"
import { LugNutIcon } from "../icons/lug-nut"
import {
  type VehicleHealth,
  type VehicleHealthDial,
  formatKm,
} from "./workshop-ops-types"

import styles from "./vehicle-health-tile.module.css"

interface VehicleHealthTileProps {
  health: VehicleHealth
  className?: string
}

function dialTone(score: number): "red" | "amber" | "teal" | "green" {
  if (score >= 75) return "green"
  if (score >= 50) return "teal"
  if (score >= 25) return "amber"
  return "red"
}

interface DialProps {
  dial: VehicleHealthDial
  glyph: React.ReactNode
}

function HealthDial({ dial, glyph }: DialProps) {
  const tone = dialTone(dial.score)
  return (
    <div className={styles.dial} aria-label={`${dial.label} ${Math.round(dial.score)}%`}>
      <div className={styles.dialRing}>
        <ProgressRadial value={dial.score} tone={tone} size="lg" thickness={6} />
        <span className={styles.dialIcon} aria-hidden="true">
          {glyph}
        </span>
      </div>
      <span className={styles.dialLabel}>{dial.label}</span>
      <span className={styles.dialValue} data-tone={tone}>
        {Math.round(dial.score)}%
      </span>
    </div>
  )
}

export function VehicleHealthTile({
  health,
  className,
}: VehicleHealthTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")
  const isOverdue = health.daysUntilNextService < 0
  const isDueSoon = health.daysUntilNextService >= 0 && health.daysUntilNextService <= 14

  return (
    <article
      className={classes}
      data-vehicle={health.vehicleId}
      aria-label={`Vehicle health for ${health.vehicleLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headIdentity}>
          <span className={styles.kicker}>Vehicle health</span>
          <h3 className={styles.title}>{health.vehicleLabel}</h3>
          <span className={styles.owner}>{health.ownerLabel}</span>
        </div>
        <span className={styles.regoPlate}>{health.rego}</span>
      </header>

      <section className={styles.serviceWindow} aria-label="Service window">
        <div className={styles.serviceLast}>
          <span className={styles.serviceLabel}>Last service</span>
          <span className={styles.serviceValue}>
            <time>{health.lastServiceAt}</time>
          </span>
          <span className={styles.serviceSub}>
            at {formatKm(health.lastServiceMileageKm)}
          </span>
        </div>
        <div
          className={[
            styles.serviceCountdown,
            isOverdue ? styles.countdownOverdue : "",
            isDueSoon ? styles.countdownSoon : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className={styles.countdownNumber}>
            {Math.abs(health.daysUntilNextService)}
          </span>
          <span className={styles.countdownUnit}>
            {isOverdue ? "days overdue" : "days to next"}
          </span>
          <span className={styles.countdownSub}>
            <time>{health.nextServiceDueAt}</time>
          </span>
        </div>
      </section>

      <section className={styles.dials} aria-label="Component condition">
        <HealthDial
          dial={health.oilDial}
          glyph={<OilCanIcon size={22} tone="amber" motion="none" />}
        />
        <HealthDial
          dial={health.brakeDial}
          glyph={<BrakePadIcon size={22} tone="red" motion="none" />}
        />
        <HealthDial
          dial={health.tyreDial}
          glyph={<LugNutIcon size={22} tone="teal" motion="none" />}
        />
      </section>
    </article>
  )
}

export default VehicleHealthTile
