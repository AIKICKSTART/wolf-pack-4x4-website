import type { Metadata } from "next"

import { FieldPalette } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { PALETTE_SECTIONS } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Field palette | Form builder",
  description:
    "Primitive 01 — the categorised left rail palette of draggable field types for the form builder.",
}

export default function FieldPaletteScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Field palette"
        title="Field palette"
        description="A 256-wide left rail organising every supported field type into Text / Numeric / Selection / Advanced sections. Each row is a draggable affordance with a tone-coded type icon, name, hint, and a six-dot grip handle. Visual only — no real drag wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Field palette" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — full palette</span>
        <div className={styles.demoInline}>
          <FieldPalette sections={PALETTE_SECTIONS} />
        </div>
      </section>
    </main>
  )
}
