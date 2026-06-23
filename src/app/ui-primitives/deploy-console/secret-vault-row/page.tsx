import type { Metadata } from "next"

import { SecretVaultRow } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { SECRETS } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Secret vault row | Deploy console",
  description:
    "Primitive 02 — secret row with reveal / copy / rotate controls and a rotation countdown.",
}

export default function SecretVaultRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Vault row"
        title="Secret vault row"
        description="One row per managed secret. Always masked by default — reveal is an explicit press, copy lands the cleartext on the clipboard, rotate kicks the rotation flow. Vendor caption, last-accessed timestamp and a tone-shifting rotation-window countdown bar."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Secret vault row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · ageing Stripe live key · rotation available</span>
        <SecretVaultRow entry={SECRETS[1]} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · expiring Replicate token · 4 days remaining</span>
        <SecretVaultRow entry={SECRETS[2]} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · expired OpenAI key · vendor rotation overdue</span>
        <SecretVaultRow entry={SECRETS[3]} />
      </section>
    </main>
  )
}
