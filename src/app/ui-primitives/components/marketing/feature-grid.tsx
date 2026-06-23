import type { ReactNode } from "react"

import { Reveal } from "../motion"

import styles from "./feature-grid.module.css"

export interface FeatureGridItem {
  id: string
  icon: ReactNode
  title: string
  description: string
  href?: string
  linkLabel?: string
}

export interface FeatureGridProps {
  kicker?: string
  heading?: string
  body?: string
  columns?: 2 | 3 | 4
  features: ReadonlyArray<FeatureGridItem>
  className?: string
}

const COLUMN_CLASS: Record<2 | 3 | 4, string> = {
  2: styles.cols2,
  3: styles.cols3,
  4: styles.cols4,
}

export function FeatureGrid({
  kicker,
  heading,
  body,
  columns = 3,
  features,
  className,
}: FeatureGridProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading ?? "Features"}>
      {(kicker || heading || body) && (
        <header className={styles.header}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>
      )}
      <ul className={`${styles.grid} ${COLUMN_CLASS[columns]}`}>
        {features.map((feature, index) => (
          <Reveal
            key={feature.id}
            as="li"
            from="below"
            delay={index * 90}
            className={styles.item}
          >
            <span className={styles.icon} aria-hidden="true">
              {feature.icon}
            </span>
            <h3 className={styles.itemTitle}>{feature.title}</h3>
            <p className={styles.itemBody}>{feature.description}</p>
            {feature.href ? (
              <a className={styles.itemLink} href={feature.href}>
                {feature.linkLabel ?? "Learn more"}
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default FeatureGrid
