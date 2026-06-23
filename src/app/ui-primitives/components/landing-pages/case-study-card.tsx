import { Download } from "lucide-react"

import type { LandingCaseStudy } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface CaseStudyCardProps {
  caseStudy: LandingCaseStudy
  /** PDF link label. Defaults to "Download case study PDF". */
  pdfLabel?: string
  className?: string
}

/**
 * Primitive 11 — Case study card. Three labelled blocks (problem / solution /
 * results) with an outcomes list and a footer PDF download CTA.
 */
export function CaseStudyCard({
  caseStudy,
  pdfLabel = "Download case study PDF",
  className,
}: CaseStudyCardProps) {
  const classes = [styles.caseStudy, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Case study — ${caseStudy.client}`}>
      <header className={styles.caseStudyHead}>
        <h3 className={styles.caseStudyClient}>{caseStudy.client}</h3>
        <span className={styles.caseStudyVehicle}>{caseStudy.vehicle}</span>
      </header>

      <div className={styles.caseStudyBlocks}>
        <section className={styles.caseStudyBlock}>
          <span className={styles.caseStudyBlockTitle}>Problem</span>
          <p className={styles.caseStudyBlockBody}>{caseStudy.problem}</p>
        </section>
        <section className={styles.caseStudyBlock}>
          <span className={styles.caseStudyBlockTitle}>Solution</span>
          <p className={styles.caseStudyBlockBody}>{caseStudy.solution}</p>
        </section>
      </div>

      <ul className={styles.caseStudyResults} aria-label="Outcomes">
        {caseStudy.results.map((result) => (
          <li key={result.label}>
            <strong>{result.value}</strong>
            <span>{result.label}</span>
          </li>
        ))}
      </ul>

      <footer className={styles.caseStudyFooter}>
        <a
          className={`${styles.action} ${styles.actionSecondary}`}
          href={caseStudy.pdfHref}
          download
        >
          <Download size={14} aria-hidden="true" />
          <span>{pdfLabel}</span>
        </a>
      </footer>
    </article>
  )
}

export default CaseStudyCard
