import Link from "next/link"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"

import styles from "./suburb-services-grid.module.css"

export interface SuburbServiceTile {
  id: string
  /** Service title (e.g. "Muffler repairs"). */
  title: string
  /** Service kicker (e.g. "Workshop service"). */
  kicker: string
  /** Description paragraph. */
  description: ReactNode
  /** Localised chip copy — e.g. "Same-day exhaust repair · Albion Park Rail". */
  localisedChip: string
  href: string
}

export interface SuburbServicesGridProps {
  heading?: string
  suburbName: string
  services: ReadonlyArray<SuburbServiceTile>
  className?: string
}

/**
 * Grid of services available in this suburb. Each tile carries a
 * localised chip on it — pairing the service offer with the suburb
 * name to mirror the live SEO surface.
 */
export function SuburbServicesGrid({
  heading,
  suburbName,
  services,
  className,
}: SuburbServicesGridProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")
  const headingText = heading ?? `Exhaust services available for ${suburbName}`

  return (
    <section className={classes} aria-labelledby="suburb-services-heading">
      <header className={styles.header}>
        <span className={styles.kicker}>Services for {suburbName}</span>
        <h2 id="suburb-services-heading" className={styles.heading}>
          {headingText}
        </h2>
      </header>

      <ul className={styles.grid}>
        {services.map((service) => (
          <li key={service.id} className={styles.tile}>
            <span className={styles.tileKicker}>{service.kicker}</span>
            <h3 className={styles.tileTitle}>{service.title}</h3>
            <p className={styles.tileBody}>{service.description}</p>
            <span className={styles.tileChipWrap}>
              <Chip label={service.localisedChip} tone="teal" />
            </span>
            <Link className={styles.tileLink} href={service.href}>
              View service
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SuburbServicesGrid
