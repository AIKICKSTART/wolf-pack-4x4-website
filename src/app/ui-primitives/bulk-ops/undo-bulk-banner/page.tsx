import type { Metadata } from "next"

import { UndoBulkBanner } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Undo banner | Bulk operations",
  description:
    "Primitive 08 — floating undo banner shown after a bulk action completes, with a countdown ring and undo CTA.",
}

export default function UndoBulkBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Bulk"
        title="Undo bulk banner"
        description="A polite banner that surfaces immediately after a bulk action finishes. A countdown ring shows the soft window before changes commit and operators can revert with one tap."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Undo banner" },
        ]}
      />
      <section
        className={styles.demoSurface}
        style={{ display: "grid", justifyItems: "center" }}
      >
        <span className={styles.demoLabel}>Live primitive — 7 seconds remaining</span>
        <UndoBulkBanner
          resourceLabel="quotes"
          affectedCount={237}
          pastTenseAction="archived"
          staticCountdown={7}
          countdownSeconds={10}
        />
      </section>
    </main>
  )
}
