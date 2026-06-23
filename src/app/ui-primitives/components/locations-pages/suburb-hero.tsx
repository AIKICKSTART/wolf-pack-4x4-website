import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"
import { GlassSurface } from "../surfaces/glass-surface"

import type { SuburbState } from "./locations-pages-types"

import styles from "./suburb-hero.module.css"

export interface SuburbHeroAction {
  label: string
  href: string
}

export interface SuburbHeroProps {
  /** Kicker line above the headline — e.g. "Shellharbour service area". */
  kicker: string
  /** Display headline name of the suburb. */
  suburbName: string
  /** Suburb postcode — rendered as an amber chip. */
  postcode: string
  /** Australian state abbreviation. */
  state: SuburbState
  /** Drive time from the Oak Flats workshop in minutes. */
  driveTimeMinutes: number
  /** Supporting copy beneath the headline — the local tagline / intent. */
  tagline: ReactNode
  /** Primary CTA — usually a phone or booking action. */
  primaryAction: SuburbHeroAction
  /** Optional secondary CTA. */
  secondaryAction?: SuburbHeroAction
  className?: string
}

/**
 * Suburb hero — adapter composing `surfaces/GlassSurface` with three
 * `primitives/Chip` tiles for postcode / state / drive time, then the
 * suburb display headline, tagline, and CTA cluster.
 *
 * Net-new visual: the layered display headline with kicker, suburb name,
 * and brand prefix line. Everything else is reused from the primitive
 * library.
 */
export function SuburbHero({
  kicker,
  suburbName,
  postcode,
  state,
  driveTimeMinutes,
  tagline,
  primaryAction,
  secondaryAction,
  className,
}: SuburbHeroProps) {
  const classes = [styles.heroWrap, className].filter(Boolean).join(" ")
  const ariaLabel = `${suburbName} ${state} suburb hero`

  return (
    <GlassSurface tone="obsidian" intensity="high" className={classes}>
      <section
        className={styles.hero}
        role="region"
        aria-label={ariaLabel}
      >
        <p className={styles.kicker}>{kicker}</p>

        <ul className={styles.chipRow} aria-label="Suburb facts">
          <li>
            <Chip label={`Postcode ${postcode}`} tone="amber" />
          </li>
          <li>
            <Chip label={`State ${state}`} tone="teal" />
          </li>
          <li>
            <Chip label={`${driveTimeMinutes} min from Oak Flats`} tone="red" />
          </li>
        </ul>

        <h1 className={styles.headline}>
          <span className={styles.headlinePrefix}>Mufflermen &middot;</span>
          <span className={styles.headlineSuburb}>{suburbName}</span>
        </h1>

        <p className={styles.tagline}>{tagline}</p>

        <div className={styles.actions}>
          <a
            className={`${styles.action} ${styles.actionPrimary}`}
            href={primaryAction.href}
          >
            {primaryAction.label}
          </a>
          {secondaryAction ? (
            <a
              className={`${styles.action} ${styles.actionSecondary}`}
              href={secondaryAction.href}
            >
              {secondaryAction.label}
            </a>
          ) : null}
        </div>
      </section>
    </GlassSurface>
  )
}

export default SuburbHero
