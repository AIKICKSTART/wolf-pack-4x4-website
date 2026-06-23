"use client"

import { MessageSquare, X } from "lucide-react"
import { useState, type ReactNode } from "react"

import styles from "./floating-chat-launcher.module.css"

export interface FloatingChatLauncherProps {
  /** Heading shown when the preview card is open. */
  heading: string
  /** Sub-body. */
  body: string
  /** Render the preview card content. Examples: list of canned questions, agent intro. */
  preview: ReactNode
  /** Numeric notification count — drives the badge. 0 hides the dot. */
  notificationCount?: number
  /** Override the spoken label on the launcher button. */
  launcherLabel?: string
  className?: string
}

export function FloatingChatLauncher({
  heading,
  body,
  preview,
  notificationCount = 0,
  launcherLabel = "Open workshop chat",
  className,
}: FloatingChatLauncherProps) {
  const [open, setOpen] = useState(false)

  const classes = [styles.root, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      {open ? (
        <div className={styles.card} role="dialog" aria-labelledby="chat-launcher-heading">
          <header className={styles.cardHead}>
            <div>
              <span className={styles.cardKicker}>Mufflermen workshop</span>
              <h3 id="chat-launcher-heading" className={styles.cardHeading}>
                {heading}
              </h3>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close chat preview"
            >
              <X size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </header>
          <p className={styles.cardBody}>{body}</p>
          <div className={styles.cardPreview}>{preview}</div>
        </div>
      ) : null}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={launcherLabel}
      >
        <span className={styles.pulse} aria-hidden="true" />
        <span className={styles.icon} aria-hidden="true">
          <MessageSquare size={20} strokeWidth={1.6} />
        </span>
        {notificationCount > 0 && !open ? (
          <span className={styles.badge} aria-label={`${notificationCount} unread messages`}>
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        ) : null}
      </button>
    </div>
  )
}

export default FloatingChatLauncher
