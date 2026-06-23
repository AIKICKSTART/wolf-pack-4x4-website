import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OauthAppCard } from "../../components/api-console"
import { OAUTH_APPS } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "OAuth app card | API Console",
  description:
    "Primitive 13 — OAuth app card with client name, masked client id, redirect URIs, scopes, and status.",
}

export default function OauthAppCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / OAuth app"
        title="OAuth application cards"
        description="A summary card per OAuth client — display name, an optional short description, the masked client id with copy button, every approved redirect URI, the granted scope set, and the lifecycle status (live, draft, suspended)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "OAuth app card" },
        ]}
      />
      <section className={styles.stack} aria-label="OAuth applications">
        {OAUTH_APPS.map((app) => (
          <OauthAppCard
            key={app.clientName}
            clientName={app.clientName}
            clientIdMasked={app.clientIdMasked}
            description={app.description}
            redirectUris={app.redirectUris}
            scopes={app.scopes}
            status={app.status}
          />
        ))}
      </section>
    </main>
  )
}
