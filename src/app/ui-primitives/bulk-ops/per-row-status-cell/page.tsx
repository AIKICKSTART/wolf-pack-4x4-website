import type { Metadata } from "next"

import { PerRowStatusCell } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import { ROW_RESULTS } from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Per-row status cell | Bulk operations",
  description:
    "Primitive 05 — tone-coded per-row status chip with optional message and retry / skip actions for failed rows.",
}

export default function PerRowStatusCellScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Bulk"
        title="Per-row status cell"
        description="Renders the status of a single row inside a bulk operation table. The animated dot in the in-progress state respects reduced motion preferences."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Per-row status cell" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — sample rows</span>
        <div className={styles.fakeTable}>
          <table>
            <thead>
              <tr>
                <th>Quote</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ROW_RESULTS.map((row) => (
                <tr key={row.id}>
                  <td>{row.label}</td>
                  <td>
                    <PerRowStatusCell
                      status={row.status}
                      message={row.message}
                      showActions
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
