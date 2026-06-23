import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FullMobileShellDemo } from "./full-mobile-shell-demo"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Full mobile shell | UI Primitives — PWA Shell",
}

export default function FullMobileShellPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · Composition"
        title="Full mobile shell"
        description="Mufflermen Crew running end-to-end inside a 390×844 viewport — boot splash with progress, biometric unlock, sync queue, network meter, home tile grid, shortcut row, share target receiver and wake-lock toggle. Step through the boot states from the right-hand controls."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Full mobile shell" },
        ]}
      />
      <section className={styles.canvas} aria-label="Full mobile PWA composition">
        <div className={styles.note}>
          <span>Composition</span>
          <p>
            This is the workshop crew app cold-booting on the Bay 2 tablet — splash, unlock, sync,
            ready. Tap the right-hand controls to step through. Every primitive in the PWA shell
            family is used at least once. Australian English throughout.
          </p>
        </div>
        <FullMobileShellDemo />
      </section>
    </main>
  )
}
