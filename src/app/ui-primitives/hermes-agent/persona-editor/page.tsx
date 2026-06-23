import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PersonaEditor } from "../../components/hermes-agent"

import {
  HERMES_ESCALATION,
  HERMES_HOURS,
  HERMES_REFUSAL_RULES,
  HERMES_SYSTEM_PROMPT,
  HERMES_TONE_OPTIONS,
} from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Persona editor | Hermes",
  description:
    "Primitive 06 — Hermes persona editor: tone, refusals, hours and escalation paths with versioned snapshot.",
}

const FORMAL_TONES = HERMES_TONE_OPTIONS.map((option) => ({
  ...option,
  selected: option.id === "formal",
}))

export default function PersonaEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Persona"
        title="Persona editor"
        description="Configures Hermes — system prompt, tone preset, refusal rules, workshop hours and escalation paths. Versioned snapshot so the team can roll back. Australian English by default."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Persona editor" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · friendly tradie · v1.4</span>
        <PersonaEditor
          name="Hermes · workshop assistant"
          version="v1.4"
          systemPrompt={HERMES_SYSTEM_PROMPT}
          toneOptions={HERMES_TONE_OPTIONS}
          refusals={HERMES_REFUSAL_RULES}
          hours={HERMES_HOURS}
          escalation={HERMES_ESCALATION}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · read-only audit snapshot · v1.3
        </span>
        <PersonaEditor
          name="Hermes · audit snapshot"
          version="v1.3 (read-only)"
          systemPrompt={HERMES_SYSTEM_PROMPT}
          toneOptions={FORMAL_TONES}
          refusals={HERMES_REFUSAL_RULES}
          hours={HERMES_HOURS}
          escalation={HERMES_ESCALATION}
          readOnly
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · fresh draft · minimal seed
        </span>
        <PersonaEditor
          name="Hermes · staging draft"
          version="v1.5-draft"
          systemPrompt={"You are Hermes — a fresh draft persona. Fill in voice + guardrails below."}
          toneOptions={HERMES_TONE_OPTIONS.slice(0, 2)}
          refusals={HERMES_REFUSAL_RULES.slice(0, 2)}
          hours={HERMES_HOURS}
          escalation={HERMES_ESCALATION.slice(0, 1)}
        />
      </section>
    </main>
  )
}
