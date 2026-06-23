import type { Metadata } from "next"

import { TaxExemptionCard } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Tax exemption | Billing | UI Primitives",
  description:
    "Tax exemption card primitive — certificate upload, expiry, jurisdiction, status (pending / active / expired).",
}

export default function TaxExemptionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13"
        title="Tax exemption"
        description="Tax exemption certificate management — jurisdiction at the top, file block with certificate name and expiry date, status chip, upload / replace action with hidden file input."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Tax exemption" },
        ]}
      />
      <TaxExemptionCard
        jurisdiction="New South Wales — GST exempt"
        certificateName="GST-exemption-NSW-2026.pdf"
        status="active"
        expiresISO="2027-06-30"
      />
    </main>
  )
}
