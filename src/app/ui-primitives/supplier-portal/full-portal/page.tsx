import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import type { ActivityFeedItem } from "../../components/data-display/activity-feed"
import type { MetricBlockItem } from "../../components/data-display/metric-block"
import type { ColumnMapping } from "../../components/data-import/column-mapper"
import type {
  CsvRowPreview,
  SourceColumnDescriptor,
  TargetFieldDescriptor,
} from "../../components/data-import/import-types"
import {
  BackorderNoticeCard,
  CatalogUploadWizard,
  ComplianceCertUpload,
  InvoiceSubmissionForm,
  NewSkuAnnouncement,
  OrderAcknowledgementForm,
  OrderRequestCard,
  PaymentStatusRow,
  PriceUpdateBroadcast,
  SupplierDashboardOverview,
  SupplierPerformanceScorecard,
  SupplierRoster,
  VolumeDiscountTierCard,
  type CatalogUploadOutcomeEntry,
  type InvoiceLine,
  type OrderRequestLine,
  type PaymentState,
  type SupplierDashboardPaymentSummary,
  type SupplierRosterRep,
} from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Full supplier portal | UI Primitives — Supplier Portal",
}

const metrics: ReadonlyArray<MetricBlockItem> = [
  {
    id: "open-pos",
    label: "Open POs",
    value: "7",
    unit: "active",
    delta: { label: "+2 this week", direction: "up" },
  },
  {
    id: "monthly-volume",
    label: "Monthly volume",
    value: "184",
    unit: "units",
    delta: { label: "+12%", direction: "up" },
  },
  {
    id: "billed-mtd",
    label: "Billed MTD",
    value: "$42,810",
    unit: "AUD",
    delta: { label: "−3%", direction: "down" },
  },
]

const monthly: ReadonlyArray<number> = [126, 134, 138, 142, 155, 161, 168, 172, 178, 181, 178, 184]

const paymentSummary: ReadonlyArray<SupplierDashboardPaymentSummary> = [
  { state: "paid", count: 11, totalAud: 28490 },
  { state: "in-approval", count: 4, totalAud: 9748 },
  { state: "disputed", count: 1, totalAud: 1240 },
  { state: "overdue", count: 2, totalAud: 3920 },
]

const activity: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "act-1",
    title: "Acknowledged PO-OF-0917",
    description: "Owen accepted in full · ETA 3 Jun · StarTrack premium.",
    timestamp: "Today · 09:32",
    tone: "success",
    actor: { name: "Owen Brackenridge" },
  },
  {
    id: "act-2",
    title: "Backorder broadcast for MAN-PX3",
    description: "Freight delay flagged. Alternative offered: RB-PX3-MID.",
    timestamp: "Yesterday · 14:18",
    tone: "warn",
    actor: { name: "Manta dispatch" },
  },
  {
    id: "act-3",
    title: "Invoice MP-INV-04129 submitted",
    description: "$8,420.50 against PO-OF-0904. Sent for approval.",
    timestamp: "Yesterday · 11:02",
    tone: "info",
    actor: { name: "Manta accounts" },
  },
]

const requestedLines: ReadonlyArray<OrderRequestLine> = [
  { id: "rl-1", title: "Manta 3in stainless cat-back", sku: "MAN-MK24-405", unitPrice: 1289, quantity: 4 },
  { id: "rl-2", title: "Manta single-out 2.25in MX-5", sku: "MAN-MX5-NB", unitPrice: 745, quantity: 2 },
]

const invoiceLines: ReadonlyArray<InvoiceLine> = [
  { id: "il-1", title: "Manta 3in stainless cat-back", sku: "MAN-MK24-405", unitPrice: 1289, quantity: 4 },
  { id: "il-2", title: "Manta Hilux N80 DPF-back", sku: "MAN-N80-DPF", unitPrice: 1095, quantity: 2 },
]

const csvHeaders: ReadonlyArray<string> = ["supplier_sku", "title", "rrp_ex_gst", "lead_days"]

