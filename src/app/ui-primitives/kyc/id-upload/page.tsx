import type { Metadata } from "next"

import { IdUploadStep } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "ID upload step | KYC",
  description:
    "Primitive 01 — document upload step with ID frame outline, front + back uploaders, file constraint chips, use-camera CTA, and an in-flight verification progress meter.",
}

export default function IdUploadScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Identity"
        title="ID upload step"
        description="Document upload step for the Mufflermen KYC flow — a dashed ID-frame outline, dual front + back uploaders, file constraint chips, a use-camera CTA for mobile, and an in-flight OCR + authenticity verification meter. Reduced-motion overrides hover transitions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "ID upload" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — NSW driver licence upload state
        </span>
        <IdUploadStep
          kicker="Step 01 / Identity"
          title="Upload your NSW driver licence"
          documentKind="drivers-licence"
          constraints={[
            { label: "PDF, JPG, PNG" },
            { label: "Max 10 MB each" },
            { label: "Front + back required" },
            { label: "Not expired" },
          ]}
          verificationProgress={42}
          verificationLabel="OCR + authenticity checks"
        />
      </section>
    </main>
  )
}
