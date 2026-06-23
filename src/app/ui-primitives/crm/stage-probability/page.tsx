import type { Metadata } from "next"

import { StageProbabilityBar } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Stage probability | CRM",
  description:
    "Primitive 08 — horizontal probability bar 0-100% with stage tick markers at Lead 10%, Qualified 25%, Quoted 50%, Verbal 80%, Won 100%.",
}

export default function StageProbabilityScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Stage probability"
        title="Stage probability bar"
        description="Bar that maps deal probability to a 0-100% scale, with markers showing where each pipeline stage typically lands. Current stage is highlighted along with its tick."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Stage probability" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux SR5 turbo-back — Lead</span>
        <StageProbabilityBar value={10} currentStage="new" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Ranger Wildtrak DPF — Qualified</span>
        <StageProbabilityBar value={25} currentStage="qualified" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Patrol Y62 custom 3in — Quoted</span>
        <StageProbabilityBar value={50} currentStage="quoted" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Commodore VE cat-back — Verbal yes</span>
        <StageProbabilityBar value={80} currentStage="verbal" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Triton MQ headers — Won</span>
        <StageProbabilityBar value={100} currentStage="won" />
      </section>
    </main>
  )
}
