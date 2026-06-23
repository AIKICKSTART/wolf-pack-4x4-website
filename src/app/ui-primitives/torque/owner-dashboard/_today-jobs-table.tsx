"use client"

import { DataTable } from "../../components/data-display/data-table"
import type { DataTableColumn } from "../../components/data-display/data-table"
import { StatusBadge } from "../../components/data-display/status-badge-grid"
import type { StatusBadgeTone } from "../../components/data-display/status-badge-grid"

import type { TodayJob } from "./_demo-data"
import styles from "./owner-dashboard.module.css"

const JOB_STATUS_TONE: Record<TodayJob["status"], StatusBadgeTone> = {
  "In bay": "brand",
  Booked: "info",
  "Awaiting parts": "warn",
  "Quote sent": "neutral",
  Ready: "success",
}

const JOB_COLUMNS: ReadonlyArray<DataTableColumn<TodayJob>> = [
  {
    id: "time",
    header: "Time",
    width: "64px",
    cell: (job) => <span className={styles.jobMono}>{job.time}</span>,
  },
  {
    id: "vehicle",
    header: "Vehicle",
    cell: (job) => (
      <span className={styles.jobVehicle}>
        <span className={styles.jobVehicleName}>{job.vehicle}</span>
        <span className={styles.jobRego}>{job.rego}</span>
      </span>
    ),
  },
  {
    id: "service",
    header: "Service",
    cell: (job) => job.service,
  },
  {
    id: "bay",
    header: "Bay / Tech",
    cell: (job) => (
      <span className={styles.jobMono}>
        {job.bay} · {job.tech}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (job) => (
      <StatusBadge tone={JOB_STATUS_TONE[job.status]} size="sm" shape="pill" label={job.status} />
    ),
  },
  {
    id: "value",
    header: "Value",
    align: "right",
    cell: (job) => <span className={styles.jobValue}>{job.value}</span>,
  },
]

interface TodayJobsTableProps {
  rows: ReadonlyArray<TodayJob>
}

export function TodayJobsTable({ rows }: TodayJobsTableProps) {
  return (
    <DataTable
      rows={[...rows]}
      columns={JOB_COLUMNS}
      getRowId={(job) => job.id}
      density="compact"
      caption="Today's job board — Oak Flats Muffler Men"
      kicker="Live job board"
      zebra
    />
  )
}
