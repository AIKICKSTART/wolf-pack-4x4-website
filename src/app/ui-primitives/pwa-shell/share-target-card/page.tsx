import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ShareTargetCardDemo } from "./share-target-card-demo"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Share target card | UI Primitives — PWA Shell",
}

export default function ShareTargetCardPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 12"
        title="Share target card"
        description="Receiver surface for the Web Share Target API. Caption, optional media preview and toggle-able channel chips. State 03 has a stateful demo so you can play with selection."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Share target card" },
        ]}
      />
      <section className={styles.canvas} aria-label="Share target card states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            The customer texts the workshop a photo of their snapped exhaust. The OS share sheet
            opens Mufflermen Crew, which surfaces this card pre-filled with the caption, image and
            channel chips for the front counter, bay 2 crew, supplier or customer SMS.
          </p>
        </div>
        <ShareTargetCardDemo />
      </section>
    </main>
  )
}
