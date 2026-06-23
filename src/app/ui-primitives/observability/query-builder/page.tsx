import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QueryBuilder } from "../../components/observability"

import {
  QUERY_FILTERS,
  QUERY_GROUP_BY_AVAILABLE,
  QUERY_GROUP_BY_INITIAL,
  QUERY_METRICS,
} from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Query builder | Observability cockpit",
  description:
    "Primitive 02 — visual metric query builder with metric picker, filter chips and group-by chips.",
}

export default function QueryBuilderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Query"
        title="Query builder"
        description="Visual metric query builder — pick the metric, narrow with filter chips, choose group-by dimensions and watch the PromQL-flavoured preview update inline. Stateful client component."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Query builder" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 6 metrics · 3 filters · 5 group-bys</span>
        <QueryBuilder
          metrics={QUERY_METRICS}
          initialMetricId="http_request_duration_p95"
          initialFilters={QUERY_FILTERS}
          initialGroupBy={QUERY_GROUP_BY_INITIAL}
          availableGroupBy={QUERY_GROUP_BY_AVAILABLE}
        />
      </section>
    </main>
  )
}
