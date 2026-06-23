import type { Metadata } from "next"

import { LeadAssignmentRules } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_ASSIGNMENT_RULES } from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Lead assignment rules | Sales leads",
  description:
    "Primitive 08 — priority-ordered auto-assignment rules with reorder controls.",
}

export default function LeadAssignmentRulesScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Assignment rules"
        title="Lead assignment rules"
        description="The router that decides which Mufflermen rep gets each inbound lead. Rules evaluate top-to-bottom; the first match wins."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Assignment rules" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live priority list</span>
        <LeadAssignmentRules rules={MUFFLERMEN_ASSIGNMENT_RULES} />
      </section>
    </main>
  )
}
