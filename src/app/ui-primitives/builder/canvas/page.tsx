import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CanvasRoot } from "./canvas-root"
import styles from "./canvas.module.css"

export const metadata: Metadata = {
  title: "Builder canvas | UI Primitives — Builder",
}

export default function BuilderCanvasPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Builder · Canvas"
        title="Drag-and-drop builder canvas"
        description="Compose a page from registered blocks: drag from the palette, reorder, select, and edit properties in the inspector. Switch style profile, light/dark, and viewport; undo/redo, duplicate, hide, delete, save a draft, export/import JSON. Publishing is gated behind an approval request."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Builder" },
          { label: "Canvas" },
        ]}
      />
      <section className={styles.canvasShell} aria-label="Page builder">
        <CanvasRoot />
      </section>
    </main>
  )
}
