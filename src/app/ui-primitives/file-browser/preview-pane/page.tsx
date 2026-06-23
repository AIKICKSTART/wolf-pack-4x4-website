import type { Metadata } from "next"

import { FilePreviewPane } from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import { DEMO_FILES } from "../demo-data"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "File preview pane | File Browser",
  description:
    "Primitive 07 — right-side preview pane with type chip, size, dimensions, properties accordion, action row.",
}

export default function FilePreviewPaneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Preview"
        title="File preview pane"
        description="A side-rail preview surface for the selected file. Renders large preview or fallback icon, name, type chip, the standard meta block, an EXIF / properties accordion, and a download / share / delete action row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Preview pane" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 380, marginInline: "auto" }}>
          <FilePreviewPane file={DEMO_FILES[0]} />
        </div>
        <span className={styles.demoLabel}>Empty state</span>
        <div style={{ maxWidth: 380, marginInline: "auto" }}>
          <FilePreviewPane file={null} />
        </div>
      </section>
    </main>
  )
}
