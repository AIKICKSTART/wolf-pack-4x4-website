import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { FullExplorerDemo } from "./full-explorer-demo"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "Full explorer | File Browser",
  description:
    "Composition — three-pane file explorer combining tree, grid / list, preview, breadcrumb, upload zone, and bulk action bar.",
}

export default function FullExplorerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full explorer"
        title="Full explorer composition"
        description="All file-browser primitives composed into a single three-pane experience. Tree on the left, grid or list view in the middle with a view toggle, preview pane on the right, breadcrumb across the top, upload zone in the footer, and the bulk action bar floating over selection."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Full explorer" },
        ]}
      />
      <FullExplorerDemo />
    </main>
  )
}
