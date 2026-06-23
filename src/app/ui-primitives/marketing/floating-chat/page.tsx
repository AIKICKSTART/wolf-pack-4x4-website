import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FloatingChatLauncher } from "../../components/marketing/floating-chat-launcher"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Floating chat launcher | Marketing Blocks",
  description:
    "Primitive 12 — bottom-right floating chat button with pulse ring, notification dot, and expand-to-preview-card behaviour.",
}

function QuickQuestions() {
  return (
    <ul
      style={{
        display: "grid",
        gap: "var(--primitive-space-2)",
        margin: 0,
        padding: 0,
        listStyle: "none",
      }}
    >
      {[
        "Do you fit Manta on a HiLux SR5?",
        "How fast can I get a Stage 1 catback?",
        "Mobile bay coverage to Kiama?",
      ].map((question) => (
        <li key={question}>
          <button
            type="button"
            style={{
              display: "block",
              width: "100%",
              padding: "var(--primitive-space-2-5) var(--primitive-space-3)",
              border: "1px solid var(--primitive-line)",
              borderRadius: "var(--primitive-radius-md)",
              background: "var(--primitive-glass-soft)",
              color: "var(--primitive-body)",
              fontFamily: "var(--primitive-font-body)",
              fontSize: "var(--primitive-text-xs)",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {question}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function FloatingChatPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Floating chat launcher"
        title="Floating chat launcher"
        description="Bottom-right launcher with a pulse ring and a notification badge. Toggles a preview card with canned quick-questions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Floating chat" },
        ]}
      />

      <section className={styles.stageFrame} aria-label="Floating chat demo">
        <span className={styles.stageCaption}>
          The chat launcher sits in the bottom-right corner of the viewport. Click it to expand the preview card.
        </span>
      </section>

      <FloatingChatLauncher
        heading="Need a hand on the bay?"
        body="The fitters are between welds. Drop a question — we'll answer once the helmet's off."
        preview={<QuickQuestions />}
        notificationCount={2}
      />
    </main>
  )
}
