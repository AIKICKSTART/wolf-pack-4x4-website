"use client"

import { useState } from "react"
import { Eye, Mailbox } from "lucide-react"

import { ConfirmDialog } from "../overlays/confirm-dialog"
import { Chip } from "../primitives/chip"

import { JOB_KIND_LABEL, type JobKind } from "./job-queue-types"
import styles from "./dead-letter-queue-card.module.css"

export interface DeadLetterItem {
  id: string
  kind: JobKind
  reason: string
  /** Human-formatted age (e.g. "9d 4h"). */
  age: string
}

interface DeadLetterQueueCardProps {
  count: number
  /** Age of the oldest message in the queue. */
  oldestAge: string
  /** Sample of items to inspect. */
  samples: ReadonlyArray<DeadLetterItem>
  onReplayAll?: () => void
  onInspect?: (id: string) => void
  className?: string
}

export function DeadLetterQueueCard({
  count,
  oldestAge,
  samples,
  onReplayAll,
  onInspect,
  className,
}: DeadLetterQueueCardProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onReplayAll?.()
    setOpen(false)
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Dead letter queue">
      <header className={styles.head}>
        <span className={styles.iconWrap} aria-hidden="true">
          <Mailbox size={16} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>Dead letter queue</span>
          <h3 className={styles.title}>
            {count.toLocaleString()} stranded
          </h3>
        </div>
        <Chip label={`Oldest ${oldestAge}`} tone="red" />
      </header>

      <ul className={styles.list}>
        {samples.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.itemBody}>
              <code className={styles.itemId}>{item.id}</code>
              <span className={styles.itemReason}>
                {JOB_KIND_LABEL[item.kind]} · {item.reason}
              </span>
              <span className={styles.itemAge}>{item.age}</span>
            </div>
            <button
              type="button"
              className={styles.inspectBtn}
              onClick={() => onInspect?.(item.id)}
              aria-label={`Inspect ${item.id}`}
            >
              <Eye size={11} strokeWidth={2.4} aria-hidden="true" />
              <span>Inspect</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.replayBtn}
        onClick={() => setOpen(true)}
        disabled={count === 0}
      >
        Replay all
      </button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Replay ${count} dead-letter jobs?`}
        description="All stranded jobs will be re-enqueued on the original queues. Side effects from prior attempts will not be rolled back."
        confirmLabel="Replay all"
        variant="destructive"
        onConfirm={handleConfirm}
      />
    </section>
  )
}

export default DeadLetterQueueCard
