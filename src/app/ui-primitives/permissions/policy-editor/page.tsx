import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PolicyRuleEditor } from "../../components/permissions"

import {
  DEMO_POLICY_CONDITIONS,
  DEMO_POLICY_DEFAULT,
  DEMO_POLICY_REASONS,
  DEMO_POLICY_SUBJECTS,
  DEMO_POLICY_TRIGGERS,
} from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Policy rule editor | Permissions",
  description:
    "Primitive 14 — chip-based policy rule editor with When / on / if / then / because slots and compiled preview.",
}

export default function PolicyEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Policy rule editor"
        title="Policy rule editor"
        description="Build a policy rule by choosing each piece from a chip-style select. The compiled preview line at the bottom is the human-readable rendering of the rule, in real time. Outcome is a binary Allow / Deny toggle styled as a segmented pill."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Policy editor" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <PolicyRuleEditor
          triggers={DEMO_POLICY_TRIGGERS}
          subjects={DEMO_POLICY_SUBJECTS}
          conditions={DEMO_POLICY_CONDITIONS}
          reasons={DEMO_POLICY_REASONS}
          defaultValue={DEMO_POLICY_DEFAULT}
        />
      </section>
    </main>
  )
}
