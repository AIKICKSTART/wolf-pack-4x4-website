import { FeatureSpotlight } from "../marketing"

import styles from "./service-detail-hero.module.css"

export interface ServiceDetailHeroCta {
  label: string
  href: string
}

export interface ServiceDetailHeroProps {
  /** Small kicker text shown above the headline. */
  kicker: string
  /** Display headline. */
  headline: string
  /** Supporting copy. */
  body: string
  /** Cover image-placeholder kicker, e.g. "PHOTO". */
  coverLabel?: string
  /** Cover image-placeholder title, e.g. service name. */
  coverTitle?: string
  /** Cover image-placeholder helper text. */
  coverHelper?: string
  /** Sound scope chip label, e.g. "Tone control". */
  soundChip: string
  /** Compliance scope chip label, e.g. "ADR-compliant". */
  complianceChip: string
  /** Performance scope chip label, e.g. "Flow gain". */
  performanceChip: string
  /** Primary CTA — typically "Book service". */
  primaryCta: ServiceDetailHeroCta
  /** Secondary CTA — typically "Get a quote". */
  secondaryCta: ServiceDetailHeroCta
  /** Optional aria-label override for the hero region. */
  ariaLabel?: string
}

function CoverPlaceholder({
  label,
  title,
  helper,
  alt,
}: {
  label: string
  title: string
  helper: string
  alt: string
}) {
  return (
    <div
      className={styles.cover}
      role="img"
      aria-label={alt}
    >
      <span className={styles.coverLabel}>
        <small>{label}</small>
        <strong>{title}</strong>
        <em>{helper}</em>
      </span>
    </div>
  )
}

/**
 * Service detail hero adapter. Composes the marketing `FeatureSpotlight`
 * primitive — the spotlight slot carries a cover image placeholder, and
 * the scope (Sound / Compliance / Performance) is supplied as the bullet
 * row. The primary booking CTA is the spotlight action; the secondary
 * quote CTA is rendered as a second action below the spotlight bullets.
 */
export function ServiceDetailHero({
  kicker,
  headline,
  body,
  coverLabel = "Workshop preview",
  coverTitle = "Cover image",
  coverHelper = "1600 × 900 hero asset slot",
  soundChip,
  complianceChip,
  performanceChip,
  primaryCta,
  secondaryCta,
  ariaLabel = "Service detail hero",
}: ServiceDetailHeroProps) {
  return (
    <div role="region" aria-label={ariaLabel} className={styles.hero}>
      <FeatureSpotlight
        kicker={kicker}
        heading={headline}
        body={body}
        visual={
          <CoverPlaceholder
            label={coverLabel}
            title={coverTitle}
            helper={coverHelper}
            alt={`${coverTitle} placeholder for ${headline}`}
          />
        }
        bullets={[
          { label: `Sound — ${soundChip}` },
          { label: `Compliance — ${complianceChip}` },
          { label: `Performance — ${performanceChip}` },
        ]}
        action={primaryCta}
      />
      <div className={styles.actions}>
        <a className={styles.secondaryCta} href={secondaryCta.href}>
          {secondaryCta.label}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}

export default ServiceDetailHero
