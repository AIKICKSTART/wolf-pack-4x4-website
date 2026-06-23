import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AuditTrailRow } from "../../components/connectors"

import { AUDIT_ENTRIES } from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Audit trail row | Connectors",
  description:
    "Primitive 14 — connector audit entry for connect / disconnect / rotate / sync.",
}

const HUMAN_ENTRIES = AUDIT_ENTRIES.filter((entry) => entry.actor !== "Hermes Bot").slice(0, 3)
const BOT_ENTRY = AUDIT_ENTRIES.filter((entry) => entry.actor === "Hermes Bot")

export default function AuditTrailRowScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Row"
        title="Audit trail row"
        description="Per-action audit row — action chip, connector, actor avatar + IP, timestamp and optional note line. Three live states — humans only (Daniel + Sam), bot-driven (Hermes replay) and a full mixed feed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Audit trail row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · humans only (rotate / connect / scope-change)</span>
        <div className={styles.demoStack}>
          {HUMAN_ENTRIES.map((entry, index) => (
            <AuditTrailRow
              key={`${entry.action}-${entry.connector}-${index}`}
              {...entry}
            />
          ))}
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · bot-driven (Hermes webhook replay)</span>
        <div className={styles.demoStack}>
          {BOT_ENTRY.map((entry, index) => (
            <AuditTrailRow
              key={`bot-${entry.action}-${index}`}
              {...entry}
            />
          ))}
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · full mixed feed (human + bot, 6 events)</span>
        <div className={styles.demoStack}>
          {AUDIT_ENTRIES.map((entry, index) => (
            <AuditTrailRow
              key={`all-${entry.action}-${entry.connector}-${index}`}
              {...entry}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
