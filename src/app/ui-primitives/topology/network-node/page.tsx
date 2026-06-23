import type { Metadata } from "next"

import { NetworkNodeCard, TopologyCanvas } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Network node card | Topology"
  ,
  description:
    "Primitive 02 — generic network node card with icon by kind, name, IP/CIDR, region chip, and health dot with degraded pulse.",
}

export default function NetworkNodeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Network node"
        title="Network node card"
        description="One card per infra node. Kind drives icon + accent tone, health drives a pulsing dot for degraded / failed states. Designed to live inside a TopologyCanvas with x/y percent positioning."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Network node" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>All node kinds inside a topology canvas</span>
        <TopologyCanvas ariaLabel="Network node kinds" height={620} zoomLabel="kinds">
          <NetworkNodeCard
            name="quotes-api"
            kind="service"
            ip="10.1.2.18/27"
            region="ap-southeast-2"
            meta="v4.18.2 · 3 replicas"
            x={20}
            y={20}
          />
          <NetworkNodeCard
            name="quotes-rds"
            kind="database"
            ip="10.1.4.12/24"
            region="ap-southeast-2"
            health="degraded"
            meta="postgres 16.2"
            x={50}
            y={20}
          />
          <NetworkNodeCard
            name="parts-cache"
            kind="cache"
            ip="10.1.3.8/27"
            region="ap-southeast-2"
            meta="redis 7"
            x={80}
            y={20}
          />
          <NetworkNodeCard
            name="parts-events"
            kind="queue"
            ip="10.1.3.16/27"
            region="ap-southeast-2"
            meta="sqs · fifo"
            x={20}
            y={50}
          />
          <NetworkNodeCard
            name="prod-igw"
            kind="gateway"
            ip="0.0.0.0/0"
            region="ap-southeast-2"
            x={50}
            y={50}
          />
          <NetworkNodeCard
            name="prod-alb"
            kind="load-balancer"
            ip="10.1.0.0/22"
            region="ap-southeast-2"
            x={80}
            y={50}
          />
          <NetworkNodeCard
            name="quote-pdf"
            kind="function"
            ip="lambda"
            region="ap-southeast-2"
            x={20}
            y={80}
          />
          <NetworkNodeCard
            name="quotes-pdf-store"
            kind="object-store"
            ip="s3"
            region="ap-southeast-2"
            x={50}
            y={80}
          />
          <NetworkNodeCard
            name="cf-edge-syd"
            kind="edge"
            ip="anycast"
            region="ap-southeast-2"
            health="failed"
            x={80}
            y={80}
          />
        </TopologyCanvas>
      </section>
    </main>
  )
}
