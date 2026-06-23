import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TemplateLibraryGrid } from "../../components/workflow-engine"

import { WORKSHOP_TEMPLATES } from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Template library grid | Workflow engine",
  description:
    "Primitive 14 — workshop workflow template grid covering quote follow-up, refund flow, welcome, recall and more.",
}

export default function TemplateLibraryGridScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Templates"
        title="Template library grid"
        description="The starting point for new workflows. Each tile is a battle-tested template — quote follow-up, roadworthy expiry SMS, refund > $200 manager flow, new customer welcome, recall hit reach-out, PDI checklist playbook. Install, edit, publish."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Template library grid" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Workshop templates · install or fork
        </span>
        <TemplateLibraryGrid templates={WORKSHOP_TEMPLATES} />
      </section>
    </main>
  )
}
