"use client"

import { Mail, MapPin, Phone, User2 } from "lucide-react"

import { DonutChart } from "../charts/donut-chart"
import type { DonutSegment } from "../charts/donut-chart"
import { Sparkline } from "../charts/sparkline"
import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"
import styles from "./supplier-dashboard.module.css"

export interface SupplierContact {
  contactName: string
  phone: string
  email: string
  address: string
}

export interface SupplierLastContact {
  whenLabel: string
  /** e.g. "Phone — Owen following up XForce back-order ETA". */
  detail: string
}

export interface SupplierTopSku {
  sku: string
  title: string
  unitsLast30: number
  /** Average cost ex GST, AUD. */
  unitCost: number
  /** Margin percent, e.g. 32 = 32%. */
  marginPct: number
}

export interface SupplierDashboardProps {
  supplierName: string
  supplierTagline: string
  contact: SupplierContact
  lastContact: SupplierLastContact
  outstandingPoCount: number
  outstandingPoValue: number
  monthlySpend: number
  topSkus: ReadonlyArray<SupplierTopSku>
  /** Last 12 weekly media-readiness scores. */
  mediaReadiness: ReadonlyArray<number>
  /** Donut segments for supplier-health view. */
  health: ReadonlyArray<DonutSegment>
  /** Plain-text overall health label, e.g. "Steady". */
  healthLabel: string
}

function formatAud(amount: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}

const TABLE_COLUMNS: ReadonlyArray<DataTableColumn<SupplierTopSku>> = [
  { id: "sku", header: "SKU", cell: (row) => row.sku, width: "140px" },
  { id: "title", header: "Part", cell: (row) => row.title },
  {
    id: "units",
    header: "Units · 30d",
    cell: (row) => row.unitsLast30,
    align: "right",
    sortable: true,
  },
  {
    id: "cost",
    header: "Unit cost",
    cell: (row) => formatAud(row.unitCost, 2),
    align: "right",
  },
  {
    id: "margin",
    header: "Margin",
    cell: (row) => `${row.marginPct.toFixed(0)}%`,
    align: "right",
    sortable: true,
  },
]

export function SupplierDashboard({
  supplierName,
  supplierTagline,
  contact,
  lastContact,
  outstandingPoCount,
  outstandingPoValue,
  monthlySpend,
  topSkus,
  mediaReadiness,
  health,
  healthLabel,
}: SupplierDashboardProps) {
  return (
    <section
      className={styles.dashboard}
      aria-label={`${supplierName} supplier dashboard`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Supplier dashboard</span>
          <h3 className={styles.title}>{supplierName}</h3>
          <span className={styles.meta}>{supplierTagline}</span>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statTile}>
            <span className={styles.statLabel}>Outstanding POs</span>
            <strong className={styles.statValue}>{outstandingPoCount}</strong>
          </div>
          <div className={styles.statTile}>
            <span className={styles.statLabel}>PO value</span>
            <strong className={styles.statValue}>
              {formatAud(outstandingPoValue)}
            </strong>
          </div>
          <div className={styles.statTile}>
            <span className={styles.statLabel}>Monthly spend</span>
            <strong className={styles.statValue}>
              {formatAud(monthlySpend)}
            </strong>
          </div>
        </div>
      </header>

      <aside className={styles.contactPane}>
        <h4>Contact</h4>
        <ul className={styles.contactList}>
          <li>
            <User2 aria-hidden="true" />
            {contact.contactName}
          </li>
          <li>
            <Phone aria-hidden="true" />
            {contact.phone}
          </li>
          <li>
            <Mail aria-hidden="true" />
            {contact.email}
          </li>
          <li>
            <MapPin aria-hidden="true" />
            {contact.address}
          </li>
        </ul>
        <div className={styles.lastContact}>
          <strong>Last contact · {lastContact.whenLabel}</strong>
          <span>{lastContact.detail}</span>
        </div>
      </aside>

      <div className={styles.chartPane}>
        <h4>Performance snapshot</h4>
        <div className={styles.chartRow}>
          <div className={styles.miniChart}>
            <span>Media readiness · 12w</span>
            <Sparkline
              points={[...mediaReadiness]}
              tone="teal"
              ariaLabel={`Weekly media readiness sparkline for ${supplierName}`}
              width={220}
              height={56}
            />
            <strong>
              {mediaReadiness.length > 0
                ? `${mediaReadiness[mediaReadiness.length - 1].toFixed(0)}%`
                : "—"}
            </strong>
          </div>
          <div className={styles.miniChart}>
            <span>Supplier health</span>
            <DonutChart
              segments={[...health]}
              size={180}
              thickness={20}
              ariaLabel={`Supplier health donut for ${supplierName}`}
              centerLabel={healthLabel}
              centerCaption="trend"
            />
          </div>
        </div>
      </div>

      <div className={styles.tableBlock}>
        <DataTable<SupplierTopSku>
          rows={[...topSkus]}
          columns={TABLE_COLUMNS}
          getRowId={(row) => row.sku}
          kicker="Top moving SKUs · 30 day window"
          caption={`Top-moving parts from ${supplierName}`}
          density="comfortable"
        />
      </div>
    </section>
  )
}

export default SupplierDashboard
