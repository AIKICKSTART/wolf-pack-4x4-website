import type { Metadata } from "next"

import { FlagCard } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Flag card | Feature flags",
  description:
    "Primitive 01 — flag card with environment chips, toggle, variant chips, last-modified + owner meta.",
}

export default function FlagCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Card"
        title="Flag card"
        description="Workhorse flag list row. Each card shows the flag key, tone-coded environment chips with status dots (Development teal, Staging amber, Production red), an on/off toggle backed by role=switch + aria-checked, optional variant chips for A/B/C splits and a last-modified strip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Flag card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · two cards · toggle interaction</span>
        <div className={styles.demoSplit}>
          <FlagCard
            name="Instant pricing on quotes"
            flagKey="quote-instant-pricing"
            description="When on, the quote builder calls the pricing engine on each line edit instead of waiting for save."
            initialOn
            environments={[
              { env: "dev", status: "on" },
              { env: "staging", status: "on" },
              { env: "prod", status: "ramping" },
            ]}
            variants={[
              { id: "v-a", name: "Control", weight: 50 },
              { id: "v-b", name: "Live preview", weight: 50 },
            ]}
            lastModified="2026-05-27 14:31"
            owner="Jess R · Booking"
          />
          <FlagCard
            name="3D parts viewer"
            flagKey="parts-3d-viewer"
            description="Switches the parts detail surface from the flat carousel to the new GLB / WebGL viewer."
            initialOn={false}
            environments={[
              { env: "dev", status: "on" },
              { env: "staging", status: "off" },
              { env: "prod", status: "killed" },
            ]}
            lastModified="2026-05-26 09:12"
            owner="Marcus P · Parts"
          />
        </div>
      </section>
    </main>
  )
}
