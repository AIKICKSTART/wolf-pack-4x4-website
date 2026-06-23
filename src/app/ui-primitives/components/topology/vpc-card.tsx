import { Globe2, Network, Share2 } from "lucide-react"

import styles from "./vpc-card.module.css"
import type { PeeringConnection } from "./topology-types"

interface VpcCardProps {
  /** VPC name — e.g. `mufflermen-prod-syd`. */
  name: string
  /** CIDR — e.g. `10.1.0.0/16`. */
  cidr: string
  /** Region id — e.g. `ap-southeast-2`. */
  region: string
  /** Number of subnets within this VPC. */
  subnetsCount: number
  /** Whether an Internet Gateway is attached. */
  internetGateway?: boolean
  /** Peering connections to other VPCs. */
  peerings?: ReadonlyArray<PeeringConnection>
}

export function VpcCard({
  name,
  cidr,
  region,
  subnetsCount,
  internetGateway = false,
  peerings = [],
}: VpcCardProps) {
  return (
    <article className={styles.card} aria-label={`VPC ${name} ${cidr}`}>
      <header className={styles.header}>
        <span className={styles.iconBadge} aria-hidden="true">
          <Network strokeWidth={2.2} />
        </span>
        <div>
          <span className={styles.kicker}>VPC</span>
          <h3 className={styles.title}>{name}</h3>
        </div>
      </header>
      <div className={styles.specGrid}>
        <span className={styles.specLabel}>CIDR</span>
        <span className={styles.specValue}>{cidr}</span>
        <span className={styles.specLabel}>Region</span>
        <span className={styles.specValue}>{region}</span>
        <span className={styles.specLabel}>Subnets</span>
        <span className={styles.specValue}>{subnetsCount}</span>
      </div>
      <div className={styles.chipRow}>
        {internetGateway ? (
          <span className={[styles.chip, styles.chipIgw].join(" ")}>
            <Globe2 strokeWidth={2.2} aria-hidden="true" />
            IGW attached
          </span>
        ) : (
          <span className={[styles.chip, styles.chipPrivate].join(" ")}>Private only</span>
        )}
        <span className={styles.chip}>{peerings.length} peering</span>
      </div>
      {peerings.length > 0 ? (
        <ul className={styles.peerList} aria-label="Peering connections">
          {peerings.map((peer) => (
            <li key={peer.id} className={styles.peerRow}>
              <span className={styles.peerIcon} aria-hidden="true">
                <Share2 strokeWidth={2.2} />
              </span>
              <span className={styles.peerMeta}>
                <strong>{peer.peer}</strong>
                <small>{peer.id} · {peer.region}</small>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}
