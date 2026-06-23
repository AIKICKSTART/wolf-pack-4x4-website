import type { Metadata } from "next"

import { CampaignTemplateChooser } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_TEMPLATES } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Campaign template chooser | Marketing campaigns",
  description:
    "Primitive 12 — library and private template grid with previews, channel chips and clone CTA.",
}

export default function TemplateChooserScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Campaign template chooser"
        title="Campaign template chooser"
        description="Browse the shared library and your private template clones. Each tile shows a preview thumbnail, channel chips, and a clone CTA. Use as the starting surface in the campaign cockpit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Template chooser" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <CampaignTemplateChooser
          templates={DEMO_TEMPLATES}
          defaultTab="library"
        />
      </section>
    </main>
  )
}
