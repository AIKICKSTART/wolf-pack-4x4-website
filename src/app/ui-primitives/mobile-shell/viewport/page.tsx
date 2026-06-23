import type { Metadata } from "next"

import {
  MobileStatusBar,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

export const metadata: Metadata = {
  title: "Mobile viewport | UI Primitives — Mobile Shell",
}

export default function MobileViewportPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 01"
        title="Mobile viewport"
        description="390×844 phone simulator with bezel, notch, speaker, camera and home indicator. Wraps every other mobile primitive in a believable surface so motion feels honest."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Viewport" },
        ]}
      />
      <section className={styles.canvas} aria-label="Mobile viewport demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Drop any of the workshop mobile flows inside this frame for stakeholder review without
            spinning up a device farm. Reduces noise — the team focuses on the surface, not the
            chrome.
          </p>
        </div>
        <MobileViewport label="Workshop preview frame">
          <MobileStatusBar time="9:41" battery={86} carrier="5G" />
          <TopAppBar title="Workshop" subtitle="Bay 2 · Mufflermen" />
          <div className={styles.previewBody}>
            <div className={styles.previewHeading}>
              <span className={styles.previewHeadingKicker}>Today</span>
              <h2 className={styles.previewHeadingTitle}>Hello, Roo</h2>
            </div>
            <p>Drop primitives inside this frame to see their real rhythm at 390×844.</p>
          </div>
        </MobileViewport>
      </section>
    </main>
  )
}
