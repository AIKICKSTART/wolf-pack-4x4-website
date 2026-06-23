import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuickRepliesMacroPanel } from "../../components/live-chat"

import { MACRO_LIBRARY, QUICK_REPLY_SHORTCUTS } from "../_mock-data"
import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Quick replies + macro panel | Live chat",
  description:
    "Primitive 04 — macro library docked beside composer with pinned shortcut chips and live preview.",
}

export default function QuickRepliesMacroPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Macros"
        title="Quick replies + macro panel"
        description="A macro panel docked beside the reply composer. Pinned chips up top fire the most-used macros in one click (Bay 2 booking, ADR cheatsheet, AUD quote acknowledgement). Below them, the full MacroPicker primitive is composed verbatim — searchable list + variable preview + insert action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Quick replies + macros" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · 5 macros · 3 pinned shortcuts
        </span>
        <QuickRepliesMacroPanel
          macros={MACRO_LIBRARY}
          shortcuts={QUICK_REPLY_SHORTCUTS}
        />
      </section>
    </main>
  )
}
