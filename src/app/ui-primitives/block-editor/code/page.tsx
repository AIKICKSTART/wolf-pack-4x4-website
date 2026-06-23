import type { Metadata } from "next"

import { CodeBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { CODE_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Code block | Block editor",
  description:
    "Primitive 02 — code block with language picker, syntax theme, copy, and line numbers. Render, edit, and error states.",
}

export default function CodeBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Code"
        title="Code block"
        description="Bash fitment-check + parts-API JSON snippets with deterministic per-token highlighting, four themes, copy-to-clipboard, and toggleable line numbers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Code" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <CodeBlock data={CODE_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · language + theme
          </span>
          <CodeBlock data={CODE_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <CodeBlock data={CODE_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
