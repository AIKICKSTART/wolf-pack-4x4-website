"use client"

import { useState } from "react"
import { Inbox } from "lucide-react"

import { EscalationQueueCard } from "../../components/hermes-agent"
import { StatTile } from "../../components/primitives/stat-tile"
import { FadeIn } from "../../components/motion/fade-in"
import { ApprovalDetail } from "./_approval-detail"
import {
  APPROVAL_QUEUE_COUNTS,
  APPROVAL_QUEUE_ITEMS,
  PENDING_APPROVALS,
} from "./_demo-data"
import styles from "./approval-gate.module.css"

/**
 * The composed Approval gate console: a pending-approval queue on the left and
 * the detailed approval card for the selected action on the right. Selecting a
 * queue lane swaps the detail card.
 */
export function ApprovalConsole() {
  const [activeId, setActiveId] = useState<string>(PENDING_APPROVALS[0].id)

  const active =
    PENDING_APPROVALS.find((item) => item.id === activeId) ?? PENDING_APPROVALS[0]

  return (
    <FadeIn>
      <div className={styles.console}>
        <aside className={styles.queueRail} aria-label="Pending approvals">
          <div className={styles.queueStats}>
            <StatTile label="Awaiting you" value="3" tone="amber" />
            <StatTile label="Resolved · 24h" value="11" tone="green" />
          </div>
          <EscalationQueueCard
            title="Approval queue"
            items={APPROVAL_QUEUE_ITEMS}
            counts={APPROVAL_QUEUE_COUNTS}
            onSelect={setActiveId}
          />
          <p className={styles.queueHint}>
            <Inbox size={13} strokeWidth={2.2} aria-hidden="true" />
            Tap an action to review the diff, preview and risk flags before you
            decide.
          </p>
        </aside>

        <ApprovalDetail key={active.id} approval={active} />
      </div>
    </FadeIn>
  )
}

export default ApprovalConsole
