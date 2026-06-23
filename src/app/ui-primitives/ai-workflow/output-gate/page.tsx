import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OutputGate } from "../../components/ai-workflow"

import { QUOTE_GATE_LOG, QUOTE_GATE_SCHEMA } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Output gate | AI workflow",
  description:
    "Primitive 05 — output validation gate with strategy chip and recent-decisions log.",
}

const REGEX_RULE = `^[A-Z]{3}-\\d{2,4}-[A-Z0-9]{4,8}$`

const EVAL_FN = `// eval-fn: tone-safety guard
function evaluate(output) {
  const isAussieRegister = /\\b(g'day|cheers|mate|sweet|bay 2|oak flats)\\b/i.test(output)
  const noLegalDump = !/T&Cs apply|disclaimer follows/i.test(output)
  const underNinety = output.split(/\\s+/).length < 90

  return {
    pass: isAussieRegister && noLegalDump && underNinety,
    reason: !isAussieRegister
      ? "missed register"
      : !noLegalDump
        ? "legal dump"
        : !underNinety
          ? "over 90 words"
          : "ok",
  }
}`

export default function OutputGateScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Gate"
        title="Output gate"
        description="Validate model output before it leaves the workflow. Strategies span regex, JSON schema and arbitrary eval-fn. Pass-rate, evaluation count and the recent decisions log help you tune the gate without rerunning the workflow."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Output gate" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · JSON schema gate · quote validity
        </span>
        <OutputGate
          title="Quote shape · totalIncGstAud"
          strategy="json-schema"
          rulePreview={QUOTE_GATE_SCHEMA}
          passRate={0.92}
          evaluated={1846}
          log={QUOTE_GATE_LOG}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · regex · SKU format guard</span>
        <OutputGate
          title="SKU format · supplier convention"
          strategy="regex"
          rulePreview={REGEX_RULE}
          passRate={0.984}
          evaluated={486}
          log={[
            { id: "r1", timestamp: "11:02:14", sample: "MAN-3IN-HCXBN80", outcome: "pass" },
            { id: "r2", timestamp: "10:58:02", sample: "MID-PIPE-BA-44", outcome: "pass" },
            { id: "r3", timestamp: "10:32:08", sample: "manta-3in", outcome: "fail", reason: "lowercase prefix" },
          ]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · eval-fn · tone + safety guard
        </span>
        <OutputGate
          title="Hermes register guard"
          strategy="eval-fn"
          rulePreview={EVAL_FN}
          passRate={0.74}
          evaluated={142}
          log={[
            { id: "f1", timestamp: "13:02", sample: "G'day Mick — Bay 2 slot Fri 1:30", outcome: "pass" },
            { id: "f2", timestamp: "12:48", sample: "Hello, please find attached our T&Cs", outcome: "fail", reason: "legal dump" },
            { id: "f3", timestamp: "12:31", sample: "Cheers mate — quote sits at $1,695", outcome: "pass" },
            { id: "f4", timestamp: "12:14", sample: "(120-word formal reply)", outcome: "warn", reason: "over 90 words" },
          ]}
        />
      </section>
    </main>
  )
}
