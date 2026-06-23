import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { IntegrationHealthTile } from "../../components/connectors"

import {
  HEALTH_SHOPIFY,
  HEALTH_STRIPE,
  HEALTH_TWILIO,
} from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Integration health tile | Connectors",
  description:
    "Primitive 06 — integration tile with status, last-sync, error rate and trend sparkline.",
}

export default function IntegrationHealthTileScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Tile"
        title="Integration health tile"
        description="Per-provider health tile — current status chip, last-sync delta, current error rate and a 10-sample error-rate trend sparkline. Three live states — connected (Stripe), warning (Twilio drift) and error (Shopify outage)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Integration health tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three states · connected / warning / error</span>
        <div className={styles.demoTriple}>
          <IntegrationHealthTile {...HEALTH_STRIPE} />
          <IntegrationHealthTile {...HEALTH_TWILIO} />
          <IntegrationHealthTile {...HEALTH_SHOPIFY} />
        </div>
      </section>
    </main>
  )
}
