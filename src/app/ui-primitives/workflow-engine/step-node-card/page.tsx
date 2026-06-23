import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StepNodeCard } from "../../components/workflow-engine"

import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Step node card | Workflow engine",
  description:
    "Primitive 02 — individual step card with status, metrics, ports. Action / decision / wait / parallel / loop / approval.",
}

export default function StepNodeCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Step card"
        title="Step node card"
        description="The inspector-grade step card. Same vocabulary as the in-canvas node, but bigger and scannable — kicker, title, kind chip, status chip, metric chips, and named input + output port rails. Every step kind in the engine is represented below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Step node card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Action · running · Twilio SMS send
        </span>
        <div className={styles.demoTriple}>
          <StepNodeCard
            kicker="Quote follow-up · v3.2"
            kind="action"
            title="Send follow-up SMS"
            subtitle="Twilio · sms.send · template:tpl-nudge-3d"
            status="running"
            metrics={[
              { label: "Last", value: "1.4s" },
              { label: "p95", value: "2.8s" },
              { label: "Vol", value: "184/d" },
            ]}
            inputs={["customer", "vehicle", "quote"]}
            outputs={["smsId", "ok"]}
          />
          <StepNodeCard
            kicker="Quote follow-up · v3.2"
            kind="decision"
            title="Customer responded?"
            subtitle="expr: quote.lastReplyAt > sentAt"
            status="passed"
            metrics={[
              { label: "Hit YES", value: "37%" },
              { label: "Hit NO", value: "63%" },
            ]}
            inputs={["quote"]}
            outputs={["yes", "no"]}
          />
          <StepNodeCard
            kicker="Refund > $200"
            kind="approval"
            title="Manager sign-off"
            subtitle="Eddie Vrahnos · workshop manager"
            status="waiting"
            metrics={[
              { label: "TTA", value: "4h 20m" },
              { label: "Approved", value: "92%" },
            ]}
            inputs={["refund", "context"]}
            outputs={["approved", "rejected"]}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Wait + parallel + loop kinds
        </span>
        <div className={styles.demoTriple}>
          <StepNodeCard
            kicker="RWC expiry T-7d"
            kind="wait"
            title="Wait 3 business days"
            subtitle="Skip weekends + AU public holidays · AEST"
            status="passed"
            metrics={[
              { label: "Window", value: "3d" },
              { label: "Resume", value: "Mon 09:00" },
            ]}
            inputs={["rego"]}
            outputs={["resumed"]}
          />
          <StepNodeCard
            kicker="New customer welcome"
            kind="parallel"
            title="Fan-out 3 channels"
            subtitle="SMS + email + loyalty.card.provision"
            status="running"
            metrics={[
              { label: "Lanes", value: "3" },
              { label: "Join", value: "All" },
            ]}
            inputs={["customer"]}
            outputs={["smsOk", "emailOk", "cardOk"]}
          />
          <StepNodeCard
            kicker="Recall hit"
            kind="loop"
            title="For-each affected vehicle"
            subtitle="iterations · 22 owners"
            status="running"
            metrics={[
              { label: "Iter", value: "8 / 22" },
              { label: "Conc", value: "4" },
            ]}
            inputs={["recall", "owners"]}
            outputs={["notified"]}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Trigger + end · run boundary cards
        </span>
        <div className={styles.demoSplit}>
          <StepNodeCard
            kicker="Quote follow-up"
            kind="trigger"
            title="Quote sent"
            subtitle="Shopify · event · quote.created"
            status="passed"
            metrics={[
              { label: "Today", value: "184" },
              { label: "7d", value: "1.4k" },
            ]}
            inputs={[]}
            outputs={["quote", "customer"]}
          />
          <StepNodeCard
            kicker="Refund > $200"
            kind="end"
            title="Refund settled"
            subtitle="Stripe · refund.settled"
            status="passed"
            metrics={[
              { label: "Mean", value: "23.6s" },
              { label: "Success", value: "98.4%" },
            ]}
            inputs={["refundId"]}
            outputs={[]}
          />
        </div>
      </section>
    </main>
  )
}
