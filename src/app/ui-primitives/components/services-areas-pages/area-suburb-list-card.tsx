import { DistanceDurationChip } from "../maps"

import type { AreaSuburb } from "./services-areas-types"
import styles from "./area-suburb-list-card.module.css"

export interface AreaSuburbListCardProps {
  /** Kicker, e.g. "Suburb list". */
  kicker?: string
  /** Card title, e.g. "Illawarra suburbs". */
  title: string
  /** Suburbs in the area. Each row renders postcode chip + drive-time chip + services count. */
  suburbs: ReadonlyArray<AreaSuburb>
}

/**
 * Area suburb list card. This is a net-new layout primitive because the
 * area→suburb composition (a row listing where each row carries a
 * postcode chip, a drive-time chip, and a services-count chip) is not
 * provided by any existing primitive — the row anatomy is specific to
 * the area-hub surface.
 *
 * Each row composes the maps `DistanceDurationChip` primitive for the
 * drive-time output so the chip styling stays consistent with the rest
 * of the map family.
 */
export function AreaSuburbListCard({
  kicker = "Suburb list",
  title,
  suburbs,
}: AreaSuburbListCardProps) {
  return (
    <section className={styles.card} aria-label="Suburb list card">
      <header className={styles.header}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.title}>{title}</h2>
      </header>
      <ul className={styles.list}>
        {suburbs.map((suburb) => (
          <li key={suburb.id} className={styles.row}>
            <div className={styles.name}>
              <span className={styles.nameLabel}>{suburb.name}</span>
              <span className={styles.nameMeta}>
                {suburb.servicesCount} services available
              </span>
            </div>
            <span className={styles.postcode}>{suburb.postcode}</span>
            <DistanceDurationChip
              distance={`${suburb.driveTimeMinutes} min`}
              duration={`${suburb.driveTimeMinutes < 15 ? "Clear" : "Town"} run`}
              traffic={suburb.driveTimeMinutes < 15 ? "free" : "moderate"}
              label={`Drive time to ${suburb.name}`}
            />
            <span className={styles.servicesCount}>
              <strong>{suburb.servicesCount}</strong>
              <span>svc</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default AreaSuburbListCard
