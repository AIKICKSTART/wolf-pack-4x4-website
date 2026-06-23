import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WorkspaceSwitcher } from "../../components/permissions"

import { DEMO_WORKSPACES } from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Workspace switcher | Permissions",
  description:
    "Primitive 07 — top-bar workspace dropdown with searchable list and per-workspace role.",
}

export default function WorkspaceSwitcherScenePage() {
  const [current, ...others] = DEMO_WORKSPACES

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Workspace switcher"
        title="Workspace switcher"
        description="The drop-down that lives in the top bar. Shows the current workspace name, suburb, member count and plan. The list is searchable and every row shows the role you hold in that workspace."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Workspace switcher" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Open switcher — workspaces filterable</span>
        <div className={styles.demoStage}>
          <WorkspaceSwitcher current={current} workspaces={[current, ...others]} />
        </div>
      </section>
    </main>
  )
}
