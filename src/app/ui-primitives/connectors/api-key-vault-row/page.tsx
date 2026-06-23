import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ApiKeyVaultRow } from "../../components/connectors"

import {
  VAULT_OPENAI,
  VAULT_REPLICATE,
  VAULT_STRIPE,
} from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "API key vault row | Connectors",
  description:
    "Primitive 02 — keyed credential row with masked secret preview, rotation cadence and reveal / rotate strip.",
}

export default function ApiKeyVaultRowScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Row"
        title="API key vault row"
        description="Symbolic key name, masked secret preview (asterisks with last-four visible), rotation cadence, days-until-due countdown and reveal / copy / rotate actions. Three live states — healthy (STRIPE_SECRET_KEY), warning (REPLICATE_API_TOKEN due) and overdue (OPENAI_API_KEY)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "API key vault row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three rotation states · healthy / warning / overdue</span>
        <div className={styles.demoStack}>
          <ApiKeyVaultRow {...VAULT_STRIPE} />
          <ApiKeyVaultRow {...VAULT_REPLICATE} />
          <ApiKeyVaultRow {...VAULT_OPENAI} />
        </div>
      </section>
    </main>
  )
}
