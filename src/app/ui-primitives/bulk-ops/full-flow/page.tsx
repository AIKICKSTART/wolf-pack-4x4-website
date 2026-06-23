import type { Metadata } from "next"

import {
  BulkActionMenu,
  BulkConfirmationModal,
  BulkOperationProgress,
  BulkResultSummary,
  BulkSelectHeader,
  UndoBulkBanner,
} from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import {
  ACTION_OPTIONS,
  PROGRESS_STATE,
  RESULT_COUNTS,
  SELECTION_SUMMARY,
} from "../bulk-ops-fixtures"
import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Full bulk flow | Bulk operations",
  description:
    "Composition — selection header + data table with selected rows + action menu open + confirmation modal + operation progress + result summary + undo banner footer.",
}

interface MockRow {
  id: string
  vehicle: string
  customer: string
  total: string
  status: "Awaiting parts" | "Ready" | "On hold" | "Quoted"
}

const ROWS: ReadonlyArray<MockRow> = [
  { id: "Q-2418", vehicle: "HiLux GUN126", customer: "Hayes Logistics", total: "$2,840", status: "Awaiting parts" },
  { id: "Q-2419", vehicle: "Ranger 3.2", customer: "Stretton Farms", total: "$1,420", status: "Awaiting parts" },
  { id: "Q-2420", vehicle: "LandCruiser 79", customer: "Ironbridge Mining", total: "$5,210", status: "On hold" },
  { id: "Q-2421", vehicle: "Patrol Y62", customer: "Coastal Marine", total: "$3,640", status: "Awaiting parts" },
  { id: "Q-2422", vehicle: "Triton MR", customer: "Verridian Civil", total: "$2,180", status: "Ready" },
]

const SELECTED_IDS = new Set(["Q-2418", "Q-2419", "Q-2420", "Q-2421"])

export default function FullBulkFlowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bulk ops / Composition"
        title="Full bulk flow"
        description="Composition of the bulk-ops primitives showing the realistic operator flow: selection header anchors the surface, action menu sits beside it, a mock quotes table shows the selection, and the confirmation modal, progress strip, result summary, and undo banner stack down the page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Full bulk flow" },
        ]}
      />

      <section className={styles.fullFlow} aria-label="Full bulk operations flow">
        <span className={styles.demoLabel}>1 · Selection header + bulk-action menu</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 14,
            alignItems: "start",
          }}
        >
          <BulkSelectHeader summary={SELECTION_SUMMARY} itemLabel="quote" />
          <BulkActionMenu actions={ACTION_OPTIONS} defaultOpen />
        </div>

        <span className={styles.demoLabel}>2 · Selected rows in the quotes table</span>
        <div className={styles.fakeTable}>
          <table>
            <thead>
              <tr>
                <th style={{ width: 40 }} aria-label="Select">
                  <span className={`${styles.checkbox} ${styles.checked}`}>✓</span>
                </th>
                <th>Quote</th>
                <th>Vehicle</th>
                <th>Customer</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const isSelected = SELECTED_IDS.has(row.id)
                return (
                  <tr key={row.id} className={isSelected ? styles.selected : ""}>
                    <td>
                      <span
                        className={`${styles.checkbox} ${isSelected ? styles.checked : ""}`}
                        aria-hidden="true"
                      >
                        {isSelected ? "✓" : ""}
                      </span>
                    </td>
                    <td>{row.id}</td>
                    <td>{row.vehicle}</td>
                    <td>{row.customer}</td>
                    <td>{row.status}</td>
                    <td style={{ textAlign: "right" }}>{row.total}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <span className={styles.demoLabel}>3 · Confirmation gate before the run</span>
        <BulkConfirmationModal
          title="Archive 237 quotes?"
          body="Move the selected quotes to archive. Customers will not be notified. Linked work orders will be detached."
          confirmationPhrase="ARCHIVE-237"
          confirmLabel="Archive quotes"
          impact={[
            { label: "Quotes archived", value: "237" },
            { label: "Linked work orders", value: "12" },
            { label: "Revenue removed from forecast", value: "$184,520" },
          ]}
        />

        <span className={styles.demoLabel}>4 · Run progress + final result</span>
        <div className={styles.fullFlowTwo}>
          <BulkOperationProgress
            operationLabel="Archive overdue quotes"
            state={PROGRESS_STATE}
          />
          <BulkResultSummary
            title="Archive overdue quotes — complete"
            counts={RESULT_COUNTS}
            impactSummary="221 quotes archived. 12 linked work orders detached. 9 already archived. 7 failed with VIN-mismatch errors."
            completedAtLabel="2 min ago"
          />
        </div>

        <span className={styles.demoLabel}>5 · Undo footer banner</span>
        <div className={styles.fullFlowBanner}>
          <UndoBulkBanner
            resourceLabel="quotes"
            affectedCount={237}
            pastTenseAction="archived"
            staticCountdown={7}
            countdownSeconds={10}
          />
        </div>
      </section>
    </main>
  )
}
