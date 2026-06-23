import type { Metadata } from "next"

import { ContainerBadge } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Container badge | Topology",
  description:
    "Primitive 13 - container image badge with runtime status and restart count.",
}

export default function ContainerBadgeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Container badge"
        title="Container badge"
        description="Container image:tag badge with status tone and restart counter for topology sidebars and deployment inspectors."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Container badge" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Runtime states</span>
        <div className={styles.demoInline}>
          <ContainerBadge image="quotes-api:v4.18.2" status="running" restarts={0} />
          <ContainerBadge image="parts-search:v2.9.1" status="pending" restarts={0} />
          <ContainerBadge image="image-worker:v1.4.0" status="crashing" restarts={7} />
          <ContainerBadge image="legacy-importer:v0.8.3" status="failed" restarts={3} />
        </div>
      </section>
    </main>
  )
}
