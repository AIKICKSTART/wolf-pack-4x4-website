import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TimeZoneIndicatorChip } from "../../components/realtime-collab"
import { BEC, JORDAN, MARCUS, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Time zone indicator chip | UI Primitives - Realtime collab",
}

const REMOTE_USER = {
  id: "u-zoe",
  name: "Zoe Larkin",
  role: "Supplier · Magnaflow AU",
  tone: "amber" as const,
}

const REMOTE_NZ = {
  id: "u-piri",
  name: "Piri Walker",
  role: "Supplier · Vibrant NZ",
  tone: "green" as const,
}

export default function TimeZoneIndicatorChipPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 13"
        title="Time zone indicator chip"
        description="Tiny chip per collaborator showing their local time, timezone shortname, and relative-to-me offset (e.g. +3h, Same TZ, -30m)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Time zone indicator chip" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Workshop team · same TZ</span>
          <div className={styles.demoRowJustified}>
            <TimeZoneIndicatorChip
              user={MARCUS}
              localTime="14:32"
              timezoneLabel="AEST"
              offsetFromMe="Same TZ"
            />
            <TimeZoneIndicatorChip
              user={SOPHIE}
              localTime="14:32"
              timezoneLabel="AEST"
              offsetFromMe="Same TZ"
            />
            <TimeZoneIndicatorChip
              user={BEC}
              localTime="14:32"
              timezoneLabel="AEST"
              offsetFromMe="Same TZ"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Remote collaborators · offset to you</span>
          <div className={styles.demoRowJustified}>
            <TimeZoneIndicatorChip
              user={JORDAN}
              localTime="12:32"
              timezoneLabel="AWST"
              offsetFromMe="-2h"
            />
            <TimeZoneIndicatorChip
              user={REMOTE_USER}
              localTime="11:32"
              timezoneLabel="ACST"
              offsetFromMe="-3h"
            />
            <TimeZoneIndicatorChip
              user={REMOTE_NZ}
              localTime="16:32"
              timezoneLabel="NZST"
              offsetFromMe="+2h"
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Avatar is opt-out via <code>showAvatar=false</code> in which case the
            chip falls back to a Globe icon. The aria-label rolls everything into
            one string — name, local time, timezone, and offset — so the chip
            speaks itself once instead of fragmenting the announcement.
          </p>
        </div>
      </section>
    </main>
  )
}
