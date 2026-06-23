"use client"

import autoAnimate from "@formkit/auto-animate"
import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"
import styles from "./activity-feed.module.css"

export type ActivityTone = "info" | "success" | "warn" | "error"

export interface ActivityFeedItem {
  id: string
  title: string
  description?: string
  timestamp: string
  tone?: ActivityTone
  actor?: {
    name: string
    avatarSrc?: string
  }
  actions?: ReactNode
}

interface ActivityFeedProps {
  items: ReadonlyArray<ActivityFeedItem>
  className?: string
  ariaLabel?: string
}

function reducedMotionEnabled(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function ActivityFeed({
  items,
  className,
  ariaLabel = "Activity feed",
}: ActivityFeedProps) {
  const listRef = useRef<HTMLOListElement | null>(null)

  useEffect(() => {
    const node = listRef.current
    if (!node) {
      return
    }
    if (reducedMotionEnabled()) {
      return
    }
    autoAnimate(node, { duration: 220, easing: "ease-out" })
  }, [])

  const classes = [styles.feed, className].filter(Boolean).join(" ")

  return (
    <ol
      ref={listRef}
      className={classes}
      aria-label={ariaLabel}
      aria-live="polite"
      aria-relevant="additions"
    >
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <span className={styles.dotWrap}>
            <span className={styles.dot} data-tone={item.tone ?? "info"} aria-hidden="true" />
          </span>
          <div className={styles.body}>
            <div className={styles.meta}>
              {item.actor && (
                <span className={styles.actor}>
                  <Avatar name={item.actor.name} src={item.actor.avatarSrc} size="sm" />
                  {item.actor.name}
                </span>
              )}
              <time>{item.timestamp}</time>
            </div>
            <p className={styles.title}>{item.title}</p>
            {item.description && <p className={styles.description}>{item.description}</p>}
            {item.actions && <div className={styles.actions}>{item.actions}</div>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default ActivityFeed
