import type { Metadata } from "next"

import { QuoteBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { QUOTE_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Quote block | Block editor",
  description:
    "Primitive 05 — pull-quote with citation, author, and an optional headshot. Render, edit, and error states.",
}

export default function QuoteBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Quote"
        title="Quote block"
        description="Mick Davis's LandCruiser testimonial in the with-image variant — pull-quote text, named citation, and a fallback initials avatar. Switch variants and edit the citation in edit mode."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Quote" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <QuoteBlock data={QUOTE_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · variant + citation
          </span>
          <QuoteBlock data={QUOTE_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <QuoteBlock data={QUOTE_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
