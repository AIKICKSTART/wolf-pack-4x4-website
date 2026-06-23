"use client"

import { useState } from "react"

import { VersionSelector } from "../../components/docs-suite"
import type { DocsVersionId } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_VERSIONS } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export default function VersionSelectorPage() {
  const [version, setVersion] = useState<DocsVersionId>("v2.0")

  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 02"
        title="Version selector"
        description="Switches between v1.0, v2.0 (current), and v3.0-beta. Pinned in the top-right of the doc shell. Flags breaking-change releases so callers know to read the migration notes first."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Version selector" },
        ]}
      />
      <section className={styles.canvas} aria-label="Version selector demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Used at the top of every Trade Account API page. Picking v3.0-beta surfaces the
            breaking-change banner inline so callers do not silently upgrade.
          </p>
        </div>
        <div className={styles.stage}>
          <div className={styles.stageRow}>
            <span className={styles.stageHelp}>Selected · {version}</span>
            <VersionSelector
              versions={DOCS_VERSIONS}
              value={version}
              onChange={setVersion}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
