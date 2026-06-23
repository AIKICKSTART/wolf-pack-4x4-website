import { GitBranch } from "lucide-react"
import type { CSSProperties } from "react"

import nodeStyles from "./node-base.module.css"
import styles from "./node-condition.module.css"

interface NodeConditionProps {
  /** Condition title e.g. "Hilux platform?". */
  name: string
  /** Optional expression e.g. "booking.vehicle.platform === 'Hilux'". */
  expression?: string
  x: number
  y: number
}

export function NodeCondition({ name, expression, x, y }: NodeConditionProps) {
  const position: CSSProperties = { left: `${x}%`, top: `${y}%` }
  const className = [nodeStyles.node, nodeStyles.toneGreen].join(" ")

  return (
    <article
      className={className}
      style={position}
      aria-label={`Condition node: ${name}`}
    >
      <div className={nodeStyles.header}>
        <span className={nodeStyles.iconBadge} aria-hidden="true">
          <GitBranch strokeWidth={2.2} />
        </span>
        <span className={nodeStyles.kicker}>Condition</span>
        <span className={nodeStyles.statusDot} aria-hidden="true" />
      </div>
      <h3 className={nodeStyles.title}>{name}</h3>
      {expression ? (
        <span className={styles.expression}>
          <code>{expression}</code>
        </span>
      ) : null}
      <span
        className={[nodeStyles.port, nodeStyles.portLeft].join(" ")}
        aria-hidden="true"
      />
      <span
        className={[nodeStyles.port, nodeStyles.portTop].join(" ")}
        aria-hidden="true"
      />
      <span className={[nodeStyles.portLabel, nodeStyles.portLabelTop, styles.branchPill, styles.branchTrue].join(" ")}>
        True
      </span>
      <span
        className={[nodeStyles.port, nodeStyles.portBottom].join(" ")}
        aria-hidden="true"
      />
      <span className={[nodeStyles.portLabel, nodeStyles.portLabelBottom, styles.branchPill, styles.branchFalse].join(" ")}>
        False
      </span>
    </article>
  )
}
