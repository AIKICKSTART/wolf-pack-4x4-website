import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EditorShell } from "./_editor-shell"
import styles from "./cms-editor.module.css"

export const metadata: Metadata = {
  title: "CMS page editor | Torque",
  description:
    "The visual page-builder Torque hands the owner — page tree, drag-and-drop canvas, slot inspector, block library and publish flow, editing a real Oak Flats Muffler Men campaign landing page. Composed entirely from registered UI primitives.",
}

export default function CmsEditorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Content surface"
        title="CMS page editor"
        description="The WordPress-grade editing surface for the Oak Flats Muffler Men site, built so the owner can ship a page without touching code. Pick a page on the left, drag blocks onto the canvas in the middle, tune copy and media in the inspector on the right, then walk it through review to publish. Live, light + dark, responsive, and assembled only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque/cms-editor" },
          { label: "CMS page editor" },
        ]}
      />

      <section className={styles.demoSurface} aria-label="CMS page editor composition">
        <span className={styles.demoLabel}>
          Composition · editing /{`deals/tow-pack-winter`} · 7 blocks · draft
        </span>
        <EditorShell />
      </section>
    </main>
  )
}
