import type { Metadata } from "next"

import { TemplatePickGrid } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import { TEMPLATES } from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Template picker | System onboarding",
  description:
    "Primitive 09 — starter template picker. Three states: workshop selected (recommended), parts retailer chosen, and fleet manager chosen.",
}

export default function TemplatePickGridScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Starter / Templates"
        title="Template pick grid"
        description="A 3-up starter template chooser — Workshop / Parts retailer / Fleet manager — for the new tenant. The template seeds the workspace with sensible defaults so they don't start from zero."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Template picker" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Workshop — recommended for Illawarra TB</span>
        <TemplatePickGrid
          kicker="Starter · Templates"
          title="Pick a starter template"
          description="We'll pre-seed your Mufflermen workspace with sensible defaults for the kind of business you run. You can change template later, but the migration is destructive."
          templates={TEMPLATES}
          selectedId="tpl-workshop"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Parts retailer — selected over the recommendation</span>
        <TemplatePickGrid
          kicker="Starter · Templates"
          title="Pick a starter template"
          description="You've gone with the parts retailer template — Shopify sync is on, trade pricing tiers are live, and bay scheduling is hidden until you flip it back on."
          templates={TEMPLATES}
          selectedId="tpl-parts"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Fleet manager — selected over the recommendation</span>
        <TemplatePickGrid
          kicker="Starter · Templates"
          title="Pick a starter template"
          description="Fleet template selected. Driver-licence + rego-expiry alerts are armed and the pre-trip checklist is wired to ADR fleet rules."
          templates={TEMPLATES}
          selectedId="tpl-fleet"
        />
      </section>
    </main>
  )
}
