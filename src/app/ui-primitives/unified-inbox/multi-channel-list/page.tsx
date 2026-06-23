import type { Metadata } from "next"

import { MultiChannelList } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { CONVERSATIONS } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Multi-channel list | Unified inbox primitives",
  description:
    "Primitive 01 — conversation list with channel badge (SMS / FB / IG / email / web), search, channel filter and sentiment dot.",
}

export default function MultiChannelListScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Multi-channel list"
        title="Multi-channel list"
        description="Left rail showing all inbound conversations regardless of channel. Channel badge is colour-coded — SMS violet, Facebook teal, Instagram red, email amber, web chat green. Filter chips narrow by channel and the search input checks the customer name, subject and preview."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Multi-channel list" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 6 conversations</span>
        <MultiChannelList
          conversations={CONVERSATIONS}
          activeId="conv-mick"
        />
      </section>
    </main>
  )
}
