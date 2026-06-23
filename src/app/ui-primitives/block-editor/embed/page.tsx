import type { Metadata } from "next"

import { EmbedBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { EMBED_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Embed block | Block editor",
  description:
    "Primitive 04 — YouTube / Vimeo / CodePen / Twitter embed with aspect-ratio picker. Render, edit, and error states.",
}

export default function EmbedBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Embed"
        title="Embed block"
        description="Bay 3 walk-around video embedded from YouTube with the aspect-ratio picker and provider switcher in edit mode. Three states — preview, editing with URL input, and error."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Embed" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <EmbedBlock data={EMBED_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · provider + aspect
          </span>
          <EmbedBlock data={EMBED_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <EmbedBlock data={EMBED_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
