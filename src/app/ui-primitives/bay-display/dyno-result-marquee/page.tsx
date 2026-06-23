import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DynoResultMarquee } from "../../components/bay-display"
import { DYNO_RESULTS } from "../bay-display-mock"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Dyno result marquee | UI Primitives — Bay Display",
}

export default function DynoResultMarqueePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.11 / Bay display"
        title="Dyno result marquee"
        description="Latest dyno result reel — kW + Nm metric pills, a green vs-baseline delta and a smug-grin emoji tagging the customer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Dyno result marquee" },
        ]}
      />
      <section className={styles.canvas}>
        <DynoResultMarquee entries={DYNO_RESULTS} />
        <DynoResultMarquee entries={DYNO_RESULTS} speed={14} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Delta computes peakKw minus baseline; positive is green, missing
            baseline omits the chip entirely. Emoji is annotated with a
            {" "}role&#61;{" "}&#34;img&#34; so screen readers announce the grin context.
          </p>
        </div>
      </section>
    </main>
  )
}
