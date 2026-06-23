import type { Metadata } from "next"

import { ExpansionOpportunityCard } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Expansion opportunity card | Customer success",
  description:
    "Primitive 05 — predicted next-best-action with expected uplift in AUD and confidence chip.",
}

export default function ExpansionOpportunityScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Expansion"
        title="Expansion opportunity card"
        description="Surfaces the next-best-action a CSM can take to grow an account — upgrades, fleet expansion, service bundles, warranties — with AUD uplift forecast and a confidence chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Expansion opportunity card" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Wollongong Express Fleet · fleet expansion</span>
          <ExpansionOpportunityCard
            customerName="Wollongong Express Fleet"
            action="fleet-expansion"
            upliftAud={48000}
            confidence="high"
            rationale="They've added four utes in the last 12 weeks and asked twice about cab-chassis pricing. Strong signal for a fleet quote."
            ctaLabel="Open fleet playbook"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Mick Davis · dyno bundle</span>
          <ExpansionOpportunityCard
            customerName="Mick Davis"
            action="dyno-bundle"
            upliftAud={6400}
            window="next 12 months"
            confidence="medium"
            rationale="Mick re-tuned the Hilux twice this year. Pitch the quarterly dyno-bundle including printed run sheets."
            ctaLabel="Send quarterly bundle"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Sarah Pope · service bundle</span>
          <ExpansionOpportunityCard
            customerName="Sarah Pope"
            action="service-bundle"
            upliftAud={3200}
            confidence="high"
            rationale="Annual service is due; her last three exhaust jobs ran with Manta hardware. Bundle exhaust QA into the service quote."
            ctaLabel="Open service quote"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Bayside Tow Co. · tyre program</span>
          <ExpansionOpportunityCard
            customerName="Bayside Tow Co."
            action="tyre-program"
            upliftAud={18400}
            confidence="low"
            rationale="Tyre wear telemetry on three trucks suggests an annual rotation contract is viable. Confidence is low until fleet manager confirms."
            ctaLabel="Pitch rotation contract"
          />
        </section>
      </div>
    </main>
  )
}
