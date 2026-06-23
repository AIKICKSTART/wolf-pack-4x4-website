import type { Metadata } from "next"

import { PriorityFlagRow } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Priority flag row | Unified inbox primitives",
  description:
    "Primitive 06 — priority flag toggle row with four states (low / normal / high / urgent) and tone-coded chips.",
}

export default function PriorityFlagRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Priority"
        title="Priority flag row"
        description="Single-row radiogroup for priority. Toggling changes the conversation's SLA bucket and routing — urgent flags hot leads (15-minute first response), high tracks complaints and refunds, normal is the default."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Priority flag row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Normal · default state</span>
        <PriorityFlagRow defaultValue="normal" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Urgent · Karen W. quote follow-up
        </span>
        <PriorityFlagRow
          defaultValue="urgent"
          caption="Hot lead · 15-minute first response target."
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>High · Bec S. refund</span>
        <PriorityFlagRow
          defaultValue="high"
          caption="Refunds escalate to Daniel after 2 hours."
        />
      </section>
    </main>
  )
}
