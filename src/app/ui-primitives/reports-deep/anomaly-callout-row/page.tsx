import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AnomalyCalloutRow } from "../../components/reports-deep"
import { ANOMALY_EVENTS } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Anomaly callout row | Reports-deep",
  description:
    "Primitive 11 — anomaly row with severity badge, observed vs expected, deviation chip, reason and an investigate CTA.",
}

export default function AnomalyCalloutRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Anomaly callout row"
        title="Anomaly callout row"
        description="A list row for an automatically-detected anomaly. Severity is colour + glyph; deviation chip flips green/red based on direction. Reason field carries the human-readable cause. The investigate CTA opens the underlying drill. Mufflermen anomalies on quote-conversion drop and dyno wait-time spike."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Anomaly callout row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          {ANOMALY_EVENTS.map((event) => (
            <AnomalyCalloutRow key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  )
}
