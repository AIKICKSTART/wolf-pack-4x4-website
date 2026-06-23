import { Avatar } from "../primitives/avatar"
import type { CollabReadReceipt } from "./realtime-collab-types"
import styles from "./read-receipt-trail.module.css"

interface ReadReceiptTrailProps {
  /** Receipts ordered most-recent-first. */
  receipts: ReadonlyArray<CollabReadReceipt>
  /** Optional max avatars before overflow. */
  max?: number
  /** Optional title rendered above. */
  title?: string
  className?: string
}

export function ReadReceiptTrail({
  receipts,
  max = 6,
  title,
  className,
}: ReadReceiptTrailProps) {
  const classes = [styles.trail, className].filter(Boolean).join(" ")
  const visible = receipts.slice(0, max)
  const overflow = Math.max(receipts.length - visible.length, 0)

  return (
    <div
      className={classes}
      role="group"
      aria-label={
        title
          ? `${title}. Seen by ${receipts.length} ${receipts.length === 1 ? "person" : "people"}.`
          : `Seen by ${receipts.length} ${receipts.length === 1 ? "person" : "people"}`
      }
    >
      {title && <span className={styles.title}>{title}</span>}
      <ol className={styles.list}>
        {visible.map((receipt) => (
          <li key={receipt.id} className={styles.item}>
            <span className={styles.avatar}>
              <Avatar
                name={receipt.reader.name}
                src={receipt.reader.avatar}
                size="sm"
                tone={receipt.reader.tone ?? "obsidian"}
              />
            </span>
            <span className={styles.meta}>
              <span className={styles.name}>{receipt.reader.name}</span>
              <time className={styles.seen}>{receipt.seenAt}</time>
            </span>
          </li>
        ))}
        {overflow > 0 && (
          <li className={`${styles.item} ${styles.overflow}`}>
            <span className={styles.overflowChip}>+{overflow}</span>
            <span className={styles.meta}>
              <span className={styles.name}>others</span>
              <span className={styles.seen}>seen</span>
            </span>
          </li>
        )}
      </ol>
    </div>
  )
}

export default ReadReceiptTrail
