import type { Metadata } from "next"

import {
  NetworkNodeCard,
  TopologyCanvas,
  TrafficFlowArrow,
} from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Traffic flow arrow | Topology",
  description:
    "Primitive 05 — animated arrow with req/s rate chip and tone shifting based on saturation level.",
}

export default function TrafficArrowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Traffic arrow"
        title="Traffic flow arrow"
        description="Animated traffic flow arrow between two points. Brightness pulse intensifies with saturation; tone shifts green / teal / amber / red as load climbs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Traffic arrow" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Four saturation tiers — relaxed → critical</span>
        <TopologyCanvas ariaLabel="Traffic flow arrow variants" height={540} zoomLabel="flow">
          <NetworkNodeCard name="alb · 443" kind="load-balancer" x={14} y={18} ip="10.1.0.4" />
          <NetworkNodeCard name="quotes-api" kind="service" x={86} y={18} ip="10.1.2.18" />

          <NetworkNodeCard name="alb · 443" kind="load-balancer" x={14} y={42} ip="10.1.0.4" />
          <NetworkNodeCard name="parts-catalogue" kind="service" x={86} y={42} ip="10.1.2.40" />

          <NetworkNodeCard name="alb · 443" kind="load-balancer" x={14} y={66} ip="10.1.0.4" />
          <NetworkNodeCard name="workshop-scheduler" kind="service" x={86} y={66} ip="10.1.2.66" />

          <NetworkNodeCard name="alb · 443" kind="load-balancer" x={14} y={90} ip="10.1.0.4" />
          <NetworkNodeCard name="quote-pdf" kind="function" x={86} y={90} ip="lambda" />

          <TrafficFlowArrow fromX={22} fromY={18} toX={78} toY={18} rate={120} saturation={0.1} />
          <TrafficFlowArrow fromX={22} fromY={42} toX={78} toY={42} rate={640} saturation={0.4} />
          <TrafficFlowArrow fromX={22} fromY={66} toX={78} toY={66} rate={1820} saturation={0.7} />
          <TrafficFlowArrow fromX={22} fromY={90} toX={78} toY={90} rate={3460} saturation={0.95} />
        </TopologyCanvas>
      </section>
    </main>
  )
}
