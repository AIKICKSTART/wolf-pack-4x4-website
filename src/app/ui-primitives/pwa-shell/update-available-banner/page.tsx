import type { Metadata } from "next"

import { UpdateAvailableBanner } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Update available banner | UI Primitives — PWA Shell",
}

export default function UpdateAvailableBannerPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 07"
        title="Update available banner"
        description="Service-worker update banner with reload CTA and optional changelog. Always shows the new version in tabular-nums and the release age so it's obvious whether the build is fresh."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Update available banner" },
        ]}
      />
      <section className={styles.canvas} aria-label="Update available banner states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Fires when the service worker registers a waiting build. The reception sees it between
            calls, taps reload, and the bay tablet reboots into the new build with the bay queue
            still cached.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Compact · just released</h2>
            </header>
            <p className={styles.stateBody}>Snoozable, minimal copy.</p>
            <UpdateAvailableBanner
              newVersion="v3.4.2"
              releasedAt="2 min ago"
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Mandatory · no snooze</h2>
            </header>
            <p className={styles.stateBody}>Security release — snooze removed.</p>
            <UpdateAvailableBanner
              newVersion="v3.4.3-hotfix"
              releasedAt="12 min ago"
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>With changelog</h2>
            </header>
            <p className={styles.stateBody}>Three bullet patch notes shown inline.</p>
            <UpdateAvailableBanner
              newVersion="v3.5.0"
              releasedAt="Today, 09:14"
              changelog={[
                "Faster VIN scan with the iPhone 15 ultrawide",
                "Fixes the bay-2 sync loop when offline > 30 min",
                "New Manta exhaust catalogue baked in",
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
