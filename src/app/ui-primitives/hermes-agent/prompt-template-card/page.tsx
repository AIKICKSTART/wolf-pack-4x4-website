import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PromptTemplateCard } from "../../components/hermes-agent"
import type { PromptTemplateTestCase } from "../../components/hermes-agent"

import {
  HERMES_PROMPT_QUOTE_ACK_BODY,
  HERMES_PROMPT_TESTS,
} from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Prompt template card | Hermes",
  description:
    "Primitive 09 — versioned prompt template card with test cases and win-rate sparkline.",
}

const FAILING_TESTS: ReadonlyArray<PromptTemplateTestCase> = [
  { id: "tc1", title: "Confirms AUD total", passed: true },
  { id: "tc2", title: "Mentions fitter hours", passed: false, assertion: "Missing labour breakdown." },
  { id: "tc3", title: "No legal boilerplate", passed: false, assertion: "Includes `T&Cs apply` phrase." },
  { id: "tc4", title: "Under 100 words", passed: true },
]

const NO_TESTS: ReadonlyArray<PromptTemplateTestCase> = []

export default function PromptTemplateCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Template"
        title="Prompt template card"
        description="A versioned prompt template card — body with token-coloured placeholders, suite of test cases, win-rate versus the previous version and a trend sparkline so the team can see whether a change is moving the needle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Prompt template card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · quote acknowledgement · v2.1 winning
        </span>
        <PromptTemplateCard
          id="tpl_quote_ack"
          title="Quote acknowledgement · SMS"
          category="Sales"
          version="v2.1"
          body={HERMES_PROMPT_QUOTE_ACK_BODY}
          testCases={HERMES_PROMPT_TESTS}
          winRate={0.78}
          sampleSize={612}
          winRateTrend={[42, 48, 51, 56, 60, 65, 68, 72, 74, 76, 78, 79]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · refund explainer · failing suite · 28% win-rate
        </span>
        <PromptTemplateCard
          id="tpl_refund"
          title="Refund explainer · email"
          category="Compliance"
          version="v0.4-staging"
          body={`Hi {{customer.firstName}},\n\nThanks for the patience. Your refund request for {{refund.amountAud}} AUD is being reviewed. T&Cs apply — we'll be in touch within 48h.\n\n— Hermes`}
          testCases={FAILING_TESTS}
          winRate={0.28}
          sampleSize={82}
          winRateTrend={[60, 54, 48, 44, 38, 36, 34, 30, 28, 28, 28, 28]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · brand new · no tests yet
        </span>
        <PromptTemplateCard
          id="tpl_saturday_open"
          title="Saturday short-notice booking"
          category="Service"
          version="v0.1-draft"
          body={`Hey {{customer.firstName}} — Bay {{slot.bay}} is open Saturday {{slot.time}}. Want me to lock it in?`}
          testCases={NO_TESTS}
          winRate={0}
          sampleSize={0}
        />
      </section>
    </main>
  )
}
