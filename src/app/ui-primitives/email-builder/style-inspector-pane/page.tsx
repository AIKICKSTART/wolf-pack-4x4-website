import type { Metadata } from "next"

import { StyleInspectorPane } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { SELECTED_BLOCK } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Style inspector pane | Email builder",
  description:
    "Primitive 03 — the right-hand block inspector with colour, font, padding, margin sliders, and alignment chips.",
}

export default function StyleInspectorPaneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Style inspector pane"
        title="Style inspector pane"
        description="The inspector wraps a scoped ThemeController so the TokenColorPicker and TokenFontPicker primitives can edit the selected block's colour and typography in isolation. Padding and margin sliders flank the alignment chip row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Style inspector pane" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Book a bay button</span>
        <div className={styles.demoInline}>
          <StyleInspectorPane block={SELECTED_BLOCK} />
        </div>
      </section>
    </main>
  )
}
