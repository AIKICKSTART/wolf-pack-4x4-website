import type { Metadata } from "next"

import { PreferencePanel } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import {
  MOCK_CHANNELS,
  MOCK_EVENTS,
  MOCK_PREFERENCE_VALUE,
} from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Preference panel | Notifications system",
  description:
    "Primitive 05 — channel × event preference matrix for SMS, email, push (web + mobile), and in-app routing.",
}

const EMPTY_VALUE = MOCK_PREFERENCE_VALUE.map((cell) => ({ ...cell, enabled: false }))
const ALL_ON_VALUE = MOCK_PREFERENCE_VALUE.map((cell) => ({ ...cell, enabled: true }))

export default function PreferencePanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Preference panel"
        title="Preference panel"
        description="An event-by-channel routing matrix. Each cell is an aria-switch — toggling never moves the row order or layout, only the on/off state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Preference panel" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Workshop default (mixed)</span>
        <PreferencePanel
          events={MOCK_EVENTS}
          channels={MOCK_CHANNELS}
          initialValue={MOCK_PREFERENCE_VALUE}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — Quiet defaults (all off)</span>
        <PreferencePanel
          events={MOCK_EVENTS.slice(0, 5)}
          channels={MOCK_CHANNELS}
          initialValue={EMPTY_VALUE}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — All channels on (escalation profile)</span>
        <PreferencePanel
          events={MOCK_EVENTS.slice(0, 5)}
          channels={MOCK_CHANNELS}
          initialValue={ALL_ON_VALUE}
        />
      </section>
    </main>
  )
}
