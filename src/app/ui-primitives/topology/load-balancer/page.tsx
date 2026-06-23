import type { Metadata } from "next"

import { LoadBalancerCard } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Load balancer card | Topology",
  description:
    "Primitive 09 — ALB / NLB / CLB card with listener ports, target group health bar, throughput chip.",
}

export default function LoadBalancerCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Load balancer"
        title="Load balancer card"
        description="A load balancer summary card — ALB / NLB / CLB type chip, listener ports with protocol tones, target group health bar with healthy / unhealthy / total split, and throughput chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Load balancer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three balancers — healthy / pressured / failing</span>
        <div className={styles.miniGrid}>
          <LoadBalancerCard
            name="quotes-prod-alb"
            type="ALB"
            listeners={[
              { range: "443", protocol: "https" },
              { range: "80", protocol: "http" },
            ]}
            health={{ total: 12, healthy: 12, unhealthy: 0 }}
            throughput={{ value: 1.4, unit: "Gbps" }}
          />
          <LoadBalancerCard
            name="parts-prod-nlb"
            type="NLB"
            listeners={[
              { range: "443", protocol: "tcp" },
              { range: "5432", protocol: "tcp" },
            ]}
            health={{ total: 8, healthy: 6, unhealthy: 2 }}
            throughput={{ value: 820, unit: "Mbps" }}
          />
          <LoadBalancerCard
            name="legacy-quotes-clb"
            type="CLB"
            listeners={[{ range: "443", protocol: "https" }]}
            health={{ total: 6, healthy: 3, unhealthy: 3 }}
            throughput={{ value: 96, unit: "Mbps" }}
          />
        </div>
      </section>
    </main>
  )
}
