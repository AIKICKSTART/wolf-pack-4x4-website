import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AddressForm } from "../../components/forms-gallery/address-form"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Address form | Forms Gallery",
  description:
    "Pattern 09 — address form with country flag select, street autocomplete preview, suburb chip, postcode mask, and deliver-to expansion.",
}

export default function AddressScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 09 / Address"
        title="Address form"
        description="Country-first address pattern with street autocomplete preview, suburb chip, postcode mask, and optional second delivery column."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "Address" },
        ]}
      />
      <AddressForm />
    </main>
  )
}
