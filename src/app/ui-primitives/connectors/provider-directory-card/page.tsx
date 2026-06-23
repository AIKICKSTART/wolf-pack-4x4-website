import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ProviderDirectoryCard } from "../../components/connectors"

import { PROVIDER_DIRECTORY } from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Provider directory card | Connectors",
  description:
    "Primitive 09 — provider catalog card with category, install count and installed badge.",
}

const INSTALLED = PROVIDER_DIRECTORY.filter((entry) => entry.installed)
const AVAILABLE = PROVIDER_DIRECTORY.filter((entry) => !entry.installed)

export default function ProviderDirectoryCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Card"
        title="Provider directory card"
        description="Catalog entry for a provider — logo monogram, one-line description, category chip, install count and an installed / available status pill. Three live states — installed, available and a 6-card full catalogue grid."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Provider directory card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · installed (Stripe, Shopify, Xero, Replicate)</span>
        <div className={styles.demoTriple}>
          {INSTALLED.map((entry) => (
            <ProviderDirectoryCard key={entry.provider} {...entry} />
          ))}
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · available (Twilio, Cloudflare R2)</span>
        <div className={styles.demoTriple}>
          {AVAILABLE.map((entry) => (
            <ProviderDirectoryCard key={entry.provider} {...entry} />
          ))}
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · full catalogue (6 providers)</span>
        <div className={styles.demoTriple}>
          {PROVIDER_DIRECTORY.map((entry) => (
            <ProviderDirectoryCard key={entry.provider} {...entry} />
          ))}
        </div>
      </section>
    </main>
  )
}
