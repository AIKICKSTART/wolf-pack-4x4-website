import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { CommandModalDemo } from "./command-modal-demo"

export const metadata: Metadata = {
  title: "Command modal | UI Primitives — Overlays",
}

export default function CommandModalPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 11"
        title="Command modal"
        description="Spotlight-style command palette. Search across grouped actions, keyboard shortcuts surface inline, recents appear when the input is empty. Powered by @formkit/auto-animate."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Command modal" },
        ]}
      />
      <section className={styles.canvas} aria-label="Command modal demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Operator quick-access panel — punch in a part SKU, jump to a bay, run a saved
            report. Reduced-motion users still get the full feature set, sans list animations.
          </p>
        </div>
        <CommandModalDemo />
      </section>
    </main>
  )
}
