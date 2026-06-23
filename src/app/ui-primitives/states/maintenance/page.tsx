import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { StateMaintenance } from "../../components/states"
import styles from "../states.module.css"

export const metadata: Metadata = {
  title: "Maintenance window | UI Primitives — System States",
}

export default function MaintenanceShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.03 / System states"
        title="Workshop offline · 503"
        description="Scheduled maintenance surface. Crossed wrenches over a rotating brake-rotor, hazard band across the top, and a service window dl that announces start + end timestamps."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Maintenance" },
        ]}
      />
      <section className={styles.canvas}>
        <StateMaintenance
          affectedSurface="Bookings + invoicing"
          headline="We are on the tools"
          message="Bookings, invoicing, and the workshop dashboard are offline while we tighten bolts on the migration. Quotes already in flight are unaffected — they will reappear when the window closes."
          startsAt="2026-05-30 23:00 AEST"
          endsAt="2026-05-31 02:30 AEST"
          primaryAction={
            <Link href="/ui-primitives/states" className={styles.btnRed}>
              Back to states index
            </Link>
          }
          secondaryAction={
            <a
              href="https://status.mufflermen.com.au/incidents/scheduled"
              className={styles.btnGhost}
              target="_blank"
              rel="noreferrer"
            >
              Subscribe to updates
            </a>
          }
        />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Role=&quot;status&quot; with aria-live=&quot;polite&quot; so the announcement does not
            interrupt active narration. The hazard band freezes under prefers-reduced-motion.
          </p>
        </aside>
      </section>
    </main>
  )
}
