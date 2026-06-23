import type { Metadata } from "next"

import { FileCard } from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import { DEMO_FILES } from "../demo-data"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "File card | File Browser",
  description:
    "Primitive 02 — grid-view card with preview thumbnail, filename, meta line, and kebab menu trigger.",
}

export default function FileCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Card"
        title="File card"
        description="A single grid-view tile. Either renders a thumbnail or the file-type icon, surfaces filename and size · modified, and exposes a kebab affordance on hover."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "File card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 14,
          }}
        >
          <FileCard file={DEMO_FILES[0]} selected />
          <FileCard file={DEMO_FILES[2]} />
          <FileCard file={DEMO_FILES[6]} />
          <FileCard file={DEMO_FILES[4]} />
        </div>
      </section>
    </main>
  )
}
