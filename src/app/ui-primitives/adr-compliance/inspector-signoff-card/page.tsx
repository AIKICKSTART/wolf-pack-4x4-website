import type { Metadata } from "next"

import { InspectorSignoffCard } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Inspector sign-off card | ADR compliance",
  description:
    "Primitive 09 — inspector / technician sign-off card with avatar, qualification chip, timestamp and evidence count.",
}

export default function InspectorSignoffCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Sign-off"
        title="Inspector sign-off card"
        description="Composes Avatar + Chip. Used as the audit-trail tile after the post-mod test, showing who signed off, against what qualification, at what time, and how much photo evidence was captured."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Inspector sign-off" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Technician sign-off</span>
        <div className={styles.demoSplit}>
          <InspectorSignoffCard
            inspectorName="Will Brierley"
            qualification="MTA · Cert III Auto"
            licenceNumber="MVRL 78421"
            signedIso="2026-05-27T14:18:00+10:00"
            signedAt="Mon 27 May · 14:18"
            photoEvidenceCount={12}
          />
          <InspectorSignoffCard
            inspectorName="Dean Mitchell"
            qualification="MTA · Cert III + dyno tuner"
            licenceNumber="MVRL 88011"
            signedIso="2026-05-26T15:48:00+10:00"
            signedAt="Sun 26 May · 15:48"
            photoEvidenceCount={9}
          />
        </div>
      </section>
    </main>
  )
}
