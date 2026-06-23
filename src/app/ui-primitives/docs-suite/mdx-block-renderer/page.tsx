import type { Metadata } from "next"

import { MdxBlockRenderer } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_BLOCKS } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "MDX block renderer | UI Primitives — Docs Suite",
}

export default function MdxRendererPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 03"
        title="MDX block renderer"
        description="Renders the six MDX block kinds the Mufflermen docs platform supports — prose, code, note, warning, diff, and tabs. Every block carries its own ID so the TOC rail can scroll-spy it."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "MDX block renderer" },
        ]}
      />
      <section className={styles.canvas} aria-label="MDX block renderer demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Renders the body of every docs page. The TOC rail reads block IDs to build itself
            and uses IntersectionObserver to keep the active section highlighted.
          </p>
        </div>
        <div className={styles.stage}>
          <MdxBlockRenderer blocks={DOCS_BLOCKS} />
        </div>
      </section>
    </main>
  )
}
