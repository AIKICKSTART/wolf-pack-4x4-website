"use client"

import { useState } from "react"

import {
  TargetingRuleRow,
  type FlagOperator,
  type FlagSubject,
  type TargetingRule,
} from "../../components/feature-flags"

const INITIAL_RULES: ReadonlyArray<TargetingRule> = [
  {
    id: "rule-1",
    subject: "workspace",
    operator: "in",
    values: ["oak-flats", "wollongong-east", "dapto"],
  },
  {
    id: "rule-2",
    subject: "role",
    operator: "is",
    values: ["service-advisor"],
  },
  {
    id: "rule-3",
    subject: "device",
    operator: "starts-with",
    values: ["ios", "android"],
  },
]

export function TargetingRuleScene() {
  const [rules, setRules] = useState<ReadonlyArray<TargetingRule>>(INITIAL_RULES)

  const updateRule = (id: string, patch: Partial<TargetingRule>) => {
    setRules((current) =>
      current.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)),
    )
  }

  return (
    <div style={{ display: "grid", gap: "var(--primitive-space-3)" }}>
      {rules.map((rule) => (
        <TargetingRuleRow
          key={rule.id}
          rule={rule}
          onSubjectChange={(id, subject: FlagSubject) => updateRule(id, { subject })}
          onOperatorChange={(id, operator: FlagOperator) => updateRule(id, { operator })}
          onValuesChange={(id, values) => updateRule(id, { values })}
          onRemove={(id) => setRules((current) => current.filter((r) => r.id !== id))}
        />
      ))}
    </div>
  )
}
