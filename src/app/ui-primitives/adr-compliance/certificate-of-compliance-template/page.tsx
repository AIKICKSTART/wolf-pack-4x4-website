import type { Metadata } from "next"

import { CertificateOfComplianceTemplate } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_VEHICLE, SAMPLE_WORKSHOP } from "../demo-data"
import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Certificate of compliance template | ADR compliance",
  description:
    "Primitive 08 — in-app preview of the ADR certificate of compliance for issued modifications.",
}

export default function CertificateOfComplianceTemplateScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Certificate"
        title="Certificate of compliance template"
        description="Wraps the PrintComplianceCert primitive in an in-app preview frame. A4 portrait certificate with crest, vehicle details, work certified, ADR reference, signed-by line, issue stamp and a verification QR. Used as the final hand-over artifact."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Certificate template" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Preview · ADR 28/01 cat-back compliance</span>
        <CertificateOfComplianceTemplate
          certificateNumber="OFM-2026-00184"
          issuedAt="Mon 27 May 2026"
          issuedIso="2026-05-27"
          customerName={SAMPLE_VEHICLE.customerName}
          vehicleDescription={SAMPLE_VEHICLE.description}
          vehicleRego={SAMPLE_VEHICLE.rego}
          vehicleVin={SAMPLE_VEHICLE.vin}
          workCertified="2.5″ stainless cat-back with high-flow centre muffler, resonator delete and OEM-spec tailpipes."
          adrReference="ADR 28/01 + NSW VSI 08"
          technicianName={SAMPLE_WORKSHOP.technician}
          technicianLicence={SAMPLE_WORKSHOP.technicianLicence}
          workshopName={SAMPLE_WORKSHOP.name}
          workshopAbn={SAMPLE_WORKSHOP.abn}
          workshopAddress={SAMPLE_WORKSHOP.address}
          verificationUrl="https://oakflatsmuffler.com.au/verify/OFM-2026-00184"
        />
      </section>
    </main>
  )
}
