import type { Metadata } from "next"

import { QuoteViewer } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import {
  QUOTE_FALCON_ACCEPTED,
  QUOTE_HILUX,
  QUOTE_RAPTOR_EXPIRED,
} from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Quote viewer | Customer portal",
  description:
    "Primitive 02 — itemised quote with parts, labour, fees, GST math, accept/decline buttons — three states.",
}

export default function QuoteViewerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Quote viewer"
        title="Interactive quote"
        description={`Awaiting Mick's call (Hilux 2.5" Manta cat-back), already accepted (Falcon X-Force varex), and an expired Raptor turbo-back quote that Bec didn't action in time.`}
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Quote viewer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <QuoteViewer quote={QUOTE_HILUX} />
          <QuoteViewer quote={QUOTE_FALCON_ACCEPTED} />
          <QuoteViewer quote={QUOTE_RAPTOR_EXPIRED} />
        </div>
      </section>
    </main>
  )
}
