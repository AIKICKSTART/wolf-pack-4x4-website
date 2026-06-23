import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LinkedArticlesSuggester } from "../../components/support"

import { LINKED_ARTICLES } from "../_mock-data"
import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Linked articles suggester | Support",
  description:
    "Primitive 10 — knowledge-base side panel with match-score chips and open-in-side-pane CTAs.",
}

export default function LinkedArticlesSuggesterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Side panel"
        title="Linked articles suggester"
        description="Side panel for the agent — KB titles ranked by match score with category caption and an Open-in-side-pane CTA. Match-score chip turns green above 80, amber between 60 and 80, neutral below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Linked articles suggester" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · suggestions for ticket MM-4187</span>
        <LinkedArticlesSuggester
          ticketSubject="Hilux fitment query — Manta 3in cat-back"
          suggestions={LINKED_ARTICLES}
        />
      </section>
    </main>
  )
}
