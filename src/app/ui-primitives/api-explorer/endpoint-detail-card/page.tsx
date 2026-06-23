import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EndpointDetailCard } from "../../components/api-explorer"
import { ENDPOINT_CREATE_QUOTE, ENDPOINT_LIST_PARTS } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Endpoint detail card | API Explorer",
  description:
    "Primitive 02 — endpoint detail with method/path/auth/version. Three states: stable, with path params, deprecated.",
}

export default function EndpointDetailCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Endpoint detail card"
        title="Endpoint detail card"
        description="The hero card for a selected endpoint — method chip, full path, summary, description, auth chip with signature popover, and optional path-parameter reference."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Endpoint detail card" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Stable endpoint">
        <span className={styles.sectionLabel}>State 01 / Stable endpoint</span>
        <EndpointDetailCard
          method={ENDPOINT_LIST_PARTS.method}
          path={ENDPOINT_LIST_PARTS.path}
          summary={ENDPOINT_LIST_PARTS.summary}
          description={ENDPOINT_LIST_PARTS.description}
          version={ENDPOINT_LIST_PARTS.version}
          auth={ENDPOINT_LIST_PARTS.auth}
          tag={ENDPOINT_LIST_PARTS.tag}
        />
      </section>

      <section className={styles.routeSection} aria-label="With path params">
        <span className={styles.sectionLabel}>State 02 / Path parameters</span>
        <EndpointDetailCard
          method="PATCH"
          path="/v1/bookings/{id}/status"
          summary="Transition booking status"
          description="Move a workshop booking through the state machine. Transitions are validated against the current state — invalid moves return 422."
          version="v1 stable"
          auth="bearer"
          tag="Bookings"
          pathParams={[
            { name: "id", description: "Booking identifier (e.g. bkg_2026_0489)." },
            { name: "status", description: "Target state: accepted, in_progress, ready_for_pickup, completed." },
          ]}
        />
      </section>

      <section className={styles.routeSection} aria-label="Deprecated endpoint">
        <span className={styles.sectionLabel}>State 03 / Deprecated</span>
        <EndpointDetailCard
          method="POST"
          path="/v0/quote"
          summary="Legacy quote endpoint"
          description="The 2018 quote endpoint, retained for the old garage tablet image. Returns the same shape as v1 but does not include line items."
          version="v0 legacy"
          auth="basic"
          tag="Quotes"
          deprecated
        />
      </section>

      <aside className={styles.note}>
        <span>Reuse note</span>
        <p>
          The auth chip popover comes straight from api-console — no fork required. Deprecated
          endpoints inherit the hatched background pattern.
        </p>
      </aside>

      <section className={styles.routeSection} aria-label="Compact create quote">
        <span className={styles.sectionLabel}>Bonus / Create quote</span>
        <EndpointDetailCard
          method={ENDPOINT_CREATE_QUOTE.method}
          path={ENDPOINT_CREATE_QUOTE.path}
          summary={ENDPOINT_CREATE_QUOTE.summary}
          description={ENDPOINT_CREATE_QUOTE.description}
          version={ENDPOINT_CREATE_QUOTE.version}
          auth={ENDPOINT_CREATE_QUOTE.auth}
          tag={ENDPOINT_CREATE_QUOTE.tag}
        />
      </section>
    </main>
  )
}
