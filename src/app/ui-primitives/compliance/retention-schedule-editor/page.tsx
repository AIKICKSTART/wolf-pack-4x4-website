import type { Metadata } from "next"

import { RetentionScheduleEditor } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Retention schedule editor | Compliance",
  description:
    "Primitive 08 — retention rule editor with data category, duration, disposal method, and a legal hold toggle.",
}

export default function RetentionScheduleEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Retention"
        title="Retention schedule editor"
        description="Single retention rule editor. Captures the data category, the retention duration (days / months / years), the disposal method (secure erase / crypto-erase / physical destruction / anonymisation / archival cold storage), and an explicit legal hold toggle that suspends disposal under court order or AUSTRAC investigation. Live summary updates as values change."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Retention schedule editor" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · two rules · interactive</span>
        <RetentionScheduleEditor
          initialRule={{
            recordId: "RET-2026-007",
            category: "Customer identifiers",
            durationAmount: 7,
            durationUnit: "years",
            disposalMethod: "secure-erase",
            legalHold: false,
          }}
        />
        <RetentionScheduleEditor
          initialRule={{
            recordId: "RET-2026-014",
            category: "CCTV (workshop bays)",
            durationAmount: 31,
            durationUnit: "days",
            disposalMethod: "crypto-erase",
            legalHold: true,
          }}
        />
      </section>
    </main>
  )
}
