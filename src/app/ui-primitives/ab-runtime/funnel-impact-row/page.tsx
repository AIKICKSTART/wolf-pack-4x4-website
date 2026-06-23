import type { Metadata } from "next"

import { FunnelImpactRow } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Funnel impact row | A/B runtime",
  description:
    "Primitive 09 — funnel step impact row showing control vs treatment rate and relative delta.",
}

export default function FunnelImpactRowScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Funnel"
        title="Funnel impact row"
        description="One funnel step per row. Surfaces the control vs treatment conversion at that step and the relative delta — so you can see exactly which step of the booking funnel moves under the treatment."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Funnel impact row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Quote PDF redesign funnel</span>
        <div className={styles.rowGroup}>
          <FunnelImpactRow
            step={1}
            name="Land on quote page"
            hint="quote_page_view"
            controlRate={100}
            treatmentRate={100}
          />
          <FunnelImpactRow
            step={2}
            name="Open quote PDF"
            hint="quote_pdf_open"
            controlRate={64.1}
            treatmentRate={71.4}
          />
          <FunnelImpactRow
            step={3}
            name="Scroll past line items"
            hint="quote_pdf_scroll_50"
            controlRate={42.3}
            treatmentRate={51.9}
          />
          <FunnelImpactRow
            step={4}
            name="Tap accept CTA"
            hint="quote_accept_tap"
            controlRate={24.8}
            treatmentRate={28.0}
          />
          <FunnelImpactRow
            step={5}
            name="Quote accepted"
            hint="quote_accept_confirm"
            controlRate={18.4}
            treatmentRate={20.6}
          />
        </div>
      </section>
    </main>
  )
}
