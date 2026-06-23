"use client"

import { Filter, Plus } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import { TagInput } from "../primitives/tag-input"
import type { ChipTone } from "../primitives/chip"

import styles from "./audience-segment-builder.module.css"
import type {
  SegmentOperator,
  SegmentRuleKind,
} from "./marketing-campaigns-types"

export interface SegmentRule {
  id: string
  kind: SegmentRuleKind
  label: string
  /** True if the rule is currently active (selected). */
  active?: boolean
}

export interface SegmentRuleGroup {
  id: string
  operator: SegmentOperator
  rules: ReadonlyArray<SegmentRule>
  /** Initial tag inputs in this group. */
  initialTags?: ReadonlyArray<string>
}

interface AudienceSegmentBuilderProps {
  groups: ReadonlyArray<SegmentRuleGroup>
  /** Estimated audience size, e.g. 1240. */
  estimate: number
  /** Optional reach delta vs last preview. */
  estimateDelta?: string
  className?: string
}

const KIND_TONE: Record<SegmentRuleKind, ChipTone> = {
  attribute: "teal",
  behavior: "green",
  event: "amber",
  negation: "red",
}

const KIND_LABEL: Record<SegmentRuleKind, string> = {
  attribute: "Attribute",
  behavior: "Behavior",
  event: "Event",
  negation: "Negation",
}

function formatEstimate(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`
  }
  return value.toLocaleString("en-AU")
}

export function AudienceSegmentBuilder({
  groups,
  estimate,
  estimateDelta,
  className,
}: AudienceSegmentBuilderProps) {
  const [activeOperator, setActiveOperator] = useState<SegmentOperator>("and")
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Audience segment builder"
    >
      <header className={styles.header}>
        <span className={styles.kicker}>
          <Filter size={13} strokeWidth={2.4} aria-hidden="true" />
          Audience segment
        </span>
        <div className={styles.operatorRow} role="group" aria-label="Group operator">
          {(["and", "or"] satisfies SegmentOperator[]).map((op) => (
            <button
              key={op}
              type="button"
              className={styles.operator}
              aria-pressed={activeOperator === op}
              onClick={() => setActiveOperator(op)}
            >
              {op.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.groups}>
        {groups.map((group) => (
          <div key={group.id} className={styles.group}>
            <span className={styles.groupBadge}>
              {group.operator.toUpperCase()}
            </span>
            <div className={styles.rules}>
              {group.rules.map((rule) => (
                <Chip
                  key={rule.id}
                  label={`${KIND_LABEL[rule.kind]} · ${rule.label}`}
                  tone={KIND_TONE[rule.kind]}
                  selected={rule.active ?? true}
                />
              ))}
              <Chip
                label="Add rule"
                tone="neutral"
                icon={<Plus size={11} strokeWidth={2.6} aria-hidden="true" />}
              />
            </div>
            <TagInput
              label="Inline tag rules"
              placeholder="vehicle:ute, suburb:Wollongong…"
              defaultValue={[...(group.initialTags ?? [])]}
              helperText="Press Enter or comma to add a tag rule"
            />
          </div>
        ))}
      </div>

      <footer className={styles.estimate} aria-live="polite">
        <span className={styles.estimateLabel}>Estimated reach</span>
        <strong className={styles.estimateValue}>
          {formatEstimate(estimate)}
        </strong>
        {estimateDelta ? (
          <span className={styles.estimateDelta}>{estimateDelta}</span>
        ) : null}
      </footer>
    </section>
  )
}

export default AudienceSegmentBuilder
