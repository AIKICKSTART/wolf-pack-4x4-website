import type { Metadata } from "next"

import { FaqAccordionSection } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { FAQ_ENTRIES } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "FAQ accordion section | Landing Pages",
  description: "Primitive 08 — accordion FAQ with live search filter.",
}

export default function FaqAccordionSectionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / FAQ accordion"
        title="FAQ accordion section"
        description="Single-open accordion with a live search filter — narrows entries by question, answer, and tag. Three states: full searchable, compact (no search), and noise-only filtered view."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "FAQ accordion section" },
        ]}
      />

      <span className={styles.stageCaption}>State · Full FAQ with search</span>
      <FaqAccordionSection
        kicker="Workshop FAQ"
        heading="The questions we hear before every booking."
        body="Search by keyword — Mufflermen reception flags the answer."
        entries={FAQ_ENTRIES}
      />

      <span className={styles.stageCaption}>State · Compact FAQ (no search)</span>
      <FaqAccordionSection
        heading="Quick answers · top 3"
        entries={FAQ_ENTRIES.slice(0, 3)}
        searchable={false}
      />

      <span className={styles.stageCaption}>State · Noise-tagged entries only</span>
      <FaqAccordionSection
        kicker="Drone + noise"
        heading="Highway drone, hot-side rumble, and ADR limits"
        entries={FAQ_ENTRIES.filter((entry) => entry.tags?.includes("noise"))}
      />
    </main>
  )
}
