import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../help-docs.module.css"

import { KeyboardShortcutsDemo } from "./kbd-demo"

export const metadata: Metadata = {
  title: "Keyboard shortcuts overlay | UI Primitives — Help & Docs",
}

export default function KeyboardShortcutsPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 14"
        title="Keyboard shortcuts overlay"
        description="Modal overlay showing every keyboard shortcut available in the current app context, grouped by section, with kbd chips composed from the existing Kbd primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Keyboard shortcuts overlay" },
        ]}
      />
      <section className={styles.canvas} aria-label="Keyboard shortcuts overlay demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Bind to ? from anywhere in the app to show the full shortcut reference. Use Esc
            (handled internally) or the close button to dismiss.
          </p>
        </div>
        <KeyboardShortcutsDemo />
      </section>
    </main>
  )
}
