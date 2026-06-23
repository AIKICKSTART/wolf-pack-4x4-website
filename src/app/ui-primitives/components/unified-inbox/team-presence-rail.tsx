import { Avatar } from "../primitives/avatar"

import {
  PRESENCE_LABEL,
  PRESENCE_TONE,
  type UnifiedTeammate,
} from "./unified-inbox-types"
import styles from "./team-presence-rail.module.css"

interface TeamPresenceRailProps {
  teammates: ReadonlyArray<UnifiedTeammate>
  /** Heading label, defaults to "Team presence". */
  heading?: string
  className?: string
}

export function TeamPresenceRail({
  teammates,
  heading = "Team presence",
  className,
}: TeamPresenceRailProps) {
  const classes = [styles.rail, className].filter(Boolean).join(" ")
  const online = teammates.filter((t) => t.presence === "online").length
  const totalLoad = teammates.reduce((sum, t) => sum + t.workload, 0)
  const totalCapacity = teammates.reduce(
    (sum, t) => sum + Math.max(1, t.capacity),
    0,
  )

  return (
    <section className={classes} aria-label={heading}>
      <header className={styles.head}>
        <span className={styles.kicker}>Presence</span>
        <h3 className={styles.title}>{heading}</h3>
        <span className={styles.summary} aria-live="polite">
          {online}/{teammates.length} online · load {totalLoad}/{totalCapacity}
        </span>
      </header>

      <ul className={styles.list}>
        {teammates.map((teammate) => {
          const tone = PRESENCE_TONE[teammate.presence]
          const loadPct = Math.min(
            100,
            Math.round((teammate.workload / Math.max(1, teammate.capacity)) * 100),
          )
          return (
            <li key={teammate.id} className={styles.row}>
              <Avatar
                name={teammate.name}
                src={teammate.avatarSrc}
                size="md"
                tone="teal"
                status={teammate.presence}
              />
              <span className={styles.body}>
                <span className={styles.name}>{teammate.name}</span>
                <span className={styles.role}>{teammate.role}</span>
              </span>
              <span className={styles.meta}>
                <span
                  className={[styles.presenceChip, styles[`tone_${tone}`]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {PRESENCE_LABEL[teammate.presence]}
                </span>
                <span
                  className={styles.loadChip}
                  aria-label={`Workload ${teammate.workload} of ${teammate.capacity} conversations`}
                >
                  <span className={styles.loadValue}>
                    {teammate.workload}/{teammate.capacity}
                  </span>
                  <span className={styles.loadBar} aria-hidden="true">
                    <span
                      className={[styles.loadFill, styles[`tone_${tone}`]]
                        .filter(Boolean)
                        .join(" ")}
                      style={{ width: `${loadPct}%` }}
                    />
                  </span>
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TeamPresenceRail
