import type { Metadata } from "next"

import {
  ExecutionLog,
  type WorkflowLogEntry,
} from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Execution log | Workflows",
  description:
    "Primitive 11 — Bottom pane log with timestamped entries, status icons, node label, duration chip, auto-animated appends.",
}

const ENTRIES: ReadonlyArray<WorkflowLogEntry> = [
  {
    id: "le-008",
    timestamp: "09:42:08",
    node: "Send confirmation SMS",
    status: "running",
    message: "Connecting to Twilio…",
  },
  {
    id: "le-007",
    timestamp: "09:42:05",
    node: "Condition · Hilux platform?",
    status: "success",
    message: "Matched · branch True",
    duration: "12ms",
  },
  {
    id: "le-006",
    timestamp: "09:42:05",
    node: "Fetch booking",
    status: "success",
    message: "200 OK · booking_id=bk_4128",
    duration: "184ms",
  },
  {
    id: "le-005",
    timestamp: "09:42:04",
    node: "Trigger · New booking",
    status: "success",
    message: "Webhook payload received",
    duration: "3ms",
  },
  {
    id: "le-004",
    timestamp: "09:35:11",
    node: "Send fitment reminder",
    status: "failed",
    message: "Twilio · 30007 region_blocked",
    duration: "412ms",
  },
  {
    id: "le-003",
    timestamp: "09:30:00",
    node: "Wait 2 hours",
    status: "skipped",
    message: "Bypassed via test-run",
  },
  {
    id: "le-002",
    timestamp: "09:18:42",
    node: "Cancelled by user",
    status: "cancelled",
    message: "Manual stop from toolbar",
  },
  {
    id: "le-001",
    timestamp: "09:18:30",
    node: "Send confirmation SMS",
    status: "queued",
    message: "Awaiting rate-limit window",
  },
]

export default function ExecutionLogScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Execution log"
        title="Execution log"
        description="A bottom-pane log of node executions. Each row shows timestamp, status icon, node label, message, and a duration chip. Uses an aria-live region and `@formkit/auto-animate` for buttery appends on new entries — reduced-motion mode skips the animation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Execution log" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — 8 mixed-status events</span>
        <ExecutionLog entries={ENTRIES} summary={`${ENTRIES.length} events`} />
      </section>
    </main>
  )
}
