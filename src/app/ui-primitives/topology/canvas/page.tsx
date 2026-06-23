import type { Metadata } from "next"

import {
  EdgeConnectionLine,
  NetworkNodeCard,
  TopologyCanvas,
} from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Topology canvas | Topology",
  description:
    "Primitive 01 — pannable/zoomable infra canvas with starfield, dual dot grids, corner compass and zoom caption.",
}

export default function TopologyCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Canvas"
        title="Topology canvas"
        description="A bordered canvas surface for hosting infra topology — starfield + coarse + fine grids, compass corner, ambient gradients, and a corner zoom caption. Children position with x/y percent."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Canvas" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Empty canvas (100%)</span>
        <TopologyCanvas ariaLabel="Empty topology canvas" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>With nodes + edge (88%)</span>
        <TopologyCanvas ariaLabel="Demo topology canvas" zoom={0.88}>
          <NetworkNodeCard
            name="quotes-api"
            kind="service"
            ip="10.1.2.18/27"
            region="ap-southeast-2"
            x={22}
            y={42}
          />
          <NetworkNodeCard
            name="quotes-rds"
            kind="database"
            ip="10.1.4.4/24"
            region="ap-southeast-2"
            health="degraded"
            x={72}
            y={42}
          />
          <EdgeConnectionLine
            from={{ x: 260, y: 252 }}
            to={{ x: 720, y: 252 }}
            tone="amber"
            bandwidth="320 Mbps"
            protocol="tcp"
          />
        </TopologyCanvas>
      </section>
    </main>
  )
}
