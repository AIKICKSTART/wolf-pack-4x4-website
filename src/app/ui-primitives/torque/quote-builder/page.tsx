import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { QuoteConsole } from "./_quote-console"
import styles from "./quote-builder.module.css"

export const metadata: Metadata = {
  title: "Quote builder | Torque",
  description:
    "The Oak Flats Muffler Men estimate/quote builder — customer + vehicle, parts/labour/fee line rows with AUD and GST, markup, a live totals rail, send-for-approval and convert-to-job. Composed entirely from registered UI primitives.",
}

export default function QuoteBuilderPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Workshop Pro"
        title="Quote builder"
        description="Build a real exhaust quote end to end — customer and vehicle, parts, labour and fees with markup and GST, a live totals rail, then send it for approval and convert it to a job. The estimate surface the Oak Flats Muffler Men front counter runs on. Light + dark, responsive, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Quote builder" },
        ]}
      />

      <QuoteConsole />
    </main>
  )
}
