import type { Metadata } from "next"

import { FileRow } from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import { DEMO_FILES } from "../demo-data"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "File row | File Browser",
  description:
    "Primitive 03 — list-view row with type icon, name, size, modified, owner avatar, and actions chevron.",
}

export default function FileRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Row"
        title="File row"
        description="One table row showing icon, filename, size, modified time, owner avatar, and a trailing actions chevron. Designed to live inside the list view but renderable on its own."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "File row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div
          style={{
            border: "1px solid var(--primitive-line)",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <tbody>
              <FileRow file={DEMO_FILES[0]} selected />
              <FileRow file={DEMO_FILES[2]} />
              <FileRow file={DEMO_FILES[6]} />
              <FileRow file={DEMO_FILES[4]} />
              <FileRow file={DEMO_FILES[7]} />
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
