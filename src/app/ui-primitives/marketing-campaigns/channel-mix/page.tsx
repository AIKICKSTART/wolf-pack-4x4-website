import type { Metadata } from "next"

import { ChannelMixPicker } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_CHANNEL_MIX, DEMO_CHANNEL_ROWS } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Channel mix picker | Marketing campaigns",
  description:
    "Primitive 04 — Email / SMS / Push / In-app / Banner / Social chip toggles with cost and reach chips.",
}

export default function ChannelMixScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Channel mix picker"
        title="Channel mix picker"
        description="Pick which channels are active for the campaign. Each row shows cost per recipient and estimated reach as chips. Composing the inner channel matrix shows per-event routing when an event table is supplied."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Channel mix" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ChannelMixPicker
          options={DEMO_CHANNEL_MIX}
          defaultActive={["email", "sms", "push"]}
          matrixRows={DEMO_CHANNEL_ROWS}
        />
      </section>
    </main>
  )
}
