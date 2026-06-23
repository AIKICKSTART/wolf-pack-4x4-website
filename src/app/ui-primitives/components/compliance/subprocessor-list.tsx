"use client"

import { DataTable, type DataTableColumn } from "../data-display/data-table"

import styles from "./subprocessor-list.module.css"

export type SubprocessorLocation = "au" | "us" | "eu" | "other"
export type DpiaStatus = "approved" | "pending" | "rejected" | "not-required"

export interface SubprocessorRow {
  id: string
  vendor: string
  service: string
  location: SubprocessorLocation
  /** Full location label, e.g. "Sydney AU (ap-southeast-2)". */
  locationLabel: string
  dpiaStatus: DpiaStatus
  lastReviewed: string
}

export interface SubprocessorListProps {
  rows: ReadonlyArray<SubprocessorRow>
  caption?: string
  kicker?: string
  className?: string
}

const LOCATION_CLASS: Record<SubprocessorLocation, string> = {
  au: styles.locationAu,
  us: styles.locationUs,
  eu: styles.locationEu,
  other: styles.locationOther,
}

const DPIA_CLASS: Record<DpiaStatus, string> = {
  approved: styles.dpiaApproved,
  pending: styles.dpiaPending,
  rejected: styles.dpiaRejected,
  "not-required": styles.dpiaNotReq,
}

const DPIA_LABEL: Record<DpiaStatus, string> = {
  approved: "DPIA approved",
  pending: "DPIA pending",
  rejected: "DPIA rejected",
  "not-required": "DPIA n/a",
}

export function SubprocessorList({
  rows,
  caption = "Sub-processors",
  kicker = "Schedule 2 · Privacy Act 1988",
  className,
}: SubprocessorListProps) {
  const columns: ReadonlyArray<DataTableColumn<SubprocessorRow>> = [
    {
      id: "vendor",
      header: "Vendor",
      cell: (row) => (
        <div className={styles.vendorCell}>
          <span className={styles.vendorName}>{row.vendor}</span>
          <span className={styles.service}>{row.service}</span>
        </div>
      ),
    },
    {
      id: "location",
      header: "Location",
      cell: (row) => (
        <span
          className={[styles.locationChip, LOCATION_CLASS[row.location]].join(" ")}
        >
          <span className={styles.locationDot} aria-hidden="true" />
          {row.locationLabel}
        </span>
      ),
      width: "240px",
    },
    {
      id: "dpia",
      header: "DPIA",
      cell: (row) => (
        <span
          className={[styles.statusChip, DPIA_CLASS[row.dpiaStatus]].join(" ")}
        >
          <span className={styles.statusDot} aria-hidden="true" />
          {DPIA_LABEL[row.dpiaStatus]}
        </span>
      ),
      width: "180px",
    },
    {
      id: "reviewed",
      header: "Last reviewed",
      cell: (row) => <span className={styles.review}>{row.lastReviewed}</span>,
      width: "150px",
    },
  ]

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <DataTable
        rows={rows as SubprocessorRow[]}
        columns={columns}
        getRowId={(row) => row.id}
        caption={caption}
        kicker={kicker}
        density="comfortable"
        zebra
      />
    </div>
  )
}

export default SubprocessorList
