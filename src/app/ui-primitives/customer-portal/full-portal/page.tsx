import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { FullPortalDemo } from "../_interactive-demos"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Full portal | Customer portal",
  description:
    "Composition — Oak Flats Mufflermen customer dashboard, all 14 portal primitives assembled into the mufflermen.com.au logged-in surface for Mick Davis.",
}

export default function FullPortalScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / mufflermen.com.au customer dashboard"
        title="Mick Davis · live customer portal"
        description="The composed dashboard Mick lands on after he logs in — account summary up top, garage + upcoming appointment + quote on the main rail, history and docs below, and loyalty + invoice + chat + referral down the aside. All 14 customer-portal primitives composed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Full portal" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition · 14 primitives</span>
        <FullPortalDemo />
      </section>
    </main>
  )
}
