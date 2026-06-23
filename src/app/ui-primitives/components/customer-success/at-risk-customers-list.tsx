"use client"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { DataTable, type DataTableColumn } from "../data-display/data-table"
import {
  HEALTH_BUCKET_LABEL,
  HEALTH_BUCKET_TONE,
  bucketForScore,
  formatAud,
  type CsTone,
} from "./cs-types"
import styles from "./at-risk-customers-list.module.css"

export interface AtRiskCustomerRow {
  id: string
  name: string
  suburb: string
  /** 0-100 health score. */
  healthScore: number
  /** Absolute display value, e.g. "12 days ago". */
  lastContact: string
  /** Lifetime value AUD. */
  lifetimeValueAud: number
  /** Optional avatar tone. */
  avatarTone?: "red" | "amber" | "teal" | "green" | "obsidian"
  /** Optional avatar src. */
  avatarSrc?: string
}

interface AtRiskCustomersListProps {
  rows: ReadonlyArray<AtRiskCustomerRow>
  caption?: string
  kicker?: string
  onIntervene?: (row: AtRiskCustomerRow) => void
  className?: string
}

const TONE_CHIP: Record<CsTone, "neutral" | "red" | "amber" | "teal" | "green"> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

export function AtRiskCustomersList({
  rows,
  caption = "At-risk customers",
  kicker = "Health watchlist",
  onIntervene,
  className,
}: AtRiskCustomersListProps) {
  const columns: ReadonlyArray<DataTableColumn<AtRiskCustomerRow>> = [
    {
      id: "customer",
      header: "Customer",
      cell: (row) => (
        <div className={styles.customerCell}>
          <Avatar
            name={row.name}
            src={row.avatarSrc}
            tone={row.avatarTone ?? "obsidian"}
            size="md"
          />
          <div className={styles.customerText}>
            <span className={styles.customerName}>{row.name}</span>
            <span className={styles.customerMeta}>{row.suburb}</span>
          </div>
        </div>
      ),
    },
    {
      id: "health",
      header: "Health",
      sortable: true,
      cell: (row) => {
        const bucket = bucketForScore(row.healthScore)
        return (
          <div className={styles.healthCell}>
            <span className={styles.healthScore}>{row.healthScore}</span>
            <Chip
              label={HEALTH_BUCKET_LABEL[bucket]}
              tone={TONE_CHIP[HEALTH_BUCKET_TONE[bucket]]}
            />
          </div>
        )
      },
    },
    {
      id: "lifetime",
      header: "Lifetime value",
      align: "right",
      sortable: true,
      cell: (row) => (
        <span className={styles.ltv}>{formatAud(row.lifetimeValueAud)}</span>
      ),
    },
    {
      id: "lastContact",
      header: "Last contact",
      cell: (row) => <span className={styles.lastContact}>{row.lastContact}</span>,
    },
    {
      id: "actions",
      header: "Action",
      align: "right",
      cell: (row) => (
        <button
          type="button"
          className={styles.actionButton}
          onClick={() => onIntervene?.(row)}
          aria-label={`Open intervention for ${row.name}`}
        >
          Intervene
          <span aria-hidden="true">→</span>
        </button>
      ),
    },
  ]

  return (
    <DataTable
      rows={rows as AtRiskCustomerRow[]}
      columns={columns}
      getRowId={(row) => row.id}
      density="comfortable"
      caption={caption}
      kicker={kicker}
      className={[styles.table, className].filter(Boolean).join(" ")}
    />
  )
}

export default AtRiskCustomersList
