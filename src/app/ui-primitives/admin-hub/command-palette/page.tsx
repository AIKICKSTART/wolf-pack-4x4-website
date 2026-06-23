import type { Metadata } from "next"

import { CommandPalette } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import {
  COMMAND_ENTRIES,
  COMMAND_RECENTS,
  COMMAND_SUGGESTIONS,
} from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Command palette | Admin hub",
  description:
    "Primitive 05 — Cmd+K palette with grouped commands, recents and Hermes AI suggestions. Three states — full empty palette, search filtering active, navigate-only subset.",
}

const NAVIGATE_SUBSET = COMMAND_ENTRIES.filter((c) => c.group === "navigate")

export default function CommandPaletteScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Command palette"
        title="Cmd+K command palette"
        description="Grouped commands (navigate, create, report, team, settings) with recent commands, Hermes AI suggestions, keyboard navigation and the Cmd/Ctrl+K binding. Three states — fresh palette with recents + suggestions, query filtering live, navigate-only subset."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Command palette" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · fresh open with recents + suggestions</span>
            <CommandPalette
              commands={COMMAND_ENTRIES}
              recents={COMMAND_RECENTS}
              suggestions={COMMAND_SUGGESTIONS}
              open
              bindShortcut={false}
            />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · query filtering &ldquo;quote&rdquo;</span>
            <CommandPalette
              commands={COMMAND_ENTRIES}
              recents={[]}
              suggestions={[]}
              open
              defaultQuery="quote"
              bindShortcut={false}
            />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · navigate-only subset</span>
            <CommandPalette
              commands={NAVIGATE_SUBSET}
              recents={[]}
              suggestions={[]}
              open
              bindShortcut={false}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
