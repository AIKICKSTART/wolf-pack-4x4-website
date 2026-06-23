import type { Metadata } from "next"

import { TriggerCard } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { QUOTES_TRIGGERS } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Trigger card | DB Admin",
  description:
    "Primitive 09 — trigger card with name, timing (BEFORE / AFTER / INSTEAD OF), event chips (INSERT / UPDATE / DELETE / TRUNCATE), function reference, and enabled toggle.",
}

export default function TriggerCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Trigger card"
        title="Trigger card"
        description="A trigger surface. The header pairs the trigger name with a timing chip (BEFORE / AFTER / INSTEAD OF) and an enabled / disabled switch. The body lists the event chips that wake the trigger (INSERT / UPDATE / DELETE / TRUNCATE) and a dashed plate names the called function."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Trigger card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — public.quotes triggers</span>
        <div className={styles.demoStack}>
          {QUOTES_TRIGGERS.map((trigger) => (
            <TriggerCard key={trigger.name} trigger={trigger} />
          ))}
        </div>
      </section>
    </main>
  )
}
