import type { Metadata } from "next"

import { FileTree } from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import { DEMO_TREE } from "../demo-data"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "File tree | File Browser",
  description:
    "Primitive 01 — recursive folder tree with chevron rotation, indent guides, and drag handles.",
}

export default function FileTreeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Tree"
        title="File tree"
        description="A typed recursive tree primitive. Folders rotate their chevron, leaves render the file-type icon, indent guides connect descendants, drag handles appear on row hover."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "File tree" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 380 }}>
          <FileTree nodes={DEMO_TREE} defaultExpanded={["root", "fleet"]} activeId="f-1" />
        </div>
      </section>
    </main>
  )
}
