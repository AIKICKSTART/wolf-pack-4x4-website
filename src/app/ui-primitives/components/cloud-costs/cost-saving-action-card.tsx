"use client"

import { Chip } from "../primitives/chip"
import { Magnetic } from "../motion/magnetic"

import {
  effortTone,
  formatAud,
  formatAudCompact,
  type RecommendationStatus,
  type SavingEffort,
} from "./cloud-costs-types"
import styles from "./cost-saving-action-card.module.css"

export interface CostSavingActionCardProps {
  /** Action identifier. */
  id: string
  /** Action title (e.g. "Switch S3 prod-logs to Intelligent-Tiering"). */
  title: string
  /** Longer description shown under the title. */
  description: string
  /** Estimated monthly savings in AUD. */
  monthlySavingAud: number
  /** Implementation effort tier. */
  effort: SavingEffort
  /** Category chip (e.g. "Storage"). */
  category: string
  /** Status of the recommendation. */
  status: RecommendationStatus
  /** Optional implement CTA. */
  onImplement?: () => void
  /** Optional snooze CTA. */
  onSnooze?: () => void
  className?: string
}

function effortLabel(effort: SavingEffort): string {
  switch (effort) {
    case "low":
      return "Low effort"
    case "medium":
      return "Medium effort"
    case "high":
      return "High effort"
  }
}

function statusLabel(status: RecommendationStatus): string {
  switch (status) {
    case "new":
      return "New"
    case "in_review":
      return "In review"
    case "implemented":
      return "Implemented"
    case "dismissed":
      return "Dismissed"
  }
}

function statusTone(status: RecommendationStatus): "teal" | "amber" | "green" | "neutral" {
  switch (status) {
    case "new":
      return "teal"
    case "in_review":
      return "amber"
    case "implemented":
      return "green"
    case "dismissed":
      return "neutral"
  }
}

export function CostSavingActionCard({
  id,
  title,
  description,
  monthlySavingAud,
  effort,
  category,
  status,
  onImplement,
  onSnooze,
  className,
}: CostSavingActionCardProps) {
  const annual = monthlySavingAud * 12

  return (
    <Magnetic
      className={[styles.outer, className].filter(Boolean).join(" ")}
      strength={8}
    >
      <article
        className={styles.card}
        role="region"
        aria-labelledby={`save-${id}-title`}
      >
        <header className={styles.head}>
          <div className={styles.chips}>
            <Chip label={category} tone="neutral" />
            <Chip label={effortLabel(effort)} tone={effortTone(effort)} />
            <Chip label={statusLabel(status)} tone={statusTone(status)} />
          </div>
          <span className={styles.savingsRibbon}>
            <span className={styles.savingsLabel}>Save</span>
            <span className={styles.savingsValue}>
              {formatAudCompact(monthlySavingAud)}
            </span>
            <span className={styles.savingsUnit}>/ mo</span>
          </span>
        </header>

        <div className={styles.body}>
          <h3 id={`save-${id}-title`} className={styles.title}>
            {title}
          </h3>
          <p className={styles.description}>{description}</p>
        </div>

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>Monthly</dt>
            <dd>{formatAud(monthlySavingAud)}</dd>
          </div>
          <div className={styles.fact}>
            <dt>Annualised</dt>
            <dd>{formatAud(annual)}</dd>
          </div>
        </dl>

        {onImplement || onSnooze ? (
          <footer className={styles.actions}>
            {onImplement ? (
              <button
                type="button"
                className={styles.actionPrimary}
                onClick={onImplement}
                disabled={status === "implemented"}
              >
                {status === "implemented" ? "Already implemented" : "Implement"}
              </button>
            ) : null}
            {onSnooze ? (
              <button type="button" className={styles.actionGhost} onClick={onSnooze}>
                Snooze
              </button>
            ) : null}
          </footer>
        ) : null}
      </article>
    </Magnetic>
  )
}

export default CostSavingActionCard
