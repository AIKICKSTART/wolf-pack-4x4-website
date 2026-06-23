import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { StateServerError } from "../../components/states"
import styles from "../states.module.css"

export const metadata: Metadata = {
  title: "Server error · 500 | UI Primitives — System States",
}

export default function ServerErrorShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.02 / System states"
        title="Something blew a gasket · 500"
        description="Hard alert for backend faults. Snapped exhaust illustration, incident id + first-observed timestamp, and a retry / status page action pair."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Server error" },
        ]}
      />
      <section className={styles.canvas}>
        <StateServerError
          incidentId="INC-2026-0428-A · Bay 3 telemetry mesh"
          occurredAt="2026-04-28 09:42:11 AEST"
          primaryAction={
            <Link href="/ui-primitives/states/server-error" className={styles.btnRed}>
              Retry request
            </Link>
          }
          secondaryAction={
            <a
              href="https://status.mufflermen.com.au"
              className={styles.btnChrome}
              target="_blank"
              rel="noreferrer"
            >
              Open status page
            </a>
          }
        />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Rendered with role=&quot;alert&quot;, so assistive tech interrupts current narration to
            announce the fault. Incident details are inside a definition list so each row is paired
            label + value, not a free-floating string.
          </p>
        </aside>
      </section>
    </main>
  )
}