const csvRows: ReadonlyArray<CsvRowPreview> = [
  {
    rowNumber: 1,
    cells: [
      { value: "MAN-RAM1500" },
      { value: "Manta RAM 1500 DT cat-back" },
      { value: "2490.00" },
      { value: "9" },
    ],
  },
  {
    rowNumber: 2,
    cells: [
      { value: "MAN-RANGER-RA" },
      { value: "Manta Ranger Next-Gen cat-back" },
      { value: "1799.00" },
      { value: "7" },
    ],
  },
]

const csvSources: ReadonlyArray<SourceColumnDescriptor> = [
  { id: "supplier_sku", label: "supplier_sku", detected: "text", sample: "MAN-RAM1500" },
  { id: "title", label: "title", detected: "text", sample: "Manta RAM 1500 DT cat-back" },
  { id: "rrp_ex_gst", label: "rrp_ex_gst", detected: "currency", sample: "2490.00" },
  { id: "lead_days", label: "lead_days", detected: "number", sample: "9" },
]

const csvTargets: ReadonlyArray<TargetFieldDescriptor> = [
  { id: "sku", label: "Catalog SKU", required: true },
  { id: "name", label: "Display name", required: true },
  { id: "rrp", label: "Suggested RRP", required: true },
  { id: "lead_time_days", label: "Lead time (days)" },
]

const csvMappings: ReadonlyArray<ColumnMapping> = [
  { sourceId: "supplier_sku", targetId: "sku", skip: false, confidence: 96, confidenceTone: "high" },
  { sourceId: "title", targetId: "name", skip: false, confidence: 92, confidenceTone: "high" },
  { sourceId: "rrp_ex_gst", targetId: "rrp", skip: false, confidence: 84, confidenceTone: "medium" },
  { sourceId: "lead_days", targetId: "lead_time_days", skip: false, confidence: 88, confidenceTone: "high" },
]

const csvOutcomes: ReadonlyArray<CatalogUploadOutcomeEntry> = [
  { label: "New SKUs", count: 2, tone: "create" },
  { label: "Updates", count: 0, tone: "update" },
  { label: "Skipped", count: 0, tone: "skip" },
  { label: "Failed", count: 0, tone: "fail" },
]

interface PaymentRowEntry {
  invoiceNumber: string
  poRef: string
  amountAud: number
  dueDateLabel: string
  daysSinceSubmitted: number
  state: PaymentState
}

const paymentRows: ReadonlyArray<PaymentRowEntry> = [
  {
    invoiceNumber: "MP-INV-04129",
    poRef: "PO-OF-0904",
    amountAud: 8420.5,
    dueDateLabel: "Due 14 Jun",
    daysSinceSubmitted: 4,
    state: "in-approval",
  },
  {
    invoiceNumber: "MP-INV-04127",
    poRef: "PO-OF-0892",
    amountAud: 4310,
    dueDateLabel: "Paid 21 May",
    daysSinceSubmitted: 18,
    state: "paid",
  },
  {
    invoiceNumber: "MP-INV-04102",
    poRef: "PO-OF-0844",
    amountAud: 3920,
    dueDateLabel: "Was due 12 May",
    daysSinceSubmitted: 38,
    state: "overdue",
  },
]

const reps: ReadonlyArray<SupplierRosterRep> = [
  {
    id: "owen",
    name: "Owen Brackenridge",
    role: "Manta · Dispatch lead",
    tone: "red",
    status: "online",
    lastActiveLabel: "Active now",
  },
  {
    id: "kelsie",
    name: "Kelsie Tran",
    role: "Magnaflow ANZ · Accounts",
    tone: "teal",
    status: "away",
    lastActiveLabel: "47 min ago",
  },
  {
    id: "rob",
    name: "Rob Pacheski",
    role: "Pacemaker Headers · Tech",
    tone: "amber",
    status: "online",
    lastActiveLabel: "Active now",
  },
  {
    id: "jenn",
    name: "Jenn Whitlam",
    role: "Redback Exhaust · Sales",
    tone: "green",
    status: "busy",
    lastActiveLabel: "Last seen 2h ago",
  },
]

