"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import {
  AudienceTargetingRules,
  type AudienceRule,
  type AudienceRuleKind,
} from "../../components/product-tours"
import { SAMPLE_AUDIENCE_RULES } from "../fixtures"

import styles from "../product-tours.module.css"

const SUGGESTED_VALUE: Record<AudienceRuleKind, string> = {
  url: "/dashboard/*",
  segment: "fleet · retail",
  role: "owner · service-advisor",
  "first-time": "true",
  returning: "true",
  device: "desktop · tablet",
  locale: "en-AU",
  plan: "monthly · annual",
}

function makeRule(kind: AudienceRuleKind, id: string): AudienceRule {
  return {
    id,
    kind,
    comparator: kind === "first-time" || kind === "returning" ? "is" : "matches",
    value: SUGGESTED_VALUE[kind],
  }
}

export default function AudienceTargetingRulesScenePage() {
  const [rules, setRules] = useState<ReadonlyArray<AudienceRule>>(SAMPLE_AUDIENCE_RULES)
  const [match, setMatch] = useState<"all" | "any">("all")

  const addRule = (kind: AudienceRuleKind) => {
    const id = `ar-${Date.now()}-${kind}`
    setRules((prev) => [...prev, makeRule(kind, id)])
  }

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Audience rules"
        title="Audience targeting rules"
        description="Who sees this tour. Stack URL, segment, role, first-time, device and plan chips with a match-all / match-any toggle. Try adding or removing rules below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Audience targeting rules" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Instant quote walk-through · 12,840 fleet users</span>
        <AudienceTargetingRules
          tourName="Instant quote walk-through"
          rules={rules}
          match={match}
          estimatedReach={12_840}
          onAddRule={addRule}
          onRemoveRule={(id) => setRules((prev) => prev.filter((rule) => rule.id !== id))}
          onToggleMatch={() => setMatch((prev) => (prev === "all" ? "any" : "all"))}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Empty state · no rules yet</span>
        <AudienceTargetingRules
          tourName="Bay availability widget tour"
          rules={[]}
          match="all"
          estimatedReach={2_104}
          onAddRule={() => undefined}
        />
      </section>
    </main>
  )
}
