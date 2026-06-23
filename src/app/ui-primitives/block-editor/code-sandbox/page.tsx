import type { Metadata } from "next"

import { CodeSandboxBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_ERROR, SANDBOX_BLOCK } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Code sandbox block | Block editor",
  description:
    "Primitive 07 — live HTML / CSS / JS playground with preview pane. Render, edit, and error states.",
}

export default function CodeSandboxBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Code sandbox"
        title="Code sandbox block"
        description="Booking-widget HTML / CSS / JS scaffold rendered into the live preview pane. Pane switcher in edit mode toggles which file the floating toolbar binds to."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Code sandbox" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <CodeSandboxBlock data={SANDBOX_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · pane switcher
          </span>
          <CodeSandboxBlock data={SANDBOX_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <CodeSandboxBlock data={SANDBOX_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
