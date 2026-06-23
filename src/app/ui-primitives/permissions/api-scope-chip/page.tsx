import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ApiScopeChip } from "../../components/permissions"

import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "API scope chip | Permissions",
  description:
    "Primitive 11 — compact API scope chip with hover tooltip describing what the scope grants.",
}

const SCOPES: ReadonlyArray<{ scope: string; description: string }> = [
  { scope: "workshop.read", description: "Read jobs, quotes, parts and invoices across all workshops." },
  { scope: "workshop.write", description: "Create and edit jobs, quotes and parts (no approval rights)." },
  { scope: "quotes.approve", description: "Mark a quote as approved. Capped at $4,000 unless owner." },
  { scope: "parts.write", description: "Receive new stock, edit SKU details and adjust inventory." },
  { scope: "billing.admin", description: "Manage invoices, send statements and export accounting batches." },
  { scope: "users.invite", description: "Invite teammates to the workspace and pre-assign their role." },
  { scope: "users.delete", description: "Permanently remove a user and revoke all their sessions." },
  { scope: "audit.read", description: "Read the audit trail for the workspace, including expanded payloads." },
]

export default function ApiScopeChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / API scope chip"
        title="API scope chip"
        description="Lives wherever a developer touches the API — token detail, integration setup, audit row. Tone is inferred from the trailing action (read = teal, write = amber, admin / delete = red). Hover the chip to read a plain-language description."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "API scope chip" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Read · write · admin tones</span>
        <div className={styles.demoInline}>
          {SCOPES.map((entry) => (
            <ApiScopeChip
              key={entry.scope}
              scope={entry.scope}
              description={entry.description}
            />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Selectable variant — pick the scopes a token gets</span>
        <div className={styles.demoInline}>
          <ApiScopeChip as="button" selected scope="workshop.read" description="Selected — token can read all workshop data." />
          <ApiScopeChip as="button" selected scope="parts.write" description="Selected — token can update inventory." />
          <ApiScopeChip as="button" scope="quotes.approve" description="Not granted." />
          <ApiScopeChip as="button" scope="billing.admin" description="Not granted." />
        </div>
      </section>
    </main>
  )
}
