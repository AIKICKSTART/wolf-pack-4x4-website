import type { Metadata } from "next"

import {
  MobileStatusBar,
  MobileViewport,
} from "../../components/mobile-shell"
import { SplashScreen } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Splash screen | UI Primitives — PWA Shell",
}

export default function SplashScreenPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 04"
        title="Splash screen"
        description="Branded boot surface — Mufflermen monogram, version pinned in tabular-nums, region tag, animated halo and a boot-progress bar that surfaces what's actually loading."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Splash screen" },
        ]}
      />
      <section className={styles.canvas} aria-label="Splash screen states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Shown for the first 600–1200ms of cold boot while the service worker hydrates the job
            cache. Region and version make it obvious which environment is loading — staging on the
            workshop tablet shouldn&apos;t feel like prod.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Cold boot · 18%</h2>
            </header>
            <p className={styles.stateBody}>Hydrating local DB.</p>
            <MobileViewport label="Cold boot splash">
              <MobileStatusBar />
              <SplashScreen progress={18} bootStep="Hydrating local DB…" />
            </MobileViewport>
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Mid boot · 64%</h2>
            </header>
            <p className={styles.stateBody}>Pulling jobs queued offline.</p>
            <MobileViewport label="Mid boot splash">
              <MobileStatusBar />
              <SplashScreen progress={64} bootStep="Catching up on bay queue…" />
            </MobileViewport>
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Almost done · 96%</h2>
            </header>
            <p className={styles.stateBody}>Last frame before handing off to home tile grid.</p>
            <MobileViewport label="Ready splash">
              <MobileStatusBar />
              <SplashScreen
                progress={96}
                bootStep="Warming up the kettle…"
                version="v3.4.1"
                region="Oak Flats · NSW"
              />
            </MobileViewport>
          </div>
        </div>
      </section>
    </main>
  )
}
