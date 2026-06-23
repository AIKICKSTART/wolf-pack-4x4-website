import type { Metadata } from "next"

import { TimeZoneDisplay } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { TIME_ZONES } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Time zone display | Localization",
  description:
    "Primitive 14 — display strip showing the current time across Sydney, New York, London, Tokyo, and Berlin. Tile shows label, time, date, and short offset.",
}

export default function TimeZoneDisplayScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Time"
        title="Time zone display"
        description="A live multi-zone strip for the workshop and partner cities — Sydney (HQ), New York, London, Tokyo, and Berlin. Each tile shows the current local time, the weekday + short date, and the short timezone offset. Ticks every 30 seconds."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Time zone display" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — five city strip</span>
        <TimeZoneDisplay zones={TIME_ZONES} />
      </section>
    </main>
  )
}
