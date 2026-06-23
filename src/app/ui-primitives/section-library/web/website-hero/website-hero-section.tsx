"use client"

import { TextFirstHero } from "../../../components/marketing"
import {
  CheckeredFlagIcon,
  MufflerIcon,
  ShieldTickIcon,
  WorkshopBayIcon,
} from "../../../components/icons"

import styles from "./website-hero-section.module.css"

export interface WebsiteHeroSectionProps {
  /** Eyebrow line above the headline. */
  kicker?: string
  /** Two-line display headline (each entry renders on its own line). */
  headlineLines?: readonly string[]
  /** Supporting paragraph beneath the headline. */
  subhead?: string
  /** Primary call-to-action label. */
  primaryLabel?: string
  /** Primary call-to-action href. */
  primaryHref?: string
  /** Secondary call-to-action label. */
  secondaryLabel?: string
  /** Secondary call-to-action href. */
  secondaryHref?: string
  className?: string
}

const DEFAULT_HEADLINE: readonly string[] = ["Exhaust done", "the right way"]

const TRUST: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Years on the South Coast", value: "20+" },
  { label: "Systems built & fitted", value: "8,400" },
  { label: "Workmanship warranty", value: "Lifetime" },
]

/**
 * Website hero — the top-of-page brand statement for the Oak Flats Mufflermen
 * public site. Composes the `TextFirstHero` marketing primitive with a
 * carbon-fibre brand visual built from domain icons. Fully token-driven,
 * light/dark, reduced-motion safe (the hero + reveal primitives handle motion).
 */
export function WebsiteHeroSection({
  kicker = "Oak Flats · Illawarra exhaust specialists",
  headlineLines = DEFAULT_HEADLINE,
  subhead = "Custom mandrel-bent exhaust, performance systems, and honest repairs — fabricated in-house and fitted while you wait. No guesswork, no upsell, just clean flow and the right note.",
  primaryLabel = "Book a fit-up",
  primaryHref = "/book",
  secondaryLabel = "See our work",
  secondaryHref = "/gallery",
  className,
}: WebsiteHeroSectionProps) {
  const classes = [styles.host, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <span className={styles.weave} aria-hidden="true" />
      <div className={styles.layout}>
        <TextFirstHero
          className={styles.hero}
          kicker={kicker}
          headline={
            <>
              {headlineLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </>
          }
          subhead={subhead}
          primaryAction={{ label: primaryLabel, href: primaryHref, tone: "red" }}
          secondaryAction={{ label: secondaryLabel, href: secondaryHref, tone: "chrome" }}
          trust={TRUST}
          layout="left-aligned"
        />

        <aside className={styles.visual} aria-label="Workshop at a glance">
          <span className={styles.visualSheen} aria-hidden="true" />
          <div className={styles.bayBadge}>
            <WorkshopBayIcon size={40} tone="amber" title="Workshop bay" />
            <div>
              <strong>Bay 1 · Open</strong>
              <span>Mandrel bender warm and ready</span>
            </div>
          </div>
          <ul className={styles.featureList}>
            <li>
              <MufflerIcon size={20} tone="red" title="Mufflers" />
              <span>Quiet, mellow, or full-noise — your call</span>
            </li>
            <li>
              <ShieldTickIcon size={20} tone="teal" title="Warranty" />
              <span>Every weld backed for life</span>
            </li>
            <li>
              <CheckeredFlagIcon size={20} tone="green" title="Same day" />
              <span>Most jobs in and out the same day</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default WebsiteHeroSection
