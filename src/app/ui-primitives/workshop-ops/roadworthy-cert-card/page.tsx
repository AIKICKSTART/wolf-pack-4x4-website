import type { Metadata } from "next"

import { RoadworthyCertCard } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"

import { CERT_BLUE, CERT_PINK, CERT_SAFETY } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Roadworthy cert card | Workshop ops",
  description:
    "Primitive 11 — pink-slip and blue-slip roadworthy cert card with NSW ERV verification — three states.",
}

export default function RoadworthyCertCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Roadworthy cert card"
        title="NSW roadworthy cert card"
        description="Pink-slip (eSafety) and blue-slip (AUVIS) cert records — NSW RTA eSafety inspector ID, cert number, issue + expiry, fault count, and ERV upload verification. Three states — issued pink-slip with zero faults, blue-slip mid-inspection with two faults, and a safety-check pre-inspection awaiting upload."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Roadworthy cert card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <RoadworthyCertCard cert={CERT_PINK} />
          <RoadworthyCertCard cert={CERT_BLUE} />
          <RoadworthyCertCard cert={CERT_SAFETY} />
        </div>
      </section>
    </main>
  )
}