export default function SupplierFullPortalPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.15 / Supplier portal"
        title="Full supplier portal composition"
        description="Every supplier-portal primitive composed into a single screen — login → dashboard → orders → broadcasts → invoicing → compliance → roster."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Full portal" },
        ]}
      />
      <section className={styles.canvas}>
        <SupplierDashboardOverview
          supplierName="Manta Performance"
          metrics={metrics}
          monthlyVolumePoints={monthly}
          monthlyVolumeTone="green"
          paymentSummary={paymentSummary}
          activity={activity}
        />

        <div className={styles.split}>
          <OrderRequestCard
            poNumber="PO-OF-0921"
            requestedBy="Lara Donaghy · Oak Flats parts desk"
            requestedOn="29 May · 09:14"
            deliverByLabel="Deliver by 5 Jun"
            state="requested"
            lines={requestedLines}
          />
          <OrderAcknowledgementForm
            poNumber="PO-OF-0921"
            defaultDecision="accept"
            defaultLeadTimeDays={5}
          />
        </div>

        <div className={styles.row}>
          <BackorderNoticeCard
            sku="MAN-PX3"
            title="Manta Ranger PX3 mid-muffler"
            reason="freight-delay"
            expectedRestockLabel="ETA 14 Jun · Air freight"
            affectedCustomerCount={6}
            alternative={{
              sku: "RB-PX3-MID",
              title: "Redback Ranger PX3 alt mid-muffler",
              unitsAvailable: 12,
            }}
          />
          <PriceUpdateBroadcast
            sku="MAN-MK24-405"
            title="Manta 3in stainless cat-back"
            oldPrice={1289}
            newPrice={1349}
            effectiveLabel="Effective 1 Jul"
            affectedQuotes={11}
            note="Stainless sheet cost pass-through."
          />
        </div>

        <NewSkuAnnouncement
          sku="MAN-RAM1500"
          title="Manta RAM 1500 DT cat-back"
          description="Twin 3in stainless mandrel-bent system for the RAM 1500 DT Hemi. Drop-in fitment with polished tips."
          suggestedRrp={2490}
          launchLabel="Launches 12 Jul"
        />

        <div className={styles.tablePanel}>
          <table className={styles.paymentsTable} aria-label="Supplier invoice payment status">
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Amount AUD</th>
                <th scope="col">Due</th>
                <th scope="col">Status</th>
                <th scope="col">Days since submit</th>
              </tr>
            </thead>
            <tbody>
              {paymentRows.map((row) => (
                <PaymentStatusRow key={row.invoiceNumber} {...row} />
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.split}>
          <SupplierPerformanceScorecard
            supplierName="Manta Performance"
            onTimeDeliveryPct={92}
            orderAccuracyPct={97}
            leadTimeVarianceDays={1}
          />
          <VolumeDiscountTierCard
            tierName="Loyal trade"
            thresholdAud={120000}
            discountPct={7}
            currentSpendAud={82400}
            nextTierLabel="Next: Fleet partner · 9% at $160k"
          />
        </div>

        <CatalogUploadWizard
          filename="manta-may-2026.csv"
          headers={csvHeaders}
          rows={csvRows}
          sources={csvSources}
          targets={csvTargets}
          initialMappings={csvMappings}
          outcomes={csvOutcomes}
        />

        <div className={styles.split}>
          <InvoiceSubmissionForm
            defaultPoRef="PO-OF-0921"
            defaultInvoiceNumber="MP-INV-04132"
            lines={invoiceLines}
          />
          <ComplianceCertUpload
            defaultKind="adr"
            defaultExpiry="2027-05-30"
            checksumVerified
          />
        </div>

        <SupplierRoster reps={reps} />
      </section>
    </main>
  )
}
