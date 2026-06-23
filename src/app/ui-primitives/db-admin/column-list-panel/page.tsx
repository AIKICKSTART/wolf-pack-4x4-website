import type { Metadata } from "next"

import { ColumnListPanel } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { QUOTES_COLUMNS } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Column list panel | DB Admin",
  description:
    "Primitive 02 — column list panel for a selected table, showing name, type, nullable, default, PK / FK chips, and a comment popover.",
}

export default function ColumnListPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Column list panel"
        title="Column list panel"
        description="A column list for a selected table. Each row carries the column name, type, default expression, nullable / not-null chip, and PK / FK chips when relevant. Columns that carry a database comment surface a small popover trigger."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Column list panel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — public.quotes columns</span>
        <ColumnListPanel schema="public" table="quotes" columns={QUOTES_COLUMNS} />
      </section>
    </main>
  )
}
