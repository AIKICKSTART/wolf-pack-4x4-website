import type { Metadata } from "next"

import { ErDiagramCanvas } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { ER_EDGES, ER_NODES } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "ER diagram canvas | DB Admin",
  description:
    "Primitive 03 — entity-relationship diagram with table nodes, column rows, foreign-key arrows, and a minimap.",
}

export default function ErDiagramCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / ER diagram canvas"
        title="ER diagram canvas"
        description="An SVG-driven entity-relationship canvas. Each table is rendered as a rectangle with an accent header, a list of column rows, and small PK / FK dots. Foreign-key arrows are computed from column anchors and pass through markered curves. A minimap reflects the canvas viewport."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "ER diagram canvas" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Mufflermen core entities</span>
        <ErDiagramCanvas nodes={ER_NODES} edges={ER_EDGES} />
      </section>
    </main>
  )
}
