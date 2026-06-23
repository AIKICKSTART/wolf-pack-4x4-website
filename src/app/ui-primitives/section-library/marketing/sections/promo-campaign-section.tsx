import type { ReactNode } from "react"

import {
  FeatureSpotlight,
  StatCounterRow,
  type FeatureSpotlightBullet,
  type StatCounterEntry,
} from "@/app/ui-primitives/components/marketing"
import { Chip } from "@/app/ui-primitives/components/primitives/chip"

import { sectionIcon } from "../icons"

import styles from "./promo-campaign-section.module.css"

export interface PromoCampaignSectionProps {
  /** Eyebrow above the offer headline. */
  kicker: string
  /** The campaign headline. */
  heading: string
  /** Campaign body / terms summary. */
  body: string
  /** Offer pill text, e.g. "Save $200 · ends 30 Jun". */
  offerLabel: string
  /** Primary CTA. */
  ctaLabel: string
  ctaHref: string
  /** Headline metrics — composes StatCounterRow. */
  stats: ReadonlyArray<StatCounterEntry>
  /** Spotlight visual node (image, plate, etc.). */
  spotlightVisual: ReactNode
  /** Spotlight heading. */
  spotlightHeading: string
  /** Spotlight body. */
  spotlightBody: string
  /** Spotlight bullets — composes FeatureSpotlight. */
  spotlightBullets?: ReadonlyArray<FeatureSpotlightBullet>
  className?: string
}

/**
 * Promo campaign section — a time-boxed offer banner with a metallic CTA, a row
 * of count-up stats (StatCounterRow), and a product spotlight (FeatureSpotlight).
 * Token-driven; the CTA uses the central metallic-red→amber button DNA.
 */
export function PromoCampaignSection({
  kicker,
  heading,
  body,
  offerLabel,
  ctaLabel,
  ctaHref,
  stats,
  spotlightVisual,
  spotlightHeading,
  spotlightBody,
  spotlightBullets,
  className,
}: PromoCampaignSectionProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <div className={styles.banner}>
        <div className={styles.bannerGlow} aria-hidden="true" />
        <div className={styles.bannerCopy}>
          <div className={styles.bannerTop}>
            <span className={styles.kicker}>{kicker}</span>
            <Chip label={offerLabel} tone="amber" />
          </div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>{body}</p>
        </div>
        <a className={styles.cta} href={ctaHref}>
          <span>{ctaLabel}</span>
          <span className={styles.ctaIcon} aria-hidden="true">
            {sectionIcon("arrow")}
          </span>
        </a>
      </div>

      <StatCounterRow entries={stats} />

      <FeatureSpotlight
        kicker={kicker}
        heading={spotlightHeading}
        body={spotlightBody}
        visual={spotlightVisual}
        bullets={spotlightBullets}
        action={{ label: ctaLabel, href: ctaHref }}
      />
    </section>
  )
}

export default PromoCampaignSection
