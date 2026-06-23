import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_TEAM,
  TeamRosterCard,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Team roster card | Brand control",
}

const [DANIEL, MIA, BEN, TIM, KIRA] = MOCK_TEAM

export default function TeamRosterCardRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 07"
          title="Team roster card"
          description="Individual team-member card with role pill, last-active stamp, and access-scope chips."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Team roster card" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            The founder card (active now), a brand designer mid-shift, and a contractor card with the smallest scope.
          </p>
        </div>

        <section className={styles.stateGrid} aria-label="Roster state grid">
          <div className={styles.stateWrap}>
            <span className={styles.stateLabel}>State 01 · Founder</span>
            <TeamRosterCard member={DANIEL} />
          </div>
          <div className={styles.stateWrap}>
            <span className={styles.stateLabel}>State 02 · Brand + Parts</span>
            <TeamRosterCard member={MIA} />
            <TeamRosterCard member={BEN} />
          </div>
          <div className={styles.stateWrap}>
            <span className={styles.stateLabel}>State 03 · Workshop + Contractor</span>
            <TeamRosterCard member={TIM} />
            <TeamRosterCard member={KIRA} />
          </div>
        </section>
      </div>
    </main>
  )
}
