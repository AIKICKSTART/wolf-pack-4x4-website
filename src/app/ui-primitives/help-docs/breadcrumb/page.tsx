import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DocBreadcrumb } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Doc breadcrumb | UI Primitives — Help & Docs",
}

export default function DocBreadcrumbPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 08"
        title="Doc breadcrumb"
        description="Reuses the existing breadcrumb primitive with context-style chevron separators and last-active emphasis tuned for docs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Doc breadcrumb" },
        ]}
      />
      <section className={styles.canvas} aria-label="Doc breadcrumb demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Sits at the top of every doc article. Mirrors the article&apos;s category hierarchy
            so staff can step back one level at a time.
          </p>
        </div>
        <div className={styles.stage} style={{ alignItems: "start" }}>
          <span className={styles.stageHelp}>Shallow · two levels deep</span>
          <DocBreadcrumb
            items={[
              { label: "Help", href: "/ui-primitives/help-docs" },
              { label: "Quoting workflow" },
            ]}
          />
          <span className={styles.stageHelp} style={{ marginTop: 18 }}>
            Deep · four levels
          </span>
          <DocBreadcrumb
            items={[
              { label: "Help", href: "/ui-primitives/help-docs" },
              { label: "Workshop floor", href: "/ui-primitives/help-docs/help-center" },
              { label: "Bay handover", href: "/ui-primitives/help-docs/article" },
              { label: "End-of-shift checklist" },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
