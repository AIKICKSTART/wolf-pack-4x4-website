import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecoveryCodesCard } from "../../components/auth-deep"

import {
  RECOVERY_DOWNLOADED,
  RECOVERY_EXHAUSTED,
  RECOVERY_FRESH,
} from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Recovery codes card | Auth deep",
  description:
    "Primitive 07 — recovery codes with show-once safeguard, download / print actions and explicit confirmation gate.",
}

export default function RecoveryCodesCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Recovery"
        title="Recovery codes card"
        description="Show-once recovery codes — codes are masked by default, reveal is opt-in, the explicit ‘I have saved my codes’ button gates progression."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Recovery codes card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Fresh · show-once gate active</span>
        <RecoveryCodesCard {...RECOVERY_FRESH} />

        <span className={styles.stageCaption}>Downloaded · 1 used, 7 remaining</span>
        <RecoveryCodesCard {...RECOVERY_DOWNLOADED} />

        <span className={styles.stageCaption}>Exhausted · regenerate required</span>
        <RecoveryCodesCard {...RECOVERY_EXHAUSTED} />
      </section>
    </main>
  )
}
