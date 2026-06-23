import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SafetyCheckBlock } from "../../components/ai-workflow"

import { QUOTE_SAFETY_RULES } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Safety check block | AI workflow",
  description:
    "Primitive 13 — moderation / PII / jailbreak / topic-fence rule block with on-hit actions.",
}

export default function SafetyCheckBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Safety"
        title="Safety check block"
        description="Define safety rules with explicit actions on hit — block, redact, flag and continue, or escalate to a human. Inspect counts and hit rates make it easy to spot a rule that's gone trigger-happy."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Safety check block" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · quote estimator guardrails · payload logging off
        </span>
        <SafetyCheckBlock title="Quote estimator" rules={QUOTE_SAFETY_RULES} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · SMS triage · payload logging on (debug)
        </span>
        <SafetyCheckBlock
          title="SMS triage"
          payloadLogging
          rules={[
            {
              id: "sm1",
              kind: "jailbreak",
              description: "Block SMS prompt-injection ('ignore your instructions').",
              action: "block",
              inspected24h: 1846,
              hits24h: 12,
              enabled: true,
            },
            {
              id: "sm2",
              kind: "pii",
              description: "Mask phone numbers before forwarding to model context.",
              action: "redact",
              inspected24h: 1846,
              hits24h: 1846,
              enabled: true,
            },
            {
              id: "sm3",
              kind: "topic-fence",
              description: "Refuse ADR certification + legal-engineering advice.",
              action: "escalate",
              inspected24h: 1846,
              hits24h: 6,
              enabled: true,
            },
          ]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · single moderation rule · catch-all flag
        </span>
        <SafetyCheckBlock
          title="Outbound moderation only"
          rules={[
            {
              id: "om1",
              kind: "moderation",
              description: "OpenAI moderation pass on any outbound message.",
              action: "flag",
              inspected24h: 412,
              hits24h: 2,
              enabled: true,
            },
          ]}
        />
      </section>
    </main>
  )
}
