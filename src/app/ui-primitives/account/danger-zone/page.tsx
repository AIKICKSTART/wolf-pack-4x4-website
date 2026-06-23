import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DangerActionCard } from "../../components/account/danger-action-card"

import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "Danger zone · Account | UI Primitives",
}

export default function AccountDangerZonePage() {
  return (
    <>
      <PageHeader
        kicker="18.10 / Danger zone"
        title="Danger zone"
        description="High-blast-radius operations. Every action here requires a typed confirmation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "Danger zone" },
        ]}
      />

      <DangerActionCard
        title="Transfer ownership"
        description="Hand the Oak Flats workspace to another admin. Your role drops to admin afterwards."
        confirmationPhrase="TRANSFER OAK FLATS"
        actionLabel="Transfer ownership"
        tone="warning"
        icon="users"
        consequences={[
          "The new owner inherits billing responsibility immediately.",
          "Any pending invoices remain unpaid until accepted by the new owner.",
          "You can be re-promoted to owner only by the new owner.",
        ]}
        helperText="The exact phrase above is required and is case-sensitive."
      />

      <DangerActionCard
        title="Export workspace data"
        description="Produce a one-time JSON + media bundle of every bay, quote, customer and invoice."
        confirmationPhrase="EXPORT WORKSHOP"
        actionLabel="Generate export"
        tone="warning"
        icon="download"
        consequences={[
          "Export bundles are kept for 14 days and require a workspace-owner login to download.",
          "Generating the export does not affect any live workshop data.",
        ]}
      />

      <DangerActionCard
        title="Regenerate signing keys"
        description="Rotate the JWT signing pair used by the workshop API and tablet sync."
        confirmationPhrase="ROTATE WORKSHOP KEYS"
        actionLabel="Regenerate keys"
        tone="critical"
        icon="key"
        consequences={[
          "Every active session is invalidated and bay tablets will need to re-pair.",
          "Every API token continues to work, but JWT verification cycles to the new pair.",
          "Cannot be undone — old keys are destroyed at rotation.",
        ]}
        helperText="Do this only after suspected key compromise."
      />

      <DangerActionCard
        title="Delete workspace"
        description="Permanently remove the Oak Flats workspace, all bays, quotes, customers, and invoices."
        confirmationPhrase="DELETE OAK FLATS MUFFLERMEN"
        actionLabel="Delete workspace forever"
        tone="critical"
        icon="trash"
        consequences={[
          "Removes 3 bays, 12 operators, and 4,800 historical quotes.",
          "Audit log retention is voided. Compliance exports must be downloaded first.",
          "Billing is finalised immediately. No prorated refund will be issued.",
          "Workspace name becomes available to any future signup after 30 days.",
        ]}
        helperText="This action cannot be reversed by support."
      />

      <span className={styles.notice}>
        Visual reference only — these confirmations do not delete real data
      </span>
    </>
  )
}
