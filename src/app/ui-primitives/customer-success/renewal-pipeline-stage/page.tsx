import type { Metadata } from "next"

import { RenewalPipelineStage } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Renewal pipeline stage | Customer success",
  description:
    "Primitive 13 — renewal pipeline stage card with stage chip, expected close, ACV, weighted value, and likelihood.",
}

export default function RenewalPipelineStageScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Renewal"
        title="Renewal pipeline stage"
        description="A single renewal card. Pipeline stages flow Early → Planning → Negotiation → Verbal yes → Signed. The card surfaces ACV, weighted value, likelihood, and the next-step copy."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Renewal pipeline stage" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Wollongong Express Fleet · planning</span>
          <RenewalPipelineStage
            customerName="Wollongong Express Fleet"
            stage="planning"
            expectedCloseIso="2026-08-30"
            acvAud={142_000}
            likelihood={62}
            nextStep="Send refreshed FY26 fleet rotation pricing pack before the 18 Jun QBR."
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Sarah Pope · negotiation</span>
          <RenewalPipelineStage
            customerName="Sarah Pope"
            stage="negotiation"
            expectedCloseIso="2026-07-12"
            acvAud={26_400}
            likelihood={74}
            nextStep="Trade pricing — confirm Manta + Genie discount band with Marcus."
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Mick Davis · verbal yes</span>
          <RenewalPipelineStage
            customerName="Mick Davis"
            stage="verbal"
            expectedCloseIso="2026-06-30"
            acvAud={6_400}
            likelihood={92}
            nextStep="Send dyno-bundle invoice for sign-off Friday morning."
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Bayside Tow Co. · early</span>
          <RenewalPipelineStage
            customerName="Bayside Tow Co."
            stage="early"
            expectedCloseIso="2026-10-04"
            acvAud={41_200}
            likelihood={32}
            nextStep="Restart the conversation with the new fleet manager. Aim for QBR by month-end."
          />
        </section>
      </div>
    </main>
  )
}
