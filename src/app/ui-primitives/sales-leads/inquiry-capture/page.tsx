import type { Metadata } from "next"

import { InquiryFormCapture } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_FORM_FIELDS } from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Inquiry form capture | Sales leads",
  description:
    "Primitive 05 — inquiry form capture preview with per-field conversion rate, required-vs-optional split, and 14-day trend sparkline.",
}

export default function InquiryCaptureScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Inquiry capture"
        title="Inquiry form capture"
        description="A live audit of the quote-inquiry form — which fields drive abandonment, which are stable, and which optional fields nobody fills."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Inquiry capture" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote inquiry — public site</span>
        <InquiryFormCapture
          title="Get a Manta cat-back quote"
          submissionRate={62}
          fields={MUFFLERMEN_FORM_FIELDS}
        />
      </section>
    </main>
  )
}
