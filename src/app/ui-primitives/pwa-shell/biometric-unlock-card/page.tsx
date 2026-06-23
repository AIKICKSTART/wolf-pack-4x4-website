import type { Metadata } from "next"

import { BiometricUnlockCard } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import { BiometricUnlockPinFallbackDemo } from "../_interactive-demos"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Biometric unlock card | UI Primitives — PWA Shell",
}

export default function BiometricUnlockCardPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 06"
        title="Biometric unlock card"
        description="Touch ID, Face ID and fingerprint variants with a crew avatar, status hint and a four-dot PIN fallback. Failure shake animation respects reduced-motion."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Biometric unlock card" },
        ]}
      />
      <section className={styles.canvas} aria-label="Biometric unlock states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            The workshop tablet locks itself after 12 minutes of idle so the apprentice can&apos;t
            tap into Roo&apos;s clipboard. Re-entry is one Face ID glance, fallback PIN if a glove
            comes off.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Face ID · idle prompt</h2>
            </header>
            <p className={styles.stateBody}>Teal halo, hint reads &quot;Look at the screen&quot;.</p>
            <BiometricUnlockCard
              kind="face"
              crewName="Roo Ainsworth"
              crewRole="Lead Mechanic · Bay 2"
              initials="RA"
              pinFilled={0}
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Touch ID · scanning</h2>
            </header>
            <p className={styles.stateBody}>Amber halo, hint reads &quot;Reading&quot;.</p>
            <BiometricUnlockCard
              kind="touch"
              state="scanning"
              crewName="Macca Hannah"
              crewRole="Apprentice · Bay 1"
              initials="MH"
              pinFilled={0}
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Fingerprint · failed with PIN partial</h2>
            </header>
            <p className={styles.stateBody}>
              Red halo, shake animation. PIN fallback dots show 2 of 4 entered.
            </p>
            <BiometricUnlockPinFallbackDemo />
          </div>
        </div>
      </section>
    </main>
  )
}
