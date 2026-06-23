import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SystemPromptEditor } from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "System prompt editor | UI Primitives — AI",
}

const DEFAULT_PROMPT = `You are the Oak Flats Mufflermen workshop assistant. You help service advisors quote exhaust, suspension, and brake work for Australian utes and 4x4s. Always cite NSW EPA noise limits when relevant, prefer 304 stainless for coastal builds, and offer fitted prices in AUD including GST.`

export default function SystemPromptPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.13 / Conversation"
        title="System prompt editor"
        description="Collapsible textarea for editing the assistant's system prompt. Tracks dirty state, exposes a live char counter, and ships with a reset-to-default action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "System prompt" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stage}>
          <SystemPromptEditor defaultPrompt={DEFAULT_PROMPT} defaultOpen />
        </div>
        <div className={styles.note}>
          <span>Persistence</span>
          <p>
            The editor is uncontrolled by default — it tracks local state and
            emits an onChange callback. Wire your storage layer (localStorage,
            workspace settings, Payload field, etc.) to the callback to persist.
          </p>
        </div>
      </section>
    </main>
  )
}
