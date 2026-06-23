import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintConsentForm, PrintPreviewFrame } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Consent form | UI Primitives — Print & PDF",
}

export default function PrintConsentFormDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 08"
        title="Consent form"
        description="Customer consent for workshop modifications — vehicle details, scope, risk disclosure, ADR acknowledgement checklist, dual signature lines."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Consent form" },
        ]}
      />
      <section className={styles.canvas} aria-label="Consent form demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Signed at booking for any emissions-affecting, performance, or exhaust-modification
            work. Stored against the customer record on file for the life of the vehicle —
            required if an in-service ADR audit is ever raised.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-CSF-26-1098"
          documentLabel="Consent form — VF SS catback modification"
          format="A4"
        >
          <PrintConsentForm
            consentNumber="OFM-CSF-26-1098"
            preparedAt="24 May 2026"
            preparedIso="2026-05-24"
            customer={{
              name: "Jared Whittaker",
              phone: "+61 412 884 901",
              email: "jared.whittaker@example.com",
              licenceNumber: "NSW · 4892 5512",
            }}
            vehicle={{
              rego: "CCV-12K",
              make: "Holden",
              model: "Commodore VF SS",
              year: 2015,
              vin: "6H8VFK8KW1L420881",
            }}
            scopeOfWork="Fitment of a Manta MK4M3 3.0in stainless catback exhaust assembly. OEM resonator deleted. Manta MM01 chrome muffler installed in OEM tip location. No further engine management or fuelling changes performed."
            riskDisclosure="Modifications to the exhaust system may alter emissions output, noise output, and ADR compliance status. The customer accepts that ongoing road registration is contingent on compliance with NSW in-service vehicle standards and ADR 83/00. Workshop holds no liability for subsequent registration or insurance outcomes resulting from the modifications."
            adrReference="ADR 83/00 · NSW VSI 6 in-service exhaust"
            acknowledgements={[
              { id: "ack-1", label: "I confirm the vehicle is mine, or I am authorised by the owner to commission this work." },
              { id: "ack-2", label: "I understand the modification may affect the vehicle's compliance with ADR 83/00 emissions standards." },
              { id: "ack-3", label: "I will notify my insurer of the modification within 7 days of fitment." },
              { id: "ack-4", label: "I have been provided a copy of the workshop's modification disclosure pamphlet." },
              { id: "ack-5", label: "I accept that workshop warranty covers fabrication and welds only — not subsequent tuning or emissions outcomes." },
            ]}
            workshopName="Oak Flats Mufflermen Pty Ltd"
            workshopAbn="47 612 985 003"
          />
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
