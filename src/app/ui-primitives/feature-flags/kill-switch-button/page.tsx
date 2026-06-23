import type { Metadata } from "next"

import { KillSwitchButton } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Kill switch button | Feature flags",
  description:
    "Primitive 09 — destructive kill switch button with typed-phrase confirm and role=alert aria-live messaging.",
}

export default function KillSwitchScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Kill"
        title="Kill switch button"
        description="High-stakes instant-disable control. First tap arms the switch; the user must then type the flag key exactly to enable the destructive confirm. The armed surface is wrapped in role='alert' for aria-live screen-reader announcement and the confirm button stays disabled until the phrase matches."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Kill switch" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · click arm · type phrase · Enter to confirm</span>
        <div className={styles.demoSplit}>
          <KillSwitchButton
            flagName="quote-instant-pricing"
            label="Kill quote-instant-pricing"
          />
          <KillSwitchButton
            flagName="compliance-receipt-qr"
            label="Kill compliance-receipt-qr"
            hint="Removes the QR code from receipts immediately. Required when an AUSTRAC audit raises a hold."
          />
        </div>
      </section>
    </main>
  )
}
