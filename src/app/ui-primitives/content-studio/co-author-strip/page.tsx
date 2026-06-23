import type { Metadata } from "next"

import { CoAuthorStrip } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { AUTHORS, CO_AUTHORS } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Co-author strip | Content studio",
  description:
    "Primitive 08 — multi-author strip with role chips and per-author byline visibility toggles. Three states — three visible, all visible, all hidden ghosts.",
}

const ALL_VISIBLE = CO_AUTHORS.map((slot) => ({ ...slot, visible: true }))
const ALL_HIDDEN = CO_AUTHORS.map((slot) => ({ ...slot, visible: false }))
const SOLO = [
  { author: AUTHORS.daniel, visible: true },
  { author: AUTHORS.hermes, visible: false },
]

export default function CoAuthorStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Co-author strip"
        title="Co-author strip"
        description="Authors get role chips (Founder, Editorial, Parts lead, Tech lead, AI bot) and a per-row toggle deciding whether they appear in the published byline. Three states — default mix, everyone visible, everyone ghosted."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Co-author strip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoTriple}>
          <CoAuthorStrip slots={CO_AUTHORS} />
          <CoAuthorStrip slots={ALL_VISIBLE} />
          <CoAuthorStrip slots={SOLO.concat(ALL_HIDDEN.slice(2))} />
        </div>
      </section>
    </main>
  )
}
