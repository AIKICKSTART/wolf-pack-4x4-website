import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ApiExplorerPlayground } from "../../components/api-console"
import { EXPLORER_RESPONSE } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "API explorer playground | API Console",
  description:
    "Primitive 09 — Postman-style request builder with method, URL, params, headers, body, and live response viewer.",
}

export default function ApiExplorerPlaygroundPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Explorer"
        title="API explorer playground"
        description="A Postman-style builder for the Mufflermen API — method picker, URL bar, send button, three tabs for params / headers / body, and a response panel that fills in once you send. State is local so it's a single self-contained primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Explorer" },
        ]}
      />
      <ApiExplorerPlayground
        defaultMethod="GET"
        defaultUrl="https://api.muffler.men/v1/quotes?cursor=qte_2026_0509"
        response={EXPLORER_RESPONSE}
      />
    </main>
  )
}
