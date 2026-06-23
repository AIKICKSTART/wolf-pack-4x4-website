import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./topology.module.css"

export const metadata: Metadata = {
  title: "Topology | UI Primitives",
  description:
    "Infra / network topology primitives — pannable canvas, network nodes, edge lines, subnet boxes, traffic flow arrows, latency badges, region markers, VPC + load-balancer cards, firewall rules, service-mesh dependencies, cluster nodes, container badges, healthcheck dots, and a full Sydney + Singapore topology composition.",
}

interface TopologyScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<TopologyScene> = [
  {
    kicker: "Primitive 01",
    title: "Topology canvas",
    body: "Pannable/zoomable canvas surface with starfield grid, fine + coarse dot grids, compass and zoom corner badges.",
    href: "/ui-primitives/topology/canvas",
    accent: "neutral",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Network node card",
    body: "Generic node card — icon by kind, name, IP/CIDR, region chip, health dot with degraded pulse.",
    href: "/ui-primitives/topology/network-node",
    accent: "teal",
    glyph: "◉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Edge connection line",
    body: "SVG bezier edge with animated dashed flow, bandwidth chip + protocol chip at midpoint, optional bidirectional return.",
    href: "/ui-primitives/topology/edge-line",
    accent: "teal",
    glyph: "↝",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Subnet box",
    body: "Dashed-rectangle group around nodes with subnet label, CIDR chip and AZ chip in the header.",
    href: "/ui-primitives/topology/subnet-box",
    accent: "amber",
    glyph: "▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Traffic flow arrow",
    body: "Animated arrow showing req/s with tone shifting from green to red as saturation increases.",
    href: "/ui-primitives/topology/traffic-arrow",
    accent: "amber",
    glyph: "→",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Latency badge",
    body: "p50/p99 latency chip with tone shift from green to red against an SLO threshold + tiny sparkline.",
    href: "/ui-primitives/topology/latency-badge",
    accent: "green",
    glyph: "ms",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Region marker",
    body: "Region id + display label + datacentre count chip with an ISO flag glyph or pin fallback.",
    href: "/ui-primitives/topology/region-marker",
    accent: "teal",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "VPC card",
    body: "VPC name, CIDR, region, subnet count, internet-gateway chip + peering connections list.",
    href: "/ui-primitives/topology/vpc-card",
    accent: "teal",
    glyph: "VPC",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Load balancer card",
    body: "ALB / NLB / CLB card with listener ports, target group health bar, throughput chip.",
    href: "/ui-primitives/topology/load-balancer",
    accent: "red",
    glyph: "⌬",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Firewall rule row",
    body: "Semantic table row — priority, action chip (Allow/Deny/Log), protocol, source, destination, ports.",
    href: "/ui-primitives/topology/firewall-rule",
    accent: "red",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Service mesh dependency",
    body: "Caller → callee arrow with RPS chip, error rate chip, mTLS chip.",
    href: "/ui-primitives/topology/service-mesh",
    accent: "amber",
    glyph: "⇄",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Cluster node",
    body: "Kubernetes node card — role chip (Master/Worker/Edge), pod count + CPU/MEM usage mini chips.",
    href: "/ui-primitives/topology/cluster-node",
    accent: "teal",
    glyph: "k8s",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Container badge",
    body: "Container image:tag with status (Running/Pending/Failed/Crashing) and restart counter.",
    href: "/ui-primitives/topology/container-badge",
    accent: "green",
    glyph: "▣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Healthcheck status dot",
    body: "Tiny pulsing dot for healthy/degraded/failed with aria-live + tooltip QuoteBubble.",
    href: "/ui-primitives/topology/healthcheck-dot",
    accent: "green",
    glyph: "●",
    state: "Hover · live region",
  },
  {
    kicker: "Composition",
    title: "Full topology composition",
    body: "Sydney + Singapore VPCs with web/app/db subnets, ALB at edge, mesh dependencies, latency, firewall, cluster + containers.",
    href: "/ui-primitives/topology/full-topology",
    accent: "red",
    glyph: "▦↝◉",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<TopologyScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function TopologyIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Topology / 14 primitives + composition"
        title="Infra & network topology primitives"
        description="Visual primitives for an infra/network topology view — VPCs, subnets, load balancers, service mesh, k8s clusters and containers, drawn against Mufflermen prod infrastructure (Sydney + Singapore). Visual references — no real telemetry wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no live telemetry wired
      </span>

      <section className={styles.grid} aria-label="Topology primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
