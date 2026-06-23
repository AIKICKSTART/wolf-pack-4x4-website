import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ScopePermissionGrid } from "../../components/connectors"

import { SCOPE_GRID_DATA } from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Scope permission grid | Connectors",
  description:
    "Primitive 08 — granted-scope grid per OAuth provider with legend.",
}

const SMALL_GRID = {
  providers: SCOPE_GRID_DATA.providers.slice(0, 3),
  scopeRows: SCOPE_GRID_DATA.scopeRows.slice(0, 3),
  entries: SCOPE_GRID_DATA.entries.filter(
    (entry) =>
      SCOPE_GRID_DATA.providers.slice(0, 3).includes(entry.provider) &&
      SCOPE_GRID_DATA.scopeRows.slice(0, 3).some((row) => row.id === entry.id),
  ),
}

const FOCUS_GRID = {
  providers: ["Stripe", "Xero"],
  scopeRows: SCOPE_GRID_DATA.scopeRows.filter((row) =>
    ["write.payments", "read.ledger", "write.inventory"].includes(row.id),
  ),
  entries: SCOPE_GRID_DATA.entries.filter(
    (entry) =>
      ["Stripe", "Xero"].includes(entry.provider) &&
      ["write.payments", "read.ledger", "write.inventory"].includes(entry.id),
  ),
}

export default function ScopePermissionGridScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Grid"
        title="Scope permission grid"
        description="Matrix of OAuth scopes vs. providers — granted (green ✓), requested (teal ·), denied (red ✕) and not requested (—). Three live states — small (3 × 3 quick read), full audit (5 × 6) and focus (Stripe vs Xero financial scopes)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Scope permission grid" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · small (3 providers × 3 scopes)</span>
        <ScopePermissionGrid {...SMALL_GRID} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · full audit (5 providers × 6 scopes)</span>
        <ScopePermissionGrid {...SCOPE_GRID_DATA} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · focus (Stripe vs Xero financial scopes)</span>
        <ScopePermissionGrid {...FOCUS_GRID} />
      </section>
    </main>
  )
}
