"use client"

import { ShippingProgress } from "../commerce/shipping-progress"
import { ActivityFeed } from "../data-display/activity-feed"
import { DataTable } from "../data-display/data-table"
import { Chip } from "../primitives/chip"
import { VehicleProfileCard } from "../workshop-scenes/vehicle-profile-card"
import { QuoteCardStack } from "../workshop-scenes/quote-card-stack"
import type { ActivityFeedItem } from "../data-display/activity-feed"
import type { DataTableColumn } from "../data-display/data-table"
import type { ShippingStep } from "../commerce/shipping-progress"
import type { PendingQuote } from "../workshop-scenes/quote-card-stack"

import { DashboardShell } from "./dashboard-shell"
import { DashboardTile } from "./dashboard-tile"
import styles from "./customer-portal-dashboard.module.css"

interface Invoice {
  id: string
  invoiceNumber: string
  description: string
  date: string
  amount: number
  status: "paid" | "due" | "overdue"
}

const INVOICES: ReadonlyArray<Invoice> = [
  {
    id: "in-1",
    invoiceNumber: "INV-2026-2014",
    description: "Mustang GT — quad tip, weld correction",
    date: "12 May 2026",
    amount: 3_240,
    status: "paid",
  },
  {
    id: "in-2",
    invoiceNumber: "INV-2026-1988",
    description: "Pajero NX — straight pipe, recoded ECU",
    date: "04 May 2026",
    amount: 2_480,
    status: "paid",
  },
  {
    id: "in-3",
    invoiceNumber: "INV-2026-1956",
    description: "VE Commodore — full system, twin 2.5\"",
    date: "21 Apr 2026",
    amount: 4_120,
    status: "due",
  },
  {
    id: "in-4",
    invoiceNumber: "INV-2026-1923",
    description: "BT-50 — DPF clean & cat",
    date: "14 Apr 2026",
    amount: 1_840,
    status: "overdue",
  },
]

const STATUS_TONE: Record<Invoice["status"], "red" | "amber" | "teal" | "green"> = {
  paid: "green",
  due: "amber",
  overdue: "red",
}

const STATUS_LABEL: Record<Invoice["status"], string> = {
  paid: "Paid",
  due: "Due",
  overdue: "Overdue",
}

const INVOICE_COLUMNS: ReadonlyArray<DataTableColumn<Invoice>> = [
  { id: "no", header: "Invoice", cell: (row) => row.invoiceNumber, width: "160px" },
  { id: "desc", header: "Job", cell: (row) => row.description },
  { id: "date", header: "Date", cell: (row) => row.date, width: "130px" },
  {
    id: "amount",
    header: "Amount",
    cell: (row) =>
      new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
      }).format(row.amount),
    align: "right",
    width: "110px",
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => (
      <Chip label={STATUS_LABEL[row.status]} tone={STATUS_TONE[row.status]} selected />
    ),
    width: "110px",
  },
]

const PENDING_QUOTES: ReadonlyArray<PendingQuote> = [
  {
    id: "qte-1",
    reference: "QTE-2026-0418",
    customerName: "Mel Park",
    customerSuburb: "Oak Flats, NSW",
    vehicleYear: 2008,
    vehicleMake: "Holden",
    vehicleModel: "VE Commodore",
    vehicleRego: "MEL-PRK",
    vehicleEngine: "3.6L V6",
    services: [
      { label: "Twin 2.5\" cat-back", tone: "amber" },
      { label: "Hangers + flex", tone: "teal" },
    ],
    totalAud: 2_840,
  },
  {
    id: "qte-2",
    reference: "QTE-2026-0416",
    customerName: "Mel Park",
    customerSuburb: "Oak Flats, NSW",
    vehicleYear: 2017,
    vehicleMake: "Toyota",
    vehicleModel: "Hilux GUN126",
    vehicleRego: "MEL-HLX",
    vehicleEngine: "2.8L turbo diesel",
    services: [{ label: "DPF clean + cat", tone: "red" }],
    totalAud: 1_840,
  },
]

const SHIPMENT_STEPS: ReadonlyArray<ShippingStep> = [
  {
    key: "received",
    label: "Quote accepted",
    description: "12 May 2026",
    timestamp: "12 May · 09:14",
    status: "complete",
  },
  {
    key: "parts",
    label: "Parts ordered",
    description: "XForce twin system",
    timestamp: "14 May · 11:00",
    status: "complete",
  },
  {
    key: "in-bay",
    label: "On the rack",
    description: "Bay 2 · Iris Hawke",
    timestamp: "28 May · 09:30",
    status: "current",
  },
  {
    key: "qc",
    label: "Quality check",
    description: "Sound + weld inspection",
    status: "upcoming",
  },
  {
    key: "handover",
    label: "Handover",
    description: "Photos + invoice",
    status: "upcoming",
  },
]

