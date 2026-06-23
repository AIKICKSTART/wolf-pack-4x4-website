import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TriggerConfigCard } from "../../components/workflow-engine"

import {
  QUOTE_TRIGGER_PAYLOAD,
  REFUND_TRIGGER_PAYLOAD,
  RWC_TRIGGER_PAYLOAD,
} from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Trigger config card | Workflow engine",
  description:
    "Primitive 03 — webhook / cron / event bus / manual trigger config card with sample payload + armed state.",
}

export default function TriggerConfigCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Trigger"
        title="Trigger config card"
        description="What kicks a workflow off. Webhook URLs, cron expressions, event bus subjects, manual run-now invocations. Each card surfaces config, last-fired, 7-day fire count, armed state and a sample payload — the contract a step downstream is reading from."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Trigger config card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Triple · webhook + cron + event bus
        </span>
        <div className={styles.demoTriple}>
          <TriggerConfigCard
            title="Shopify · quote.created"
            kind="webhook"
            config="POST /hooks/shopify/quote-created"
            lastFiredLabel="09:14 AEST"
            invocations7d={1_246}
            samplePayload={QUOTE_TRIGGER_PAYLOAD}
            armed
          />
          <TriggerConfigCard
            title="RWC expiry sweep"
            kind="cron"
            config="0 9 * * * · Australia/Sydney"
            lastFiredLabel="Today 09:00"
            invocations7d={7}
            samplePayload={RWC_TRIGGER_PAYLOAD}
            armed
          />
          <TriggerConfigCard
            title="refund.requested"
            kind="event"
            config="event-bus · subject:refund.requested"
            lastFiredLabel="08:42 AEST"
            invocations7d={43}
            samplePayload={REFUND_TRIGGER_PAYLOAD}
            armed={false}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Single · manual trigger</span>
        <TriggerConfigCard
          title="Replay quote follow-up · manual"
          kind="manual"
          config="POST /api/workflows/quote-followup/run"
          invocations7d={4}
          samplePayload={`{
  "actor": "eddie@mufflermen.com.au",
  "scope": "single",
  "quoteId": "QT-48184",
  "reason": "Customer asked over the counter today"
}`}
          armed
        />
      </section>
    </main>
  )
}
