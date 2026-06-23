import type { Metadata } from "next"

import { BusinessRegistrationStep } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Business registration | KYC",
  description:
    "Primitive 08 — business registration step with ABN lookup auto-fill, business structure radio chips and a trading-since date.",
}

export default function BusinessRegistrationScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Entity"
        title="Business registration"
        description="Business registration step for the workshop entity. The user enters business name, runs an ABN lookup (auto-fills entity name + GST status + state), picks the business structure (Sole trader, Pty Ltd, Partnership, Trust) from radio chips, and records the trading-since date."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Business registration" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — ABN lookup result auto-filled
        </span>
        <BusinessRegistrationStep
          kicker="Step 04 / Entity"
          title="Look up business registration"
          defaultAbn="11 222 333 444"
          defaultTradingSince="2018-04-16"
          defaultStructure="pty-ltd"
          lookupResult={{
            abn: "11 222 333 444",
            entityName: "Oak Flats Mufflermen Pty Ltd",
            status: "active",
            gstStatus: "registered",
            state: "NSW",
          }}
        />
      </section>
    </main>
  )
}
