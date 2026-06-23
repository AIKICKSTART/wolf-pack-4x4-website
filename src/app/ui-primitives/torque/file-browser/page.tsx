import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FileBrowserScene } from "./file-browser-scene"
import styles from "./file-browser.module.css"

export const metadata: Metadata = {
  title: "File browser | UI Primitives — Torque",
}

export default function FileBrowserPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Torque / Asset library"
        title="File browser"
        description="The Oak Flats Muffler Men asset library, the way Torque keeps it tidy — folder tree, sortable file list, breadcrumb, a live preview pane with version history, and drag-and-drop uploads. Fitment photos, dyno clips, fabrication CAD and customer handover packs in one place. Delete sits behind a confirm so nothing leaves the Illawarra workshop by accident."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque" },
          { label: "File browser" },
        ]}
      />
      <section className={styles.canvas}>
        <FileBrowserScene />
      </section>
    </main>
  )
}
