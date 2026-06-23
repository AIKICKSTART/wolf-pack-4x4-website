import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RoleInspector } from "../../components/permissions"

import {
  DEMO_ROLE_INSPECTOR_PERMISSIONS,
  DEMO_ROLE_SCOPES,
} from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Role inspector | Permissions",
  description:
    "Primitive 06 — role inspector card with member count, scopes, and expandable full permission set.",
}

export default function RoleInspectorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Role inspector"
        title="Role inspector"
        description="Inspect a role at a glance — the role badge, what the role is for, how many members hold it, how many permissions it grants, the scopes it applies in, and the full set on expand."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Role inspector" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop Manager — expanded by default</span>
        <RoleInspector
          roleName="Workshop Manager"
          roleTone="workshop"
          summary="Day-to-day operator. Owns the floor at Oak Flats and Albion Park during workshop hours. Can approve quotes up to $4,000."
          memberCount={6}
          permissionCount={32}
          scopes={DEMO_ROLE_SCOPES}
          permissions={DEMO_ROLE_INSPECTOR_PERMISSIONS}
          defaultOpen
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Billing — collapsed</span>
        <RoleInspector
          roleName="Billing"
          roleTone="billing"
          summary="Finance role. Reads invoices, exports accounting batches, never touches workshop data."
          memberCount={2}
          permissionCount={18}
          scopes={[
            { id: "all-ws", label: "All workspaces", tone: "green" },
            { id: "amount", label: "No quote ceiling" },
          ]}
          permissions={[
            { id: "invoices.view", label: "View invoices" },
            { id: "invoices.export", label: "Export accounting batches" },
            { id: "invoices.send", label: "Send statements" },
            { id: "users.view", label: "View team list" },
          ]}
        />
      </section>
    </main>
  )
}
