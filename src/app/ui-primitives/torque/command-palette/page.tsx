import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { CommandPaletteScene } from "./command-palette-scene"
import styles from "./command-palette.module.css"

export const metadata: Metadata = {
  title: "Command palette & quick actions | Torque",
}

export default function CommandPalettePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Torque / Quick actions"
        title="Command palette & quick actions"
        description="Torque, the Mufflermen business assistant, in one keystroke. ⌘K opens a Spotlight-style palette of grouped actions — new blog, schedule a post, update a page, run an SEO audit, generate an image — alongside recent runs and inline keyboard hints. Light + dark, reduced-motion friendly, keyboard-operable end to end."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque/command-palette" },
          { label: "Command palette" },
        ]}
      />
      <section className={styles.canvas} aria-label="Torque command palette demo">
        <CommandPaletteScene />
        <div className={styles.note}>
          <span>Composition notes</span>
          <p>
            Built only from registered primitives: the overlays CommandModal hosts the grouped
            actions + recents, SearchSuggestionList mirrors the action groups in an always-on
            preview, SearchHistoryRow lists recent runs, and Kbd / KbdGroup drive the shortcut
            legend. The closed-state search affordance is a non-interactive styled stand-in inside
            a single button — no nested form or input — so the trigger stays valid and
            screen-reader clean. The palette opens via the button, the global ⌘K / Ctrl+K shortcut,
            or recalling a recent row. One client island owns the open-state; everything else is
            the shared token system, so light and dark stay in parity.
          </p>
        </div>
      </section>
    </main>
  )
}
