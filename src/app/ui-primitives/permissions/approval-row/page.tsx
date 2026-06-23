import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ApprovalRequestRow } from "../../components/permissions"

import { DEMO_APPROVAL_REQUESTS } from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Approval request row | Permissions",
  description:
    "Primitive 09 — inbox row for pending approval requests with Approve / Reject / Snooze actions.",
}

export default function ApprovalRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Approval row"
        title="Approval request row"
        description="What an approver sees in their inbox — requester, the role they want, why, when they asked, and the three actions: Approve, Reject, Snooze. The reason is rendered as a quoted block so it reads like real correspondence."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Approval row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three pending requests</span>
        <div className={styles.approvalStack}>
          {DEMO_APPROVAL_REQUESTS.map((request) => (
            <ApprovalRequestRow key={request.id} request={request} />
          ))}
        </div>
      </section>
    </main>
  )
}
