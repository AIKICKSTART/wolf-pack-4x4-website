import type { Metadata } from "next"

import { ConversionFunnelCard } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_CAMPAIGN_NAME, DEMO_FUNNEL_STEPS } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Conversion funnel card | Marketing campaigns",
  description:
    "Primitive 11 — funnel bar chart Sent → Opened → Clicked → Converted with drop-off % per step.",
}

export default function ConversionFunnelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Conversion funnel card"
        title="Conversion funnel card"
        description="A primary funnel readout for a single campaign. Each step renders a bar and a drop-off chip. The end-to-end meter chip in the header acts as the live ARIA meter."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Conversion funnel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ConversionFunnelCard
          campaignName={DEMO_CAMPAIGN_NAME}
          steps={DEMO_FUNNEL_STEPS}
        />
      </section>
    </main>
  )
}
