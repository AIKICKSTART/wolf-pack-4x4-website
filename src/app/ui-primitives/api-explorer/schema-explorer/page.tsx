import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SchemaExplorer } from "../../components/api-explorer"
import type { SchemaNode } from "../../components/api-explorer"
import { QUOTE_SCHEMA } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Schema explorer | API Explorer",
  description:
    "Primitive 05 — JSON schema tree viewer. Three states: nested quote schema, enum-only request, primitive root.",
}

const ENUM_REQUEST: SchemaNode = {
  name: "TransitionRequest",
  type: "object",
  required: true,
  children: [
    {
      name: "status",
      type: "string",
      required: true,
      description: "Target booking state.",
      enumValues: ["accepted", "in_progress", "ready_for_pickup", "completed"],
    },
    {
      name: "note",
      type: "string",
      required: false,
      description: "Optional comment captured on the audit trail.",
      example: "Customer ready for early pickup.",
    },
  ],
}

const PRIMITIVE_ROOT: SchemaNode = {
  name: "WorkshopBalance",
  type: "number",
  description: "Account balance in AUD for the authenticated workshop.",
  required: true,
  example: "1428.50",
  format: "decimal",
}

export default function SchemaExplorerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Schema explorer"
        title="Schema explorer"
        description="A JSON schema tree viewer with required/type/format chips, enum lists, and an example value column. Branches collapse with aria-expanded so screen readers track state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Schema explorer" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Nested quote schema">
        <span className={styles.sectionLabel}>State 01 / Nested quote schema</span>
        <SchemaExplorer root={QUOTE_SCHEMA} />
      </section>

      <section className={styles.routeSection} aria-label="Enum-driven request">
        <span className={styles.sectionLabel}>State 02 / Enum-driven request</span>
        <SchemaExplorer root={ENUM_REQUEST} />
      </section>

      <section className={styles.routeSection} aria-label="Primitive root">
        <span className={styles.sectionLabel}>State 03 / Primitive root</span>
        <SchemaExplorer root={PRIMITIVE_ROOT} />
      </section>

      <aside className={styles.note}>
        <span>Reuse note</span>
        <p>
          The tree intentionally avoids the full JSON-Schema vocabulary — only the fields docs
          actually render. Pair with the response viewer&apos;s tree for end-to-end docs ↔ response
          parity.
        </p>
      </aside>
    </main>
  )
}
