"use client"

import styles from "./audience-filter-card.module.css"

export interface AudienceCriterion {
  label: string
  tone?: "neutral" | "red" | "amber" | "teal" | "green"
}

export interface AudienceFilterCardProps {
  name: string
  description?: string
  memberCount: number
  criteria: ReadonlyArray<AudienceCriterion>
  onEdit?: () => void
  onDuplicate?: () => void
  onArchive?: () => void
  className?: string
}

const TONE_CLASS: Record<NonNullable<AudienceCriterion["tone"]>, string> = {
  neutral: styles.toneNeutral,
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

function formatMemberCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`
  return count.toString()
}

export function AudienceFilterCard({
  name,
  description,
  memberCount,
  criteria,
  onEdit,
  onDuplicate,
  onArchive,
  className,
}: AudienceFilterCardProps) {
  return (
    <article className={[styles.card, className].filter(Boolean).join(" ")} aria-label={`Audience ${name}`}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Audience</span>
          <h3 className={styles.name}>{name}</h3>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{formatMemberCount(memberCount)}</span>
          <span className={styles.metricLabel}>Members</span>
        </div>
      </header>

      <ul className={styles.criteriaList} aria-label="Criteria">
        {criteria.map((criterion) => (
          <li
            key={criterion.label}
            className={[
              styles.criterion,
              TONE_CLASS[criterion.tone ?? "neutral"],
            ].join(" ")}
          >
            {criterion.label}
          </li>
        ))}
      </ul>

      <footer className={styles.actions}>
        <button type="button" className={styles.action} onClick={onEdit} aria-label={`Edit ${name}`}>
          Edit
        </button>
        <button type="button" className={styles.action} onClick={onDuplicate} aria-label={`Duplicate ${name}`}>
          Duplicate
        </button>
        <button
          type="button"
          className={[styles.action, styles.actionDanger].join(" ")}
          onClick={onArchive}
          aria-label={`Archive ${name}`}
        >
          Archive
        </button>
      </footer>
    </article>
  )
}

export default AudienceFilterCard
