import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WebhookSigningSecretRow } from "../../components/api-console"
import { SIGNING_SECRETS } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Webhook signing secret row | API Console",
  description:
    "Primitive 14 — signing secret row with masked secret, algorithm chip, rotate, and last-rotation date.",
}

export default function WebhookSigningSecretRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Signing secret"
        title="Webhook signing secrets"
        description="One row per signing key — label, scope description, masked secret with copy, the algorithm chip (HMAC-SHA256, HMAC-SHA512, RSA-SHA256, Ed25519), the last rotation date, and a rotate action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Signing secret row" },
        ]}
      />
      <section className={styles.stack} role="list" aria-label="Webhook signing secrets">
        {SIGNING_SECRETS.map((secret) => (
          <WebhookSigningSecretRow
            key={secret.label}
            label={secret.label}
            maskedSecret={secret.maskedSecret}
            algorithm={secret.algorithm}
            lastRotatedAt={secret.lastRotatedAt}
            scopeDescription={secret.scopeDescription}
          />
        ))}
      </section>
    </main>
  )
}
