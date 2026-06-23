import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OAuthConnectCard } from "../../components/connectors"

import {
  OAUTH_GOOGLE_CONNECTED,
  OAUTH_META_WARNING,
  OAUTH_TIKTOK_DISCONNECTED,
} from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "OAuth connect card | Connectors",
  description:
    "Primitive 01 — OAuth provider card with logo tile, granted scopes, status chip and a connect / disconnect button.",
}

export default function OAuthConnectCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Card"
        title="OAuth connect card"
        description="Provider logo tile, granted-scope chips, status chip with expiry, and a connect / disconnect button. Three live states — connected (Google), warning (Meta near-expiry) and disconnected (TikTok)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "OAuth connect card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three states · connected / warning / disconnected</span>
        <div className={styles.demoTriple}>
          <OAuthConnectCard {...OAUTH_GOOGLE_CONNECTED} scopes={OAUTH_GOOGLE_CONNECTED.scopes} />
          <OAuthConnectCard {...OAUTH_META_WARNING} scopes={OAUTH_META_WARNING.scopes} />
          <OAuthConnectCard {...OAUTH_TIKTOK_DISCONNECTED} scopes={OAUTH_TIKTOK_DISCONNECTED.scopes} />
        </div>
      </section>
    </main>
  )
}
