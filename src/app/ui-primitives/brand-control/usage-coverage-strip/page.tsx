import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_COVERAGE,
  UsageCoverageStrip,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Usage coverage strip | Brand control",
}

const FRESH = MOCK_COVERAGE.map((datum) =>
  datum.family === "Forms"
    ? { ...datum, adopted: 6, total: 24 }
    : datum.family === "Icons"
      ? { ...datum, adopted: 28, total: 78 }
      : datum
)

const FULL = MOCK_COVERAGE.map((datum) => ({ ...datum, adopted: datum.total }))

export default function UsageCoverageStripRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 12"
          title="Usage coverage strip"
          description="Adoption rate of the current token set across every primitive family. Used by Daniel during weekly reviews to spot lagging surfaces."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Usage coverage strip" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            Current coverage, early-rollout coverage with forms/icons still catching up, and full saturation across every family.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Current coverage">
          <span className={styles.stateLabel}>State 01 · Current</span>
          <UsageCoverageStrip data={MOCK_COVERAGE} />
        </section>

        <section className={styles.stateWrap} aria-label="Fresh rollout coverage">
          <span className={styles.stateLabel}>State 02 · Fresh rollout</span>
          <UsageCoverageStrip data={FRESH} />
        </section>

        <section className={styles.stateWrap} aria-label="Full saturation">
          <span className={styles.stateLabel}>State 03 · 100% adoption</span>
          <UsageCoverageStrip data={FULL} />
        </section>
      </div>
    </main>
  )
}
