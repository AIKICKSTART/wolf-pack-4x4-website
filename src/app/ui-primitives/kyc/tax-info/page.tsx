import type { Metadata } from "next"

import { TaxInfoForm } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Tax info form | KYC",
  description:
    "Primitive 07 — country-first tax form. Visible fields adapt by residency country: AU (TFN/ABN), US (SSN/ITIN/W-9), UK (UTR), NZ (IRD), or other (W-8BEN).",
}

export default function TaxInfoScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Tax"
        title="Tax info form"
        description="Country-first tax information form. The user selects their tax residency first, then the form adapts the visible identifier fields and the downloadable declaration form — TFN declaration for AU, IR330 for NZ, W-9 for US, self-assessment for UK, or W-8BEN for other jurisdictions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Tax info" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — switch country to see fields adapt
        </span>
        <TaxInfoForm
          kicker="Step 06 / Tax"
          title="Collect tax details"
          defaultCountry="AU"
        />
      </section>
    </main>
  )
}
