import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { AuditSection } from "../sections"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Audit | UI Primitives",
}

export default function AuditPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="00 / Source of truth"
        title="Live surface audit"
        description="Coverage of the current Mufflermen surface, the reusable pieces already present, and the gaps that still need explicit primitive treatment."
        dnaSectionId="audit"
      />
      <AuditSection />
    </main>
  )
}
