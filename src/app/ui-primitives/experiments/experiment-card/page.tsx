import type { Metadata } from "next"

import { ExperimentCard } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Experiment card | Experiments",
  description:
    "Primitive 01 — experiment card composing the DashboardCard surface with status, variant, sample-size, significance and lift chips.",
}

export default function ExperimentCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Card"
        title="Experiment card"
        description="Workhorse experiment list row. Surfaces status (Draft / Running / Stopped / Decided), variant chips, current sample size vs target, p-value chip vs control, and lift in a tone-coded chip strip on the shared DashboardCard."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Experiment card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three experiments</span>
        <div className={styles.demoStack}>
          <ExperimentCard
            name="Quote — instant pricing UI cards"
            hypothesis="Live price recalc on each line edit lifts booking conversion."
            status="running"
            variants={[
              { id: "c", name: "Save then price", isControl: true },
              { id: "v", name: "Live preview" },
            ]}
            sampleSize={28430}
            requiredSampleSize={42000}
            significance={0.0091}
            lift={20.1}
          />
          <ExperimentCard
            name="Parts 3D viewer hero vs static"
            hypothesis="GLB hero treatment lifts parts-page add-to-quote conversion."
            status="decided"
            variants={[
              { id: "c", name: "Static carousel", isControl: true },
              { id: "v", name: "3D viewer" },
              { id: "ar", name: "AR overlay" },
            ]}
            sampleSize={9842}
            requiredSampleSize={9000}
            significance={0.012}
            lift={24.4}
          />
          <ExperimentCard
            name="Bay availability realtime chip"
            hypothesis="Realtime workshop bay availability tile lifts same-day bookings."
            status="draft"
            variants={[
              { id: "c", name: "Daily summary", isControl: true },
              { id: "v", name: "Live tile" },
            ]}
            sampleSize={0}
            requiredSampleSize={15600}
          />
        </div>
      </section>
    </main>
  )
}
