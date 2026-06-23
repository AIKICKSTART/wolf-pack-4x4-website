"use client"

import { DataTable, type DataTableColumn } from "../data-display/data-table"

import {
  ENVIRONMENT_LABEL,
  type FlagEnvironment,
} from "./feature-flag-types"
import styles from "./recent-flag-changes-log.module.css"

export interface FlagChangeRecord {
  id: string
  flagKey: string
  flagName: string
  who: string
  whoRole?: string
  when: string
  environment: FlagEnvironment
  fromValue: string
  toValue: string
  note?: string
}

export interface RecentFlagChangesLogProps {
  records: ReadonlyArray<FlagChangeRecord>
  caption?: string
  kicker?: string
  className?: string
}

const ENV_CLASS: Record<FlagEnvironment, string> = {
  dev: styles.envDev,
  staging: styles.envStaging,
  prod: styles.envProd,
}

export function RecentFlagChangesLog({
  records,
  caption = "Recent flag changes",
  kicker = "Audit",
  className,
}: RecentFlagChangesLogProps) {
  const columns: ReadonlyArray<DataTableColumn<FlagChangeRecord>> = [
    {
      id: "flag",
      header: "Flag",
      cell: (row) => (
        <div className={styles.flagCell}>
          <span className={styles.flagName}>{row.flagName}</span>
          <code className={styles.flagKey}>{row.flagKey}</code>
        </div>
      ),
    },
    {
      id: "env",
      header: "Env",
      cell: (row) => (
        <span className={[styles.envChip, ENV_CLASS[row.environment]].join(" ")}>
          {ENVIRONMENT_LABEL[row.environment]}
        </span>
      ),
      width: "130px",
    },
    {
      id: "change",
      header: "Change",
      cell: (row) => (
        <div className={styles.changeCell}>
          <code className={styles.fromValue}>{row.fromValue}</code>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
          <code className={styles.toValue}>{row.toValue}</code>
          {row.note ? <span className={styles.note}>{row.note}</span> : null}
        </div>
      ),
    },
    {
      id: "who",
      header: "Who",
      cell: (row) => (
        <div className={styles.whoCell}>
          <span className={styles.who}>{row.who}</span>
          {row.whoRole ? (
            <span className={styles.whoRole}>{row.whoRole}</span>
          ) : null}
        </div>
      ),
      width: "180px",
    },
    {
      id: "when",
      header: "When",
      cell: (row) => <span className={styles.when}>{row.when}</span>,
      width: "150px",
    },
  ]

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <DataTable
        rows={records as FlagChangeRecord[]}
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

export default RecentFlagChangesLog
