import type { Metadata } from "next"

import { TeamPulseStrip } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { TEAM_PULSE } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Team pulse strip | Admin hub",
  description:
    "Primitive 10 — team-member online · away · busy presence chip strip. Three states — full crew, AM huddle compact set, weekend skeleton crew.",
}

const AM_HUDDLE = TEAM_PULSE.filter((m) => m.presence === "online").slice(0, 4)
const WEEKEND_SKELETON = [
  TEAM_PULSE[2], // Brad
  { ...TEAM_PULSE[3], presence: "away" as const, statusLabel: "Sat 8–13 only" },
  TEAM_PULSE[8], // Shane sick
]

export default function TeamPulseStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Team pulse strip"
        title="Team pulse"
        description="Per-member presence chip — avatar, name, role, current location/status — plus a header tally of online/away/busy/sick. Three states — full crew (6 online, 2 away, 1 sick), AM huddle, weekend skeleton crew."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Team pulse strip" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · full crew</span>
            <TeamPulseStrip members={TEAM_PULSE} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · AM huddle</span>
            <TeamPulseStrip members={AM_HUDDLE} title="AM huddle" />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · weekend skeleton crew</span>
            <TeamPulseStrip members={WEEKEND_SKELETON} title="Sat skeleton" />
          </div>
        </div>
      </section>
    </main>
  )
}
