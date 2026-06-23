import type { Metadata } from "next"

import { DeployGateCard } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import {
  GATE_CHECKS_FAILED,
  GATE_CHECKS_PASSING,
  GATE_CHECKS_RUNNING,
} from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Deploy gate card | Deploy console",
  description:
    "Primitive 03 — deploy gate with tests / typecheck / lint / security / owner-approval checks.",
}

export default function DeployGateCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Gate"
        title="Deploy gate card"
        description="Pre-deploy gate. Each check resolves to pending / running / passed / failed / skipped with a duration chip. A radial summary shows passed/total, the CTA flips between Promote / Blocked / Awaiting based on the aggregate."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Deploy gate card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · all checks passed · ready to promote v3.42.7</span>
        <DeployGateCard
          title="Promote v3.42.7 to production"
          description="All gates cleared. Promote will swap traffic from v3.42.6 to v3.42.7 behind the canary."
          checks={GATE_CHECKS_PASSING}
          kicker="Production · v3.42.7"
          deployHref="#promote"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · running · lint chunk 4 of 9 · 4 pending</span>
        <DeployGateCard
          title="Verify hotfix/quote-pdf-oom"
          description="Lint is mid-run. Security and build queued. Owner approval requested last."
          checks={GATE_CHECKS_RUNNING}
          kicker="Production · v3.42.7-rc1"
          deployHref="#promote"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · gate failed · CVE-2026-23814 blocks build</span>
        <DeployGateCard
          title="Block release/v3.43.0"
          description="High-severity CVE in sharp. Build + approval downstream were skipped."
          checks={GATE_CHECKS_FAILED}
          kicker="Production · v3.43.0"
          deployHref="#promote"
        />
      </section>
    </main>
  )
}
