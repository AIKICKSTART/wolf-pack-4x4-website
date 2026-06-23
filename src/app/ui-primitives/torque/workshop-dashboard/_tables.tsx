"use client"

import { SignalStrength } from "../../components/charts/signal-strength"
import { DataTable } from "../../components/data-display/data-table"
import type { DataTableColumn } from "../../components/data-display/data-table"
import { StatusBadge } from "../../components/data-display/status-badge-grid"
import type { StatusBadgeTone } from "../../components/data-display/status-badge-grid"

import type { ManagerJob, RosterRow } from "./_demo-data"
import styles from "./workshop-dashboard.module.css"

const JOB_STATUS_TONE: Record<ManagerJob["status"], StatusBadgeTone> = {
  "In bay": "brand",
  Booked: "info",
  "Awaiting parts": "warn",
  "Quote sent": "neutral",
  Ready: "success",
}

const JOB_COLUMNS: ReadonlyArray<DataTableColumn<ManagerJob>> = [
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
  rows: ReadonlyArray<ManagerJob>
}

export function TodayJobsTable({ rows }: TodayJobsTableProps) {
  return (
    <DataTable
      rows={[...rows]}
      columns={JOB_COLUMNS}
      getRowId={(job) => job.id}
      density="compact"
      caption="Today's job board — Oak Flats Muffler Men, every bay"
      kicker="Live job board"
      zebra
    />
  )
}

const ROSTER_STATUS_TONE: Record<RosterRow["status"], StatusBadgeTone> = {
  "On the tools": "success",
  Quoting: "info",
  "On break": "warn",
  "Off today": "neutral",
}

const ROSTER_COLUMNS: ReadonlyArray<DataTableColumn<RosterRow>> = [
  {
    id: "tech",
    header: "Technician",
    cell: (row) => (
      <span className={styles.jobVehicle}>
        <span className={styles.jobVehicleName}>{row.name}</span>
        <span className={styles.rosterTrade}>{row.trade}</span>
      </span>
    ),
  },
  {
    id: "bay",
    header: "Bay",
    cell: (row) => <span className={styles.jobMono}>{row.bay}</span>,
  },
  {
    id: "shift",
    header: "Shift",
    cell: (row) => <span className={styles.jobMono}>{row.shift}</span>,
  },
  {
    id: "load",
    header: "Load",
    cell: (row) => (
      <span className={styles.rosterLoad}>
        <SignalStrength
          level={row.load}
          tone={row.loadTone}
          size={24}
          ariaLabel={`${row.name} workload ${row.load} of 5`}
        />
        <span className={styles.rosterJobs}>{row.jobs}</span>
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    align: "right",
    cell: (row) => (
      <StatusBadge
        tone={ROSTER_STATUS_TONE[row.status]}
        size="sm"
        shape="pill"
        label={row.status}
      />
    ),
  },
]

interface RosterTableProps {
  rows: ReadonlyArray<RosterRow>
}

export function RosterTable({ rows }: RosterTableProps) {
  return (
    <DataTable
      rows={[...rows]}
      columns={ROSTER_COLUMNS}
      getRowId={(row) => row.id}
      density="compact"
      caption="Technician roster — who's on and how loaded"
      kicker="Crew today"
      zebra
    />
  )
}
