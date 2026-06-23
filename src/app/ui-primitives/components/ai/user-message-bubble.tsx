import { Paperclip } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./user-message-bubble.module.css"

export interface UserMessageAttachment {
  id: string
  name: string
  size?: string
}

interface UserMessageBubbleProps {
  children: ReactNode
  timestamp: string
  authorName?: string
  edited?: boolean
  attachments?: ReadonlyArray<UserMessageAttachment>
  className?: string
}

export function UserMessageBubble({
  children,
  timestamp,
  authorName = "You",
  edited = false,
  attachments,
  className,
}: UserMessageBubbleProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <li className={classes}>
      <article className={styles.bubble} aria-label={`${authorName} message`}>
        <div className={styles.content}>{children}</div>
        {attachments && attachments.length > 0 && (
          <ul className={styles.attachments} aria-label="Attachments">
            {attachments.map((attachment) => (
              <li key={attachment.id} className={styles.attachment}>
                <Paperclip size={12} strokeWidth={2.2} aria-hidden="true" />
                <span className={styles.attachmentName}>{attachment.name}</span>
                {attachment.size && (
                  <span className={styles.attachmentSize}>{attachment.size}</span>
                )}
              </li>
            ))}
          </ul>
        )}
        <footer className={styles.meta}>
          <time className={styles.time}>{timestamp}</time>
          {edited && <span className={styles.editedBadge}>edited</span>}
        </footer>
      </article>
    </li>
  )
}

export default UserMessageBubble
