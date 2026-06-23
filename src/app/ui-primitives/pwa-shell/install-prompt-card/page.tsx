import type { Metadata } from "next"

import { InstallPromptCard } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Install prompt card | UI Primitives — PWA Shell",
}

export default function InstallPromptCardPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 01"
        title="Install prompt card"
        description="Add-to-home-screen prompt for both iOS Safari and Android Chrome. Platform-aware steps, install CTA, dismiss path. Mufflermen monogram and version pinned to the workshop release."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Install prompt card" },
        ]}
      />
      <section className={styles.canvas} aria-label="Install prompt card states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Show this card on the first PWA-eligible visit. Mufflermen Crew lives on the workshop
            tablet — installing it skips Safari chrome and lets the app cache job sheets for the
            dead-zone hoist bays.
          </p>
        </div>
        <div className={styles.platforms}>
          <div>
            <p className={styles.platformLabel}>iOS · Safari</p>
            <div className={styles.stateSlot}>
              <InstallPromptCard platform="ios" />
            </div>
          </div>
          <div>
            <p className={styles.platformLabel}>Android · Chrome</p>
            <div className={styles.stateSlot}>
              <InstallPromptCard platform="android" />
            </div>
          </div>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Customer PWA · iOS</h2>
            </header>
            <p className={styles.stateBody}>
              Friendlier copy for the customer app. Booking pages preserve scroll if installed.
            </p>
            <InstallPromptCard
              platform="ios"
              appName="Mufflermen"
              subtitle="Customer app · v1.8"
              description="Pop Mufflermen on your home screen so the next time your exhaust starts groaning you're one tap from a quote."
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Workshop crew · Android</h2>
            </header>
            <p className={styles.stateBody}>
              For the bay tablet. Push for offline jobs + dock alerts.
            </p>
            <InstallPromptCard
              platform="android"
              appName="Mufflermen Crew"
              subtitle="Workshop tablet · v3.4"
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Dismissible variant</h2>
            </header>
            <p className={styles.stateBody}>
              Includes a &quot;Not now&quot; dismiss button — used as a snackbar-style nudge.
            </p>
            <InstallPromptCard
              platform="ios"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
