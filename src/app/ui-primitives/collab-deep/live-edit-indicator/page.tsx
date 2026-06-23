import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LiveEditIndicator } from "../../components/collab-deep"

import { LIVE_EDIT_PRICE, LIVE_EDIT_SHIPPING, LIVE_EDIT_TITLE } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Live edit indicator | Collab deep",
  description:
    "Primitive 09 — pulsing edit indicator overlaid on a live field, showing who is editing and what.",
}

export default function LiveEditIndicatorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Edit"
        title="Live edit indicator"
        description="Pulsing indicator that surfaces an in-progress edit on a specific field. Author + verb + field label, with an optional preview snippet."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Live edit indicator" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Mia · title (with preview)</span>
        <LiveEditIndicator edit={LIVE_EDIT_TITLE} />

        <span className={styles.stageCaption}>Tim · price (with preview)</span>
        <LiveEditIndicator edit={LIVE_EDIT_PRICE} />

        <span className={styles.stageCaption}>Hannah · shipping rules</span>
        <LiveEditIndicator edit={LIVE_EDIT_SHIPPING} />

        <span className={styles.stageCaption}>Compact (no preview)</span>
        <LiveEditIndicator edit={LIVE_EDIT_TITLE} compact />
      </section>
    </main>
  )
}
