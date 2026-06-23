import { ActivityFeed, type ActivityFeedItem } from "../data-display/activity-feed"
import { MetricBlock, type MetricBlockItem } from "../data-display/metric-block"
import { Sparkline } from "../charts/sparkline"

import styles from "./supplier-dashboard-overview.module.css"
import type { PaymentState, SupplierTone } from "./supplier-portal-types"

export interface SupplierDashboardPaymentSummary {
  state: PaymentState
  count: number
  totalAud: number
}

export interface SupplierDashboardOverviewProps {
  supplierName: string
  metrics: ReadonlyArray<MetricBlockItem>
  monthlyVolumePoints: ReadonlyArray<number>
  monthlyVolumeTone?: SupplierTone
  paymentSummary: ReadonlyArray<SupplierDashboardPaymentSummary>
  activity: ReadonlyArray<ActivityFeedItem>
}

const PAYMENT_LABEL: Record<PaymentState, string> = {
  paid: "Paid",
  "in-approval": "In approval",
  disputed: "Disputed",
  overdue: "Overdue",
}

const PAYMENT_TONE: Record<PaymentState, SupplierTone> = {
  paid: "green",
  "in-approval": "teal",
  disputed: "amber",
  overdue: "red",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function SupplierDashboardOverview({
  supplierName,
  metrics,
  monthlyVolumePoints,
  monthlyVolumeTone = "teal",
  paymentSummary,
  activity,
}: SupplierDashboardOverviewProps) {
  return (
    <section
      className={styles.wrap}
      role="region"
      aria-label={`${supplierName} dashboard overview`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Supplier overview</span>
        <h2 className={styles.title}>{supplierName}</h2>
      </header>

      <div className={styles.metrics}>
        <MetricBlock metrics={metrics} />
      </div>

      <div className={styles.split}>
        <article className={styles.panel} aria-label="Monthly dispatch volume">
          <div className={styles.panelHead}>
            <span className={styles.panelKicker}>Monthly volume</span>
            <strong className={styles.panelValue}>
              {Array.from(monthlyVolumePoints).pop() ?? 0}
              <span className={styles.panelUnit}>units</span>
            </strong>
          </div>
          <Sparkline
            points={Array.from(monthlyVolumePoints)}
            tone={monthlyVolumeTone}
            ariaLabel="Dispatched units per month"
            width={420}
            height={84}
          />
        </article>

        <article className={styles.panel} aria-label="Payment summary">
          <span className={styles.panelKicker}>Payment status</span>
          <ul className={styles.paymentList}>
            {paymentSummary.map((entry) => {
              const tone = PAYMENT_TONE[entry.state]
              return (
                <li key={entry.state} className={styles.paymentRow} data-tone={tone}>
                  <span className={styles.paymentLabel}>{PAYMENT_LABEL[entry.state]}</span>
                  <span className={styles.paymentCount}>{entry.count}</span>
                  <span className={styles.paymentValue}>{formatAud(entry.totalAud)}</span>
                </li>
              )
            })}
          </ul>
        </article>
      </div>

      <article className={styles.activity} aria-label="Recent activity">
        <span className={styles.panelKicker}>Recent activity</span>
        <ActivityFeed items={activity} ariaLabel="Supplier activity feed" />
      </article>
    </section>
  )
}

export default SupplierDashboardOverview
