import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RoadworthyCertificateCard } from "../../components/vehicles/roadworthy-certificate-card"

import { SAMPLE_ROADWORTHY } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Roadworthy certificate | Vehicles | UI Primitives",
  description:
    "NSW eSafety / pink slip roadworthy certificate card — cert number, issue + expiry, workshop, inspector, status chip, and advisories list.",
}

export default function RoadworthyCertificateCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 07"
        title="Roadworthy certificate"
        description="Passed inspection on the Hilux with two advisories, alongside a failed inspection example for comparison."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Roadworthy certificate" },
        ]}
      />
      <section className={styles.sceneShell}>
        <div className={styles.sceneRow}>
          <RoadworthyCertificateCard
            certNumber={SAMPLE_ROADWORTHY.certNumber}
            issuedISO={SAMPLE_ROADWORTHY.issuedISO}
            expiresISO={SAMPLE_ROADWORTHY.expiresISO}
            workshop={SAMPLE_ROADWORTHY.workshop}
            inspector={SAMPLE_ROADWORTHY.inspector}
            status={SAMPLE_ROADWORTHY.status}
            advisories={SAMPLE_ROADWORTHY.advisories}
          />
          <RoadworthyCertificateCard
            certNumber="NSW-eSAFETY-44219"
            issuedISO="2026-05-18"
            expiresISO="2026-05-18"
            workshop="Tyre King · Albion Park"
            inspector="Mick Halloran"
            status="failed"
            advisories={[
              "Front-right brake pads below 2 mm — replace",
              "Tail-light bulb intermittent",
              "Coolant overflow — investigate hose seal",
            ]}
          />
        </div>
      </section>
    </main>
  )
}
