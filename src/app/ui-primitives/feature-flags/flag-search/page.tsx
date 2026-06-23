import type { Metadata } from "next"

import { FlagSearch } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Flag search | Feature flags",
  description:
    "Primitive 08 — inline flag search bar with kbd hint, owner chip filter, status chip filter and archived toggle.",
}

export default function FlagSearchScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Search"
        title="Flag search"
        description="Compact search panel pinned to the top of a flag list. Free-text query input with ⌘K hint, multi-select owner chips, single-select status filter (Any / On / Off / Ramping / Killed) and an Include archived toggle. Emits a structured search state on every change."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Flag search" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · type to query · toggle chips</span>
        <FlagSearch
          owners={[
            { id: "booking", label: "Booking" },
            { id: "parts", label: "Parts" },
            { id: "workshop", label: "Workshop" },
            { id: "compliance", label: "Compliance" },
            { id: "mobile", label: "Mobile" },
          ]}
          initialState={{
            query: "",
            ownerIds: ["booking", "parts"],
            status: "ramping",
            includeArchived: false,
          }}
        />
      </section>
    </main>
  )
}
