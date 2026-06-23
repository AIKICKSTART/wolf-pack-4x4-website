import { Chip } from "../primitives/chip"
import {
  WorkshopLocator,
  type LocatorEntry,
} from "../maps/workshop-locator"
import type { MapPinTone } from "../maps/map-pin"

import styles from "./nearby-workshops-list.module.css"

export type WorkshopOpeningStatus = "open" | "closes-soon" | "closed"

export interface NearbyWorkshopEntry {
  id: string
  name: string
  /** Suburb the workshop is located in. */
  suburb: string
  /** Distance from this page's focal suburb in kilometres. */
  distanceKm: number
  /** Drive time from this page's focal suburb in minutes. */
  driveTimeMinutes: number
  /** Current opening status. */
  status: WorkshopOpeningStatus
  /** Short opening-status detail. */
  statusDetail: string
  /** Up-to-4 primary services available at this workshop. */
  services: ReadonlyArray<string>
  /** Pin position (0–100) within the locator canvas. */
  x: number
  y: number
}

export interface NearbyWorkshopsListProps {
  heading?: string
  /** Caption announced beneath the locator map. */
  caption?: string
  workshops: ReadonlyArray<NearbyWorkshopEntry>
  className?: string
}

const STATUS_TONE: Record<WorkshopOpeningStatus, MapPinTone> = {
  open: "green",
  "closes-soon": "amber",
  closed: "red",
}

const STATUS_LABEL: Record<WorkshopOpeningStatus, string> = {
  open: "Open now",
  "closes-soon": "Closes soon",
  closed: "Closed",
}

/**
 * Nearby workshops list — adapter over `maps/WorkshopLocator`.
 *
 * The locator pin colour is driven by opening status; a chip row of
 * primary services sits beneath each workshop in the legend.
 */
export function NearbyWorkshopsList({
  heading = "Workshops near this suburb",
  caption = "Workshops within the Oak Flats Mufflermen service footprint.",
  workshops,
  className,
}: NearbyWorkshopsListProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  const entries: ReadonlyArray<LocatorEntry> = workshops.map((workshop) => ({
    id: workshop.id,
    name: workshop.name,
    suburb: workshop.suburb,
    distance: workshop.distanceKm,
    status: `${STATUS_LABEL[workshop.status]} · ${workshop.statusDetail} · ${workshop.driveTimeMinutes} min drive`,
    tone: STATUS_TONE[workshop.status],
    x: workshop.x,
    y: workshop.y,
  }))

  return (
    <section className={classes} aria-labelledby="nearby-workshops-heading">
      <header className={styles.header}>
        <span className={styles.kicker}>Nearby workshops</span>
        <h2 id="nearby-workshops-heading" className={styles.heading}>
          {heading}
        </h2>
      </header>

      <WorkshopLocator entries={entries} caption={caption} />

      <ul className={styles.serviceLegend} aria-label="Primary services per workshop">
        {workshops.map((workshop) => (
          <li key={workshop.id} className={styles.serviceLegendRow}>
            <span className={styles.serviceLegendName}>{workshop.name}</span>
            <ul className={styles.serviceChips}>
              {workshop.services.map((service) => (
                <li key={service}>
                  <Chip label={service} tone="teal" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default NearbyWorkshopsList
