import type { Metadata } from "next"

import {
  NetworkNodeCard,
  SubnetBox,
  TopologyCanvas,
} from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Subnet box | Topology",
  description:
    "Primitive 04 — dashed rectangle around nodes with subnet label, CIDR chip, and availability-zone chip.",
}

export default function SubnetBoxScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Subnet box"
        title="Subnet box"
        description="A dashed-rectangle group container drawn around child nodes. Header carries the subnet label, CIDR chip and AZ chip. Designed to nest inside a TopologyCanvas with x/y/width/height percentages."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Subnet box" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three subnets — web / app / db</span>
        <TopologyCanvas ariaLabel="Subnet box demo" height={600} zoomLabel="subnets">
          <SubnetBox
            label="web"
            cidr="10.1.1.0/24"
            az="ap-southeast-2a"
            tone="teal"
            x={4}
            y={8}
            width={30}
            height={82}
          >
            <NetworkNodeCard
              name="prod-alb"
              kind="load-balancer"
              ip="10.1.1.42"
              region="ap-southeast-2"
              x={50}
              y={30}
            />
            <NetworkNodeCard
              name="cf-edge-syd"
              kind="edge"
              ip="anycast"
              region="ap-southeast-2"
              x={50}
              y={70}
            />
          </SubnetBox>
          <SubnetBox
            label="app"
            cidr="10.1.2.0/24"
            az="ap-southeast-2b"
            tone="amber"
            x={36}
            y={8}
            width={30}
            height={82}
          >
            <NetworkNodeCard
              name="quotes-api"
              kind="service"
              ip="10.1.2.18"
              region="ap-southeast-2"
              meta="v4.18.2"
              x={50}
              y={26}
            />
            <NetworkNodeCard
              name="parts-catalogue"
              kind="service"
              ip="10.1.2.40"
              region="ap-southeast-2"
              meta="v2.6.0"
              x={50}
              y={56}
              health="degraded"
            />
            <NetworkNodeCard
              name="workshop-scheduler"
              kind="service"
              ip="10.1.2.66"
              region="ap-southeast-2"
              meta="v1.12.4"
              x={50}
              y={86}
            />
          </SubnetBox>
          <SubnetBox
            label="db"
            cidr="10.1.4.0/24"
            az="ap-southeast-2c"
            tone="red"
            x={68}
            y={8}
            width={30}
            height={82}
          >
            <NetworkNodeCard
              name="quotes-rds"
              kind="database"
              ip="10.1.4.4"
              region="ap-southeast-2"
              meta="postgres 16.2"
              x={50}
              y={32}
            />
            <NetworkNodeCard
              name="parts-cache"
              kind="cache"
              ip="10.1.4.18"
              region="ap-southeast-2"
              meta="redis 7"
              x={50}
              y={72}
            />
          </SubnetBox>
        </TopologyCanvas>
      </section>
    </main>
  )
}
