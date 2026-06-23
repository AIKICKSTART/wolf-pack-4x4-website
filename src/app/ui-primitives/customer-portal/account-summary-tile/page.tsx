import type { Metadata } from "next"

import { AccountSummaryTile } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import { CUSTOMER_BEC, CUSTOMER_KAREN, CUSTOMER_MICK } from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Account summary tile | Customer portal",
  description:
    "Primitive 12 — header tile showing name, member-since, loyalty tier, vehicle count — three states.",
}

export default function AccountSummaryTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Account summary tile"
        title="Header account tile"
        description="Mick (Gold member since 2018), Karen (Platinum lifer since 2014 with the reward-ready bar full), and Bec — fresh Starter signed up January 2026."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Account summary tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <AccountSummaryTile customer={CUSTOMER_MICK} />
          <AccountSummaryTile customer={CUSTOMER_KAREN} />
          <AccountSummaryTile customer={CUSTOMER_BEC} />
        </div>
      </section>
    </main>
  )
}
