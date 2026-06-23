import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { InternalNoteComposer } from "../../components/support"

import { TEAM_MENTIONS } from "../_mock-data"
import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Internal note composer | Support",
  description:
    "Primitive 04 — internal-only note composer with mention picker and ⌘+↵ save.",
}

export default function InternalNoteComposerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Composer"
        title="Internal note composer"
        description="Composer dedicated to internal notes. Yellow-tinted hatched field, a Not-visible-to-customer badge, @-mention picker that opens when the user types @, and ⌘+↵ to save. Customer-facing replies live in the regular reply composer — this one is for the team-only side of the conversation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Internal note composer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · type @ to surface the mention picker</span>
        <InternalNoteComposer mentionCandidates={TEAM_MENTIONS} />
      </section>
    </main>
  )
}
