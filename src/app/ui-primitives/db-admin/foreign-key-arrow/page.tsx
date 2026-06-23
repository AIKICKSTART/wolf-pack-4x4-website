import type { Metadata } from "next"

import { ForeignKeyArrow } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Foreign key arrow | DB Admin",
  description:
    "Primitive 12 — standalone foreign-key visualizer with source / target endpoints and on-delete / on-update action chips.",
}

export default function ForeignKeyArrowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Foreign key arrow"
        title="Foreign key arrow"
        description="A standalone foreign-key visualizer. Source and target endpoints are rendered as bordered tiles with the qualified column name. A dashed teal arrow joins them through a connector slot that also carries the constraint name and the on-delete / on-update action chips."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Foreign key arrow" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — bookings → quotes</span>
        <ForeignKeyArrow
          source={{ table: "bookings", column: "quote_id" }}
          target={{ table: "quotes", column: "id" }}
          onDelete="set_null"
          onUpdate="cascade"
          constraintName="bookings_quote_id_fkey"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — quotes → customers</span>
        <ForeignKeyArrow
          source={{ table: "quotes", column: "customer_id" }}
          target={{ table: "customers", column: "id" }}
          onDelete="restrict"
          onUpdate="cascade"
          constraintName="quotes_customer_id_fkey"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — invoices → bookings</span>
        <ForeignKeyArrow
          source={{ table: "invoices", column: "booking_id" }}
          target={{ table: "bookings", column: "id" }}
          onDelete="restrict"
          onUpdate="cascade"
          constraintName="invoices_booking_id_fkey"
        />
      </section>
    </main>
  )
}
