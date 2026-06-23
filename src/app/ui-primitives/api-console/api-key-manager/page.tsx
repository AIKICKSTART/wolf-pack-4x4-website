import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ApiKeyManager } from "../../components/api-console"
import { API_KEYS, AVAILABLE_SCOPES } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "API key manager | API Console",
  description:
    "Primitive 02 — full API key management surface with list, create, rotate, revoke, scopes editor, and last-used metadata.",
}

export default function ApiKeyManagerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / API key manager"
        title="API key manager"
        description="The full key lifecycle on one surface — list, create with scope selection, rotate, revoke, edit scopes inline, and surface created / last-used / auto-rotate metadata. Revoked keys retain their record but render dimmed and disabled."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "API key manager" },
        ]}
      />
      <ApiKeyManager keys={API_KEYS} availableScopes={AVAILABLE_SCOPES} />
    </main>
  )
}
