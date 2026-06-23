import type { ReactNode } from "react"

import type { LandingHeroSplitCopy, LandingMediaTile } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface HeroSplitSectionProps extends LandingHeroSplitCopy {
  media: LandingMediaTile
  /** Place the media on the left instead of the right. */
  mediaSide?: "left" | "right"
  className?: string
}

const VARIANT_CLASS: Record<"primary" | "secondary" | "ghost", string> = {
  primary: styles.actionPrimary,
  secondary: styles.actionSecondary,
  ghost: styles.actionGhost,
}

function HeroAction({
  label,
  href,
  variant = "primary",
}: {
  label: string
  href: string
  variant?: "primary" | "secondary" | "ghost"
}) {
  return (
    <a className={`${styles.action} ${VARIANT_CLASS[variant]}`} href={href}>
      <span>{label}</span>
      <span className={styles.arrow} aria-hidden="true" />
    </a>
  )
}

function HeroMedia({ media }: { media: LandingMediaTile }): ReactNode {
  return (
    <div className={styles.heroSplitMedia} aria-hidden="true">
      {media.badge ? (
        <span className={styles.heroSplitMediaBadge}>{media.badge}</span>
      ) : null}
      <div className={styles.heroSplitMediaCore}>
        <span>{media.label}</span>
      </div>
      {media.caption ? (
        <span className={styles.heroSplitMediaCaption}>{media.caption}</span>
      ) : null}
    </div>
  )
}

/**
 * Primitive 01 — Split-screen hero with copy on one side and a media placeholder
 * on the other. Includes badge, kicker, headline (ReactNode so consumers can
 * drop in KineticText), subhead, optional bullets, and dual CTA.
 */
export function HeroSplitSection({
  badge,
  kicker,
  headline,
  subhead,
  bullets,
  primary,
  secondary,
  media,
  mediaSide = "right",
  className,
}: HeroSplitSectionProps) {
  const sectionClasses = [styles.section, styles.heroSplit, className]
    .filter(Boolean)
    .join(" ")

  const copy = (
    <div className={styles.heroSplitCopy}>
      {badge ? (
        <span className={styles.heroSplitBadge}>
          <span aria-hidden="true">●</span>
          {badge.label}
        </span>
      ) : null}
      <span className={styles.kicker}>{kicker}</span>
      <h1 className={styles.heroSplitHeadline}>{headline}</h1>
      <p className={styles.heroSplitSubhead}>{subhead}</p>
      {bullets && bullets.length > 0 ? (
        <ul className={styles.heroSplitBullets}>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      <div className={styles.heroSplitActions}>
        <HeroAction
          label={primary.label}
          href={primary.href}
          variant={primary.variant ?? "primary"}
        />
        {secondary ? (
          <HeroAction
            label={secondary.label}
            href={secondary.href}
            variant={secondary.variant ?? "secondary"}
          />
        ) : null}
      </div>
    </div>
  )

  return (
    <section className={sectionClasses} aria-label="Hero">
      {mediaSide === "left" ? (
        <>
          <HeroMedia media={media} />
          {copy}
        </>
      ) : (
        <>
          {copy}
          <HeroMedia media={media} />
        </>
      )}
    </section>
  )
}

export default HeroSplitSection
