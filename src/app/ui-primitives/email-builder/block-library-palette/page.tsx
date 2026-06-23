import type { Metadata } from "next"

import { BlockLibraryPalette } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { BLOCK_PALETTE_SECTIONS } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Block library palette | Email builder",
  description:
    "Primitive 02 — the left rail of drag-from blocks: heading, image, button, divider, columns, social row, spacer, footer, HTML, and personalisation tokens.",
}

export default function BlockLibraryPaletteScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Block library palette"
        title="Block library palette"
        description="A categorised palette of draggable email blocks composed on top of the form-builder FieldPalette primitive. Structure, media, and advanced sections keep the rail scannable while the existing tone + icon system maps cleanly across email block kinds."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Block library palette" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — full palette</span>
        <div className={styles.demoInline}>
          <BlockLibraryPalette sections={BLOCK_PALETTE_SECTIONS} />
        </div>
      </section>
    </main>
  )
}
