import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PermissionMatrix } from "../../components/permissions"

import { DEMO_ACTIONS, DEMO_MATRIX_VALUE, DEMO_RESOURCES } from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Permission matrix | Permissions",
  description:
    "Primitive 02 — resource × action matrix with three-state pills (allow / deny / inherited) and bulk row + column toggles.",
}

export default function MatrixScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Permission matrix"
        title="Permission matrix"
        description="Rows are workshop resources — Jobs, Quotes, Parts, Invoices, Settings, Users, API. Columns are actions — View, Create, Edit, Delete, Approve, Export. Cells cycle allow → deny → inherited. Row and column bulk buttons let you flip a whole axis in a click."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Matrix" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <PermissionMatrix
          resources={DEMO_RESOURCES}
          actions={DEMO_ACTIONS}
          defaultValue={DEMO_MATRIX_VALUE}
        />
      </section>
    </main>
  )
}
