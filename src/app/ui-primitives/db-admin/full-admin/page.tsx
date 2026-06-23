import type { Metadata } from "next"

import {
  BackupRestorePanel,
  QueryEditor,
  QueryResultsTable,
  SchemaTree,
} from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import {
  BACKUPS,
  RESULT_COLUMNS,
  RESULT_ROWS,
  SCHEMAS,
} from "../_mock-data"
import styles from "../db-admin.module.css"
import { FullAdminStage } from "./full-admin-stage"

export const metadata: Metadata = {
  title: "Full database admin | DB Admin",
  description:
    "Composition — full database administrator scene composing schema tree, selected table view (columns / constraints / indexes / triggers), ER diagram tab, query editor, results table, and backup / restore panel.",
}

const DEFAULT_QUERY = `SELECT id, vehicle_rego, customer_id, subtotal_cents, status, is_locked, created_at, tags
FROM public.quotes
WHERE status IN ('draft', 'sent', 'accepted')
ORDER BY created_at DESC
LIMIT 500;`

export default function FullDbAdminScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full database admin"
        title="Full database admin scene"
        description="Composition layering all 14 primitives — schema tree on the left, selected table view in the centre (columns + constraints + indexes + triggers with an ER diagram tab), query editor + results below, and backup / restore in the right column. Backed by a mock Mufflermen schema across public / analytics / audit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Full admin" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live composition — public.quotes</span>
        <div className={styles.adminLayout}>
          <SchemaTree
            schemas={SCHEMAS}
            defaultExpandedIds={["public"]}
            defaultSelectedId="public.quotes"
          />
          <FullAdminStage />
          <BackupRestorePanel backups={BACKUPS} />
        </div>
        <div className={styles.bottomDock}>
          <QueryEditor
            defaultQuery={DEFAULT_QUERY}
            connection="prod · postgres"
            defaultLimit={500}
          />
          <QueryResultsTable
            columns={RESULT_COLUMNS}
            rows={RESULT_ROWS}
            duration="184ms"
          />
        </div>
      </section>
    </main>
  )
}
