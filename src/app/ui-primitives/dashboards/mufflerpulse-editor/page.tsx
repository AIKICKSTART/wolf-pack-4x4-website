import type { Metadata } from "next"

import { MufflerpulseEditorDashboard } from "../../components/dashboards"
import { PageHeader } from "../../components/page-header"

import styles from "../dashboards.module.css"

export const metadata: Metadata = {
  title: "Mufflerpulse editor dashboard | Persona Dashboards",
  description:
    "Persona composite — Mufflerpulse social editor. Today's publishing strip, composer, scheduled queue, engagement gauge, and top performing post.",
}

export default function MufflerpulseEditorDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Persona 06 / Mufflerpulse editor"
        title="Mufflerpulse editor dashboard"
        description="Where the editor builds the day — the next twelve hours of slots, a composer for the next post, the scheduled queue, and a quick read on how the audience is reacting."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dashboards", href: "/ui-primitives/dashboards" },
          { label: "Mufflerpulse editor" },
        ]}
      />
      <MufflerpulseEditorDashboard />
    </main>
  )
}
