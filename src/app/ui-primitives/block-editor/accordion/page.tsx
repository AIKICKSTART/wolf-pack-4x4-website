import type { Metadata } from "next"

import { AccordionBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { ACCORDION_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Accordion block | Block editor",
  description:
    "Primitive 13 — collapsible Q&A block with expand-all / collapse-all controls. Render, edit, and error states.",
}

export default function AccordionBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Accordion"
        title="Accordion block"
        description="Workshop FAQ — roadworthy after a cat-back swap, Manta 2.5″ noise levels, EV body work, lead times. Expand-all and collapse-all in edit mode."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Accordion" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <AccordionBlock data={ACCORDION_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · expand / collapse all
          </span>
          <AccordionBlock data={ACCORDION_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <AccordionBlock data={ACCORDION_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
