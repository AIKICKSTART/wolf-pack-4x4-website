import { CheckCheck } from "lucide-react"

import { Avatar } from "../primitives/avatar"

import styles from "./read-receipt-row.module.css"
import type { ReadReceipt } from "./inbox-types"

interface ReadReceiptRowProps {
  receipts: ReadonlyArray<ReadReceipt>
  /** Maximum avatars rendered before showing a +N counter. Defaults to 3. */
  maxAvatars?: number
  /** Optional label override (e.g. "Read by"). */
  label?: string
  className?: string
}

export function ReadReceiptRow({
  receipts,
  maxAvatars = 3,
  label = "Read by",
  className,
}: ReadReceiptRowProps) {
  if (receipts.length === 0) {
    return null
  }

  const visible = receipts.slice(0, maxAvatars)
  const overflow = receipts.length - visible.length
  const latest = receipts[receipts.length - 1]
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      aria-label={`${label} ${receipts.length} ${
        receipts.length === 1 ? "person" : "people"
      }`}
    >
      <CheckCheck
        size={12}
        strokeWidth={2.5}
        aria-hidden="true"
        className={styles.icon}
      />
      <span className={styles.label}>{label}</span>
      <ul className={styles.stack} aria-hidden="true">
        {visible.map((receipt) => (
          <li key={receipt.id} className={styles.avatarItem}>
            <Avatar
              name={receipt.reader.name}
              src={receipt.reader.avatar}
              size="sm"
              tone={receipt.reader.kind === "customer" ? "amber" : "red"}
            />
          </li>
        ))}
        {overflow > 0 ? (
          <li className={styles.avatarItem}>
            <span className={styles.overflow}>+{overflow}</span>
          </li>
        ) : null}
      </ul>
      {latest ? (
        <time className={styles.time}>{latest.readAt}</time>
      ) : null}
    </div>
  )
}

export default ReadReceiptRow
