import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PromptBlock } from "../../components/ai-workflow"

import {
  QUOTE_PROMPT_VARS,
  QUOTE_SYSTEM_PROMPT,
  QUOTE_USER_PROMPT,
} from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Prompt block | AI workflow",
  description:
    "Primitive 02 — system + user prompt editor with variable scope chips and a token-budget meter.",
}

const SHORT_SYSTEM = "You are the Mufflermen quote estimator. Output JSON only."
const SHORT_USER = "Quote a {{vehicle.model}} cat-back. Use {{labour.hours}}h labour."

const OVERFLOW_SYSTEM = `${QUOTE_SYSTEM_PROMPT}

Extended rules below — keep responses inside the SMS-safe envelope.

Always:
- Greet by first name if available, otherwise use "mate".
- Quote AUD inc GST. Round to the nearest dollar.
- Cite supplier feed timestamps when listing lead times.
- Use parts.search before quoting non-stock SKUs.
- When in doubt about fitment year + variant, ask one clarifying question.
- Refuse engine ECU tuning advice — escalate to Sam Whittaker.
- Pause refunds > $200 AUD and hand off to Bec Singh.
- For after-hours requests, offer hours then next available bay slot.
- Never invent stock outside the supplier feed window.
- Validate VIN structure if provided.
- Sanity-check labour hours against the labour matrix.
- Sanity-check parts against the high-clear catalogue for N-series Hiluxes.
- Honour Do-Not-Contact list.
- Skip channel-specific footers when the channel is voice.
- Honour Mufflermen civility threshold — no sharp replies.
- Use AEST timestamps. Cite supplier feed timestamps when listing lead times.
- Honour Mufflermen civility threshold — no sharp replies. Use AEST timestamps. Quote AUD inc GST. Round to the nearest dollar.`

export default function PromptBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Prompt"
        title="Prompt block"
        description="The prompt editor — system + user fields with a live variable scope and a token-budget meter that shifts amber then red as the prompt approaches its limit. Quote estimator v3.2 on display."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Prompt block" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · quote estimator v3.2 · budget in the green
        </span>
        <PromptBlock
          title="Quote estimator"
          kicker="prompt · v3.2 · live"
          systemPrompt={QUOTE_SYSTEM_PROMPT}
          userPrompt={QUOTE_USER_PROMPT}
          variables={QUOTE_PROMPT_VARS}
          tokenBudget={8000}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · slim variant · SMS-safe</span>
        <PromptBlock
          title="SMS triage · slim"
          kicker="prompt · sms-triage v1.0"
          systemPrompt={SHORT_SYSTEM}
          userPrompt={SHORT_USER}
          variables={QUOTE_PROMPT_VARS.slice(0, 2)}
          tokenBudget={1200}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · over-budget · token meter goes red
        </span>
        <PromptBlock
          title="Blog draft · long form"
          kicker="prompt · blog-draft v0.3"
          systemPrompt={OVERFLOW_SYSTEM}
          userPrompt={QUOTE_USER_PROMPT}
          variables={QUOTE_PROMPT_VARS}
          tokenBudget={500}
        />
      </section>
    </main>
  )
}
