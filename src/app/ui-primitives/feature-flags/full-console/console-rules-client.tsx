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
    id: "c-1",
    subject: "workspace",
    operator: "in",
    values: ["oak-flats", "wollongong-east"],
  },
  {
    id: "c-2",
    subject: "geo",
    operator: "starts-with",
    values: ["AU-NSW"],
  },
]

export function ConsoleRulesList() {
  const [rules, setRules] = useState<ReadonlyArray<TargetingRule>>(INITIAL_RULES)

  const update = (id: string, patch: Partial<TargetingRule>) => {
    setRules((current) =>
      current.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)),
    )
  }

  return (
    <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
      {rules.map((rule) => (
        <TargetingRuleRow
          key={rule.id}
          rule={rule}
          onSubjectChange={(id, subject: FlagSubject) => update(id, { subject })}
          onOperatorChange={(id, operator: FlagOperator) => update(id, { operator })}
          onValuesChange={(id, values) => update(id, { values })}
          onRemove={(id) => setRules((current) => current.filter((r) => r.id !== id))}
        />
      ))}
    </div>
  )
}
