import type { Metadata } from "next"

import { ModificationDeclarationForm } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_VEHICLE, SAMPLE_WORKSHOP } from "../demo-data"
import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Modification declaration form | ADR compliance",
  description:
    "Primitive 07 — customer modification declaration form with e-signature pad and supporting evidence upload.",
}

export default function ModificationDeclarationFormScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Declaration"
        title="Modification declaration form"
        description="Composed dialog — vehicle + customer fields, modification scope, ADR scope chips, FileUploadForm for evidence, dual ESignaturePad for customer + technician, and a legally-binding acknowledgement checkbox. role='dialog' + aria-modal='true' make this a modal-friendly primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Modification declaration form" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Customer + technician dual sign-off</span>
        <ModificationDeclarationForm
          defaultCustomerName={SAMPLE_VEHICLE.customerName}
          defaultTechnicianName={SAMPLE_WORKSHOP.technician}
        />
      </section>
    </main>
  )
}
