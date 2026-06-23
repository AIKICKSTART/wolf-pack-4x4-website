import type { LandingAction } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface CtaBandSectionProps {
  kicker?: string
  title: string
  subtext?: string
  primary: LandingAction
  secondary?: LandingAction
  className?: string
}

const VARIANT_CLASS = {
  primary: styles.actionPrimary,
  secondary: styles.actionSecondary,
  ghost: styles.actionGhost,
} as const

/**
 * Primitive 12 — Full-width CTA band with a layered background image (built
 * from radial gradients), a kicker, headline, sub-text, and a primary CTA
 * with an optional secondary ghost button.
 */
export function CtaBandSection({
  kicker,
  title,
  subtext,
  primary,
  secondary,
  className,
}: CtaBandSectionProps) {
  const classes = [styles.ctaBand, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-labelledby="cta-band-title">
      <div className={styles.ctaBandCopy}>
        {kicker ? <span className={styles.ctaBandKicker}>{kicker}</span> : null}
        <h2 id="cta-band-title" className={styles.ctaBandTitle}>
          {title}
        </h2>
        {subtext ? <p className={styles.ctaBandSubtext}>{subtext}</p> : null}
      </div>
      <div className={styles.ctaBandActions}>
        <a
          className={`${styles.action} ${VARIANT_CLASS[primary.variant ?? "primary"]}`}
          href={primary.href}
        >
          <span>{primary.label}</span>
          <span className={styles.arrow} aria-hidden="true" />
        </a>
        {secondary ? (
          <a
            className={`${styles.action} ${VARIANT_CLASS[secondary.variant ?? "ghost"]}`}
            href={secondary.href}
          >
            <span>{secondary.label}</span>
            <span className={styles.arrow} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </section>
  )
}

export default CtaBandSection
