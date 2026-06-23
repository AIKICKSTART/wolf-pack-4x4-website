import type { Metadata } from "next"

import { DeviceOrientationPrompt } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Device orientation prompt | UI Primitives — PWA Shell",
}

export default function DeviceOrientationPromptPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 13"
        title="Device orientation prompt"
        description="Animated rotate-to-landscape (or portrait) hint with an arc cue. Reduced-motion locks the phone glyph in the target orientation rather than animating."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Device orientation prompt" },
        ]}
      />
      <section className={styles.canvas} aria-label="Device orientation prompt states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Dyno run screen needs landscape so the torque curve has horizontal room. If we detect
            portrait we show this prompt for two seconds before forcing the rotation.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Landscape · default copy</h2>
            </header>
            <p className={styles.stateBody}>Dyno-style use case.</p>
            <DeviceOrientationPrompt target="landscape" />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Portrait · custom copy</h2>
            </header>
            <p className={styles.stateBody}>Used on the job sheet review screen.</p>
            <DeviceOrientationPrompt
              target="portrait"
              subtitle="Job sheet prints best held upright — flip the tablet vertical so the parts list stays in one tidy column."
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>With dismiss · landscape</h2>
            </header>
            <p className={styles.stateBody}>
              &quot;Stay in this orientation&quot; lets the user override the suggestion.
            </p>
            <DeviceOrientationPrompt
              target="landscape"
              title="Wider canvas for the dyno"
              hint="Quarter turn left"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
