import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SessionManagerPanel } from "../../components/auth-deep"

import { SESSIONS, SESSION_PANEL } from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Session manager panel | Auth deep",
  description:
    "Primitive 05 — active sessions table with device, location, risk tone, current-device badge and revoke action.",
}

export default function SessionManagerPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Sessions"
        title="Session manager panel"
        description="Active session table — NSW devices on the trusted track, Brisbane Linux box flagged on the watchlist after suspicious sign-in attempts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Session manager panel" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Full set · 4 devices (1 watchlisted)</span>
        <SessionManagerPanel {...SESSION_PANEL} />

        <span className={styles.stageCaption}>Trusted-only view</span>
        <SessionManagerPanel
          ownerLabel="Brad Sterling — Tech"
          tenantLabel="Pacemaker Distributor"
          sessions={SESSIONS.filter((s) => s.risk === "trusted").slice(0, 2)}
        />

        <span className={styles.stageCaption}>Single device · current only</span>
        <SessionManagerPanel
          ownerLabel="Jase Moretti — Apprentice"
          tenantLabel="Illawarra 4WD Co"
          sessions={SESSIONS.slice(0, 1)}
        />
      </section>
    </main>
  )
}
