import { ExternalLink } from "lucide-react"

import type { LandingPartner } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface PartnerLogoGridProps {
  kicker?: string
  heading: string
  body?: string
  partners: ReadonlyArray<LandingPartner>
  className?: string
}

/**
 * Primitive 14 — Partner / supplier logo grid. Each card carries a brand
 * name, category line, and short caption with an external-link icon. The
 * cards are anchors so they link out to the partner's surface.
 */
export function PartnerLogoGrid({
  kicker,
  heading,
  body,
  partners,
  className,
}: PartnerLogoGridProps) {
  const sectionClasses = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={sectionClasses} aria-labelledby="partners-heading">
      <header className={styles.sectionHeader}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 id="partners-heading" className={styles.heading}>
          {heading}
        </h2>
        {body ? <p className={styles.body}>{body}</p> : null}
      </header>

      <ul className={styles.partnerGrid}>
        {partners.map((partner) => (
          <li key={partner.id}>
            <a
              className={styles.partnerCard}
              href={partner.href}
              aria-label={`Visit ${partner.name}`}
            >
              <span className={styles.partnerCardName}>
                {partner.name}{" "}
                <ExternalLink size={12} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className={styles.partnerCardCategory}>{partner.category}</span>
              {partner.caption ? (
                <span className={styles.partnerCardCaption}>{partner.caption}</span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PartnerLogoGrid
