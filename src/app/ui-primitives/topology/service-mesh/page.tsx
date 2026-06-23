import type { Metadata } from "next"

import { ServiceMeshDependency } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Service mesh dependency | Topology",
  description:
    "Primitive 11 - service dependency edge with RPS, error-rate and mTLS chips.",
}

export default function ServiceMeshScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Service mesh"
        title="Service mesh dependency"
        description="Caller-to-callee dependency row with request rate, error-rate tone and mTLS chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Service mesh" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mesh edges</span>
        <div className={styles.demoStack}>
          <ServiceMeshDependency
            caller="web-shell"
            callee="quotes-api"
            rps={1260}
            errorRate={0.003}
            mTls
          />
          <ServiceMeshDependency
            caller="quotes-api"
            callee="parts-search"
            rps={480}
            errorRate={0.014}
            mTls
          />
          <ServiceMeshDependency
            caller="media-worker"
            callee="image-store"
            rps={82}
            errorRate={0.071}
          />
        </div>
      </section>
    </main>
  )
}
