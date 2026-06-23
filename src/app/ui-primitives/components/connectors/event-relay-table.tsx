"use client"

import { useState } from "react"

import { DataTable, type DataTableColumn } from "../data-display/data-table"
import {
  WEBHOOK_EVENT_TONE,
  type WebhookEventTone,
} from "./connectors-types"
import type { StatusTone } from "../status-page/status-types"
import styles from "./event-relay-table.module.css"

export interface EventRelayEntry {
  id: string
  /** ISO timestamp string. */
  receivedAt: string
  /** Source provider e.g. "stripe". */
  source: string
  /** Event code, e.g. "payment_intent.succeeded". */
  eventCode: string
  /** HTTP response code from forwarding target. */
  statusCode: number
  outcome: WebhookEventTone
  /** Number of delivery attempts. */
  attempts: number
}

export interface EventRelayTableProps {
  rows: ReadonlyArray<EventRelayEntry>
  /** Fires when the replay button is pressed for an event. */
  onReplay?: (eventId: string) => void
  caption?: string
  kicker?: string
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

const OUTCOME_LABEL: Record<WebhookEventTone, string> = {
  delivered: "Delivered",
  failed: "Failed",
  retrying: "Retrying",
  skipped: "Skipped",
}

function statusCodeTone(code: number): StatusTone {
  if (code >= 200 && code < 300) return "green"
  if (code >= 300 && code < 400) return "teal"
  if (code >= 400 && code < 500) return "amber"
  return "red"
}

export function EventRelayTable({
  rows,
  onReplay,
  caption = "Inbound webhook events",
  kicker,
  className,
}: EventRelayTableProps) {
  const [replayed, setReplayed] = useState<ReadonlySet<string>>(new Set())

  const triggerReplay = (id: string) => {
    const next = new Set(replayed)
    next.add(id)
    setReplayed(next)
    onReplay?.(id)
  }

  const columns: ReadonlyArray<DataTableColumn<EventRelayEntry>> = [
    {
      id: "receivedAt",
      header: "Received",
      sortable: true,
      cell: (row) => <span className={styles.cellTime}>{row.receivedAt}</span>,
      width: "180px",
    },
    {
      id: "source",
      header: "Source",
      cell: (row) => <span className={styles.cellSource}>{row.source}</span>,
      width: "100px",
    },
    {
      id: "eventCode",
      header: "Event",
      cell: (row) => <code className={styles.cellEvent}>{row.eventCode}</code>,
    },
    {
      id: "statusCode",
      header: "HTTP",
      align: "right",
      sortable: true,
      cell: (row) => (
        <span
          className={[styles.statusChip, TONE_CLASS[statusCodeTone(row.statusCode)]].join(" ")}
        >
          {row.statusCode}
        </span>
      ),
      width: "80px",
    },
    {
      id: "outcome",
      header: "Outcome",
      cell: (row) => (
        <span className={[styles.outcomeChip, TONE_CLASS[WEBHOOK_EVENT_TONE[row.outcome]]].join(" ")}>
          <span className={styles.outcomeDot} aria-hidden="true" />
          {OUTCOME_LABEL[row.outcome]}
        </span>
      ),
      width: "140px",
    },
    {
      id: "attempts",
      header: "Attempts",
      align: "right",
      sortable: true,
      cell: (row) => <span className={styles.cellAttempts}>{row.attempts}</span>,
      width: "100px",
    },
    {
      id: "actions",
      header: "Actions",
      align: "right",
      cell: (row) => (
        <button
          type="button"
          className={styles.replayBtn}
          onClick={() => triggerReplay(row.id)}
          aria-label={`Replay event ${row.eventCode} from ${row.source}`}
          aria-pressed={replayed.has(row.id)}
        >
          {replayed.has(row.id) ? "Queued" : "Replay"}
        </button>
      ),
      width: "120px",
    },
  ]

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <DataTable<EventRelayEntry>
        rows={[...rows]}
        columns={columns}
        getRowId={(row) => row.id}
        density="compact"
        zebra
        caption={caption}
        kicker={kicker}
      />
    </div>
  )
}

export default EventRelayTable
