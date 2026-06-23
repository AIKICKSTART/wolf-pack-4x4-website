import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RetryPolicyBlock } from "../../components/workflow-engine"

import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Retry policy block | Workflow engine",
  description:
    "Primitive 06 — retry policy editor with max attempts, base delay, backoff strategy, jitter and a projected delay strip.",
}

export default function RetryPolicyBlockScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Retries"
        title="Retry policy block"
        description="What the workflow does when a step trips over a flaky downstream. Set max attempts, the base delay, the backoff curve and whether to apply random jitter. The preview bars show the projected delay per attempt — exponential is what we use for Twilio."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Retry policy block" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Triple · exponential + linear + fixed
        </span>
        <div className={styles.demoTriple}>
          <RetryPolicyBlock
            kicker="Twilio SMS · sms.send"
            title="Aggressive backoff for SMS"
            maxAttempts={5}
            baseDelayMs={30_000}
            backoff="exponential"
            jitterEnabled
          />
          <RetryPolicyBlock
            kicker="Stripe · refunds.create"
            title="Linear retries for payments"
            maxAttempts={4}
            baseDelayMs={5_000}
            backoff="linear"
            jitterEnabled={false}
          />
          <RetryPolicyBlock
            kicker="Supplier · parts.search"
            title="Fixed retry · burnett supplier"
            maxAttempts={3}
            baseDelayMs={2_000}
            backoff="fixed"
            jitterEnabled
          />
        </div>
      </section>
    </main>
  )
}
