import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PermissionInheritanceTree } from "../../components/permissions"

import { DEMO_INHERITANCE_NODES } from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Inheritance tree | Permissions",
  description:
    "Primitive 03 — resolution path showing how direct grants, role defaults, group rules and workspace defaults combine.",
}

export default function InheritanceScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Inheritance tree"
        title="Permission inheritance tree"
        description="When the answer to 'can Jordan approve a quote' isn't a simple yes/no — show the resolution. Each node names the source (direct grant, role, group, workspace default), the principal who issued it, and the effective state at that layer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Inheritance" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>quotes.approve · effective ALLOW</span>
        <PermissionInheritanceTree
          permission="quotes.approve"
          effective="allow"
          nodes={DEMO_INHERITANCE_NODES}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>users.delete · effective DENY</span>
        <PermissionInheritanceTree
          permission="users.delete"
          effective="deny"
          nodes={[
            {
              id: "n-user-2",
              label: "Jordan Mitchell",
              source: "direct",
              grantedBy: "Direct — never granted",
              state: "inherited",
            },
            {
              id: "n-role-2",
              label: "Workshop Manager role",
              source: "inherited",
              grantedBy: "Role 'Workshop Manager'",
              state: "deny",
              note: "Role default forbids destructive user operations.",
            },
            {
              id: "n-workspace-2",
              label: "Workspace default",
              source: "workspace",
              grantedBy: "Workspace 'Oak Flats Mufflermen'",
              state: "deny",
              note: "Only owners can delete users in this workspace.",
            },
          ]}
        />
      </section>
    </main>
  )
}
