import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuoteRequestForm } from "../../components/forms-gallery/quote-request-form"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Quote request form | Forms Gallery",
  description:
    "Pattern 04 — three-step quote request wizard with vehicle, service multi-select chips, and contact + audience.",
}

export default function QuoteRequestScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 04 / Quote request"
        title="Quote request form"
        description="A three-step wizard — vehicle, service needs, contact. Local stepper indicator, chip multi-select, audience toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "Quote request" },
        ]}
      />
      <QuoteRequestForm />
    </main>
  )
}
