import { Settings } from "lucide-react"
import type { CSSProperties } from "react"

import nodeStyles from "./node-base.module.css"
import styles from "./node-action.module.css"

interface NodeActionProps {
  /** Action display name e.g. "Send confirmation SMS". */
  name: string
  /** Optional service name — e.g. "Twilio · SMS". */
  service?: string
  /** Position as percentage of canvas. */
  x: number
  y: number
  /** Running visual treatment. */
  running?: boolean
}

export function NodeAction({ name, service, x, y, running = false }: NodeActionProps) {
  const position: CSSProperties = { left: `${x}%`, top: `${y}%` }
  const className = [nodeStyles.node, nodeStyles.toneTeal].join(" ")

  return (
    <article
      className={className}
      style={position}
      aria-label={`Action node: ${name}`}
    >
      <div className={nodeStyles.header}>
        <span className={nodeStyles.iconBadge} aria-hidden="true">
          <Settings strokeWidth={2.2} />
        </span>
        <span className={nodeStyles.kicker}>Action</span>
        {running ? (
          <span className={styles.spinner} aria-label="Running">RUN</span>
        ) : (
          <span className={nodeStyles.statusDot} aria-hidden="true" />
        )}
      </div>
      <h3 className={nodeStyles.title}>{name}</h3>
      {service ? <span className={nodeStyles.meta}>{service}</span> : null}
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
