import { Reveal } from "../motion/reveal"

import type { PartCardSummary } from "./parts-pages-types"

import { PartResultCard } from "./part-result-card"

import styles from "./related-parts-rail.module.css"

export interface RelatedPartsRailProps {
  heading?: string
  kicker?: string
  /** Optional helper line under the heading. */
  description?: string
  parts: ReadonlyArray<PartCardSummary>
  className?: string
}

export function RelatedPartsRail({
  heading = "Related parts",
  kicker,
  description,
  parts,
  className,
}: RelatedPartsRailProps) {
  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={heading}
    >
      <header className={styles.header}>
        <div>
          {kicker && <span className={styles.kicker}>{kicker}</span>}
          <h2 className={styles.heading}>{heading}</h2>
          {description && <p className={styles.body}>{description}</p>}
        </div>
        <span className={styles.count}>{parts.length} matches</span>
      </header>

      <ul className={styles.rail} aria-label={`${heading} carousel`}>
        {parts.map((part, index) => (
          <Reveal key={part.id} as="li" from="below" delay={index * 60} className={styles.item}>
            <PartResultCard {...part} />
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default RelatedPartsRail
