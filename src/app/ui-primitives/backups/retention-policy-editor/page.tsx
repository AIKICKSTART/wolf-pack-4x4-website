import type { Metadata } from "next"

import { RetentionPolicyEditor } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { RETENTION_RULES } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Retention policy editor | Backups",
  description:
    "Primitive 05 — Editor for Keep-last-N retention rules across daily / weekly / monthly / yearly tiers, with optional tier-mover.",
}

export default function RetentionPolicyEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Retention policy editor"
        title="Retention policy editor"
        description="Keep-last-N rules for daily, weekly, monthly and yearly snapshot tiers. Each tier has an optional tier-mover that lets you push older snapshots into a cheaper storage class instead of deleting them."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Retention policy editor" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen default retention</span>
        <RetentionPolicyEditor rules={RETENTION_RULES} />
      </section>
    </main>
  )
}
