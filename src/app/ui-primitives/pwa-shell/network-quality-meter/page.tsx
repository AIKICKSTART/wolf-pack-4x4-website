import type { Metadata } from "next"

import { NetworkQualityMeter } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Network quality meter | UI Primitives — PWA Shell",
}

export default function NetworkQualityMeterPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 08"
        title="Network quality meter"
        description="Connection bars with latency, down and up metrics in tabular-nums. Used in Settings → Diagnostics so the workshop knows which dead-zone bay needs the Wi-Fi mesh extender."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Network quality meter" },
        ]}
      />
      <section className={styles.canvas} aria-label="Network quality meter states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Telstra coverage drops to 3G between the loading bays. The reception fires the meter to
            confirm — 3G with 320ms latency — then routes the bay tablet onto the new mesh AP.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>5G · workshop carpark</h2>
            </header>
            <p className={styles.stateBody}>Four bars lit green.</p>
            <NetworkQualityMeter
              quality="5g"
              latencyMs={18}
              downKbps={84000}
              upKbps={32000}
              carrier="Telstra · 5G"
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>3G · between bays</h2>
            </header>
            <p className={styles.stateBody}>Two bars lit amber, latency around 320ms.</p>
            <NetworkQualityMeter
              quality="3g"
              latencyMs={320}
              downKbps={1240}
              upKbps={420}
              carrier="Telstra · UMTS"
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Offline · hoist bay 2</h2>
            </header>
            <p className={styles.stateBody}>Bars greyed out, metrics show em-dash.</p>
            <NetworkQualityMeter quality="offline" carrier="Searching for service" />
          </div>
        </div>
      </section>
    </main>
  )
}
