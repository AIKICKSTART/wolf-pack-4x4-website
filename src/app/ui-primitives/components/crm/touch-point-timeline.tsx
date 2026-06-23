"use client"

import { useState } from "react"

import type { TouchPointKind } from "./crm-types"
import styles from "./touch-point-timeline.module.css"

export interface TouchPoint {
  id: string
  kind: TouchPointKind
  title: string
  body?: string
  timestamp: string
  timestampIso?: string
  actor?: string
}

interface TouchPointTimelineProps {
  points: ReadonlyArray<TouchPoint>
  className?: string
}

const KIND_LABEL: Record<TouchPointKind, string> = {
  call: "Call",
  email: "Email",
  sms: "SMS",
  "in-person": "In person",
  dm: "DM",
  "quote-sent": "Quote sent",
  invoice: "Invoice",
  payment: "Payment",
}

const KIND_GLYPH: Record<TouchPointKind, string> = {
  call: "☎",
  email: "✉",
  sms: "▢",
  "in-person": "⚑",
  dm: "◐",
  "quote-sent": "$",
  invoice: "▦",
  payment: "✓",
}

export function TouchPointTimeline({
  points,
  className,
}: TouchPointTimelineProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const classes = [styles.timeline, className].filter(Boolean).join(" ")

  return (
    <ol className={classes} aria-label="Customer touch points">
      {points.map((point) => {
        const isOpen = openId === point.id
        const canExpand = Boolean(point.body)
        return (
          <li
            key={point.id}
            className={styles.item}
            data-kind={point.kind}
            data-open={isOpen ? "true" : "false"}
          >
            <span className={styles.bullet} aria-hidden="true">
              {KIND_GLYPH[point.kind]}
            </span>
            <div className={styles.body}>
              <div className={styles.head}>
                <span className={styles.kind}>{KIND_LABEL[point.kind]}</span>
                <h4 className={styles.title}>{point.title}</h4>
                <time
                  className={styles.timestamp}
                  dateTime={point.timestampIso ?? point.timestamp}
                >
                  {point.timestamp}
                </time>
              </div>
              {point.actor ? (
                <span className={styles.actor}>by {point.actor}</span>
              ) : null}
              {canExpand ? (
                <button
                  type="button"
                  className={styles.toggle}
                  onClick={() =>
                    setOpenId((current) => (current === point.id ? null : point.id))
                  }
                  aria-expanded={isOpen}
                  aria-controls={`tp-${point.id}`}
                >
                  {isOpen ? "Hide thread" : "Show thread"}
                </button>
              ) : null}
              {isOpen && point.body ? (
                <p className={styles.thread} id={`tp-${point.id}`}>
                  {point.body}
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default TouchPointTimeline
