import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { KbSnippetSuggester } from "../../components/live-chat"

import { KB_SNIPPETS } from "../_mock-data"
import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "KB snippet suggester | Live chat",
  description:
    "Primitive 14 — context-aware knowledge base article list with preview and insert-in-reply CTA.",
}

export default function KbSnippetSuggesterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / KB"
        title="KB snippet suggester"
        description="A knowledge-base snippet suggester sized to fit beside the composer. Each article surfaces a match-score chip (composes the primitives/Chip palette), category caption, read-time and a preview, with Insert-in-reply + Open-article actions. Built on the help-docs surfaces but tuned for the live-chat context."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "KB snippet suggester" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · 3 KB articles · match-score ranked
        </span>
        <KbSnippetSuggester
          snippets={KB_SNIPPETS}
          contextLabel="From Mick's Hilux fitment chat"
        />
      </section>
    </main>
  )
}
