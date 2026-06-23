import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { ProductionSection } from "../sections"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Production | UI Primitives",
}

export default function ProductionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="00 / Source of truth"
        title="Coverage matrix and release gates"
        description="Production-readiness coverage for the primitives stack, including what is reusable already, what still needs hardening, and what must be verified before rollout."
        dnaSectionId="production"
      />
      <ProductionSection />
    </main>
  )
}
