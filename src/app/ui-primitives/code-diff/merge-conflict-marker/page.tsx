import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MergeConflictMarker } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Merge conflict marker | UI Primitives — Code diff",
}

const OURS_LINES = [
  "const STRIPE_VERSION = '2026-04-10'",
  "const STRIPE_KEY = process.env.STRIPE_LIVE_KEY",
  "if (!STRIPE_KEY) {",
  "  throw new Error('STRIPE_LIVE_KEY not configured')",
  "}",
] as const

const THEIRS_LINES = [
  "const STRIPE_VERSION = '2026-05-01'",
  "const STRIPE_KEY = process.env.STRIPE_API_KEY",
  "if (!STRIPE_KEY) {",
  "  throw new Error('STRIPE_API_KEY missing — see ops handbook')",
  "}",
] as const

export default function MergeConflictMarkerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 07"
        title="Merge conflict marker"
        description="Visual marker for the conflict zone — HEAD / =======/ branch with explanatory chips and accept-ours / accept-theirs CTAs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Merge conflict marker" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>services/payments/stripe-config.ts</span>
          <MergeConflictMarker
            filePath="services/payments/stripe-config.ts"
            oursLabel="HEAD"
            theirsLabel="feature/payments-2026-05"
            oursLines={OURS_LINES}
            theirsLines={THEIRS_LINES}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The marker is treated as a single region. The accept-ours and accept-theirs buttons are
            tone-coded to match the side chips, so reviewers can scan it fast. Manual resolve is
            the safe-third option for anything the human wants to merge by hand.
          </p>
        </div>
      </section>
    </main>
  )
}
