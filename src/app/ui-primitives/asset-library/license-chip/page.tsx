import type { Metadata } from "next"

import { LicenseChip } from "../../components/asset-library"
import type { LicenseType } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "License chip | Asset Library",
  description:
    "Primitive 05 — license chip variants (CC0, CC-BY, Proprietary, Royalty-free, Editorial only) with QuoteBubble tooltips.",
}

const LICENSES: ReadonlyArray<LicenseType> = [
  "cc0",
  "cc-by",
  "royalty-free",
  "proprietary",
  "editorial-only",
]

export default function LicenseChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / License"
        title="License chip"
        description="A small, tone-coded chip that communicates an asset's usage rights at a glance. Hover the chip-with-tooltip variant below to see the QuoteBubble explanation that accompanies each license."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "License chip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Without tooltip</span>
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {LICENSES.map((license) => (
            <LicenseChip key={license} license={license} />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>With tooltip (QuoteBubble)</span>
        <div
          style={{
            display: "grid",
            gap: 28,
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            paddingTop: 30,
          }}
        >
          {LICENSES.map((license) => (
            <div key={license} style={{ paddingTop: 24 }}>
              <LicenseChip license={license} showTooltip />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
