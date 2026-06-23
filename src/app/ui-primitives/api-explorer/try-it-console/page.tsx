import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TryItConsole } from "../../components/api-explorer"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Try-it console | API Explorer",
  description:
    "Primitive 03 — request builder. Three states: empty GET, POST with body, sending state.",
}

export default function TryItConsolePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Try-it console"
        title="Try-it console"
        description="Postman-style request builder with method picker, URL, params / headers / body tabs, and send button. The form gets role='form' for screen-reader landmarking."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Try-it console" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Empty GET state">
        <span className={styles.sectionLabel}>State 01 / Empty GET</span>
        <TryItConsole
          defaultMethod="GET"
          defaultUrl="https://api.muffler.men/v1/parts"
          defaultParams={[
            { id: "p-limit", name: "limit", value: "25" },
            { id: "p-cursor", name: "cursor", value: "" },
          ]}
        />
      </section>

      <section className={styles.routeSection} aria-label="POST with body">
        <span className={styles.sectionLabel}>State 02 / POST with body</span>
        <TryItConsole
          defaultMethod="POST"
          defaultUrl="https://api.muffler.men/v1/quotes"
          defaultBody={JSON.stringify(
            {
              registration: "OAK-194",
              service: "muffler_swap",
              vehicle: { make: "Falcon", model: "XR6", year: 2008 },
            },
            null,
            2,
          )}
        />
      </section>

      <section className={styles.routeSection} aria-label="Sending state">
        <span className={styles.sectionLabel}>State 03 / Sending</span>
        <TryItConsole
          defaultMethod="POST"
          defaultUrl="https://api.muffler.men/v1/bookings"
          defaultBody={JSON.stringify(
            { quote_id: "qte_2026_0512", slot: "2026-05-30T13:00:00+10:00" },
            null,
            2,
          )}
          sending
        />
      </section>

      <aside className={styles.note}>
        <span>A11y note</span>
        <p>
          The form root carries <code>role=&quot;form&quot;</code> + aria-label. Tabs use
          aria-selected and bind aria-controls to the panel. Inputs ship with explicit
          aria-labels rather than implicit placeholders.
        </p>
      </aside>
    </main>
  )
}
