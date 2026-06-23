"use client"

import { AlertTriangle, ArrowUpRight, ListChecks } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import {
  PRIORITY_LABEL,
  formatQueueTime,
  type HermesPriority,
} from "./hermes-agent-types"
import styles from "./escalation-queue-card.module.css"

export interface EscalationQueueItem {
  id: string
  subject: string
  priority: HermesPriority
  /** Why Hermes escalated. */
  reason: string
  /** Human now in charge. */
  handlerName: string
  handlerRole: string
  /** Wait time since escalation in seconds. */
  waitSeconds: number
}

interface EscalationQueueCardProps {
  title: string
  items: ReadonlyArray<EscalationQueueItem>
  /** Counts breakdown for the summary strip. */
  counts: {
    open: number
    breached: number
    resolved24h: number
  }
  onSelect?: (id: string) => void
  className?: string
}

export function EscalationQueueCard({
  title,
  items,
  counts,
  onSelect,
  className,
}: EscalationQueueCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      role="region"
      aria-label={title}
    >
      <header className={styles.head}>
        <div>
          <h3 className={styles.title}>
            <ListChecks
              size={13}
              strokeWidth={2.4}
              aria-hidden="true"
              style={{ marginInlineEnd: 6 }}
            />
            {title}
          </h3>
          <span className={styles.kicker}>
            Sorted by priority · oldest at top within each lane
          </span>
        </div>
        <Chip
          icon={
            <AlertTriangle size={11} strokeWidth={2.4} aria-hidden="true" />
          }
          label={`${counts.open} open`}
          tone={counts.open > 5 ? "red" : "amber"}
        />
      </header>

      <ul className={styles.list} aria-label="Escalation lanes">
        {items.length === 0 ? (
          <li
            style={{
              padding: 18,
              textAlign: "center",
              color: "var(--primitive-muted)",
              fontSize: 12,
            }}
          >
            Queue clear — Hermes resolved everything in policy.
          </li>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              className={styles.row}
              data-priority={item.priority}
            >
              <span className={styles.priorityBadge}>
                <span className={styles.priorityDot} aria-hidden="true" />
                {PRIORITY_LABEL[item.priority]}
              </span>
              <div className={styles.body}>
                <h4 className={styles.subject}>{item.subject}</h4>
                <span className={styles.meta}>
                  <span>{item.id}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{item.reason}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{formatQueueTime(item.waitSeconds)}</span>
                </span>
              </div>
              <div className={styles.handler}>
                <Avatar
                  name={item.handlerName}
                  size="sm"
                  tone="teal"
                  status="online"
                />
                <span className={styles.handlerName}>{item.handlerName}</span>
                <span className={styles.meta}>{item.handlerRole}</span>
                {onSelect ? (
                  <button
                    type="button"
                    aria-label={`Open escalation ${item.id}`}
                    onClick={() => onSelect(item.id)}
                    className={styles.openBtn}
                  >
                    Open
                    <ArrowUpRight size={12} strokeWidth={2.4} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </li>
          ))
        )}
      </ul>

      <div className={styles.summary}>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>Open</span>
          <span className={styles.statValue}>{counts.open}</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>SLA breached</span>
          <span className={styles.statValue}>{counts.breached}</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>Resolved · 24h</span>
          <span className={styles.statValue}>{counts.resolved24h}</span>
        </div>
      </div>
    </section>
  )
}

export default EscalationQueueCard
