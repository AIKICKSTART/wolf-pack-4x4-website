import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../search.module.css"

import { SuggestionsDemo } from "./suggestions-demo"

export const metadata: Metadata = {
  title: "Suggestion list | UI Primitives — Search",
}

export default function SuggestionsPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 03"
        title="Suggestion list"
        description="Grouped suggestion dropdown — Recent, Popular, and Quick links sections. Arrow keys + Enter select via ARIA listbox semantics, aria-activedescendant rolls focus visually without losing tab focus on the input."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Suggestion list" },
        ]}
      />
      <section className={styles.canvas} aria-label="Suggestion list demo">
        <div className={styles.note}>
          <span>Keyboard</span>
          <p>
            Focus the surface and use <kbd>↑</kbd> / <kbd>↓</kbd> to roam, <kbd>Home</kbd> /{" "}
            <kbd>End</kbd> to jump to ends, <kbd>Enter</kbd> to select. Hover roams the active row
            without changing tab focus.
          </p>
        </div>
        <SuggestionsDemo />
      </section>
    </main>
  )
}
