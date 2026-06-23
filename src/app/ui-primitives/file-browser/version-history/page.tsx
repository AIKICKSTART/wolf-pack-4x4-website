import type { Metadata } from "next"

import { VersionHistory } from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import { DEMO_VERSIONS } from "../demo-data"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "Version history | File Browser",
  description:
    "Primitive 14 — vertical timeline of file versions with author, timestamp, summary, delta, and restore button.",
}

export default function VersionHistoryScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / History"
        title="Version history"
        description="A vertical timeline of revisions for the selected file. Each entry shows the version label, author avatar + name, timestamp, change summary, signed byte delta, and a restore action — except for the currently-active version."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Version history" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 560, marginInline: "auto" }}>
          <VersionHistory versions={DEMO_VERSIONS} />
        </div>
      </section>
    </main>
  )
}
