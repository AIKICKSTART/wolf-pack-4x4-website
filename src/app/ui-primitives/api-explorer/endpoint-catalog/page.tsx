import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EndpointCatalog } from "../../components/api-explorer"
import { ENDPOINT_LIST_PARTS, ENDPOINTS } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Endpoint catalogue | API Explorer",
  description:
    "Primitive 01 — searchable endpoint list grouped by tag with method chips. Three states: default, selection, and empty filter.",
}

const EMPTY: ReadonlyArray<typeof ENDPOINTS[number]> = []

export default function EndpointCatalogPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Endpoint catalogue"
        title="Endpoint catalogue"
        description="Searchable list of endpoints grouped by tag. Method chips colour-code GET/POST/PATCH/DELETE. Selection drives the detail panel on the composed explorer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Endpoint catalogue" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Default state">
        <span className={styles.sectionLabel}>State 01 / Default catalogue</span>
        <EndpointCatalog endpoints={ENDPOINTS} />
      </section>

      <section className={styles.routeSection} aria-label="Selected state">
        <span className={styles.sectionLabel}>State 02 / Selection</span>
        <EndpointCatalog
          endpoints={ENDPOINTS}
          selectedId={ENDPOINT_LIST_PARTS.id}
        />
      </section>

      <section className={styles.routeSection} aria-label="Empty state">
        <span className={styles.sectionLabel}>State 03 / Empty result</span>
        <EndpointCatalog endpoints={EMPTY} />
      </section>

      <aside className={styles.note}>
        <span>Reuse note</span>
        <p>
          The method chip palette mirrors the api-console endpoint card. Selection state is
          driven externally so a parent surface can sync filters in the URL.
        </p>
      </aside>
    </main>
  )
}
