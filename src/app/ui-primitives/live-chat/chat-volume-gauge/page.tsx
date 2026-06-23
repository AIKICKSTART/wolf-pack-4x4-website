import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ChatVolumeGauge } from "../../components/live-chat"

import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Chat volume gauge | Live chat",
  description:
    "Primitive 10 — live team chat-load gauge with queue length and projected ETA chips.",
}

export default function ChatVolumeGaugeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Volume"
        title="Chat volume gauge"
        description="A live team load gauge. Composes the chart RadialMeter for in-progress / capacity utilisation and surfaces a queue-length chip plus a projected ETA chip in the support chip palette. role=status with aria-live so screen-reader users get told when load shifts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Chat volume gauge" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three load levels</span>
        <div className={styles.demoTriple}>
          <ChatVolumeGauge
            inProgress={4}
            capacity={12}
            queueLength={0}
            projectedEtaMinutes={1}
          />
          <ChatVolumeGauge
            inProgress={9}
            capacity={12}
            queueLength={3}
            projectedEtaMinutes={3}
          />
          <ChatVolumeGauge
            inProgress={12}
            capacity={12}
            queueLength={6}
            projectedEtaMinutes={8}
          />
        </div>
      </section>
    </main>
  )
}
