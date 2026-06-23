import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { SettingsConsole, WorkspaceBand } from "./_components"
import styles from "./settings.module.css"

export const metadata: Metadata = {
  title: "Settings & workspace | Torque",
  description:
    "The Oak Flats Muffler Men workspace settings — profile and plan, team roles, integrations, notifications, API tokens and the danger zone. Composed entirely from registered account primitives.",
}

export default function SettingsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Settings & workspace"
        title="Settings & workspace"
        description="Everything the owner needs to run the workshop through Torque — profile and plan, the bay crew and their roles, connected tools, notifications, API access and the danger zone. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Settings & workspace" },
        ]}
      />

      <WorkspaceBand />
      <SettingsConsole />
    </main>
  )
}
