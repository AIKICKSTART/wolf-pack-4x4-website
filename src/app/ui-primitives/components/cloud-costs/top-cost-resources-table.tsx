"use client"

import { Chip } from "../primitives/chip"
import { DataTable, type DataTableColumn } from "../data-display/data-table"

import {
  formatAud,
  regionLabel,
  serviceTone,
  type CostResourceRow,
} from "./cloud-costs-types"
import styles from "./top-cost-resources-table.module.css"

export interface TopCostResourcesTableProps {
  /** Period label e.g. "May 2026". */
  periodLabel: string
  /** Rows in descending spend order. */
  rows: ReadonlyArray<CostResourceRow>
  className?: string
}

interface ResourceRowView {
  id: string
  name: string
  service: CostResourceRow["service"]
  region: CostResourceRow["region"]
  spend: number
  attributes: ReadonlyArray<string>
}

export function TopCostResourcesTable({
  periodLabel,
  rows,
  className,
}: TopCostResourcesTableProps) {
  const totalSpend = rows.reduce((sum, row) => sum + row.spend, 0)

  const view: ReadonlyArray<ResourceRowView> = rows.map((row) => ({
    id: row.id,
    name: row.name,
    service: row.service,
    region: row.region,
    spend: row.spend,
    attributes: row.attributes,
  }))

  const columns: ReadonlyArray<DataTableColumn<ResourceRowView>> = [
    {
      id: "name",
      header: "Resource",
      cell: (row) => (
        <div className={styles.nameCell}>
          <span className={styles.resourceName}>{row.name}</span>
          <span className={styles.resourceId}>{row.id}</span>
        </div>
      ),
    },
    {
      id: "service",
      header: "Service",
      cell: (row) => <Chip label={row.service} tone={serviceTone(row.service)} />,
    },
    {
      id: "region",
      header: "Region",
      cell: (row) => <span className={styles.region}>{regionLabel(row.region)}</span>,
    },
    {
      id: "attrs",
      header: "Attributes",
      cell: (row) => (
        <div className={styles.attrs}>
          {row.attributes.map((attr) => (
            <Chip key={attr} label={attr} tone="neutral" />
          ))}
        </div>
      ),
    },
    {
      id: "spend",
      header: "Spend",
      align: "right",
      cell: (row) => <span className={styles.spend}>{formatAud(row.spend)}</span>,
    },
  ]

  return (
    <section
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Top cost resources for ${periodLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Top spenders · {periodLabel}</span>
          <h3 className={styles.title}>Top cost resources</h3>
        </div>
        <span className={styles.headRight}>
          <span className={styles.totalLabel}>Total of top</span>
          <span className={styles.totalValue}>{formatAud(totalSpend)}</span>
        </span>
      </header>

      <DataTable
        columns={columns}
        rows={[...view]}
        getRowId={(row) => row.id}
        density="comfortable"
        kicker={`Top ${rows.length} resources`}
        caption={`Top cost resources for ${periodLabel}`}
      />
    </section>
  )
}

export default TopCostResourcesTable
