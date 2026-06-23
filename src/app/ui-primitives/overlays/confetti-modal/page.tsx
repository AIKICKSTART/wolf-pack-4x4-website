import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { ConfettiModalDemo } from "./confetti-modal-demo"

export const metadata: Metadata = {
  title: "Confetti modal | UI Primitives — Overlays",
}

export default function ConfettiModalPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 15"
        title="Confetti modal"
        description="Celebration modal that fires confetti on open via the ConfettiBurst primitive. Reduced-motion users get the medal without the particles. Use for milestone moments."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Confetti modal" },
        ]}
      />
      <section className={styles.canvas} aria-label="Confetti modal demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            First-job-of-the-day completion, 1,000th ticket milestone, supplier 5-star rating
            unlock. Restrain it — overuse blunts the reward signal.
          </p>
        </div>
        <ConfettiModalDemo />
      </section>
    </main>
  )
}
