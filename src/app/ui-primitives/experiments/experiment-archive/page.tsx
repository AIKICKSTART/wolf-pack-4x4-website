import type { Metadata } from "next"

import { ExperimentArchive } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Experiment archive | Experiments",
  description:
    "Primitive 12 — sortable archive table of concluded experiments with retrospective links.",
}

export default function ExperimentArchiveScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Archive"
        title="Experiment archive"
        description="Sortable table of concluded experiments — ran-from, ran-to, winning variant, final lift, decision chip and retrospective link. Composes the shared DataTable so it inherits zebra rows, sortable headers and aria-sort."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Experiment archive" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · sortable archive</span>
        <ExperimentArchive
          caption="Concluded experiments — last 90 days"
          experiments={[
            {
              id: "ex-quote-live",
              name: "Quote — instant pricing UI cards",
              ranFrom: "2026-04-08",
              ranTo: "2026-04-29",
              winningVariant: "Live preview",
              finalLift: 20.1,
              decision: "ship-variant",
              retrospectiveHref: "/ui-primitives/experiments/experiment-archive#ex-quote-live",
            },
            {
              id: "ex-parts-3d",
              name: "Parts 3D viewer hero vs static",
              ranFrom: "2026-03-12",
              ranTo: "2026-04-02",
              winningVariant: "3D viewer",
              finalLift: 24.4,
              decision: "ship-variant",
              retrospectiveHref: "/ui-primitives/experiments/experiment-archive#ex-parts-3d",
            },
            {
              id: "ex-bay-realtime",
              name: "Bay availability realtime chip",
              ranFrom: "2026-02-18",
              ranTo: "2026-03-10",
              decision: "insufficient-power",
              retrospectiveHref:
                "/ui-primitives/experiments/experiment-archive#ex-bay-realtime",
            },
            {
              id: "ex-ar-overlay",
              name: "Parts AR overlay (mobile)",
              ranFrom: "2026-02-04",
              ranTo: "2026-02-19",
              finalLift: -6.4,
              decision: "stop-loss",
              retrospectiveHref:
                "/ui-primitives/experiments/experiment-archive#ex-ar-overlay",
            },
            {
              id: "ex-promo-tile",
              name: "Workshop promo tile carousel",
              ranFrom: "2026-01-22",
              ranTo: "2026-02-12",
              winningVariant: "Single hero",
              finalLift: 7.2,
              decision: "ship-variant",
              retrospectiveHref:
                "/ui-primitives/experiments/experiment-archive#ex-promo-tile",
            },
          ]}
        />
      </section>
    </main>
  )
}
