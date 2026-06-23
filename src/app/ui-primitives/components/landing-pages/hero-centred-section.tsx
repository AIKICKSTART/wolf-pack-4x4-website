import { KineticText } from "../typography/kinetic-text"
import type {
  KineticMotionId,
  TypographyFontId,
} from "../../typography/typography-fonts"

import type { LandingAction, LandingBadge } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface HeroCentredSectionProps {
  badge?: LandingBadge
  kicker: string
  /** Plain text — the component wraps it in a KineticText if a motion is set. */
  headline: string
  subhead: string
  primary: LandingAction
  secondary?: LandingAction
  pillars?: ReadonlyArray<{ label: string; value: string }>
  /** Pick a kinetic motion + font for the headline. */
  kinetic?: {
    fontId: TypographyFontId
    motion: KineticMotionId
  }
  className?: string
}

const VARIANT_CLASS = {
  primary: styles.actionPrimary,
  secondary: styles.actionSecondary,
  ghost: styles.actionGhost,
} as const

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

/**
 * Primitive 02 — centred hero with a kinetic display headline (KineticText),
 * background grid pattern, optional badge, subhead, dual CTA, and an optional
 * pillars row.
 */
export function HeroCentredSection({
  badge,
  kicker,
  headline,
  subhead,
  primary,
  secondary,
  pillars,
  kinetic,
  className,
}: HeroCentredSectionProps) {
  const sectionClasses = [styles.section, styles.heroCentred, className]
    .filter(Boolean)
    .join(" ")

  const headlineNode = kinetic ? (
    <KineticText fontId={kinetic.fontId} motion={kinetic.motion} size="hero">
      {headline}
    </KineticText>
  ) : (
    headline
  )

  return (
    <section className={sectionClasses} aria-label="Hero">
      {badge ? (
        <span className={styles.heroCentredBadge}>
          <span aria-hidden="true">●</span>
          {badge.label}
        </span>
      ) : null}
      <span className={styles.heroCentredKicker}>{kicker}</span>
      <h1 className={styles.heroCentredHeadline}>{headlineNode}</h1>
      <p className={styles.heroCentredSubhead}>{subhead}</p>
      <div className={styles.heroCentredActions}>
        <HeroAction
          label={primary.label}
          href={primary.href}
          variant={primary.variant ?? "primary"}
        />
        {secondary ? (
          <HeroAction
            label={secondary.label}
            href={secondary.href}
            variant={secondary.variant ?? "ghost"}
          />
        ) : null}
      </div>
      {pillars && pillars.length > 0 ? (
        <ul className={styles.heroCentredPillars} aria-label="Workshop pillars">
          {pillars.map((pillar) => (
            <li key={pillar.label}>
              <strong>{pillar.value}</strong>
              <span>{pillar.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export default HeroCentredSection
