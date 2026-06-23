import type { Metadata } from "next"

import { FooterNavRow } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_NEXT, DOCS_PREVIOUS } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Footer nav row | UI Primitives — Docs Suite",
}

export default function FooterNavRowPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 04"
        title="Footer nav row"
        description="Previous / next article cells anchored to the bottom of every docs page. Carries an optional relation hint that explains why the next page is the next page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Footer nav row" },
        ]}
      />
      <section className={styles.canvas} aria-label="Footer nav row demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Always renders at the foot of an article. The relation hint nudges the reader
            toward the right next step instead of letting them guess at random sibling pages.
          </p>
        </div>
        <div className={styles.stage}>
          <FooterNavRow previous={DOCS_PREVIOUS} next={DOCS_NEXT} />
        </div>
      </section>
    </main>
  )
}
