"use client"

import { Bell, BellOff } from "lucide-react"
import { useState } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./comment-subscription-row.module.css"
import type { CommentAuthor } from "./comment-types"

interface CommentSubscriptionRowProps {
  followers: ReadonlyArray<CommentAuthor>
  /** Maximum number of avatars to render before the overflow chip. */
  maxAvatars?: number
  /** Initial subscribed state. */
  defaultSubscribed?: boolean
  /** Short label like "Bay 3 lift retrofit thread". */
  threadLabel?: string
  onToggle?: (subscribed: boolean) => void
  className?: string
}

export function CommentSubscriptionRow({
  followers,
  maxAvatars = 4,
  defaultSubscribed = true,
  threadLabel = "this thread",
  onToggle,
  className,
}: CommentSubscriptionRowProps) {
  const [subscribed, setSubscribed] = useState<boolean>(defaultSubscribed)
  const visible = followers.slice(0, maxAvatars)
  const remainder = Math.max(0, followers.length - visible.length)

  const toggle = () => {
    setSubscribed((prev) => {
      const next = !prev
      onToggle?.(next)
      return next
    })
  }

  const classes = [styles.row, className].filter(Boolean).join(" ")
  const namesLine = followers
    .slice(0, 3)
    .map((follower) => follower.name)
    .join(", ")
  const trailingNames =
    followers.length > 3 ? `${namesLine} +${followers.length - 3} more` : namesLine

  return (
    <div className={classes}>
      <div className={styles.label}>
        <span className={styles.title}>Subscribers</span>
        <span className={styles.detail}>{trailingNames}</span>
      </div>
      <div className={styles.avatars} aria-hidden="true">
        {visible.map((follower) => (
          <Avatar
            key={follower.id}
            name={follower.name}
            src={follower.avatar}
            size="sm"
            tone="obsidian"
          />
        ))}
        {remainder > 0 ? (
          <span className={styles.overflow}>+{remainder}</span>
        ) : null}
      </div>
      <button
        type="button"
        className={[
          styles.bell,
          subscribed ? styles.bellActive : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-pressed={subscribed}
        aria-label={
          subscribed
            ? `Unsubscribe from ${threadLabel}`
            : `Subscribe to ${threadLabel}`
        }
        onClick={toggle}
      >
        {subscribed ? (
          <Bell size={14} strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <BellOff size={14} strokeWidth={2.4} aria-hidden="true" />
        )}
        <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
      </button>
    </div>
  )
}

export default CommentSubscriptionRow
