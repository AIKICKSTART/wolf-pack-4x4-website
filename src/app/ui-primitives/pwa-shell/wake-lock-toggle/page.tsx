import type { Metadata } from "next"

import { WakeLockToggle } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import { WakeLockToggleDemo } from "./wake-lock-toggle-demo"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Wake lock toggle | UI Primitives — PWA Shell",
}

export default function WakeLockTogglePage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 14"
        title="Wake lock toggle"
        description="Role=switch toggle for the Screen Wake Lock API. Battery-cost-per-hour pill is always visible so the mechanic doesn't accidentally flatten the tablet during a long welding job."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Wake lock toggle" },
        ]}
      />
      <section className={styles.canvas} aria-label="Wake lock toggle states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Quoting on the bay means leaving the tablet open while the customer wanders around the
            ute. Wake lock keeps the screen alive so they don&apos;t have to tap again every 30
            seconds.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Off · battery saver</h2>
            </header>
            <p className={styles.stateBody}>Default state. Moon glyph, grey switch.</p>
            <WakeLockToggle enabled={false} batteryCostPctPerHour={8} />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>On · amber active</h2>
            </header>
            <p className={styles.stateBody}>
              Switch slides on, sun glyph, amber cost-per-hour pill.
            </p>
            <WakeLockToggle enabled batteryCostPctPerHour={8} />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Interactive · click to toggle</h2>
            </header>
            <p className={styles.stateBody}>Stateful demo. Battery cost ticks with state.</p>
            <WakeLockToggleDemo />
          </div>
        </div>
      </section>
    </main>
  )
}
