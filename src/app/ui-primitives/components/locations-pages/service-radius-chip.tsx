import { ServiceRadiusOverlay } from "../maps/service-radius-overlay"
import { StaticMapCanvas } from "../maps/static-map-canvas"

import type { WorkshopDistanceBand } from "./locations-pages-types"

import styles from "./service-radius-chip.module.css"

export interface ServiceRadiusChipProps {
  /** Service radius in kilometres from the Oak Flats workshop. */
  radiusKm: number
  /** Band used to colour the chip's outline + body. */
  band: WorkshopDistanceBand
  /** Distance from this specific suburb to the workshop. */
  suburbDistanceKm: number
  /** Optional label override. Defaults to "Service radius". */
  label?: string
  className?: string
}

const BAND_COPY: Record<WorkshopDistanceBand, string> = {
  core: "Core catchment",
  near: "Near catchment",
  regional: "Regional coverage",
  extended: "Extended coverage",
  service: "Touring service",
}

const BAND_CLASS: Record<WorkshopDistanceBand, string> = {
  core: styles.bandCore,
  near: styles.bandNear,
  regional: styles.bandRegional,
  extended: styles.bandExtended,
  service: styles.bandService,
}

// Mini-map size in the StaticMapCanvas viewBox.
const MAP_W = 120
const MAP_H = 120
const CENTER_X = MAP_W / 2
const CENTER_Y = MAP_H / 2

/**
 * Service radius chip — adapter that composes the mini variant of the
 * `maps/StaticMapCanvas` with a single `ServiceRadiusOverlay` ring.
 *
 * A second dot inside the ring marks the suburb's position relative
 * to the workshop.
 */
export function ServiceRadiusChip({
  radiusKm,
  band,
  suburbDistanceKm,
  label = "Service radius",
  className,
}: ServiceRadiusChipProps) {
  const classes = [styles.chip, BAND_CLASS[band], className]
    .filter(Boolean)
    .join(" ")

  const ringRadius = 38
  const dotRadius =
    Math.min(suburbDistanceKm / Math.max(radiusKm, 1), 1) * (ringRadius - 4)
  const dotX = CENTER_X + dotRadius * 0.65
  const dotY = CENTER_Y - dotRadius * 0.55

  return (
    <div className={classes}>
      <div className={styles.miniMap}>
        <StaticMapCanvas
          label={`Service radius mini-map, ${radiusKm} km from Oak Flats`}
          width={MAP_W}
          height={MAP_H}
          showCompass={false}
          tone="midnight"
        >
          <ServiceRadiusOverlay
            cx={CENTER_X}
            cy={CENTER_Y}
            rings={[{ radius: ringRadius, label: `${radiusKm}km` }]}
            groupLabel={`Service radius ring at ${radiusKm} km`}
          />
          <circle cx={dotX} cy={dotY} r="2.5" fill="var(--primitive-amber)" />
        </StaticMapCanvas>
      </div>

      <div className={styles.copy}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{radiusKm} km</span>
        <span className={styles.band}>{BAND_COPY[band]}</span>
      </div>
    </div>
  )
}

export default ServiceRadiusChip
