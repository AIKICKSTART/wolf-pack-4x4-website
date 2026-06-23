import type { Metadata } from "next"

import { ChangelogStrip } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_CHANGELOG } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Changelog strip | UI Primitives — Docs Suite",
}

export default function ChangelogStripPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 12"
        title="Changelog strip"
        description="Compact strip of the most recent changes on the current docs page. Categorises every entry as Added, Fixed, Changed, or Deprecated and links into the full release notes."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Changelog strip" },
        ]}
      />
      <section className={styles.canvas} aria-label="Changelog strip demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Drops into the right-rail of an article so the reader can see whether anything on
            this page has changed since last read. Deprecated entries surface in red.
          </p>
        </div>
        <div className={styles.stage}>
          <ChangelogStrip
            entries={DOCS_CHANGELOG}
            viewAllHref="/ui-primitives/docs-suite/article-browser"
          />
        </div>
      </section>
    </main>
  )
}
