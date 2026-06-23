import { Chip } from "../primitives/chip"

import { formatPercent, formatSampleSize } from "./ab-runtime-types"

import styles from "./holdout-audience-card.module.css"

export type HoldoutExcludeOperator =
  | "is"
  | "is-not"
  | "in"
  | "starts-with"
  | "matches"

export interface HoldoutExcludeRule {
  id: string
  field: string
  operator: HoldoutExcludeOperator
  values: ReadonlyArray<string>
}

export interface HoldoutAudienceCardProps {
  /** Holdout group name. */
  name: string
  /** Optional description for the holdout. */
  description?: string
  /** Holdout percent 0..100. */
  holdoutPct: number
  /** Estimated visitors in the holdout. */
  estimatedSize?: number
  /** Exclude rules. */
  excludeRules: ReadonlyArray<HoldoutExcludeRule>
  /** When in effect, e.g. "Until 2026-08-01". */
  effectiveUntil?: string
  className?: string
}

const OPERATOR_LABEL: Record<HoldoutExcludeOperator, string> = {
  is: "is",
  "is-not": "is not",
  in: "in",
  "starts-with": "starts with",
  matches: "matches",
}

export function HoldoutAudienceCard({
  name,
  description,
  holdoutPct,
  estimatedSize,
  excludeRules,
  effectiveUntil,
  className,
}: HoldoutAudienceCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Holdout group ${name}`}
    >
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Holdout audience</span>
          <h2 className={styles.title}>{name}</h2>
          {description ? (
            <p
              style={{
                margin: "var(--primitive-space-0)",
                fontSize: "var(--primitive-text-sm)",
                color: "var(--primitive-body)",
              }}
            >
              {description}
            </p>
          ) : null}
        </div>
        <div className={styles.percentBlock}>
          <div className={styles.percentValue}>{formatPercent(holdoutPct, 0)}</div>
          <div className={styles.percentLabel}>Holdout</div>
        </div>
      </header>

      <div className={styles.rules} aria-label="Exclude rules">
        <span className={styles.ruleHeading}>Exclude rules</span>
        {excludeRules.length === 0 ? (
          <Chip label="No exclude rules" tone="neutral" />
        ) : (
          excludeRules.map((rule) => (
            <div key={rule.id} className={styles.rule}>
              <span className={styles.ruleField}>{rule.field}</span>
              <span className={styles.ruleOperator}>
                {OPERATOR_LABEL[rule.operator]}
              </span>
              <span className={styles.ruleValues}>
                {rule.values.map((value) => (
                  <Chip key={value} label={value} tone="amber" />
                ))}
              </span>
            </div>
          ))
        )}
      </div>

      <div className={styles.metaRow}>
        <span>
          {estimatedSize !== undefined
            ? `Est. ${formatSampleSize(estimatedSize)} subjects`
            : "Size unknown"}
        </span>
        {effectiveUntil ? <span>Effective until {effectiveUntil}</span> : null}
      </div>
    </section>
  )
}

export default HoldoutAudienceCard
