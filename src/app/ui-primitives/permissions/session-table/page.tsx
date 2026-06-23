import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SessionTable } from "../../components/permissions"

import { DEMO_SESSIONS } from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Session table | Permissions",
  description:
    "Primitive 12 — full DataTable view of active sessions with sortable last-active column and revoke action.",
}

export default function SessionTableScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Session table"
        title="Active session table"
        description="Composes the data-table primitive into a full sessions surface. Device, IP, location, last active and the current chip on each row. The current device cannot be revoked; every other row gets a Revoke button."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Session table" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>5 active sessions</span>
        <SessionTable sessions={DEMO_SESSIONS} />
      </section>
    </main>
  )
}
