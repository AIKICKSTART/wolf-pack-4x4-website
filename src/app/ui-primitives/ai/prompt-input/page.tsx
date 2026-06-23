import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../sub-route.module.css"
import { PromptInputDemo } from "./prompt-input-demo"

export const metadata: Metadata = {
  title: "Prompt input | UI Primitives — AI",
}

export default function PromptInputPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.05 / Conversation"
        title="Prompt input — composer"
        description="Auto-growing textarea composer with slash-command trigger, attach action, character counter, Cmd+Enter send hint, and disabled-state styling."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Prompt input" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stage}>
          <PromptInputDemo />
        </div>
        <div className={styles.note}>
          <span>Keyboard</span>
          <p>
            Pressing &quot;/&quot; on an empty composer fires the slash-command
            callback. Cmd+Enter (or Ctrl+Enter on Windows) submits. Enter alone
            inserts a newline, so multi-line technical prompts stay easy to draft.
          </p>
        </div>
      </section>
    </main>
  )
}
