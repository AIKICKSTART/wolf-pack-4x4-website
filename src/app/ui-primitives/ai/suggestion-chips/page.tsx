import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../sub-route.module.css"
import { SuggestionChipsDemo } from "./suggestion-chips-demo"

export const metadata: Metadata = {
  title: "Suggestion chips | UI Primitives — AI",
}

export default function SuggestionChipsPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.06 / Conversation"
        title="Suggestion chips"
        description="Row of suggested prompts above the composer. Clicking a chip inserts its full prompt into the composer. ArrowLeft / ArrowRight cycle focus across chips, Home / End jump to the ends."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Suggestion chips" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stage}>
          <SuggestionChipsDemo />
        </div>
        <div className={styles.note}>
          <span>Keyboard navigation</span>
          <p>
            Focus a chip, then use ArrowLeft / ArrowRight to cycle through
            suggestions, Home / End to jump to the first or last, and Enter or
            Space to select. The list is wrapped in a nav with an aria-label so
            screen-readers announce the group.
          </p>
        </div>
      </section>
    </main>
  )
}
