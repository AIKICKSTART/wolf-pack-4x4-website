"use client"

import { DataTable, type DataTableColumn } from "../data-display"
import type { WorkflowRun, WorkflowRunStatus } from "./workflow-types"
import styles from "./run-history-table.module.css"

interface RunHistoryTableProps {
  runs: ReadonlyArray<WorkflowRun>
  caption?: string
  kicker?: string
  className?: string
}

const STATUS_CHIP_CLASS: Record<WorkflowRunStatus, string> = {
  success: styles.chipSuccess,
  failed: styles.chipFailed,
  running: styles.chipRunning,
  queued: styles.chipQueued,
  skipped: styles.chipSkipped,
  cancelled: styles.chipCancelled,
}

const STATUS_LABEL: Record<WorkflowRunStatus, string> = {
  success: "Success",
  failed: "Failed",
  running: "Running",
  queued: "Queued",
  skipped: "Skipped",
  cancelled: "Cancelled",
}

function StatusChip({ status }: { status: WorkflowRunStatus }) {
  return (
    <span className={[styles.statusChip, STATUS_CHIP_CLASS[status]].join(" ")}>
      {STATUS_LABEL[status]}
    </span>
  )
}

const COLUMNS: ReadonlyArray<DataTableColumn<WorkflowRun>> = [
  {
    id: "startedAt",
    header: "Started",
    sortable: true,
    cell: (row) => {
      const [date, time] = row.startedAt.split(" ")
      return (
        <span className={styles.tsCell}>
          <strong>{time ?? row.startedAt}</strong>
          <small>{date ?? ""}</small>
        </span>
      )
    },
  },
  {
    id: "trigger",
    header: "Trigger",
    cell: (row) => (
      <span className={styles.trigger}>
        <span className={styles.triggerLabel}>{row.trigger}</span>
        <span className={styles.triggerMeta}>Run · {row.id}</span>
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => <StatusChip status={row.status} />,
  },
  {
    id: "duration",
    header: "Duration",
    align: "right",
    sortable: true,
    cell: (row) => <span className={styles.duration}>{row.duration}</span>,
  },
  {
    id: "view",
    header: "",
    align: "right",
    cell: (row) => (
      <a className={styles.viewLink} href={`#run-${row.id}`}>
        View <span aria-hidden="true">→</span>
      </a>
    ),
  },
]

export function RunHistoryTable({
  runs,
  caption = "Workflow run history",
  kicker = "Last 10 runs",
  className,
}: RunHistoryTableProps) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <DataTable
        rows={runs as WorkflowRun[]}
        columns={COLUMNS}
        getRowId={(row) => row.id}
        density="comfortable"
        zebra
        caption={caption}
        kicker={kicker}
      />
    </div>
  )
}
