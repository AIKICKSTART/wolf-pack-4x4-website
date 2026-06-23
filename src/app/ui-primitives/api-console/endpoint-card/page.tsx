import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EndpointCard } from "../../components/api-console"
import { ENDPOINTS } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Endpoint card | API Console",
  description:
    "Primitive 01 — REST endpoint card with method chip, path, description, version, auth, and try-it CTA.",
}

export default function EndpointCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Endpoint card"
        title="Endpoint cards"
        description="REST endpoint cards — method chip, full path, summary, version label, auth method chip with signature popover, and a try-it CTA. Deprecated endpoints render with a hatched background and a tag."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Endpoint card" },
        ]}
      />
      <section className={styles.stack} aria-label="Endpoint catalogue">
        {ENDPOINTS.map((endpoint) => (
          <EndpointCard
            key={`${endpoint.method}-${endpoint.path}`}
            method={endpoint.method}
            path={endpoint.path}
            description={endpoint.description}
            version={endpoint.version}
            auth={endpoint.auth}
            deprecated={endpoint.deprecated}
          />
        ))}
      </section>
    </main>
  )
}
