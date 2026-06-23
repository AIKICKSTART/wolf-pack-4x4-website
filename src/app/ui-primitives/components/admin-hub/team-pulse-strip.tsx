import { Avatar } from "../primitives/avatar"
import {
  PRESENCE_LABEL,
  PRESENCE_TONE,
  adminToneToAvatar,
  presenceToAvatarStatus,
  type TeamPresence,
  type TeamPulseMember,
} from "./admin-hub-types"

import styles from "./team-pulse-strip.module.css"

interface TeamPulseStripProps {
  members: ReadonlyArray<TeamPulseMember>
  title?: string
  className?: string
}

function tally(members: ReadonlyArray<TeamPulseMember>): Record<TeamPresence, number> {
  const counts: Record<TeamPresence, number> = {
    online: 0,
    away: 0,
    busy: 0,
    offline: 0,
    sick: 0,
  }
  for (const member of members) {
    counts[member.presence] += 1
  }
  return counts
}

const PRESENCE_ORDER: ReadonlyArray<TeamPresence> = ["online", "busy", "away", "sick", "offline"]

const PRESENCE_DOT_CLASS: Record<TeamPresence, string> = {
  online: styles.dotOnline,
  away: styles.dotAway,
  busy: styles.dotBusy,
  offline: styles.dotOffline,
  sick: styles.dotSick,
}

export function TeamPulseStrip({
  members,
  title = "Team pulse",
  className,
}: TeamPulseStripProps) {
  const counts = tally(members)

  return (
    <section
      className={[styles.strip, className].filter(Boolean).join(" ")}
      aria-label={title}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{title}</span>
        <ul className={styles.summary} aria-label="Presence summary">
          {PRESENCE_ORDER.map((presence) => (
            <li key={presence} className={styles.summaryItem}>
              <span
                className={[styles.summaryDot, PRESENCE_DOT_CLASS[presence]].join(" ")}
                aria-hidden="true"
              />
              <span className={styles.summaryCount}>{counts[presence]}</span>
              <span className={styles.summaryLabel}>{PRESENCE_LABEL[presence]}</span>
            </li>
          ))}
        </ul>
      </header>

      <ul className={styles.list} role="list">
        {members.map((member) => {
          const tone = PRESENCE_TONE[member.presence]
          const status = presenceToAvatarStatus(member.presence)
          return (
            <li
              key={member.id}
              className={styles.chip}
              aria-label={`${member.name}, ${member.roleLabel}, ${PRESENCE_LABEL[member.presence]} — ${member.statusLabel}`}
            >
              <Avatar
                name={member.name}
                tone={adminToneToAvatar(member.tone)}
                size="sm"
                status={status}
              />
              <div className={styles.chipBody}>
                <span className={styles.chipName}>{member.name}</span>
                <span className={styles.chipRole}>{member.roleLabel}</span>
                <span
                  className={[styles.chipStatus, styles[`tone-${tone}`]].join(" ")}
                >
                  <span
                    className={[styles.statusDot, PRESENCE_DOT_CLASS[member.presence]].join(" ")}
                    aria-hidden="true"
                  />
                  {member.statusLabel}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TeamPulseStrip
