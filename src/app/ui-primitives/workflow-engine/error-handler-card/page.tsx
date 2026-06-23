import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ErrorHandlerCard } from "../../components/workflow-engine"

import { SMS_ERROR_ACTIONS } from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Error handler card | Workflow engine",
  description:
    "Primitive 08 — error handler with catch / compensate / alert / retry action chain.",
}

export default function ErrorHandlerCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Errors"
        title="Error handler card"
        description="What happens when something goes wrong. Each handler attaches to a step, declares which errors it catches, and chains the response — retry, catch with a fallback, compensate by undoing prior work, or alert a human. The hits-per-7d chip tells you which paths are actually firing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Error handler card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Twilio SMS · retry → catch → alert → compensate
        </span>
        <ErrorHandlerCard
          kicker="Error · twilio.sms.send"
          title="Carrier flake fallback"
          attachedTo="step:s4 · send-followup-sms"
          matchPattern="TwilioError · 4xx or 5xx"
          severity="red"
          actions={SMS_ERROR_ACTIONS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Stripe · refund · compensate prior journal entry
        </span>
        <ErrorHandlerCard
          kicker="Error · stripe.refunds.create"
          title="Refund settle failure"
          attachedTo="step:s5 · stripe-refund"
          matchPattern="StripeError · code:charge_already_refunded"
          severity="amber"
          actions={[
            {
              id: "rb-1",
              kind: "catch",
              label: "Mark as no-op · already refunded",
              target: "branch · skip downstream actions",
              hits7d: 2,
            },
            {
              id: "rb-2",
              kind: "compensate",
              label: "Reverse journal entry",
              target: "Xero · journals.delete",
              hits7d: 2,
            },
            {
              id: "rb-3",
              kind: "alert",
              label: "Notify finance",
              target: "Slack · #ops-finance",
              hits7d: 2,
            },
          ]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Supplier 503 · retry budget exhausted · fall through
        </span>
        <ErrorHandlerCard
          kicker="Error · parts.search"
          title="Burnett supplier outage"
          attachedTo="step:s2 · supplier-burnett"
          matchPattern="any · 5xx or timeout > 8s"
          severity="amber"
          actions={[
            {
              id: "br-1",
              kind: "retry",
              label: "3 retries · fixed 2s",
              target: "supplier.burnett.search",
              hits7d: 11,
            },
            {
              id: "br-2",
              kind: "catch",
              label: "Fall through to Coxall",
              target: "step:s3 · supplier-coxall",
              hits7d: 4,
            },
            {
              id: "br-3",
              kind: "alert",
              label: "Daily digest to Eddie",
              target: "Email · 17:30 AEST",
              hits7d: 1,
            },
          ]}
        />
      </section>
    </main>
  )
}
