import type { Metadata } from "next"

import { DamFolderTree } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import { DEMO_FOLDER_TREE } from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "DAM folder tree | Asset Library",
  description:
    "Primitive 02 — media-focused folder tree with per-folder asset counts and drag-target indicators.",
}

export default function DamFolderTreeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Folder Tree"
        title="DAM folder tree"
        description="Distinct from the generic file-browser tree — every folder advertises its media count and any folder being targeted for a drag operation shows a Drop here chip. Bay 2 illustrates the drag-target state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "DAM folder tree" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 360 }}>
          <DamFolderTree
            nodes={DEMO_FOLDER_TREE}
            defaultExpandedIds={["folder-root", "folder-workshop"]}
            selectedId="folder-workshop-bay-2"
          />
        </div>
      </section>
    </main>
  )
}
