"use client"

import Link from "next/link"

import { Chip, type ChipTone } from "../primitives/chip"

import styles from "./surrounding-suburbs-cloud.module.css"

export interface SurroundingSuburb {
  id: string
  name: string
  /** Distance from the focal suburb in km — drives chip size + tone. */
  distanceKm: number
  href: string
}

export interface SurroundingSuburbsCloudProps {
  heading?: string
  /** Optional kicker line above the heading. */
  kicker?: string
  suburbs: ReadonlyArray<SurroundingSuburb>
  className?: string
}

function toneFor(distanceKm: number): ChipTone {
  if (distanceKm <= 3) return "red"
  if (distanceKm <= 8) return "amber"
  return "neutral"
}

function sizeClassFor(distanceKm: number): string {
  if (distanceKm <= 3) return styles.itemLarge
  if (distanceKm <= 8) return styles.itemMedium
  return styles.itemSmall
}

/**
 * Tag-cloud-style list of surrounding suburbs.
 *
 * Adapter — each entry is rendered as a `primitives/Chip` wrapped in a
 * Next `Link`, with tone + size driven by physical distance so the
 * closest neighbours visually dominate the cloud.
 */
export function SurroundingSuburbsCloud({
  heading = "Surrounding suburbs we cover",
  kicker,
  suburbs,
  className,
}: SurroundingSuburbsCloudProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-labelledby="surrounding-suburbs-heading">
      <header className={styles.header}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 id="surrounding-suburbs-heading" className={styles.heading}>
          {heading}
        </h2>
      </header>

      <ul className={styles.cloud}>
        {suburbs.map((suburb) => {
          const sizeClass = sizeClassFor(suburb.distanceKm)
          const tone = toneFor(suburb.distanceKm)
          return (
            <li key={suburb.id} className={`${styles.item} ${sizeClass}`}>
              <Link className={styles.link} href={suburb.href}>
                <Chip
                  label={`${suburb.name} · ${suburb.distanceKm.toFixed(1)} km`}
                  tone={tone}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SurroundingSuburbsCloud
