import type { Metadata } from "next"

import { DocumentVerificationStatus } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Document verification status | KYC",
  description:
    "Primitive 03 — status card showing document review state (pending / under-review / approved / rejected / requires-additional-info) with color-tone shifts, ETA chip and reviewer name.",
}

export default function DocumentStatusScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Document review"
        title="Document verification status"
        description="Tone-shifting status card for the five document-review states. Each state has its own color tone, status glyph, optional reviewer reference and ETA chip. Aria-live polite is used for state changes; rejected and requires-additional-info raise role=alert."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Document status" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — all five states</span>
        <div className={styles.demoStack}>
          <DocumentVerificationStatus
            kicker="Document review"
            documentLabel="NSW driver licence"
            reference="DOC-204-9913"
            status="pending"
            body="Waiting in the verification queue. We’ll start automated checks once the second document arrives."
          />
          <DocumentVerificationStatus
            kicker="Document review"
            documentLabel="Medicare card"
            reference="DOC-204-9914"
            status="under-review"
            eta="~ 18 min"
            reviewer={{ id: "rvw-22", name: "Elise Tran", team: "Compliance pod" }}
            body="OCR completed. A reviewer is cross-checking against the AUSTRAC sanctions list."
          />
          <DocumentVerificationStatus
            kicker="Document review"
            documentLabel="Passport"
            reference="DOC-204-9915"
            status="approved"
            reviewer={{ id: "rvw-11", name: "Marco Bianchi", team: "Compliance pod" }}
            body="All checks passed. The document is now linked to the workshop entity record."
          />
          <DocumentVerificationStatus
            kicker="Document review"
            documentLabel="Proof of address"
            reference="DOC-204-9916"
            status="requires-additional-info"
            eta="Action needed"
            body="Image quality is too low to verify the suburb and postcode. Please re-upload a clearer copy."
          />
          <DocumentVerificationStatus
            kicker="Document review"
            documentLabel="Trust deed"
            reference="DOC-204-9917"
            status="rejected"
            reviewer={{ id: "rvw-09", name: "Priya Shah", team: "AUSTRAC liaison" }}
            body="Deed is unsigned by the trustee. Upload a fully executed deed with witness signature to continue."
          />
        </div>
      </section>
    </main>
  )
}
