import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { ActionsSection } from "../sections"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Actions | UI Primitives",
  description:
    "Canonical ActionButton taxonomy, token-driven adapters, icon tools, segmented commands, toolbar actions, and destructive command states for Oak Flats Mufflermen UI primitives.",
}

export default function ActionsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Buttons, tools, segmented CTAs"
        description="Every interactive trigger in the system — chrome and red site buttons, icon tools, segmented controls, and stacked CTA primitives used across quoting, parts, and CMS surfaces."
        dnaSectionId="actions"
      />
      <ActionsSection />
    </main>
  )
}
