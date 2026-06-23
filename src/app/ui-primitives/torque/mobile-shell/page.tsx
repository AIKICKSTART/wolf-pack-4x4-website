import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MARKETING_COPY } from "./_demo-data"
import { MobileShellScene } from "./mobile-shell-scene"
import styles from "./torque-mobile.module.css"

export const metadata: Metadata = {
  title: "Torque on mobile | UI Primitives — Mobile Shell",
  description:
    "Torque, your Mufflermen business assistant, on a phone — app bar, bottom tab nav, FAB, drawer and bottom-sheet, with a live chat and quote approval for Oak Flats Muffler Men.",
}

export default function TorqueMobileShellPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker={MARKETING_COPY.kicker}
        title={MARKETING_COPY.title}
        description={MARKETING_COPY.description}
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Torque on mobile" },
        ]}
      />
      <section className={styles.canvas} aria-label="Torque on mobile composition">
        <div className={styles.note}>
          <span>Composition</span>
          <p>{MARKETING_COPY.framePitch}</p>
        </div>
        <MobileShellScene />
      </section>
    </main>
  )
}
