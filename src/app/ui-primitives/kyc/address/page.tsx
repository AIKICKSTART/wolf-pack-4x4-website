import type { Metadata } from "next"

import { AddressVerificationRow } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Address verification | KYC",
  description:
    "Primitive 04 — address verification row with status chip (proof-on-file / proof-needed / expired) and an upload-proof CTA.",
}

export default function AddressScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Address"
        title="Address verification row"
        description="Address verification row with a label, single-line address, an optional supporting metadata line, a status chip (proof-on-file / proof-needed / expired), and an upload-proof CTA when proof is missing or expired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Address" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — Oak Flats trading + director residence + warehouse annex
        </span>
        <div className={styles.demoStack}>
          <AddressVerificationRow
            label="Trading address"
            address="18 Industrial Drive, Oak Flats NSW 2529"
            status="proof-on-file"
            meta="Utility bill filed 14 May 2026"
          />
          <AddressVerificationRow
            label="Director residence"
            address="7 Central Avenue, Shellharbour NSW 2529"
            status="proof-needed"
            meta="Needs one fresh proof document"
            uploadProofHref="/ui-primitives/kyc/id-upload"
          />
          <AddressVerificationRow
            label="Warehouse annex"
            address="2/44 Pioneer Road, Yallah NSW 2530"
            status="expired"
            meta="Lease expired 4 April 2026"
            uploadProofHref="/ui-primitives/kyc/id-upload"
          />
        </div>
      </section>
    </main>
  )
}
