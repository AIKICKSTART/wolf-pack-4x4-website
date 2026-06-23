import type { Metadata } from "next"

import { DividerBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"
import type { BlockData, DividerPayload } from "../../components/block-editor"

import { DIVIDER_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Divider block | Block editor",
  description:
    "Primitive 09 — section divider variants (line / dot / icon / wave / zigzag). Render, edit, and error states.",
}

/** Five variants displayed inline so the showcase covers every divider style. */
const VARIANT_DEMOS: ReadonlyArray<BlockData<DividerPayload>> = (
  ["line", "dot", "icon", "wave", "zigzag"] as const
).map((variant) => ({
  ...DIVIDER_BLOCK,
  id: `${DIVIDER_BLOCK.id}-${variant}`,
  payload: {
    ...DIVIDER_BLOCK.payload,
    variant,
    label: variant === "line" ? "Bay change" : variant === "icon" ? "Section break" : undefined,
  },
}))

export default function DividerBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Divider"
        title="Divider block"
        description="Five visual divider variants — line with label, dot run, sparkle icon, dotted wave, and zigzag stitch. Edit mode toggles variant and lets you set a centre label."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Divider" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · five variants</span>
          {VARIANT_DEMOS.map((demo) => (
            <DividerBlock key={demo.id} data={demo} mode="preview" />
          ))}
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · variant picker
          </span>
          <DividerBlock data={DIVIDER_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <DividerBlock data={DIVIDER_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
