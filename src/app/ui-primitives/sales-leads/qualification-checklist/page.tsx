import type { Metadata } from "next"

import { QualificationChecklist } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_BANT } from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Qualification checklist | Sales leads",
  description:
    "Primitive 03 — BANT and MEDDIC qualification checklists with per-criterion state cycle and completion meter.",
}

export default function QualificationChecklistScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Qualification checklist"
        title="Qualification checklist"
        description="Run inbound leads through BANT or MEDDIC. Click any criterion to cycle Met → Partial → Missing → Unknown."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Qualification checklist" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>BANT — workshop default</span>
        <QualificationChecklist
          framework="bant"
          criteria={MUFFLERMEN_BANT}
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>MEDDIC — fleet deals</span>
        <QualificationChecklist
          framework="meddic"
          criteria={[
            { key: "metrics", label: "Metrics", status: "met", note: "6 Hiace vehicles · $5,280 quote." },
            { key: "economic-buyer", label: "Economic buyer", status: "partial", note: "Owner on annual leave until Mon." },
            { key: "decision-criteria", label: "Decision criteria", status: "met", note: "Lowest downtime > price." },
            { key: "decision-process", label: "Decision process", status: "unknown" },
            { key: "identify-pain", label: "Identify pain", status: "met", note: "Whole fleet failing roadside noise." },
            { key: "champion", label: "Champion", status: "partial", note: "Ops manager pushing internally." },
          ]}
        />
      </section>
    </main>
  )
}
