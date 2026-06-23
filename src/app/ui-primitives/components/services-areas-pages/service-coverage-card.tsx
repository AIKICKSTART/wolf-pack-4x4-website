import { ServiceRadiusOverlay, StaticMapCanvas } from "../maps"

import styles from "./service-coverage-card.module.css"

export interface ServiceCoverageCardCta {
  label: string
  href: string
}

export interface ServiceCoverageCardProps {
  /** Kicker, e.g. "Coverage". */
  kicker?: string
  /** Card title, e.g. "Where this service runs". */
  title: string
  /** Suburb chip labels rendered as a chip cloud. */
  suburbs: ReadonlyArray<string>
  /** Average drive-time across the suburb set, e.g. "12 min". */
  averageDriveTime: string
  /** "See all suburbs" CTA. */
  seeAllCta: ServiceCoverageCardCta
  /** Map radius rings used by the embedded ServiceRadiusOverlay. */
  rings?: ReadonlyArray<{ radius: number; label: string }>
}

const DEFAULT_RINGS: ReadonlyArray<{ radius: number; label: string }> = [
  { radius: 70, label: "Core" },
  { radius: 130, label: "Near" },
  { radius: 200, label: "Regional" },
]

/**
 * Service coverage card. This is a net-new layout primitive because the
 * service↔suburb cross-link surface (a small map summary + a chip cloud +
 * a drive-time stat + a "see all suburbs" CTA) is not provided by any
 * existing primitive. It composes the maps `StaticMapCanvas` +
 * `ServiceRadiusOverlay` for the map summary.
 */
export function ServiceCoverageCard({
  kicker = "Coverage",
  title,
  suburbs,
  averageDriveTime,
  seeAllCta,
  rings = DEFAULT_RINGS,
}: ServiceCoverageCardProps) {
  return (
    <section className={styles.card} aria-label="Service coverage card">
      <header className={styles.header}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.title}>{title}</h2>
      </header>
      <div className={styles.body}>
        <div className={styles.map}>
          <StaticMapCanvas
            width={420}
            height={260}
            tone="midnight"
            showCompass={false}
            label={`${title} coverage radius map`}
          >
            <ServiceRadiusOverlay
              cx={210}
              cy={130}
              rings={rings}
              groupLabel={`${title} radius rings`}
            />
          </StaticMapCanvas>
        </div>
        <div className={styles.summary}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{averageDriveTime}</span>
            <span className={styles.statLabel}>Average drive time</span>
          </div>
          <ul
            className={styles.chips}
            role="list"
            aria-label={`Suburbs covered for ${title}`}
          >
            {suburbs.map((suburb) => (
              <li key={suburb} className={styles.chip}>
                {suburb}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <a className={styles.cta} href={seeAllCta.href}>
        {seeAllCta.label}
        <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}

export default ServiceCoverageCard
