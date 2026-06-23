import type { Metadata } from "next"

import { IndexInspector } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { QUOTES_INDEXES } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Index inspector | DB Admin",
  description:
    "Primitive 07 — index inspector card with type chip across BTree / GIN / GIST / Hash / BRIN, columns, uniqueness, size, and usage chip.",
}

export default function IndexInspectorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Index inspector"
        title="Index inspector"
        description="A card that summarises a single index — name, type chip (BTree / GIN / GIST / Hash / BRIN), the columns being indexed as chips, a uniqueness chip, and a size + usage chip pair on the right edge. Tones differ per type and per usage band so a screen of indexes reads at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Index inspector" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — public.quotes indexes</span>
        <div className={styles.demoStack}>
          {QUOTES_INDEXES.map((index) => (
            <IndexInspector key={index.name} index={index} />
          ))}
        </div>
      </section>
    </main>
  )
}
