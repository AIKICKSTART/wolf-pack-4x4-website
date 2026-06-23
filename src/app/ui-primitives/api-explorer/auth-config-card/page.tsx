import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AuthConfigCard } from "../../components/api-explorer"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Auth config card | API Explorer",
  description:
    "Primitive 07 — API key, bearer, or OAuth credentials with test-connection button. Three states: idle, success, failure.",
}

export default function AuthConfigCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Auth config card"
        title="Auth config card"
        description="A focused card for configuring one credential at a time — API key, bearer token, or OAuth client secret — with a reveal toggle, hint copy, and a connection-test affordance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Auth config card" },
        ]}
      />

      <section className={styles.gridTwo} aria-label="Auth config states">
        <div className={styles.routeSection}>
          <span className={styles.sectionLabel}>State 01 / Idle</span>
          <AuthConfigCard
            strategy="bearer"
            label="Live workshop bearer"
            credential="mfm_live_sk_2026_7af2_8810_a91d_0c8a"
            hint="Bearer tokens are scoped to the workshop. Rotate quarterly via the API key vault."
          />
        </div>

        <div className={styles.routeSection}>
          <span className={styles.sectionLabel}>State 02 / Success</span>
          <AuthConfigCard
            strategy="api-key"
            label="Warehouse scanner API key"
            credential="mfm_pk_live_warehouse_4c20"
            testState="success"
            testMessage="Connection verified — 184ms"
            hint="API keys authorise read-only access by default."
          />
        </div>

        <div className={styles.routeSection}>
          <span className={styles.sectionLabel}>State 03 / Failure</span>
          <AuthConfigCard
            strategy="oauth"
            label="Mobile mechanic OAuth client"
            credential="oauth_secret_2026_04d1_revoked"
            testState="failure"
            testMessage="401 invalid_token"
            hint="The configured client secret was revoked on 2026-05-12. Generate a new one."
          />
        </div>
      </section>

      <aside className={styles.note}>
        <span>Reuse note</span>
        <p>
          The auth method chip reuses the api-console primitive. The reveal toggle stores
          state locally — pair with the connectors/api-key-vault-row if you need persisted
          secrets.
        </p>
      </aside>
    </main>
  )
}
