import type { ReactNode } from "react"

import { GlassSurface } from "../surfaces/glass-surface"

import styles from "./service-suburb-cross-hero.module.css"

export interface ServiceSuburbCrossHeroAction {
  label: string
  href: string
}

export interface ServiceSuburbCrossHeroProps {
  /** Kicker line — e.g. "Custom exhausts in Wollongong". */
  kicker: string
  /** Service short title — appears as a chip. */
  serviceName: string
  /** Service detail href used by the service chip. */
  serviceHref: string
  /** Suburb name — appears as a chip. */
  suburbName: string
  /** Suburb detail href used by the suburb chip. */
  suburbHref: string
  /** Composed headline pairing the service and the suburb. */
  headline: ReactNode
  /** Supporting copy beneath the headline. */
  supportingCopy: ReactNode
  /** Primary action — usually a workshop call. */
  primaryAction: ServiceSuburbCrossHeroAction
  /** Optional secondary action. */
  secondaryAction?: ServiceSuburbCrossHeroAction
  className?: string
}

/**
 * Combination service + suburb hero for `/locations/[suburb]/[service]` pages.
 *
 * Adapter — wraps `surfaces/GlassSurface` around the two-axis layout
 * that pairs a service chip with a suburb chip, then composes the
 * headline and supporting copy beneath. This is net-new structure
 * (two-axis chip-row + dedicated cross-headline) so it remains a
 * locations-pages primitive rather than a marketing-hero adapter.
 */
export function ServiceSuburbCrossHero({
  kicker,
  serviceName,
  serviceHref,
  suburbName,
  suburbHref,
  headline,
  supportingCopy,
  primaryAction,
  secondaryAction,
  className,
}: ServiceSuburbCrossHeroProps) {
  const classes = [styles.hero, className].filter(Boolean).join(" ")
  const ariaLabel = `${serviceName} in ${suburbName} hero`

  return (
    <GlassSurface tone="chrome" intensity="high" className={styles.heroWrap}>
      <section
        className={classes}
        role="region"
        aria-label={ariaLabel}
      >
        <span className={styles.scanline} aria-hidden="true" />

        <p className={styles.kicker}>{kicker}</p>

        <ul className={styles.chipRow} aria-label="Service and suburb">
          <li>
            <a className={`${styles.chip} ${styles.chipService}`} href={serviceHref}>
              <span className={styles.chipLabel}>Service</span>
              <span className={styles.chipValue}>{serviceName}</span>
            </a>
          </li>
          <li className={styles.chipJoin} aria-hidden="true">
            <span>in</span>
          </li>
          <li>
            <a className={`${styles.chip} ${styles.chipSuburb}`} href={suburbHref}>
              <span className={styles.chipLabel}>Suburb</span>
              <span className={styles.chipValue}>{suburbName}</span>
            </a>
          </li>
        </ul>

        <h1 className={styles.headline}>{headline}</h1>
        <p className={styles.copy}>{supportingCopy}</p>

        <div className={styles.actions}>
          <a className={`${styles.action} ${styles.actionPrimary}`} href={primaryAction.href}>
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

export default ServiceSuburbCrossHero
