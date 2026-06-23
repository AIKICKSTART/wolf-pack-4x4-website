import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { StateSlowConnection } from "../../components/states"
import styles from "../states.module.css"

export const metadata: Metadata = {
  title: "Slow connection | UI Primitives — System States",
}

export default function SlowConnectionShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.10 / System states"
        title="Cold tyres · slow connection"
        description="Tortoise inside a buffering ring. Ping + throughput meters, plus an inline 'switch to lite mode' toggle so the workshop can keep entering jobs while the link recovers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Slow connection" },
        ]}
      />
      <section className={styles.canvas}>
        <StateSlowConnection
          headline="Connection rolling on cold tyres"
          message="The link to the workshop services is up, but the pipe is slow. We have throttled telemetry to keep quotes and invoices responsive. Switch to lite mode if you want to drop assets too."
          pingLabel="412 ms"
          throughputLabel="82 kbps"
          liteAction={
            <button type="button" className={styles.btnChrome}>
              Switch to lite
            </button>
          }
          primaryAction={
            <Link href="/ui-primitives/states/slow-connection" className={styles.btnRed}>
              Retest connection
            </Link>
          }
          secondaryAction={
            <Link href="/ui-primitives" className={styles.btnGhost}>
              Continue anyway
            </Link>
          }
        />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Role=&quot;status&quot; with polite live region. The buffering ring and tortoise crawl
            both freeze under prefers-reduced-motion. Meter dl pairs label + value so each metric
            is announced as a unit.
          </p>
        </aside>
      </section>
    </main>
  )
}
