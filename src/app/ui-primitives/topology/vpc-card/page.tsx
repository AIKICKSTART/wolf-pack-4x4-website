import type { Metadata } from "next"

import { VpcCard } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "VPC card | Topology",
  description:
    "Primitive 08 — VPC surface card with CIDR, region, subnet count, internet-gateway chip and peering connections list.",
}

export default function VpcCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / VPC"
        title="VPC card"
        description="A VPC summary surface card — name, CIDR, region, subnet count, internet-gateway chip and peering connection list with peer VPC + region."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "VPC card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Two prod VPCs — Sydney + Singapore</span>
        <div className={styles.miniGrid}>
          <VpcCard
            name="mufflermen-prod-syd"
            cidr="10.1.0.0/16"
            region="ap-southeast-2"
            subnetsCount={9}
            internetGateway
            peerings={[
              { id: "pcx-syd-sg-01", peer: "mufflermen-prod-sg", region: "ap-southeast-1" },
              { id: "pcx-syd-shared", peer: "shared-services", region: "ap-southeast-2" },
            ]}
          />
          <VpcCard
            name="mufflermen-prod-sg"
            cidr="10.2.0.0/16"
            region="ap-southeast-1"
            subnetsCount={6}
            internetGateway
            peerings={[
              { id: "pcx-sg-syd-01", peer: "mufflermen-prod-syd", region: "ap-southeast-2" },
            ]}
          />
          <VpcCard
            name="mufflermen-staging-syd"
            cidr="10.10.0.0/20"
            region="ap-southeast-2"
            subnetsCount={3}
          />
        </div>
      </section>
    </main>
  )
}
