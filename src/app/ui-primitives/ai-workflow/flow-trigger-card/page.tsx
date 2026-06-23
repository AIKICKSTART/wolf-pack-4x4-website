import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FlowTriggerCard } from "../../components/ai-workflow"

import {
  BLOG_TRIGGER_PAYLOAD,
  QUOTE_TRIGGER_PAYLOAD,
  TRIAGE_TRIGGER_PAYLOAD,
} from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Flow trigger | AI workflow",
  description:
    "Primitive 14 — webhook / cron / event-bus / manual trigger card with sample payload.",
}

export default function FlowTriggerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Trigger"
        title="Flow trigger card"
        description="The entry point for a workflow. Webhooks, cron jobs, event-bus subscriptions and manual fires — each shows its config, a sample payload, last-fired metadata and an armed/disarmed status pill."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Flow trigger card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · webhook · Shopify quote-request
        </span>
        <FlowTriggerCard
          title="Shopify · quote requested"
          kind="webhook"
          config="POST https://hermes.mufflermen.com.au/hooks/shopify/quote"
          lastFiredLabel="09:14 AEST"
          invocations7d={1246}
          samplePayload={QUOTE_TRIGGER_PAYLOAD}
          armed
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · event bus · inbound SMS</span>
        <FlowTriggerCard
          title="SMS inbound"
          kind="event"
          config="bus:sms.inbound · pattern: vehicle-related"
          lastFiredLabel="07:22 AEST"
          invocations7d={3812}
          samplePayload={TRIAGE_TRIGGER_PAYLOAD}
          armed
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · cron · Monday 06:00 AEST blog draft · disarmed
        </span>
        <FlowTriggerCard
          title="Monday blog draft"
          kind="cron"
          config="0 6 * * MON · Australia/Sydney"
          lastFiredLabel="22 May · 06:00"
          invocations7d={1}
          samplePayload={BLOG_TRIGGER_PAYLOAD}
          armed={false}
        />
      </section>
    </main>
  )
}
