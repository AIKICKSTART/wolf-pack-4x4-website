import { Avatar } from "../primitives/avatar"
import {
  ACTIVITY_SURFACE_LABEL,
  ACTIVITY_VERB_LABEL,
  adminToneToAvatar,
  type ActivityRow,
} from "./admin-hub-types"

import styles from "./activity-feed-row.module.css"

interface ActivityFeedRowProps {
  row: ActivityRow
  className?: string
}

const TONE_CLASS = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  violet: styles.toneViolet,
  neutral: styles.toneNeutral,
} as const

export function ActivityFeedRow({ row, className }: ActivityFeedRowProps) {
  const toneClass = TONE_CLASS[row.tone]
  const verbLabel = ACTIVITY_VERB_LABEL[row.verb]
  const surfaceLabel = ACTIVITY_SURFACE_LABEL[row.surface]
  const summary = `${row.actor.name} ${verbLabel} ${surfaceLabel} ${row.targetLabel}`

  return (
    <article
      className={[styles.row, toneClass, className].filter(Boolean).join(" ")}
      aria-label={`${summary} at ${row.timestamp}`}
    >
      <span className={styles.thread} aria-hidden="true" />

      <span className={styles.actor}>
        <Avatar
          name={row.actor.name}
          tone={adminToneToAvatar(row.tone)}
          size="sm"
        />
      </span>

      <div className={styles.body}>
        <p className={styles.summary}>
          <strong className={styles.actorName}>{row.actor.name}</strong>{" "}
          <span className={styles.verb}>{verbLabel}</span>{" "}
          <span className={styles.surface}>{surfaceLabel}</span>{" "}
          <span className={styles.target}>{row.targetLabel}</span>
        </p>
        {row.detail && <p className={styles.detail}>{row.detail}</p>}
        <div className={styles.meta}>
          <span className={styles.role}>{row.actor.role}</span>
          <time
            className={styles.timestamp}
            dateTime={row.isoTimestamp}
            title={row.isoTimestamp}
          >
            {row.timestamp}
          </time>
        </div>
      </div>
    </article>
  )
}

export default ActivityFeedRow
