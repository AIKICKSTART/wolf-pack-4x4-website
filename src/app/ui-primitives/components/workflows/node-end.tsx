import { Flag } from "lucide-react"
import type { CSSProperties } from "react"

import nodeStyles from "./node-base.module.css"
import styles from "./node-end.module.css"

interface NodeEndProps {
  /** Optional label — defaults to "End". */
  label?: string
  /** Optional outcome — e.g. "Booking confirmed". */
  outcome?: string
  x: number
  y: number
}

export function NodeEnd({ label = "End", outcome, x, y }: NodeEndProps) {
  const position: CSSProperties = { left: `${x}%`, top: `${y}%` }
  const className = [nodeStyles.node, nodeStyles.toneNeutral, styles.compact].join(" ")

  return (
    <article
      className={className}
      style={position}
      aria-label={`End node: ${label}`}
    >
      <div className={nodeStyles.header}>
        <span className={nodeStyles.iconBadge} aria-hidden="true">
          <Flag strokeWidth={2.2} />
        </span>
        <span className={nodeStyles.kicker}>End</span>
        <span className={nodeStyles.statusDot} aria-hidden="true" />
      </div>
      <h3 className={nodeStyles.title}>{label}</h3>
      {outcome ? <span className={styles.flagAccent}>{outcome}</span> : null}
      <span
        className={[nodeStyles.port, nodeStyles.portLeft].join(" ")}
        aria-hidden="true"
      />
    </article>
  )
}
