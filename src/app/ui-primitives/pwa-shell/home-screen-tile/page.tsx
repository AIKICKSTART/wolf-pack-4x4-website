import type { Metadata } from "next"
import { Briefcase, ListChecks, Package, ScanLine } from "lucide-react"

import { HomeScreenTile } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Home-screen tile | UI Primitives — PWA Shell",
}

export default function HomeScreenTilePage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 10"
        title="Home-screen tile"
        description="iOS-widget-style action tile for the workshop home grid. Three tones, optional badge counter and inline metrics with up/down/flat trend glyphs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Home-screen tile" },
        ]}
      />
      <section className={styles.canvas} aria-label="Home-screen tile states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Eight tiles fit on the workshop tablet home grid. The reception keeps Today&apos;s bays
            front-and-centre with metrics live-updated from the sync queue.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Today&apos;s bays · with metrics</h2>
            </header>
            <p className={styles.stateBody}>Three metric cells, trend up on revenue.</p>
            <HomeScreenTile
              title="Today's bays"
              hint="4 booked · 2 walk-ins likely"
              tone="red"
              icon={<Briefcase size={18} strokeWidth={2.2} />}
              badgeCount={4}
              metrics={[
                { label: "In bay", value: "2" },
                { label: "Queue", value: "2" },
                { label: "Quoted", value: "$4.2k", trend: "up" },
              ]}
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Quick scan · teal</h2>
            </header>
            <p className={styles.stateBody}>Single-action tile, no metrics.</p>
            <HomeScreenTile
              title="Scan VIN"
              hint="Tap to point camera"
              tone="teal"
              icon={<ScanLine size={18} strokeWidth={2.2} />}
              badgeLabel="Camera"
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Parts queue · amber</h2>
            </header>
            <p className={styles.stateBody}>Trend-down warns on shrinking parts buffer.</p>
            <HomeScreenTile
              title="Parts queue"
              hint="Manta mid-pipes on the dock"
              tone="amber"
              icon={<Package size={18} strokeWidth={2.2} />}
              metrics={[
                { label: "In dock", value: "12" },
                { label: "On order", value: "5" },
                { label: "Buffer", value: "62%", trend: "down" },
              ]}
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 04</span>
              <h2 className={styles.stateTitle}>Neutral default</h2>
            </header>
            <p className={styles.stateBody}>No icon tone, no badge, just a heading and hint.</p>
            <HomeScreenTile
              title="Checklist"
              hint="Open-bay handover"
              tone="neutral"
              icon={<ListChecks size={18} strokeWidth={2.2} />}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
