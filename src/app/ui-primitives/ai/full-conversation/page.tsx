import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../sub-route.module.css"
import { FullConversationScene } from "./full-conversation-scene"

export const metadata: Metadata = {
  title: "Full conversation | UI Primitives — AI",
}

export default function FullConversationPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.00 / Composition"
        title="Full conversation — quote assistant scene"
        description="Every AI primitive composed together: conversation rail, system prompt, model picker, token meter, chat thread with tool calls + citations, suggestion chips, and the composer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Full conversation" },
        ]}
      />
      <section className={styles.canvas}>
        <FullConversationScene />
        <div className={styles.note}>
          <span>Composition notes</span>
          <p>
            Server-rendered shell with one client island that owns rail selection,
            model selection, and composer state. The chat thread itself is a
            client component for autoscroll, but every message is composed from
            either server or client primitives without reaching across the tree.
          </p>
        </div>
      </section>
    </main>
  )
}
