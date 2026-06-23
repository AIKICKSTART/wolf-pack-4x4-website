import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ManualApprovalCard } from "../../components/workflow-engine"

import { REFUND_APPROVAL } from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Manual approval card | Workflow engine",
  description:
    "Primitive 05 — manual approval gate with approver, reason, comment field, approve / reject decision.",
}

export default function ManualApprovalCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Approval"
        title="Manual approval card"
        description="A workflow pause that needs a human call. Refund over $200, big-ticket quote discount, supplier swap on a critical part. The card surfaces the approver, the dollar context, the reason, and a comment field that lands in the audit trail. Toggle Approve / Reject to feel the state change."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Manual approval card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · pending · awaiting Eddie
        </span>
        <ManualApprovalCard
          kicker={REFUND_APPROVAL.kicker}
          title={REFUND_APPROVAL.title}
          approverName={REFUND_APPROVAL.approverName}
          approverRole={REFUND_APPROVAL.approverRole}
          approverInitials={REFUND_APPROVAL.approverInitials}
          reason={REFUND_APPROVAL.reason}
          amount={REFUND_APPROVAL.amount}
          requestedAtLabel={REFUND_APPROVAL.requestedAtLabel}
          expiresInMs={REFUND_APPROVAL.expiresInMs}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · approved · post-decision
        </span>
        <ManualApprovalCard
          kicker="Quote discount > 15%"
          title="Approve Patrol Y61 cat-back package discount"
          approverName="Daniel Fleuren"
          approverRole="Platform · Verridian"
          approverInitials="DF"
          reason="Long-time customer asked for 18% off a $2,800 cat-back system + extractors. Margin still positive after labour."
          amount={2_800}
          requestedAtLabel="2026-05-28 14:22"
          expiresInMs={26 * 60 * 60 * 1000}
          defaultDecision="approved"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · rejected · cosmetic refund declined
        </span>
        <ManualApprovalCard
          kicker="Refund > $200"
          title="Approve cosmetic-scratch refund · RF-1132"
          approverName="Eddie Vrahnos"
          approverRole="Workshop manager"
          approverInitials="EV"
          reason="Customer claims rear muffler tip was scratched on collection. Bay 2 walk-around video shows scratch present prior. Refusing refund, offering polish on the house."
          amount={420}
          requestedAtLabel="2026-05-27 11:08"
          expiresInMs={45 * 60 * 1000}
          defaultDecision="rejected"
        />
      </section>
    </main>
  )
}
