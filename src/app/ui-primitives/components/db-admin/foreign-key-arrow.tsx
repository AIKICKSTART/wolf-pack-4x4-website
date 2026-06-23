import type { FkAction } from "./db-admin-types"
import styles from "./foreign-key-arrow.module.css"

interface ForeignKeyArrowProps {
  source: { table: string; column: string }
  target: { table: string; column: string }
  onDelete?: FkAction
  onUpdate?: FkAction
  /** Optional constraint name shown above the arrow. */
  constraintName?: string
  className?: string
}

const ACTION_LABEL: Record<FkAction, string> = {
  cascade: "Cascade",
  restrict: "Restrict",
  no_action: "No action",
  set_null: "Set null",
  set_default: "Set default",
}

const ACTION_CLASS: Record<FkAction, string> = {
  cascade: styles.actionCascade,
  restrict: styles.actionRestrict,
  no_action: styles.actionNoAction,
  set_null: styles.actionSetNull,
  set_default: styles.actionSetDefault,
}

export function ForeignKeyArrow({
  source,
  target,
  onDelete,
  onUpdate,
  constraintName,
  className,
}: ForeignKeyArrowProps) {
  const classes = [styles.arrow, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={`Foreign key from ${source.table}.${source.column} to ${target.table}.${target.column}`}
    >
      <div className={styles.endpoint}>
        <span className={styles.endpointLabel}>Source</span>
        <span className={styles.endpointName}>
          {source.table}.<em>{source.column}</em>
        </span>
      </div>
      <div className={styles.connector}>
        <svg
          className={styles.line}
          viewBox="0 0 120 28"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="fk-arrow-marker"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primitive-teal)" />
            </marker>
          </defs>
          <line
            x1="4"
            y1="14"
            x2="112"
            y2="14"
            stroke="var(--primitive-teal)"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            markerEnd="url(#fk-arrow-marker)"
          />
        </svg>
        {constraintName ? (
          <span
            className={styles.chip}
            aria-label={`Constraint ${constraintName}`}
          >
            {constraintName}
          </span>
        ) : null}
        <div className={styles.chips}>
          {onDelete ? (
            <span className={`${styles.chip} ${ACTION_CLASS[onDelete]}`}>
              <span className={styles.chipKey}>on delete</span>
              {ACTION_LABEL[onDelete]}
            </span>
          ) : null}
          {onUpdate ? (
            <span className={`${styles.chip} ${ACTION_CLASS[onUpdate]}`}>
              <span className={styles.chipKey}>on update</span>
              {ACTION_LABEL[onUpdate]}
            </span>
          ) : null}
        </div>
      </div>
      <div className={styles.endpoint}>
        <span className={styles.endpointLabel}>Target</span>
        <span className={styles.endpointName}>
          {target.table}.<em>{target.column}</em>
        </span>
      </div>
    </section>
  )
}

export default ForeignKeyArrow
