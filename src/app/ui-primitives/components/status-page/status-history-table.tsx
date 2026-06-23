"use client"

import { DataTable, type DataTableColumn } from "../data-display"

import {
  INCIDENT_SEVERITY_LABEL,
  INCIDENT_SEVERITY_TONE,
  INCIDENT_STAGE_LABEL,
  type IncidentSeverity,
  type IncidentStage,
  type StatusTone,
} from "./status-types"
import styles from "./status-history-table.module.css"

export interface StatusHistoryEntry {
  id: string
  date: string
  service: string
  title: string
  severity: IncidentSeverity
  /** Total minutes from start → resolved. */
  durationMinutes: number
  status: IncidentStage
}

export interface StatusHistoryTableProps {
  rows: ReadonlyArray<StatusHistoryEntry>
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

const STAGE_TONE: Record<IncidentStage, StatusTone> = {
  investigating: "red",
  identified: "amber",
  monitoring: "teal",
  resolved: "green",
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function StatusHistoryTable({
  rows,
  caption = "Past 90 days · resolved incidents",
  kicker = "Status history",
  className,
}: StatusHistoryTableProps) {
  const columns: ReadonlyArray<DataTableColumn<StatusHistoryEntry>> = [
    {
      id: "date",
      header: "Date",
      sortable: true,
      width: "120px",
      cell: (row) => <span className={styles.date}>{row.date}</span>,
    },
    {
      id: "service",
      header: "Service",
      sortable: true,
      cell: (row) => <span className={styles.service}>{row.service}</span>,
    },
    {
      id: "title",
      header: "Title",
      cell: (row) => <span className={styles.title}>{row.title}</span>,
    },
    {
      id: "severity",
      header: "Severity",
      sortable: true,
      width: "100px",
      align: "left",
      cell: (row) => (
        <span
          className={[
            styles.chip,
            TONE_CLASS[INCIDENT_SEVERITY_TONE[row.severity]],
          ].join(" ")}
        >
          {INCIDENT_SEVERITY_LABEL[row.severity]}
        </span>
      ),
    },
    {
      id: "duration",
      header: "Duration",
      sortable: true,
      width: "100px",
      align: "right",
      cell: (row) => (
        <span className={styles.duration}>{formatDuration(row.durationMinutes)}</span>
      ),
    },
    {
      id: "status",
      header: "Status",
      width: "130px",
      cell: (row) => (
        <span
          className={[styles.chip, TONE_CLASS[STAGE_TONE[row.status]]].join(" ")}
        >
          {INCIDENT_STAGE_LABEL[row.status]}
        </span>
      ),
    },
  ]

  return (
    <DataTable
      rows={[...rows]}
      columns={columns}
      getRowId={(row) => row.id}
      density="comfortable"
      zebra
      caption={caption}
      kicker={kicker}
      className={className}
      empty={<span className={styles.empty}>No incidents in this window.</span>}
    />
  )
}

export default StatusHistoryTable
