"use client"

import { Bell, BellOff } from "lucide-react"
import { useState, useCallback } from "react"

import styles from "./subscribe-toggle.module.css"

export type SubscribeToggleSize = "sm" | "md" | "lg"

interface SubscribeToggleProps {
  subscribed: boolean
  defaultSubscribed?: boolean
  controlled?: boolean
  size?: SubscribeToggleSize
  subscribeLabel?: string
  unsubscribeLabel?: string
  onChange?: (next: boolean) => void
  className?: string
}

const SIZE_CLASS: Record<SubscribeToggleSize, string> = {
  sm: styles["size-sm"],
  md: styles["size-md"],
  lg: styles["size-lg"],
}

export function SubscribeToggle({
  subscribed,
  defaultSubscribed,
  controlled = true,
  size = "md",
  subscribeLabel = "Subscribe",
  unsubscribeLabel = "Subscribed",
  onChange,
  className,
}: SubscribeToggleProps) {
  const [internal, setInternal] = useState<boolean>(defaultSubscribed ?? subscribed)
  const [animateTick, setAnimateTick] = useState<number>(0)
  const current = controlled ? subscribed : internal

  const handleClick = useCallback(() => {
    const next = !current
    if (!controlled) setInternal(next)
    if (next) setAnimateTick((t) => t + 1)
    onChange?.(next)
  }, [current, controlled, onChange])

  const classes = [styles.toggle, SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={current}
      onClick={handleClick}
    >
      <span
        className={`${styles.icon} ${current ? styles.iconAnimate : ""}`}
        key={animateTick}
      >
        {current ? (
          <Bell size={14} strokeWidth={2.2} aria-hidden="true" />
        ) : (
          <BellOff size={14} strokeWidth={2.2} aria-hidden="true" />
        )}
      </span>
      <span>{current ? unsubscribeLabel : subscribeLabel}</span>
    </button>
  )
}

export default SubscribeToggle
