import type { Metadata } from "next"

import { PermissionModal } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Permission modal | UI Primitives — PWA Shell",
}

export default function PermissionModalPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 09"
        title="Permission modal"
        description="Pre-prompt rationale modal shown before the system permission dialog. Camera, microphone, location, notifications, contacts and storage variants with workshop-specific copy."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Permission modal" },
        ]}
      />
      <section className={styles.canvas} aria-label="Permission modal states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Always show the rationale modal before the OS prompt. If the mechanic taps &quot;Not
            now&quot; we hold the OS prompt back — once denied at the OS level we can&apos;t
            re-prompt without sending them to Settings.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Camera · VIN scan</h2>
            </header>
            <p className={styles.stateBody}>Allow / Not now. Copy framed for the workshop crew.</p>
            <PermissionModal kind="camera" />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Location · find a workshop</h2>
            </header>
            <p className={styles.stateBody}>Customer-facing — &quot;find the closest bay&quot;.</p>
            <PermissionModal
              kind="location"
              appName="Mufflermen"
              appDomain="mufflermen.com.au"
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Notifications · parts arrived</h2>
            </header>
            <p className={styles.stateBody}>Crew variant — alerts on parts movements.</p>
            <PermissionModal kind="notifications" />
          </div>
        </div>
      </section>
    </main>
  )
}
