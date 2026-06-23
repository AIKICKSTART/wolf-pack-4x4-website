import type { Metadata } from "next"

import { SelfieCaptureCard } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Selfie capture | KYC",
  description:
    "Primitive 02 — circular selfie capture frame, tap-to-take selfie CTA, capture instructions and a retake action after preview.",
}

export default function SelfieScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Liveness"
        title="Selfie capture card"
        description="Circular selfie capture frame with corner cross-hairs, a tap-to-take CTA, capture-quality instructions (centred face, no glasses, good light), and a retake action once the preview is shown. Used for face-match against the uploaded identity document."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Selfie" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — idle capture frame</span>
        <SelfieCaptureCard
          kicker="Step 02 / Liveness"
          title="Take a quick selfie"
          body="We match the selfie against your driver licence photo. The image is encrypted in transit and deleted after the review window closes."
          instructions={[
            "Look straight at the camera",
            "Remove sunglasses, hats and heavy reflections",
            "Stand under even light — avoid back-lighting",
            "Hold steady for two seconds",
          ]}
        />
      </section>
    </main>
  )
}
