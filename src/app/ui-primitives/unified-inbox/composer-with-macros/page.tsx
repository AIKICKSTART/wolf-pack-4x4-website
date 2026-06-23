import type { Metadata } from "next"

import { ComposerWithMacros } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { MACROS } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Composer with macros | Unified inbox primitives",
  description:
    "Primitive 03 — composer with canned-reply chip strip + variable insertion buttons + Cmd/Ctrl+Enter to send.",
}

export default function ComposerWithMacrosScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Composer"
        title="Composer with macros"
        description="Picking a chip pastes the macro body into the textarea and reveals the matching variable buttons so the operator can drop tokens like {{customer.firstName}} into the body at the cursor. Cmd/Ctrl+Enter sends. Empty replies are blocked."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Composer with macros" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>4 macros · replying to Mick D.</span>
        <ComposerWithMacros macros={MACROS} customerName="Mick D." />
      </section>
    </main>
  )
}
