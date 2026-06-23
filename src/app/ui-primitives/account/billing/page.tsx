import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { Chip } from "../../components/primitives/chip"
import { PlanBadge } from "../../components/account/plan-badge"
import { UsageMeterCard } from "../../components/account/usage-meter-card"
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from "../../components/data-display/comparison-table"
import { InvoiceLedgerTable } from "./invoice-ledger-table"

import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "Billing · Account | UI Primitives",
}

const PLAN_COLUMNS: ReadonlyArray<ComparisonColumn> = [
  { id: "starter", name: "Starter", caption: "$49 / mo · 1 bay" },
  { id: "workshop", name: "Workshop", caption: "$149 / mo · 1 bay" },
  { id: "fleet", name: "Fleet", caption: "$349 / mo · 3 bays", popular: true },
  { id: "enterprise", name: "Enterprise", caption: "Custom · unlimited" },
]

const PLAN_ROWS: ReadonlyArray<ComparisonRow> = [
  {
    feature: "Active bays",
    description: "Physical workshop bays included in the plan.",
    values: ["1", "1", "3", "Unlimited"],
  },
  {
    feature: "Operator seats",
    values: ["3", "8", "12", "Unlimited"],
  },
  {
    feature: "Quote credits / month",
    values: ["250", "1,000", "2,500", "Unlimited"],
  },
  {
    feature: "Telemetry pings / month",
    values: ["1,000", "5,000", "10,000", "Unlimited"],
  },
  {
    feature: "Audit log retention",
    values: ["30 days", "60 days", "180 days", "365 days"],
  },
  {
    feature: "Priority support",
    values: ["cross", "dot", "check", "check"],
  },
  {
    feature: "Custom integrations",
    values: ["cross", "cross", "check", "check"],
  },
  {
    feature: "Dedicated success engineer",
    values: ["cross", "cross", "cross", "check"],
  },
]

export default function AccountBillingPage() {
  return (
    <>
      <PageHeader
        kicker="18.2 / Billing"
        title="Billing"
        description="Plan tier, usage, payment methods, and the full invoice ledger."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "Billing" },
        ]}
      />

      <section className={styles.section} aria-labelledby="billing-current-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Current plan</span>
          <h2 id="billing-current-heading" className={styles.sectionTitle}>
            Plan + usage snapshot
          </h2>
        </header>
        <div className={styles.gridThreeUp}>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h3 className={styles.cardTitle}>Plan tier</h3>
              <p className={styles.cardSub}>$349 AUD · monthly</p>
            </div>
            <PlanBadge tier="fleet" size="lg" caption="Renews 12 Jun" />
          </div>
          <UsageMeterCard
            label="Quote credits"
            used={1840}
            limit={2500}
            unit="quotes"
            resetDate="1 Jun"
            tone="teal"
          />
          <UsageMeterCard
            label="Telemetry pings"
            used={9410}
            limit={10000}
            unit="pings"
            resetDate="1 Jun"
            tone="amber"
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="billing-compare-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>02 / Compare</span>
          <h2 id="billing-compare-heading" className={styles.sectionTitle}>
            Pricing comparison
          </h2>
          <p className={styles.sectionLead}>
            Tier coverage across Starter, Workshop, Fleet, and Enterprise. The Fleet column carries
            the &ldquo;most popular&rdquo; ribbon for new workshops with multiple bays.
          </p>
        </header>
        <ComparisonTable columns={PLAN_COLUMNS} rows={PLAN_ROWS} caption="Plan tier comparison" />
      </section>

      <section className={styles.section} aria-labelledby="billing-methods-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>03 / Payment methods</span>
          <h2 id="billing-methods-heading" className={styles.sectionTitle}>
            Cards &amp; bank links
          </h2>
        </header>
        <ul className={styles.list}>
          <li className={styles.paymentMethodRow}>
            <span className={styles.paymentBrand}>VISA</span>
            <div className={styles.paymentMeta}>
              <span className={styles.paymentMaskedNumber}>•••• •••• •••• 4242</span>
              <span className={styles.paymentExpiry}>Expires 04 / 28 · Daniel Fleuren</span>
            </div>
            <Chip label="Primary" tone="teal" />
            <button type="button" className={styles.btnGhost}>
              Replace
            </button>
          </li>
          <li className={styles.paymentMethodRow}>
            <span className={styles.paymentBrand}>MC</span>
            <div className={styles.paymentMeta}>
              <span className={styles.paymentMaskedNumber}>•••• •••• •••• 8810</span>
              <span className={styles.paymentExpiry}>Expires 11 / 26 · Workshop card</span>
            </div>
            <Chip label="Backup" tone="amber" />
            <button type="button" className={styles.btnGhost}>
              Remove
            </button>
          </li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="billing-invoices-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>04 / Invoices</span>
          <h2 id="billing-invoices-heading" className={styles.sectionTitle}>
            Invoice ledger
          </h2>
        </header>
        <InvoiceLedgerTable />
      </section>
    </>
  )
}
