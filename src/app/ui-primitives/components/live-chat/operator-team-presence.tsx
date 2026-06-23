import { Avatar, type AvatarStatus } from "../primitives/avatar"

import {
  OPERATOR_STATUS_LABEL,
  type OperatorStatus,
} from "./live-chat-types"
import styles from "./operator-team-presence.module.css"

export interface PresenceOperator {
  id: string
  name: string
  role: string
  status: OperatorStatus
  /** Current chats in progress. */
  load: number
  /** Maximum concurrent chats this operator accepts. */
  capacity: number
  /** Optional avatar src. */
  avatarSrc?: string
}

interface OperatorTeamPresenceProps {
  operators: ReadonlyArray<PresenceOperator>
  /** Optional heading override. */
  heading?: string
  className?: string
}

const STATUS_TO_AVATAR: Record<OperatorStatus, AvatarStatus> = {
  available: "online",
  away: "away",
  "in-wrap": "away",
  busy: "busy",
  offline: "offline",
}

function loadClass(load: number, capacity: number): string {
  if (capacity <= 0) return ""
  const ratio = load / capacity
  if (ratio >= 1) return styles.loadOver
  if (ratio >= 0.75) return styles.loadNear
  return ""
}

export function OperatorTeamPresence({
  operators,
  heading = "Team presence",
  className,
}: OperatorTeamPresenceProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")
  const onlineCount = operators.filter(
    (op) => op.status === "available" || op.status === "in-wrap",
  ).length

  return (
    <section
      className={classes}
      role="region"
      aria-label={heading}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Presence</span>
          <h3 className={styles.title}>{heading}</h3>
        </div>
        <span className={styles.summary}>
          {onlineCount}/{operators.length} online
        </span>
      </header>

      <ul className={styles.list} aria-label="Operators">
        {operators.map((op) => (
          <li key={op.id} className={styles.row}>
            <Avatar
              name={op.name}
              src={op.avatarSrc}
              size="md"
              tone="red"
              status={STATUS_TO_AVATAR[op.status]}
            />
            <div className={styles.body}>
              <span className={styles.name}>{op.name}</span>
              <span className={styles.role}>
                {op.role} · {OPERATOR_STATUS_LABEL[op.status]}
              </span>
            </div>
            <span
              className={[styles.load, loadClass(op.load, op.capacity)]
                .filter(Boolean)
                .join(" ")}
              aria-label={`${op.load} of ${op.capacity} chats in progress`}
            >
              <span className={styles.loadValue}>{op.load}</span>
              <span>/ {op.capacity}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OperatorTeamPresence
