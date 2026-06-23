import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintComplianceCert, PrintPreviewFrame } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Compliance certificate | UI Primitives — Print & PDF",
}

export default function PrintComplianceCertDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 09"
        title="Compliance certificate"
        description="Ornamental certificate of compliance — frame ornament, crest, customer + vehicle details, ADR scope certified, dual sign-off, verification QR."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Compliance certificate" },
        ]}
      />
      <section className={styles.canvas} aria-label="Compliance certificate demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Printed on heavy stock and stamped for the customer to keep with vehicle service
            records. The QR code resolves to a verification page on the Mufflermen domain so
            insurers and rego inspectors can confirm authenticity.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-CRT-26-0021"
          documentLabel="Certificate of compliance — Manta MK4M3 fitment"
          format="A4"
        >
          <PrintComplianceCert
            certificateNumber="OFM-CRT-26-0021"
            issuedAt="24 May 2026"
            issuedIso="2026-05-24"
            customerName="Jared Whittaker"
            vehicleDescription="2015 Holden Commodore VF SS"
            vehicleRego="CCV-12K"
            vehicleVin="6H8VFK8KW1L420881"
            workCertified="Fitment of Manta MK4M3 3.0in stainless catback with MM01 chrome muffler"
            adrReference="ADR 83/00 · NSW VSI 6"
            technicianName="Brett Kowalski"
            technicianLicence="NSW MVRL 67992"
            workshopName="Oak Flats Mufflermen Pty Ltd"
            workshopAbn="47 612 985 003"
            workshopAddress="31 Industrial Drive, Oak Flats NSW 2529"
            verificationUrl="https://verify.mufflermen.com.au/c/OFM-CRT-26-0021"
          />
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
