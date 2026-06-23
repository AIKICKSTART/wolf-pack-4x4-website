import type { Metadata } from "next"

import { CtaBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { CTA_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Call-to-action block | Block editor",
  description:
    "Primitive 14 — call-to-action block with heading, body, button, and background image. Render, edit, and error states.",
}

export default function CtaBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Call to action"
        title="Call-to-action block"
        description="Bay 4 dyno booking CTA — heading, body, button, accent tone picker, and optional background image. Edit mode swaps tone and button copy in place."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Call to action" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <CtaBlock data={CTA_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · tone + label
          </span>
          <CtaBlock data={CTA_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <CtaBlock data={CTA_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
