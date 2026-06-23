import type { Metadata } from "next"

import { ClusterNode } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Cluster node | Topology",
  description:
    "Primitive 12 - Kubernetes node card with role, pod count, CPU and memory usage chips.",
}

export default function ClusterNodeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Cluster node"
        title="Cluster node"
        description="Kubernetes node card with role tone, pod count, zone label, and compact CPU/MEM usage chips."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Cluster node" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Prod node pool states</span>
        <div className={styles.miniGrid}>
          <ClusterNode
            name="ip-10-1-3-44.ec2.internal"
            role="master"
            podCount={38}
            usage={{ cpu: 54, mem: 62 }}
            zone="ap-southeast-2a"
          />
          <ClusterNode
            name="ip-10-1-5-18.ec2.internal"
            role="worker"
            podCount={64}
            usage={{ cpu: 78, mem: 71 }}
            zone="ap-southeast-2b"
          />
          <ClusterNode
            name="edge-sg-01"
            role="edge"
            podCount={21}
            usage={{ cpu: 88, mem: 84 }}
            zone="ap-southeast-1a"
          />
        </div>
      </section>
    </main>
  )
}
