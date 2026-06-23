import type { Metadata } from "next"

import { EncryptionStatusIndicator } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Encryption status | Compliance",
  description:
    "Primitive 09 — at-rest + in-transit encryption status with key management chip and rotation cadence.",
}

export default function EncryptionStatusIndicatorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Encryption"
        title="Encryption status indicator"
        description="Visual evidence of encryption posture — three tiles for at-rest cipher, in-transit cipher, and key-management backing — plus last rotation timestamp and cadence. Maps directly to the ASD Essential 8 mitigation for cryptographic controls."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Encryption status" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · production posture</span>
        <EncryptionStatusIndicator
          atRestAlgo="aes-256-gcm"
          atRestModule="OpenSSL 3.2 · FIPS 140-3 module"
          inTransitAlgo="tls-1-3"
          inTransitSuite="TLS_AES_256_GCM_SHA384 · X25519"
          keyManagement="aws-kms"
          lastKeyRotation="2026-04-12"
          rotationCadence="Every 90 days · automated"
        />
      </section>
    </main>
  )
}
