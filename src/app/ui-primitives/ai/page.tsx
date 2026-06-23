import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./ai.module.css"

export const metadata: Metadata = {
  title: "AI Assistant Primitives | UI Primitives",
}

interface PrimitiveEntry {
  index: string
  title: string
  href: string
  description: string
  feature?: boolean
}

const primitives: ReadonlyArray<PrimitiveEntry> = [
  {
    index: "01",
    title: "Chat thread",
    href: "/ui-primitives/ai/chat-thread",
    description:
      "Vertical transcript container with smart stick-to-bottom autoscroll, role=log, polite live region for incoming turns.",
  },
  {
    index: "02",
    title: "User message",
    href: "/ui-primitives/ai/user-message",
    description:
      "Right-aligned brand bubble with attachment chips, timestamp, and edited badge for in-place revisions.",
  },
  {
    index: "03",
    title: "Assistant message",
    href: "/ui-primitives/ai/assistant-message",
    description:
      "Left-aligned panel surface with author, model badge, citation slot, and inline feedback thumbs.",
  },
  {
    index: "04",
    title: "Streaming indicator",
    href: "/ui-primitives/ai/streaming-indicator",
    description:
      "Three-dot typing animation with role=status. Reduced-motion users get a blinking caret instead.",
  },
  {
    index: "05",
    title: "Prompt input",
    href: "/ui-primitives/ai/prompt-input",
    description:
      "Auto-grow textarea composer with slash trigger, attach button, char counter, and Cmd+Enter kbd hint.",
  },
  {
    index: "06",
    title: "Suggestion chips",
    href: "/ui-primitives/ai/suggestion-chips",
    description:
      "Above-the-composer suggestion row with arrow-key cycling and click-to-insert prompt callback.",
  },
  {
    index: "07",
    title: "Tool call card",
    href: "/ui-primitives/ai/tool-call-card",
    description:
      "Collapsible card showing tool name, status chip, duration, and input/output JSON via the existing CodeBlock.",
  },
  {
    index: "08",
    title: "Citation pill",
    href: "/ui-primitives/ai/citation-pill",
    description:
      "Inline citation chip that hover-reveals a QuoteBubble popover with source title, snippet, and URL.",
  },
  {
    index: "09",
    title: "Stop / Regen",
    href: "/ui-primitives/ai/stop-regen",
    description:
      "Action toolbar beneath an assistant turn: stop, regenerate, edit prompt, copy. Streaming-aware disabled states.",
  },
  {
    index: "10",
    title: "Conversation rail",
    href: "/ui-primitives/ai/conversation-rail",
    description:
      "Left rail grouping past conversations by Today / Yesterday / Last 7 days / Older with hover preview.",
  },
  {
    index: "11",
    title: "Token usage",
    href: "/ui-primitives/ai/token-usage",
    description:
      "Compact meter chip showing tokens used vs budget. Tone shifts calm → amber → red as the budget exhausts.",
  },
  {
    index: "12",
    title: "Model selector",
    href: "/ui-primitives/ai/model-selector",
    description:
      "Listbox popover for choosing model with tier badge, context-window chip, and per-million cost chip.",
  },
  {
    index: "13",
    title: "System prompt",
    href: "/ui-primitives/ai/system-prompt",
    description:
      "Collapsible system prompt editor with character counter, dirty-state subhead, and reset-to-default action.",
  },
  {
    index: "14",
    title: "Feedback thumbs",
    href: "/ui-primitives/ai/feedback-thumbs",
    description:
      "Animated thumbs up/down with confetti micro-burst on positive feedback and reason picker on negative.",
  },
  {
    index: "00",
    title: "Full conversation",
    href: "/ui-primitives/ai/full-conversation",
    description:
      "Composed scene with rail + thread + suggestion chips + composer + tool calls. Mufflermen quote assistant in action.",
    feature: true,
  },
]

export default function AiPrimitivesPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14 / AI assistant primitives"
        title="Threads, composers, tool cards, citations"
        description="Mufflermen-flavoured chat surface primitives. Drop them into a quote-assistant flow, a service advisor copilot, or an internal techs Q&A. Streaming-aware, reduced-motion friendly, and ARIA-labelled end to end."
      />
      <section className={styles.section} aria-label="AI primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 14 primitives + 1 scene</span>
          <h2 className={styles.sectionTitle}>Pick a surface</h2>
          <p className={styles.subhead}>
            Every primitive renders full-scale in its own sub-route with realistic Mufflermen
            assistant copy — exhaust selection, EGT diagnostics, supplier lookups, and Hilux 2.8L
            volume-legal recommendations.
          </p>
        </header>
        <div className={styles.grid}>
          {primitives.map((primitive) => (
            <Link
              key={primitive.href}
              className={styles.thumb}
              href={primitive.href}
              data-feature={primitive.feature ? "true" : "false"}
            >
              <span className={styles.thumbIndex}>{primitive.index}</span>
              <h3 className={styles.thumbTitle}>{primitive.title}</h3>
              <p className={styles.thumbCopy}>{primitive.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
