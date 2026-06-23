import type { Metadata } from "next"

import {
  ClusterNode,
  ContainerBadge,
  EdgeConnectionLine,
  FirewallRuleRow,
  HealthcheckStatusDot,
  LatencyBadge,
  LoadBalancerCard,
  NetworkNodeCard,
  RegionMarker,
  ServiceMeshDependency,
  SubnetBox,
  TopologyCanvas,
  VpcCard,
} from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Full topology composition | Topology",
  description:
    "Topology composition combining canvas, nodes, VPCs, load balancer, service mesh, firewall, health and cluster primitives.",
}

export default function FullTopologyScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full topology"
        title="Sydney + Singapore topology"
        description="All topology primitives assembled into a static production-reference topology for the Mufflermen stack."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Full topology" },
        ]}
      />
      <section className={styles.compositionLayout}>
        <div className={styles.compositionMain}>
          <TopologyCanvas ariaLabel="Full topology composition" zoom={0.82}>
            <SubnetBox label="web" cidr="10.1.1.0/24" az="ap-southeast-2a" x={8} y={16} width={32} height={28}>
              <NetworkNodeCard name="web-shell" kind="service" x={18} y={42} region="syd" meta="Next 16" />
            </SubnetBox>
            <SubnetBox label="app" cidr="10.1.2.0/24" az="ap-southeast-2b" x={42} y={16} width={30} height={28} tone="amber">
              <NetworkNodeCard name="quotes-api" kind="service" x={54} y={42} region="syd" meta="Payload bridge" />
            </SubnetBox>
            <SubnetBox label="data" cidr="10.1.4.0/24" az="ap-southeast-2c" x={70} y={48} width={24} height={30} tone="red">
              <NetworkNodeCard name="postgres" kind="database" x={80} y={66} region="syd" health="degraded" />
            </SubnetBox>
            <NetworkNodeCard name="public edge" kind="load-balancer" x={8} y={62} region="syd" />
            <NetworkNodeCard name="image-store" kind="object-store" x={54} y={74} region="sg" />
            <EdgeConnectionLine from={{ x: 170, y: 365 }} to={{ x: 520, y: 250 }} protocol="https" bandwidth="820 Mbps" tone="teal" />
            <EdgeConnectionLine from={{ x: 590, y: 250 }} to={{ x: 820, y: 395 }} protocol="tcp" bandwidth="320 Mbps" tone="amber" bidirectional />
          </TopologyCanvas>
          <table className={styles.fwTable}>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Action</th>
                <th>Protocol</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Ports</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              <FirewallRuleRow priority={10} action="allow" protocol="https" source="0.0.0.0/0" destination="alb-prod" ports="443" comment="Public edge" />
              <FirewallRuleRow priority={90} action="deny" protocol="any" source="0.0.0.0/0" destination="db-prod" ports="all" comment="Block public data" />
            </tbody>
          </table>
        </div>
        <aside className={styles.compositionAside} aria-label="Topology side panels">
          <RegionMarker region={{ id: "ap-southeast-2", label: "Sydney", country: "AU", datacentres: 3 }} />
          <RegionMarker region={{ id: "ap-southeast-1", label: "Singapore", country: "SG", datacentres: 2 }} ghost />
          <VpcCard name="mufflermen-prod-syd" cidr="10.1.0.0/16" region="ap-southeast-2" subnetsCount={9} internetGateway />
          <LoadBalancerCard
            name="quotes-prod-alb"
            type="ALB"
            listeners={[{ range: "443", protocol: "https" }]}
            health={{ total: 8, healthy: 7, unhealthy: 1 }}
            throughput={{ value: 820, unit: "Mbps" }}
          />
          <LatencyBadge sample={{ p50: 46, p99: 184, trend: [140, 156, 132, 168, 184, 160, 172] }} />
          <ServiceMeshDependency caller="web-shell" callee="quotes-api" rps={1260} errorRate={0.003} mTls />
          <ClusterNode name="ip-10-1-5-18" role="worker" podCount={64} usage={{ cpu: 78, mem: 71 }} zone="2b" />
          <ContainerBadge image="quotes-api:v4.18.2" status="running" restarts={0} />
          <HealthcheckStatusDot state="healthy" label="prod /healthz" detail="All checks green." size="lg" />
        </aside>
      </section>
    </main>
  )
}
