import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ApprovalConsole } from "./_approval-console"
import styles from "./approval-gate.module.css"

export const metadata: Metadata = {
  title: "Approval gate | Torque",
  description:
    "The safety surface — Torque parks every sensitive action (publish, email, deploy) for a one-tap human decision with diff, preview and risk flags.",
}

export default function TorqueApprovalGatePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Safety surface"
        title="Approval gate"
        description="Torque is the Oak Flats Muffler Men business assistant. Before it does anything that touches customers or the live site — publishing a service page, sending a customer email, or deploying a change — it holds the action here. You see the full diff, a preview and every risk flag, then approve or reject in one tap. High-impact actions ask for a typed confirmation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque/approval-gate" },
          { label: "Approval gate" },
        ]}
      />

      <section className={styles.demoSurface} aria-label="Approval gate console">
        <span className={styles.demoLabel}>
          Composition · Torque safety surface · 3 actions awaiting sign-off
        </span>
        <ApprovalConsole />
      </section>
    </main>
  )
}
