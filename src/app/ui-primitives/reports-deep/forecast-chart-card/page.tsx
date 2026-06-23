import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ForecastChartCard } from "../../components/reports-deep"
import { FORECAST_POINTS } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Forecast chart card | Reports-deep",
  description:
    "Primitive 10 — forecast chart with confidence band, dashed forecast line, solid actual line and split-point marker.",
}

export default function ForecastChartCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Forecast chart card"
        title="Forecast chart card"
        description="Weekly revenue forecast with a 13-week horizon. Solid line for actuals, dashed line for forecast, soft band for the confidence range. Vertical dotted line marks the forecast split-point. AUD inc GST."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Forecast chart card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ForecastChartCard
          kicker="Weekly revenue · 13-week forecast"
          title="Weekly revenue forecast"
          points={FORECAST_POINTS}
          summaryValue="$45,980"
          summaryDelta="+9.0% vs current"
          confidence="80% confidence interval · model trained 28 May 2026"
        />
      </section>
    </main>
  )
}
