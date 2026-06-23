import type { Metadata } from "next"

import { ModificationApprovalWorkflow } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Modification approval workflow | ADR compliance",
  description:
    "Primitive 12 — five-step modification approval workflow from declaration through certificate of compliance.",
}

export default function ModificationApprovalWorkflowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Workflow"
        title="Modification approval workflow"
        description="Wraps the ProcessSteps marketing primitive. Renders the workshop’s five-step ADR approval workflow — Customer declaration → Pre-mod test → Modification → Post-mod test → Certificate of compliance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Approval workflow" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>5-step workflow</span>
        <ModificationApprovalWorkflow />
      </section>
    </main>
  )
}
