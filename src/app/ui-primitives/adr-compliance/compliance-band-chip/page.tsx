import type { Metadata } from "next"

import { ComplianceBandChip } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Compliance band chip | ADR compliance",
  description:
    "Primitive 02 — tone-shifting compliance band chip for legal / borderline / over-limit sound readings.",
}

export default function ComplianceBandChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Tone chip"
        title="Compliance band chip"
        description="Compact chip + waveform glyph that maps a measured dB(A) into one of three bands — Legal (≤90 dB), Borderline (90–92 dB), Over (>92 dB) — and shifts tone + label + glyph amplitude accordingly. role='alert' is set on the over band for assistive technology."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Compliance band chip" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three states</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-4)" }}>
          <ComplianceBandChip band="legal" />
          <ComplianceBandChip band="borderline" />
          <ComplianceBandChip band="over" />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Custom labels</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-4)" }}>
          <ComplianceBandChip band="legal" label="84 dB · Legal" />
          <ComplianceBandChip band="borderline" label="91 dB · Borderline" />
          <ComplianceBandChip band="over" label="94 dB · Over limit" />
        </div>
      </section>
    </main>
  )
}
