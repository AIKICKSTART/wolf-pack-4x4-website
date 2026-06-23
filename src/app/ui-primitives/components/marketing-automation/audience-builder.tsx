"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"

import styles from "./audience-builder.module.css"
import type {
  AudienceLogicGroupOperator,
  AudiencePredicateKind,
} from "./marketing-automation-types"

export interface AudiencePredicate {
  id: string
  kind: AudiencePredicateKind
  label: string
  /** Optional comparison RHS, e.g. ">= 365 days". */
  value?: string
}

export interface AudienceGroup {
  id: string
  title: string
  operator: AudienceLogicGroupOperator
  predicates: ReadonlyArray<AudiencePredicate>
}

interface AudienceBuilderProps {
  title?: string
  groups: ReadonlyArray<AudienceGroup>
  /** Estimated audience reach. */
  estimate: number
  /** Optional delta vs last preview. */
  estimateDelta?: { value: number; direction: "up" | "down" }
  className?: string
}

const KIND_TONE: Record<AudiencePredicateKind, "neutral" | "red" | "amber" | "teal" | "green"> = {
  attribute: "teal",
  behaviour: "green",
  lifecycle: "amber",
  geo: "teal",
  vehicle: "amber",
  tag: "neutral",
  negation: "red",
}

const KIND_LABEL: Record<AudiencePredicateKind, string> = {
  attribute: "Attribute",
  behaviour: "Behaviour",
  lifecycle: "Lifecycle",
  geo: "Geo",
  vehicle: "Vehicle",
  tag: "Tag",
  negation: "Negation",
}

export function AudienceBuilder({
  title = "Audience builder",
  groups: initialGroups,
  estimate,
  estimateDelta,
  className,
}: AudienceBuilderProps) {
  const [operators, setOperators] = useState<Record<string, AudienceLogicGroupOperator>>(
    Object.fromEntries(initialGroups.map((g) => [g.id, g.operator])),
  )

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section className={classes} role="region" aria-label={title}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Audience</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.estimate}>
          <span className={styles.estimateLabel}>Estimated reach</span>
          <span className={styles.estimateValue}>
            {estimate.toLocaleString("en-AU")}
          </span>
          {estimateDelta ? (
            <span
              className={styles.estimateDelta}
              data-direction={estimateDelta.direction}
            >
              {estimateDelta.direction === "up" ? "+" : "−"}
              {estimateDelta.value.toLocaleString("en-AU")} vs last preview
            </span>
          ) : null}
        </div>
      </header>

      <div className={styles.groups}>
        {initialGroups.map((group) => {
          const operator = operators[group.id] ?? group.operator
          return (
            <fieldset key={group.id} className={styles.group}>
              <legend className="sr-only">{group.title}</legend>
              <span
                className={[
                  styles.groupLogic,
                  operator === "and" ? styles.groupLogicAnd : styles.groupLogicOr,
                ].join(" ")}
                aria-hidden="true"
              >
                {operator.toUpperCase()}
              </span>
              <div className={styles.groupHead}>
                <span className={styles.groupTitle}>{group.title}</span>
                <div
                  className={styles.operatorToggle}
                  role="radiogroup"
                  aria-label={`${group.title} operator`}
                >
                  <button
                    type="button"
                    className={styles.operatorButton}
                    role="radio"
                    aria-checked={operator === "and"}
                    onClick={() =>
                      setOperators((prev) => ({ ...prev, [group.id]: "and" }))
                    }
                  >
                    AND
                  </button>
                  <button
                    type="button"
                    className={styles.operatorButton}
                    role="radio"
                    aria-checked={operator === "or"}
                    onClick={() =>
                      setOperators((prev) => ({ ...prev, [group.id]: "or" }))
                    }
                  >
                    OR
                  </button>
                </div>
              </div>
              {group.predicates.map((predicate) => (
                <div key={predicate.id} className={styles.predicateRow}>
                  <div className={styles.predicateMeta}>
                    <span className={styles.predicateKind}>
                      {KIND_LABEL[predicate.kind]}
                    </span>
                    <span className={styles.predicateLabel}>{predicate.label}</span>
                  </div>
                  <span className={styles.predicateValue}>
                    {predicate.value ?? (
                      <Chip
                        label={KIND_LABEL[predicate.kind]}
                        tone={KIND_TONE[predicate.kind]}
                      />
                    )}
                  </span>
                </div>
              ))}
            </fieldset>
          )
        })}
      </div>
    </section>
  )
}

export default AudienceBuilder
