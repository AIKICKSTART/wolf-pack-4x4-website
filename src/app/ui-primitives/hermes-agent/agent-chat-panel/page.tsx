import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AgentChatPanel } from "../../components/hermes-agent"

import { HERMES_CHAT_TURNS } from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Agent chat panel | Hermes",
  description:
    "Primitive 01 — branded multi-turn Hermes chat with streaming, citation chips and tool-call traces.",
}

const EMPTY_TURNS: typeof HERMES_CHAT_TURNS = []

const READ_ONLY_TURNS: typeof HERMES_CHAT_TURNS = HERMES_CHAT_TURNS.slice(0, 2)

export default function AgentChatPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Chat"
        title="Agent chat panel"
        description="The branded Hermes chat surface. Composes the AI primitive family — ChatThread + UserMessageBubble + AssistantMessageBubble + CitationPill + StreamingIndicator + ToolCallCard + PromptInput. Mick Davis Hilux N80 cat-back scenario."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Agent chat panel" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · streaming · web + sms + messenger channels
        </span>
        <AgentChatPanel
          customerName="Mick Davis"
          customerMeta="Oak Flats NSW · web-chat · 14m on site"
          channels={["web-chat", "sms", "messenger"]}
          turns={HERMES_CHAT_TURNS}
          suggestedPrompts={[
            "Pre-pull a fitment cheatsheet",
            "Send Bay 2 directions",
            "Quote LPG conversion",
          ]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · read-only audit replay · two turns
        </span>
        <AgentChatPanel
          customerName="Mick Davis · audit replay"
          customerMeta="Read-only · evaluator console"
          channels={["web-chat"]}
          turns={READ_ONLY_TURNS}
          readOnlyNotice="Audit replay · composer disabled"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · empty session</span>
        <AgentChatPanel
          customerName="New visitor"
          customerMeta="Anonymous · first contact"
          channels={["web-chat", "phone-voice"]}
          turns={EMPTY_TURNS}
          suggestedPrompts={[
            "Quote a cat-back",
            "Book a Saturday slot",
            "Check supplier stock",
          ]}
        />
      </section>
    </main>
  )
}
