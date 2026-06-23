"use client"

import { Truck } from "lucide-react"

import { BarChart } from "../charts/bar-chart"
import { Sparkline } from "../charts/sparkline"
import { SignalStrength } from "../charts/signal-strength"
import { DataTable } from "../data-display/data-table"
import { EmptyState } from "../primitives/empty-state"
import { Chip } from "../primitives/chip"
import type { DataTableColumn } from "../data-display/data-table"

import { DashboardShell } from "./dashboard-shell"
import { DashboardTile } from "./dashboard-tile"
import styles from "./parts-receiver-dashboard.module.css"

interface IncomingPo {
  id: string
  poNumber: string
  supplier: string
  items: number
  valueAud: number
  eta: string
  status: "in-transit" | "at-depot" | "received" | "back-order"
}

const INCOMING: ReadonlyArray<IncomingPo> = [
  {
    id: "po-1",
    poNumber: "PO-2026-0411",
    supplier: "XForce Australia",
    items: 4,
    valueAud: 2_840,
    eta: "Today · 14:30",
    status: "in-transit",
  },
  {
    id: "po-2",
    poNumber: "PO-2026-0408",
    supplier: "Magnaflow APAC",
    items: 2,
    valueAud: 1_120,
    eta: "Today · 16:00",
    status: "at-depot",
  },
  {
    id: "po-3",
    poNumber: "PO-2026-0403",
    supplier: "Sniper Stainless",
    items: 6,
    valueAud: 3_960,
    eta: "Tomorrow AM",
    status: "in-transit",
  },
  {
    id: "po-4",
    poNumber: "PO-2026-0398",
    supplier: "Bellanger Mufflers",
    items: 1,
    valueAud: 480,
    eta: "Thu PM",
    status: "back-order",
  },
]

const STATUS_LABEL: Record<IncomingPo["status"], string> = {
  "in-transit": "In transit",
  "at-depot": "At depot",
  received: "Received",
  "back-order": "Back-order",
}

const STATUS_TONE: Record<IncomingPo["status"], "red" | "amber" | "teal" | "green"> = {
  "in-transit": "teal",
  "at-depot": "amber",
  received: "green",
  "back-order": "red",
}

const INCOMING_COLUMNS: ReadonlyArray<DataTableColumn<IncomingPo>> = [
  { id: "po", header: "PO", cell: (row) => row.poNumber, width: "160px", sortable: true },
  { id: "supplier", header: "Supplier", cell: (row) => row.supplier, sortable: true },
  {
    id: "items",
    header: "Items",
    cell: (row) => row.items.toString(),
    align: "right",
    width: "70px",
  },
  {
    id: "value",
    header: "Value",
    cell: (row) =>
      new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(
        row.valueAud,
      ),
    align: "right",
    width: "120px",
  },
  { id: "eta", header: "ETA", cell: (row) => row.eta, width: "140px" },
  {
    id: "status",
    header: "Status",
    cell: (row) => <Chip label={STATUS_LABEL[row.status]} tone={STATUS_TONE[row.status]} selected />,
    width: "130px",
  },
]

const STOCK_LABELS = ["Mufflers", "Cat-back", "DPF", "Resos", "Flanges", "Hangers", "Tips"]
const STOCK_SERIES = [
  { label: "On hand", values: [12, 8, 3, 6, 18, 24, 14], tone: "teal" as const },
  { label: "Reorder pt", values: [10, 6, 6, 8, 14, 18, 12], tone: "amber" as const },
]

const RECENT_RECEIVED = [4, 2, 6, 3, 5, 8, 4, 5, 3, 7, 6, 4, 8, 9]

interface SupplierSignal {
  name: string
  region: string
  poNumber: string
  level: 0 | 1 | 2 | 3 | 4 | 5
  tone: "red" | "amber" | "teal" | "green"
}

const SUPPLIER_SIGNALS: ReadonlyArray<SupplierSignal> = [
  { name: "XForce Australia", region: "QLD · Brendale", poNumber: "PO-2026-0411", level: 5, tone: "green" },
  { name: "Magnaflow APAC", region: "VIC · Tullamarine", poNumber: "PO-2026-0408", level: 4, tone: "teal" },
  { name: "Sniper Stainless", region: "NSW · Penrith", poNumber: "PO-2026-0403", level: 3, tone: "amber" },
  { name: "Bellanger Mufflers", region: "WA · Welshpool", poNumber: "PO-2026-0398", level: 1, tone: "red" },
]

export function PartsReceiverDashboard() {
  return (
    <div className={styles.surface}>
      <DashboardShell
        kicker="Parts receiver / Yard"
        title="Inbound today"
        subtitle="Track POs in transit, reconcile against on-hand stock, and surface supplier delays before they bite a workshop ticket."
        toolbar={<span>Receiving · Jonah K.</span>}
        ariaLabel="Parts receiver persona dashboard"
        density="comfortable"
        columns={3}
      >
        <DashboardTile label="POs landing today" aside="4 active" span={2} tone="teal">
          <DataTable
            rows={[...INCOMING]}
            columns={INCOMING_COLUMNS}
            getRowId={(row) => row.id}
            density="comfortable"
            zebra
            kicker="Live receive list"
            caption="Incoming purchase orders sorted by ETA"
          />
        </DashboardTile>

        <DashboardTile label="Supplier signal" aside="Last 24h" tone="amber">
          <div className={styles.signalGrid}>
            {SUPPLIER_SIGNALS.map((s) => (
              <div key={s.poNumber} className={styles.signalRow}>
                <div>
                  <div className={styles.supplierName}>{s.name}</div>
                  <div className={styles.supplierMeta}>{s.region}</div>
                </div>
                <span className={styles.po}>{s.poNumber}</span>
                <SignalStrength
                  level={s.level}
                  tone={s.tone}
                  ariaLabel={`${s.name} signal level ${s.level} out of 5`}
                  size={28}
                />
              </div>
            ))}
          </div>
        </DashboardTile>
      </DashboardShell>

      <div className={styles.row}>
        <DashboardTile label="Stock levels vs reorder point" aside="Mufflers · 30d" tone="green">
          <BarChart
            series={STOCK_SERIES}
            xLabels={STOCK_LABELS}
            mode="grouped"
            height={200}
            ariaLabel="On-hand inventory versus reorder point by category"
          />
        </DashboardTile>

        <DashboardTile label="Recent receipts" aside="14 days" tone="teal">
          <div className={styles.recentRow}>
            <span className={styles.recentLabel}>Boxes per day</span>
            <Sparkline
              points={[...RECENT_RECEIVED]}
              tone="teal"
              area
              width={220}
              height={64}
              ariaLabel="Boxes received over the last 14 days"
            />
          </div>
          <p className={styles.supplierMeta}>
            Receiving cadence steady. Two days under 4 boxes (public holidays).
          </p>
        </DashboardTile>
      </div>

      <DashboardShell
        kicker="Forecasted inbound"
        title="Nothing else scheduled"
        ariaLabel="Parts receiver forecast section"
        density="compact"
        columns={1}
      >
        <DashboardTile label="Pipeline · 48h+" span={1} tone="neutral">
          <EmptyState
            title="No inbound after Friday 11:00"
            description="POs land continuously — when the next is on the road you'll see it here. Open a new PO to seed the forecast."
            illustration={<Truck size={32} strokeWidth={1.6} aria-hidden="true" />}
            tone="obsidian"
          />
        </DashboardTile>
      </DashboardShell>
    </div>
  )
}

export default PartsReceiverDashboard
