import type { ReactNode } from "react"

import { Reveal } from "../motion"

import styles from "./feature-spotlight.module.css"

export interface FeatureSpotlightBullet {
  icon?: ReactNode
  label: string
}

export interface FeatureSpotlightAction {
  label: string
  href: string
}

export interface FeatureSpotlightProps {
  kicker: string
  heading: string
  body: string
  visual: ReactNode
  bullets?: ReadonlyArray<FeatureSpotlightBullet>
  action?: FeatureSpotlightAction
  /** When true, the visual sits on the right and copy on the left. Default false (visual left). */
  reversed?: boolean
  className?: string
}

export function FeatureSpotlight({
  kicker,
  heading,
  body,
  visual,
  bullets,
  action,
  reversed = false,
  className,
}: FeatureSpotlightProps) {
  const classes = [
    styles.section,
    reversed ? styles.reversed : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <Reveal as="div" from={reversed ? "right" : "left"} className={styles.visual}>
        {visual}
      </Reveal>
      <Reveal as="div" from={reversed ? "left" : "right"} delay={120} className={styles.copy}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.body}>{body}</p>
        {bullets && bullets.length > 0 ? (
          <ul className={styles.bullets}>
            {bullets.map((bullet) => (
              <li key={bullet.label}>
                {bullet.icon ? (
                  <span className={styles.bulletIcon} aria-hidden="true">
                    {bullet.icon}
                  </span>
                ) : (
                  <span className={styles.bulletDot} aria-hidden="true" />
                )}
                <span>{bullet.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {action ? (
          <a className={styles.action} href={action.href}>
            <span>{action.label}</span>
            <span className={styles.arrow} aria-hidden="true" />
          </a>
        ) : null}
      </Reveal>
    </section>
  )
}

export default FeatureSpotlight
