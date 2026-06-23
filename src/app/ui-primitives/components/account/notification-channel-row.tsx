"use client"

import { Bell, Mail, MessageCircle, Smartphone, type LucideIcon } from "lucide-react"
import { useId, type ChangeEvent } from "react"

import { Chip, type ChipTone } from "../primitives/chip"
import styles from "./notification-channel-row.module.css"

export type NotificationChannel = "email" | "sms" | "push" | "in-app"
export type NotificationCategory = "booking" | "quote" | "job" | "marketing" | "alert"

export interface NotificationChannelRowItem {
  channel: NotificationChannel
  destination: string
  enabled: boolean
  categories: ReadonlyArray<NotificationCategory>
}

interface NotificationChannelRowProps {
  item: NotificationChannelRowItem
  onToggle?: (channel: NotificationChannel, enabled: boolean) => void
  className?: string
}

const CHANNEL_META: Record<NotificationChannel, { label: string; icon: LucideIcon; helper: string }> =
  {
    email: { label: "Email", icon: Mail, helper: "Quotes, invoices, weekly digest" },
    sms: { label: "SMS", icon: Smartphone, helper: "Booking + job updates only" },
    push: { label: "Push", icon: Bell, helper: "Device push notifications" },
    "in-app": { label: "In-app", icon: MessageCircle, helper: "Workspace inbox alerts" },
  }

const CATEGORY_META: Record<NotificationCategory, { label: string; tone: ChipTone }> = {
  booking: { label: "Booking", tone: "teal" },
  quote: { label: "Quote", tone: "amber" },
  job: { label: "Job", tone: "green" },
  marketing: { label: "Marketing", tone: "neutral" },
  alert: { label: "Alert", tone: "red" },
}

export function NotificationChannelRow({ item, onToggle, className }: NotificationChannelRowProps) {
  const toggleId = useId()
  const helperId = useId()
  const meta = CHANNEL_META[item.channel]
  const Icon = meta.icon

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onToggle?.(item.channel, event.target.checked)
  }

  const classes = [
    styles.row,
    item.enabled ? styles.enabled : styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes} role="listitem">
      <div className={styles.identity}>
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon size={16} strokeWidth={2.2} />
        </span>
        <div className={styles.identityText}>
          <span className={styles.label}>{meta.label}</span>
          <span className={styles.destination}>{item.destination}</span>
          <span id={helperId} className={styles.helper}>
            {meta.helper}
          </span>
        </div>
      </div>

      <ul className={styles.categories} aria-label={`${meta.label} categories`}>
        {item.categories.map((category) => {
          const tagMeta = CATEGORY_META[category]
          return (
            <li key={category}>
              <Chip label={tagMeta.label} tone={tagMeta.tone} />
            </li>
          )
        })}
      </ul>

      <label htmlFor={toggleId} className={styles.toggleWrap}>
        <input
          id={toggleId}
          type="checkbox"
          role="switch"
          checked={item.enabled}
          onChange={handleChange}
          className={styles.toggleInput}
          aria-describedby={helperId}
        />
        <span className={styles.toggleTrack} aria-hidden="true">
          <span className={styles.toggleThumb} />
        </span>
        <span className={styles.toggleLabel}>{item.enabled ? "On" : "Off"}</span>
      </label>
    </div>
  )
}

export default NotificationChannelRow
