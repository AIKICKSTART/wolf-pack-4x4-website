import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NowServingStrip } from "../../components/bay-display"
import { SERVING_JOBS } from "../bay-display-mock"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Now serving strip | UI Primitives — Bay Display",
}

export default function NowServingStripPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.04 / Bay display"
        title="Now serving strip"
        description="Ticker strip cycling each bay's current job. Status badges drive a colour ramp — neutral, teal, amber, red, green. Pause-on-hover keeps focus when a customer points."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Now serving strip" },
        ]}
      />
      <section className={styles.canvas}>
        <NowServingStrip jobs={SERVING_JOBS} />
        <NowServingStrip jobs={SERVING_JOBS} speed={18} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Higher speed for crew screens (fast scanning), slower default for
            waiting-room signage. The marquee composes the primitive Marquee,
            which honours prefers-reduced-motion and pauses on hover.
          </p>
        </div>
      </section>
    </main>
  )
}
