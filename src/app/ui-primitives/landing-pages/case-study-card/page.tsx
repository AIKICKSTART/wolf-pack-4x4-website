import type { Metadata } from "next"

import { CaseStudyCard } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { CASE_STUDIES } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Case study card | Landing Pages",
  description: "Primitive 11 — case-study card with problem, solution, results, and PDF download.",
}

export default function CaseStudyCardPage() {
  const council = CASE_STUDIES[0]!
  const rideshare = CASE_STUDIES[1]!

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Case study"
        title="Case study card"
        description="Case-study card with problem / solution / results blocks. Three states: council fleet, rideshare cat-protection, and a compact (results-led) variant."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Case study card" },
        ]}
      />

      <span className={styles.stageCaption}>State · Council fleet</span>
      <CaseStudyCard caseStudy={council} />

      <span className={styles.stageCaption}>State · Rideshare cat-protection</span>
      <CaseStudyCard caseStudy={rideshare} />

      <span className={styles.stageCaption}>State · Results-led compact variant</span>
      <CaseStudyCard
        caseStudy={{
          ...council,
          problem:
            "Quarterly noise-audit fails were taking civil trucks off Shellharbour job sites for 48 hours at a time.",
          solution:
            "Mufflermen scoped every vehicle, replaced the systems, and locked in a Fleet Plus audit contract.",
        }}
        pdfLabel="Get the 2-page summary"
      />
    </main>
  )
}
