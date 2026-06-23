import type { Metadata } from "next"

import { ContentBlockCard } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { BLOCK_SNIPPETS } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Content block card | Content studio",
  description:
    "Primitive 10 — reusable snippet card for callouts, lead magnets, diagrams, quotes, and stat blocks. Three states — full size, compact rail, single hero callout.",
}

export default function ContentBlockCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Content block card"
        title="Content block card"
        description="Snippets writers reach for again and again — Mufflermen ADR callouts, the book-a-quote lead magnet, the twin-pipe diagram, the stat block. Three states — wide grid, compact side rail, single featured callout."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Content block card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <div className={styles.demoTriple} role="list" aria-label="Block snippet grid">
            {BLOCK_SNIPPETS.map((snippet) => (
              <ContentBlockCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
          <div className={styles.demoTriple} role="list" aria-label="Compact rail">
            {BLOCK_SNIPPETS.slice(0, 3).map((snippet) => (
              <ContentBlockCard key={`compact-${snippet.id}`} snippet={snippet} compact />
            ))}
          </div>
          <div role="list" aria-label="Hero callout">
            <ContentBlockCard snippet={BLOCK_SNIPPETS[0]} />
          </div>
        </div>
      </section>
    </main>
  )
}
