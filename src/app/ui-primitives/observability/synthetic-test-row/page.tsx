import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SyntheticTestRow } from "../../components/observability"

import { SYNTHETIC_TESTS } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Synthetic test row | Observability cockpit",
  description:
    "Primitive 13 — per-test row showing name, kind, region, last outcome chip, latency chip and 30-day uptime.",
}

export default function SyntheticTestRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Synthetics"
        title="Synthetic test row"
        description="A single synthetic-test row — the test name and kind, the runner region, the most recent outcome chip (Pass / Fail / Timeout / Degraded), a tone-coded latency chip and a tiny 30-day uptime micro-stat. Drop into a list or table without further wrapping."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Synthetic test row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 6 tests · 4 outcomes</span>
        <div className={styles.demoStack}>
          {SYNTHETIC_TESTS.map((test) => (
            <SyntheticTestRow key={`${test.name}-${test.region}`} {...test} />
          ))}
        </div>
      </section>
    </main>
  )
}
