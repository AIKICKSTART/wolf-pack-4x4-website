import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ChatThread, UserMessageBubble } from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "User message bubble | UI Primitives — AI",
}

export default function UserMessagePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.02 / Conversation"
        title="User message bubble"
        description="Right-aligned, brand-toned customer turn. Supports inline attachments, timestamp, and an edited badge when the customer revises a message in place."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "User message" },
        ]}
      />
      <section className={styles.canvas}>
        <ChatThread ariaLabel="User message variants">
          <UserMessageBubble timestamp="09:41" authorName="Daniel">
            <p>
              Help me pick an exhaust for a Hilux 2.8L diesel — needs to stay volume-legal in NSW.
            </p>
          </UserMessageBubble>

          <UserMessageBubble
            timestamp="09:42"
            authorName="Daniel"
            edited
            attachments={[
              { id: "rec-1", name: "rego-papers.pdf", size: "184 KB" },
              { id: "rec-2", name: "engine-bay.heic", size: "1.4 MB" },
            ]}
          >
            <p>Attaching the rego and a photo of the current setup.</p>
          </UserMessageBubble>

          <UserMessageBubble timestamp="09:44" authorName="Daniel">
            <p>
              Also — do you stock the Redback 3-inch in 304 stainless, or is it
              409 only? I&apos;ll pay the premium for 304.
            </p>
          </UserMessageBubble>
        </ChatThread>

        <div className={styles.note}>
          <span>Variants</span>
          <p>
            Bubbles are sized with max-width 78% so multi-line answers wrap
            naturally while one-line turns stay compact. Attachments render as
            mono-typed chips with a paperclip glyph and accept optional file
            sizes.
          </p>
        </div>
      </section>
    </main>
  )
}
