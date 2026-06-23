import { Clock } from "lucide-react"
import type { CSSProperties } from "react"

import nodeStyles from "./node-base.module.css"
import styles from "./node-wait.module.css"

interface NodeWaitProps {
  /** Display duration label e.g. "Wait 5 minutes". */
  duration: string
  /** Optional schedule hint e.g. "Mon–Fri only". */
  schedule?: string
  x: number
  y: number
}

export function NodeWait({ duration, schedule, x, y }: NodeWaitProps) {
  const position: CSSProperties = { left: `${x}%`, top: `${y}%` }
  const className = [nodeStyles.node, nodeStyles.toneAmber, styles.compact].join(" ")

  return (
    <article
      className={className}
      style={position}
      aria-label={`Wait node: ${duration}`}
    >
      <div className={nodeStyles.header}>
        <span className={nodeStyles.iconBadge} aria-hidden="true">
          <Clock strokeWidth={2.2} />
        </span>
        <span className={nodeStyles.kicker}>Delay</span>
        <span className={nodeStyles.statusDot} aria-hidden="true" />
      </div>
      <h3 className={nodeStyles.title}>{duration}</h3>
      {schedule ? (
        <span className={styles.duration}>
          <strong>{schedule}</strong>
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
    </article>
  )
}
