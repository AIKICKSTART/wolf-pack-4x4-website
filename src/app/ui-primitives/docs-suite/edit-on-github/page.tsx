import type { Metadata } from "next"

import { EditOnGithubBanner } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_COMMIT } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Edit on GitHub banner | UI Primitives — Docs Suite",
}

export default function EditOnGithubPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 14"
        title="Edit on GitHub banner"
        description="Banner with last-commit info from the mufflermen/docs repo and a CTA that deep-links into the edit-this-page view on GitHub for the current Markdown file."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Edit on GitHub banner" },
        ]}
      />
      <section className={styles.canvas} aria-label="Edit on GitHub banner demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Always renders at the top of every docs page. Mufflermen docs are open-source —
            anyone with a GitHub login can suggest a change without leaving the page.
          </p>
        </div>
        <div className={styles.stage}>
          <EditOnGithubBanner
            repo="mufflermen/docs"
            editHref="https://github.com/mufflermen/docs/edit/main/trade-account-api/tokens.mdx"
            commit={DOCS_COMMIT}
          />
        </div>
      </section>
    </main>
  )
}