const ARTICLES: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "k-1",
    title: "How we measure cat-back fitment without lifting your car",
    description: "5 min read · workshop process",
    timestamp: "20 May 2026",
    tone: "info",
  },
  {
    id: "k-2",
    title: "Caring for a fresh stainless system: first 500 km",
    description: "3 min read · ownership",
    timestamp: "12 May 2026",
    tone: "info",
  },
  {
    id: "k-3",
    title: "DPF clean vs delete: what's actually legal in NSW",
    description: "8 min read · compliance",
    timestamp: "04 May 2026",
    tone: "warn",
  },
]

export function CustomerPortalDashboard() {
  return (
    <div className={styles.surface}>
      <DashboardShell
        kicker="Customer portal / Mel Park"
        title="Welcome back, Mel"
        subtitle="Track your active job, manage your fleet, and revisit invoices from past visits to Oak Flats."
        toolbar={<span>Account · MEL-1042</span>}
        ariaLabel="Customer portal persona dashboard"
        density="comfortable"
        columns={1}
      >
        <DashboardTile label="Account" span={1} tone="teal">
          <div className={styles.greeting}>
            <div className={styles.greetingCopy}>
              <span className={styles.greetingKicker}>Active job · JOB-2026-0411</span>
              <h2 className={styles.greetingHello}>
                Your VE Commodore is on the rack at Bay 2.
              </h2>
              <p className={styles.greetingBody}>
                Iris has installed the twin headers and is moving onto the cat-back section. We&rsquo;ll
                send a sound demo before you head down for handover.
              </p>
            </div>
            <div className={styles.greetingMeta}>
              <span className={styles.greetingMetaLabel}>Pickup ETA</span>
              <strong className={styles.greetingMetaValue}>Thu 16:00</strong>
            </div>
          </div>
        </DashboardTile>
      </DashboardShell>

      <DashboardShell
        kicker="My garage"
        title="Vehicles on file"
        subtitle="Three cars with us — pull up history, prior invoices, and any open quotes per vehicle."
        ariaLabel="Customer vehicles section"
        density="comfortable"
        columns={1}
      >
        <DashboardTile label="Garage" aside="3 cars" span={1} tone="amber">
          <div className={styles.vehicles}>
            <VehicleProfileCard
              year={2008}
              make="Holden"
              model="VE Commodore SV6"
              rego="MEL-PRK"
              engine="3.6L V6"
              body="4-dr sedan"
              historyCount={6}
              fileHref="#"
            />
            <VehicleProfileCard
              year={2017}
              make="Toyota"
              model="Hilux GUN126"
              rego="MEL-HLX"
              engine="2.8L turbo diesel"
              body="Dual cab ute"
              historyCount={3}
              fileHref="#"
            />
            <VehicleProfileCard
              year={2002}
              make="Ford"
              model="Falcon BA XR6"
              rego="MEL-XR6"
              engine="4.0L inline-6"
              body="4-dr sedan"
              historyCount={11}
              fileHref="#"
            />
          </div>
        </DashboardTile>
      </DashboardShell>

      <div className={styles.split}>
        <DashboardTile label="Active job · progress" aside="Live" tone="green">
          <ShippingProgress
            steps={SHIPMENT_STEPS}
            orientation="horizontal"
            ariaLabel="Active job progress through workshop"
          />
        </DashboardTile>

        <DashboardTile label="Open quotes" aside="2 pending" tone="amber">
          <QuoteCardStack quotes={PENDING_QUOTES} />
        </DashboardTile>
      </div>

      <DashboardShell
        kicker="Invoices & knowledge"
        title="Past visits and helpful reads"
        ariaLabel="Customer invoices and articles"
        density="comfortable"
        columns={3}
      >
        <DashboardTile label="Invoice history" aside="Last 90d" span={2} tone="teal">
          <DataTable
            rows={[...INVOICES]}
            columns={INVOICE_COLUMNS}
            getRowId={(row) => row.id}
            density="comfortable"
            kicker="My invoices"
            caption="Recent invoices from Oak Flats Mufflermen"
          />
        </DashboardTile>

        <DashboardTile label="Helpful articles" aside="Owner guides" tone="amber">
          <ActivityFeed items={ARTICLES} ariaLabel="Helpful articles for owners" />
        </DashboardTile>
      </DashboardShell>
    </div>
  )
}

export default CustomerPortalDashboard
