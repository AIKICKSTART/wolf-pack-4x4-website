import type { Metadata } from "next"

import { EncryptionAtRestIndicator } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { ENCRYPTION } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Encryption at rest | Backups",
  description:
    "Primitive 06 — Encryption indicator with algorithm chip, key-source chip (KMS / customer-managed / vault) and rotated-on timestamp.",
}

export default function EncryptionAtRestIndicatorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Encryption at rest"
        title="Encryption at rest indicator"
        description="Compact card showing what protects the snapshot bytes — algorithm, key source and last rotation. Tone shifts on key source so KMS, customer-managed and vault keys are visually distinct."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Encryption at rest" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen production keys</span>
        <div className={styles.miniGrid}>
          <EncryptionAtRestIndicator info={ENCRYPTION} />
          <EncryptionAtRestIndicator
            info={{
              algorithm: "chacha20_poly1305",
              keySource: "customer_managed",
              rotatedAt: "2026-04-12T00:00:00Z",
              keyLabel: "mufflermen-cmek-2026-q2",
            }}
          />
          <EncryptionAtRestIndicator
            info={{
              algorithm: "aes_256_cbc",
              keySource: "vault",
              rotatedAt: "2026-03-20T00:00:00Z",
              keyLabel: "vault://backups/cms-media",
            }}
          />
        </div>
      </section>
    </main>
  )
}
