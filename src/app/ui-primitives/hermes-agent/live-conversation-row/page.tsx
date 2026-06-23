"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { LiveConversationRow } from "../../components/hermes-agent"

import { HERMES_LIVE_CONVERSATIONS } from "../_mock-data"
import styles from "../hermes-agent.module.css"

export default function LiveConversationRowScenePage() {
  const [activeId, setActiveId] = useState<string>("c1")

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Row"
        title="Live conversation row"
        description="A single live conversation row — customer, channel, state, last-message preview, queue time and Hermes confidence chip. Used as the building block of the live-conversation rail in the composed control plane."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Live conversation row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · live mix · stateful selection
        </span>
        <div style={{ display: "grid", gap: 10 }}>
          {HERMES_LIVE_CONVERSATIONS.map((conv) => (
            <LiveConversationRow
              key={conv.id}
              id={conv.id}
              customerName={conv.customerName}
              channel={conv.channel}
              state={conv.state}
              lastMessage={conv.lastMessage}
              queueTimeSeconds={conv.queueTimeSeconds}
              confidence={conv.confidence}
              active={activeId === conv.id}
              onSelect={setActiveId}
            />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · single active row · no confidence</span>
        <LiveConversationRow
          id="solo-a"
          customerName="Bridget Hall"
          channel="web-chat"
          state="active"
          lastMessage="Can you confirm the X-Force twin-loop is still in stock?"
          queueTimeSeconds={8}
          active
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · resolved · low confidence</span>
        <LiveConversationRow
          id="solo-b"
          customerName="Anonymous DM"
          channel="instagram"
          state="resolved"
          lastMessage="No worries thanks for the help."
          queueTimeSeconds={-32}
          confidence={36}
        />
      </section>
    </main>
  )
}
