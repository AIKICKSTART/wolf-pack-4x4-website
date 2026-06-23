import type { Metadata } from "next"

import { PullToRefreshLoader } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Pull-to-refresh loader | UI Primitives — PWA Shell",
}

export default function PullToRefreshLoaderPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 03"
        title="Pull-to-refresh loader"
        description="Bouncy refresh bowl with a circular progress ring around it. Hint text changes pull → release → fetching. Reduced-motion swaps the rotating arrow for a static refresh icon."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Pull-to-refresh loader" },
        ]}
      />
      <section className={styles.canvas} aria-label="Pull-to-refresh loader states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Re-poll the bay queue at the top of every job-list scroll-position. The loader sits
            inside the scroll container, not the top app bar, so it feels physically attached to
            the list.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Idle · half pulled</h2>
            </header>
            <p className={styles.stateBody}>Progress at 40% — bowl scales up, ring fills.</p>
            <PullToRefreshLoader progress={0.4} state="idle" />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Armed · ready to fire</h2>
            </header>
            <p className={styles.stateBody}>
              At 100% the bowl turns red and the arrow flips. Release fires the refresh.
            </p>
            <PullToRefreshLoader progress={1} state="armed" />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Loading · fetching latest</h2>
            </header>
            <p className={styles.stateBody}>
              Bowl teal, icon swaps to refresh and spins. Custom hint shown.
            </p>
            <PullToRefreshLoader
              progress={1}
              state="loading"
              hint="Pulling bay queue…"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
