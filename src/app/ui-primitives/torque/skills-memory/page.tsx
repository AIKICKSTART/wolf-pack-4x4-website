import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuickGlanceRow } from "../../components/admin-hub/quick-glance-row"
import type { GlanceMetric } from "../../components/admin-hub/admin-hub-types"

import { MemoryBrowser } from "./_memory-browser"
import { SkillsCatalog } from "./_skills-catalog"
import styles from "./skills-memory.module.css"
import {
  ASSISTANT_ROLE,
  BUSINESS_NAME,
  BUSINESS_REGION,
  GLANCE_STATS,
} from "./_demo-data"

// Internal note: clean-room parity build of the legacy assistant console; no
// legacy product codename is exposed in any customer-visible copy.

export const metadata: Metadata = {
  title: "Skills & memory | Torque — Oak Flats Muffler Men",
  description:
    "The Oak Flats Muffler Men skills catalog and memory browser — the workshop and marketing tools the Torque assistant can run, and the knowledge facts it has learned with their source, read scope and confidence. Composed entirely from registered UI primitives.",
}

const GLANCE_METRICS: ReadonlyArray<GlanceMetric> = GLANCE_STATS.map((stat) => ({
  id: stat.id,
  label: stat.label,
  value: stat.value,
  unit: stat.unit,
  delta: stat.delta,
  direction: stat.direction,
  tone: stat.tone,
}))

export default function SkillsMemoryPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Skills & memory"
        title="Skills & memory"
        description="The tools Torque can run for the workshop and the things it has learned about the business. Switch skills on or off, see the permission scopes each one holds, and review every memory fact with its source, who can read it, and how sure the assistant is. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Skills & memory" },
        ]}
      />

      <section className={styles.identityBand} aria-label="Assistant identity">
        <span className={styles.torqueAvatar} aria-hidden="true">
          <span>T</span>
        </span>
        <span className={styles.identityText}>
          <span className={styles.torqueName}>Torque · Skills &amp; memory</span>
          <span className={styles.identityRole}>{ASSISTANT_ROLE}</span>
          <span className={styles.identityBiz}>
            {BUSINESS_NAME} · {BUSINESS_REGION}
          </span>
        </span>
      </section>

      <QuickGlanceRow metrics={GLANCE_METRICS} label="Catalog at a glance" />

      <div className={styles.columns}>
        <SkillsCatalog />
        <MemoryBrowser />
      </div>
    </main>
  )
}
