import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ToolPalette } from "../../components/hermes-agent"
import type { ToolPaletteEntry } from "../../components/hermes-agent"

import { HERMES_TOOL_PALETTE } from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Tool palette | Hermes",
  description:
    "Primitive 03 — Hermes tool palette with usage counts, latency, failure rate and sparkline trends.",
}

const ALL_DISABLED: ReadonlyArray<ToolPaletteEntry> = HERMES_TOOL_PALETTE.map(
  (entry) => ({ ...entry, enabled: false }),
)

const MINIMAL: ReadonlyArray<ToolPaletteEntry> = HERMES_TOOL_PALETTE.slice(0, 3)

export default function ToolPaletteScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Palette"
        title="Tool palette"
        description="The six tools available to Hermes — quote.estimate, parts.search, bookings.create, payment.collect, refund.process and escalate.to_human — each with 24-hour usage, p50 latency, failure rate and trend sparkline. refund.process ships disabled by default."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Tool palette" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · production palette</span>
        <ToolPalette tools={HERMES_TOOL_PALETTE} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · staging · everything disabled</span>
        <ToolPalette tools={ALL_DISABLED} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · minimal · sales-only deployment</span>
        <ToolPalette tools={MINIMAL} />
      </section>
    </main>
  )
}
