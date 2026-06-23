import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "topology",
  "title": "Topology",
  "group": "Data",
  "summary": "14 infra/network topology primitives — a pannable canvas plus node, edge, subnet, traffic, latency, region, VPC, load-balancer, firewall, service-mesh, cluster, container, and healthcheck pieces for drawing schematic cloud-network diagrams.",
  "entries": [
    {
      "key": "topology/topology-canvas",
      "family": "topology",
      "name": "TopologyCanvas",
      "label": "Topology canvas",
      "description": "Pannable/zoomable diagram surface with starfield + fine/coarse dot grids, a zoom corner badge and a compass marker; renders positioned children in a viewport.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/canvas",
      "tags": [
        "canvas",
        "diagram",
        "infra",
        "surface"
      ],
      "status": "captured"
    },
    {
      "key": "topology/network-node-card",
      "family": "topology",
      "name": "NetworkNodeCard",
      "label": "Network node card",
      "description": "Positioned node card with a kind-based icon/accent, name, optional IP/CIDR, region chip, and a health dot with degraded pulse.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/network-node",
      "tags": [
        "node",
        "network",
        "health"
      ],
      "status": "captured"
    },
    {
      "key": "topology/edge-connection-line",
      "family": "topology",
      "name": "EdgeConnectionLine",
      "label": "Edge connection line",
      "description": "SVG bezier edge between two points with an arrow marker, optional bidirectional return stroke, and a midpoint protocol/bandwidth chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/edge-line",
      "tags": [
        "edge",
        "svg",
        "connection"
      ],
      "status": "captured"
    },
    {
      "key": "topology/subnet-box",
      "family": "topology",
      "name": "SubnetBox",
      "label": "Subnet box",
      "description": "Percentage-positioned region box grouping nodes, with a header showing the subnet label plus optional CIDR and availability-zone chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/subnet-box",
      "tags": [
        "subnet",
        "group",
        "cidr"
      ],
      "status": "captured"
    },
    {
      "key": "topology/traffic-flow-arrow",
      "family": "topology",
      "name": "TrafficFlowArrow",
      "label": "Traffic flow arrow",
      "description": "Rotated arrow drawn between two percentage points showing requests/sec, with tone shifting green→red as saturation rises.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/traffic-arrow",
      "tags": [
        "traffic",
        "throughput",
        "arrow"
      ],
      "status": "captured"
    },
    {
      "key": "topology/latency-badge",
      "family": "topology",
      "name": "LatencyBadge",
      "label": "Latency badge",
      "description": "p50/p99 latency chip with tone shift against an SLO p99 threshold and an optional inline trend sparkline.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/latency-badge",
      "tags": [
        "latency",
        "slo",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "topology/region-marker",
      "family": "topology",
      "name": "RegionMarker",
      "label": "Region marker",
      "description": "Region id + label badge with a datacentre-count chip and an ISO-country flag glyph or map-pin fallback.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/region-marker",
      "tags": [
        "region",
        "geo",
        "flag"
      ],
      "status": "captured"
    },
    {
      "key": "topology/vpc-card",
      "family": "topology",
      "name": "VpcCard",
      "label": "VPC card",
      "description": "VPC summary card showing name, CIDR, region, subnet count, internet-gateway state chip, and a peering-connections list.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/vpc-card",
      "tags": [
        "vpc",
        "network",
        "peering"
      ],
      "status": "captured"
    },
    {
      "key": "topology/load-balancer-card",
      "family": "topology",
      "name": "LoadBalancerCard",
      "label": "Load balancer card",
      "description": "ALB/NLB/CLB card with listener-port chips, a target-group health bar with healthy/unhealthy counts, and an optional throughput chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/load-balancer",
      "tags": [
        "load-balancer",
        "health",
        "listeners"
      ],
      "status": "captured"
    },
    {
      "key": "topology/firewall-rule-row",
      "family": "topology",
      "name": "FirewallRuleRow",
      "label": "Firewall rule row",
      "description": "Semantic table row for a firewall rule — priority badge, allow/deny/log action chip, protocol, source, destination, ports, and comment.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/firewall-rule",
      "tags": [
        "firewall",
        "table-row",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "topology/service-mesh-dependency",
      "family": "topology",
      "name": "ServiceMeshDependency",
      "label": "Service mesh dependency",
      "description": "Caller→callee dependency row with an RPS chip, an error-rate chip toned by severity, and an mTLS on/off chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/service-mesh",
      "tags": [
        "service-mesh",
        "dependency",
        "mtls"
      ],
      "status": "captured"
    },
    {
      "key": "topology/cluster-node",
      "family": "topology",
      "name": "ClusterNode",
      "label": "Cluster node",
      "description": "Kubernetes node card with a master/worker/edge role chip, pod count, and CPU/MEM usage mini chips toned by load.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/cluster-node",
      "tags": [
        "kubernetes",
        "node",
        "usage"
      ],
      "status": "captured"
    },
    {
      "key": "topology/container-badge",
      "family": "topology",
      "name": "ContainerBadge",
      "label": "Container badge",
      "description": "Container image:tag badge showing running/pending/failed/crashing status with an icon and a restart counter.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/container-badge",
      "tags": [
        "container",
        "status",
        "restarts"
      ],
      "status": "captured"
    },
    {
      "key": "topology/healthcheck-status-dot",
      "family": "topology",
      "name": "HealthcheckStatusDot",
      "label": "Healthcheck status dot",
      "description": "Pulsing status dot for healthy/degraded/failed/unknown with an aria-live region and a QuoteBubble tooltip carrying label/detail.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/topology",
      "routeHref": "/ui-primitives/topology/healthcheck-dot",
      "tags": [
        "healthcheck",
        "status",
        "tooltip"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
