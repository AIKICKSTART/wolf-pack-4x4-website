import type { Metadata } from "next"

import { FolderBreadcrumb } from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import { DEMO_BREADCRUMB } from "../demo-data"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "Folder breadcrumb | File Browser",
  description:
    "Primitive 06 — folder breadcrumb specialised for paths, collapses to a popover when narrow.",
}

export default function FolderBreadcrumbScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Breadcrumb"
        title="Folder breadcrumb"
        description="Shows the full folder path with a home glyph on the root. When the container is narrow it collapses the middle segments into an ellipsis popover so the user keeps focus on the current folder."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Folder breadcrumb" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Roomy</span>
        <FolderBreadcrumb segments={DEMO_BREADCRUMB} />
        <span className={styles.demoLabel}>Narrow — overflow collapse active</span>
        <div style={{ maxWidth: 360 }}>
          <FolderBreadcrumb
            segments={DEMO_BREADCRUMB}
            collapseThreshold={400}
          />
        </div>
      </section>
    </main>
  )
}
