import type { Metadata } from "next"

import {
  EdgeConnectionLine,
  NetworkNodeCard,
  TopologyCanvas,
} from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Edge connection line | Topology",
  description:
    "Primitive 03 — animated dashed SVG bezier between nodes with bandwidth + protocol chips at midpoint, optional bidirectional return-flow.",
}

export default function EdgeLineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Edge line"
        title="Edge connection line"
        description="A bezier connection between two nodes with an animated dashed flow direction. Renders an optional protocol pill + bandwidth pill at the midpoint and supports a bidirectional return-flow stroke."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Edge line" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Tones + bandwidth + protocol chips</span>
        <TopologyCanvas ariaLabel="Edge line variants" height={560} zoomLabel="edges">
          <NetworkNodeCard name="quotes-api" kind="service" x={16} y={22} ip="10.1.2.18" />
          <NetworkNodeCard name="quotes-rds" kind="database" x={84} y={22} ip="10.1.4.4" />

          <NetworkNodeCard name="parts-api" kind="service" x={16} y={50} ip="10.1.2.32" />
          <NetworkNodeCard name="parts-cache" kind="cache" x={84} y={50} ip="10.1.3.8" />

          <NetworkNodeCard name="cf-edge-syd" kind="edge" x={16} y={78} ip="anycast" />
          <NetworkNodeCard name="prod-alb" kind="load-balancer" x={84} y={78} ip="10.1.0.0/22" />

          <EdgeConnectionLine
            from={{ x: 220, y: 125 }}
            to={{ x: 780, y: 125 }}
            tone="amber"
            bandwidth="640 Mbps"
            protocol="tcp"
          />
          <EdgeConnectionLine
            from={{ x: 220, y: 285 }}
            to={{ x: 780, y: 285 }}
            tone="teal"
            bandwidth="1.2 Gbps"
            protocol="grpc"
            bidirectional
          />
          <EdgeConnectionLine
            from={{ x: 220, y: 442 }}
            to={{ x: 780, y: 442 }}
            tone="green"
            bandwidth="220 Mbps"
            protocol="https"
          />
        </TopologyCanvas>
      </section>
    </main>
  )
}
