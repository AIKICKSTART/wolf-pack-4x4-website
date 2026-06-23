"use client"

import { Eye, EyeOff, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import type { WebhookEventStatus } from "./api-console-types"

import styles from "./webhook-subscriber-row.module.css"

export interface WebhookSubscriberItem {
  id: string
  url: string
  events: ReadonlyArray<string>
  status: WebhookEventStatus
  lastDeliveryAt: string | null
  /** Masked signing secret (display only — never hold a real secret in props). */
  maskedSecret: string
}

interface WebhookSubscriberRowProps {
  subscriber: WebhookSubscriberItem
  onEdit?: (id: string) => void
  onRevoke?: (id: string) => void
  className?: string
}

const STATUS_TONE: Record<WebhookEventStatus, "green" | "amber" | "red" | "teal" | "neutral"> = {
  delivered: "green",
  pending: "teal",
  retrying: "amber",
  failed: "red",
  abandoned: "neutral",
}

const STATUS_LABEL: Record<WebhookEventStatus, string> = {
  delivered: "Delivered",
  pending: "Pending",
  retrying: "Retrying",
  failed: "Failed",
  abandoned: "Abandoned",
}

export function WebhookSubscriberRow({
  subscriber,
  onEdit,
  onRevoke,
  className,
}: WebhookSubscriberRowProps) {
  const [revealed, setRevealed] = useState(false)
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="listitem">
      <div className={styles.identity}>
        <div className={styles.urlBlock}>
          <span className={styles.protocol}>POST</span>
          <code className={styles.url}>{subscriber.url}</code>
        </div>
        <ul className={styles.events} aria-label={`Subscribed events for ${subscriber.url}`}>
          {subscriber.events.map((event) => (
            <li key={event}>
              <Chip label={event} tone="neutral" />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.statusBlock}>
        <Chip label={STATUS_LABEL[subscriber.status]} tone={STATUS_TONE[subscriber.status]} />
        <span className={styles.lastDelivery}>
          {subscriber.lastDeliveryAt
            ? `Last delivery ${subscriber.lastDeliveryAt}`
            : "No deliveries yet"}
        </span>
      </div>

      <div className={styles.secretBlock}>
        <span className={styles.secretLabel}>Signing secret</span>
        <div className={styles.secretRow}>
          <code className={styles.secret}>
            {revealed
              ? subscriber.maskedSecret.replace(/•/g, "x")
              : subscriber.maskedSecret}
          </code>
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setRevealed((prev) => !prev)}
            aria-label={revealed ? "Hide secret" : "Reveal secret"}
            aria-pressed={revealed}
          >
            {revealed ? (
              <EyeOff size={12} strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <Eye size={12} strokeWidth={2.4} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onEdit?.(subscriber.id)}
          aria-label={`Edit subscription ${subscriber.url}`}
        >
          <Pencil size={12} strokeWidth={2.4} aria-hidden="true" />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className={[styles.actionBtn, styles.actionBtnDanger].join(" ")}
          onClick={() => onRevoke?.(subscriber.id)}
          aria-label={`Revoke subscription ${subscriber.url}`}
        >
          <Trash2 size={12} strokeWidth={2.4} aria-hidden="true" />
          <span>Revoke</span>
        </button>
        <span className={styles.kebab} aria-hidden="true">
          <MoreHorizontal size={14} strokeWidth={2.2} />
        </span>
      </div>
    </div>
  )
}

export default WebhookSubscriberRow
