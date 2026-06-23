import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MappingTemplateCard } from "../../components/data-import"
import { MAPPING_TEMPLATES } from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Mapping template card | Data import",
  description:
    "Primitive 12 — Mapping template card: name, saved-mappings chip, apply CTA.",
}

export default function MappingTemplateCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Mapping template card"
        title="Mapping template card"
        description="Saved mapping configurations — pick the one that matches the file you uploaded and apply it. Operators keep one template per recurring import."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Mapping template card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Saved templates</span>
        <div className={styles.demoColumns}>
          {MAPPING_TEMPLATES.map((template) => (
            <MappingTemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>
    </main>
  )
}
