import { Zap } from "lucide-react"
import type { CSSProperties } from "react"

import nodeStyles from "./node-base.module.css"
import styles from "./node-trigger.module.css"

interface NodeTriggerProps {
  /** Workflow node label e.g. "New booking created". */
  name: string
  /** Optional event/source meta — e.g. "Webhook · Calendly". */
  source?: string
  /** Position as percentage of canvas. */
  x: number
  y: number
  /** Mark the trigger as actively listening. */
  live?: boolean
}

export function NodeTrigger({ name, source, x, y, live = false }: NodeTriggerProps) {
  const position: CSSProperties = { left: `${x}%`, top: `${y}%` }
  const className = [nodeStyles.node, nodeStyles.toneAmber].join(" ")

  return (
    <article
      className={className}
      style={position}
      aria-label={`Trigger node: ${name}`}
    >
      <div className={nodeStyles.header}>
        <span className={nodeStyles.iconBadge} aria-hidden="true">
          <Zap strokeWidth={2.4} />
        </span>
        <span className={nodeStyles.kicker}>Trigger</span>
        {live ? (
          <span className={styles.pulseDot} aria-label="Listening" />
        ) : (
          <span className={nodeStyles.statusDot} aria-hidden="true" />
        )}
      </div>
      <h3 className={nodeStyles.title}>{name}</h3>
      {source ? <span className={nodeStyles.meta}>{source}</span> : null}
      <span
        className={[nodeStyles.port, nodeStyles.portRight].join(" ")}
        aria-hidden="true"
      />
    </article>
  )
}
