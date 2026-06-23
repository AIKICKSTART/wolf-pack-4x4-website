import { Avatar, type AvatarTone } from "../primitives/avatar"

import styles from "./owner-response-card.module.css"

export interface OwnerResponseCardProps {
  responderName: string
  responderRole?: string
  body: string
  timestamp: string
  avatarSrc?: string
  avatarTone?: AvatarTone
  className?: string
}

export function OwnerResponseCard({
  responderName,
  responderRole = "Workshop response",
  body,
  timestamp,
  avatarSrc,
  avatarTone = "red",
  className,
}: OwnerResponseCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      aria-label={`${responderRole} from ${responderName}`}
    >
      <Avatar name={responderName} src={avatarSrc} tone={avatarTone} size="sm" />
      <div className={styles.body}>
        <header className={styles.head}>
          <p className={styles.workshop}>{responderName}</p>
          <span className={styles.role}>{responderRole}</span>
          <span className={styles.timestamp}>{timestamp}</span>
        </header>
        <p className={styles.text}>{body}</p>
      </div>
    </aside>
  )
}

export default OwnerResponseCard
