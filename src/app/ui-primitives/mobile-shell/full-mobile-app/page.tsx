import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { FullMobileAppDemo } from "./full-mobile-app-demo"

export const metadata: Metadata = {
  title: "Full mobile app | UI Primitives — Mobile Shell",
}

export default function FullMobileAppPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · Composition"
        title="Full mobile app"
        description="Mufflermen workshop tablet — every primitive in one running stack: status bar, top app bar with drawer trigger, chip filters, list of bays, extended FAB, bottom nav with active pill. Drawer overlay available."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Full mobile app" },
        ]}
      />
      <section className={styles.canvas} aria-label="Full mobile app composition">
        <div className={styles.note}>
          <span>Composition</span>
          <p>
            This is what the workshop tablet looks like in the morning — Roo opens the app, sees
            today&apos;s bays, taps a chip, opens the drawer, swipes between tabs. The whole point
            of the primitive set in one page.
          </p>
        </div>
        <FullMobileAppDemo />
      </section>
    </main>
  )
}
