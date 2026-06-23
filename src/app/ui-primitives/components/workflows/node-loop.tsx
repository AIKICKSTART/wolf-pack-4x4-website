import { Repeat } from "lucide-react"
import type { CSSProperties } from "react"

import nodeStyles from "./node-base.module.css"
import styles from "./node-loop.module.css"

interface NodeLoopProps {
  /** Loop title e.g. "For each booking item". */
  name: string
  /** Optional iteration label — e.g. "items in cart". */
  iteration?: string
  x: number
  y: number
}

export function NodeLoop({ name, iteration, x, y }: NodeLoopProps) {
  const position: CSSProperties = { left: `${x}%`, top: `${y}%` }
  const className = [nodeStyles.node, nodeStyles.toneRed].join(" ")

  return (
    <article
      className={className}
      style={position}
      aria-label={`Loop node: ${name}`}
    >
      <div className={nodeStyles.header}>
        <span className={nodeStyles.iconBadge} aria-hidden="true">
          <Repeat strokeWidth={2.2} />
        </span>
        <span className={nodeStyles.kicker}>For Each</span>
        <span className={nodeStyles.statusDot} aria-hidden="true" />
      </div>
      <h3 className={nodeStyles.title}>{name}</h3>
      {iteration ? (
        <span className={styles.iteration}>
          <strong>iter</strong>
          {iteration}
        </span>
      ) : null}
      <span
        className={[nodeStyles.port, nodeStyles.portLeft].join(" ")}
        aria-hidden="true"
      />
      <span
        className={[nodeStyles.port, nodeStyles.portRight].join(" ")}
        aria-hidden="true"
      />
      <span
        className={[nodeStyles.port, nodeStyles.portBottom].join(" ")}
        aria-hidden="true"
      />
      <span className={[nodeStyles.portLabel, nodeStyles.portLabelBottom, styles.loopback].join(" ")}>
        Loop back
      </span>
    </article>
  )
}
