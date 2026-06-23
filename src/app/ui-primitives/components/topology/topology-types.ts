/** Shared types for the infra / network topology primitives. */

export type NodeKind =
  | "service"
  | "database"
  | "cache"
  | "queue"
  | "gateway"
  | "load-balancer"
  | "function"
  | "object-store"
  | "edge"
  | "client"

export type LbType = "ALB" | "NLB" | "CLB"

export type FirewallAction = "allow" | "deny" | "log"

export type HealthState = "healthy" | "degraded" | "failed" | "unknown"

export type ProtocolKind = "tcp" | "udp" | "http" | "https" | "grpc" | "icmp" | "any"

export type TopologyTone = "neutral" | "red" | "amber" | "teal" | "green"

export type ContainerStatus = "running" | "pending" | "failed" | "crashing"

export type ClusterRole = "master" | "worker" | "edge"

export interface RegionDescriptor {
  /** Canonical region id — e.g. `ap-southeast-2`. */
  id: string
  /** Short display label — e.g. `Sydney`. */
  label: string
  /** Optional ISO country code rendered as a tiny flag glyph. */
  country?: string
  /** Number of datacentres / availability zones. */
  datacentres?: number
}

export interface BandwidthSnapshot {
  /** Numeric value e.g. 480. */
  value: number
  /** Display unit — Mbps / Gbps / req/s. */
  unit: string
}

export interface LatencySample {
  /** p50 in milliseconds. */
  p50: number
  /** p99 in milliseconds. */
  p99: number
  /** Sparkline samples (most recent last). */
  trend?: ReadonlyArray<number>
}

export interface PortDescriptor {
  /** Single port number or low-high range "8080-8090". */
  range: string
  /** Protocol used. */
  protocol: ProtocolKind
}

export interface PeeringConnection {
  /** Connection id e.g. pcx-abc123. */
  id: string
  /** Other VPC label. */
  peer: string
  /** Region of the peer VPC. */
  region: string
}
